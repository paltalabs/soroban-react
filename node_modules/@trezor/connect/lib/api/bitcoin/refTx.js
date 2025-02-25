"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReferencedTransactions = exports.transformReferencedTransactions = exports.transformReferencedTransaction = exports.transformOrigTransactions = exports.parseTransactionHexes = exports.getOrigTransactions = exports.getReferencedTransactions = exports.requireReferencedTransactions = void 0;
const utxo_lib_1 = require("@trezor/utxo-lib");
const utils_1 = require("@trezor/utils");
const schema_utils_1 = require("@trezor/schema-utils");
const pathUtils_1 = require("../../utils/pathUtils");
const errors_1 = require("../../constants/errors");
const constants_1 = require("../../constants");
const requireReferencedTransactions = (inputs, options = {}, coinInfo) => {
    if ((coinInfo === null || coinInfo === void 0 ? void 0 : coinInfo.shortcut) === 'ZEC' || (coinInfo === null || coinInfo === void 0 ? void 0 : coinInfo.shortcut) === 'TAZ') {
        return !(options.version && options.version >= 5);
    }
    const inputTypes = ['SPENDTAPROOT', 'EXTERNAL'];
    return !!inputs.find(input => !inputTypes.find(t => t === input.script_type));
};
exports.requireReferencedTransactions = requireReferencedTransactions;
const getReferencedTransactions = (inputs) => {
    const result = [];
    inputs.forEach(input => {
        if (input.prev_hash && !result.includes(input.prev_hash)) {
            result.push(input.prev_hash);
        }
    });
    return result;
};
exports.getReferencedTransactions = getReferencedTransactions;
const getOrigTransactions = (inputs, outputs) => {
    const result = [];
    inputs.forEach(input => {
        if (input.orig_hash && !result.includes(input.orig_hash)) {
            result.push(input.orig_hash);
        }
    });
    outputs.forEach(output => {
        if (output.orig_hash && !result.includes(output.orig_hash)) {
            result.push(output.orig_hash);
        }
    });
    return result;
};
exports.getOrigTransactions = getOrigTransactions;
const parseTransactionHexes = (network) => (hexes) => hexes.map(hex => utxo_lib_1.Transaction.fromHex(hex, { network }));
exports.parseTransactionHexes = parseTransactionHexes;
const enhanceTransaction = (refTx, srcTx) => {
    const extraData = srcTx.getExtraData();
    if (extraData) {
        refTx.extra_data = extraData.toString('hex');
    }
    const specific = srcTx.getSpecificData();
    if (specific) {
        if (specific.type === 'zcash' && specific.versionGroupId && refTx.version >= 3) {
            refTx.version_group_id = specific.versionGroupId;
        }
        if (specific.type === 'dash' && srcTx.type && srcTx.version >= 3) {
            refTx.version |= srcTx.type << 16;
        }
    }
    return refTx;
};
const parseOutputScript = (output, network) => {
    try {
        const address = utxo_lib_1.address.fromOutputScript(output, network);
        return { type: 'address', address };
    }
    catch {
        try {
            const { data } = utxo_lib_1.payments.embed({ output }, { validate: true });
            return { type: 'data', data };
        }
        catch {
            return { type: 'unknown' };
        }
    }
};
const transformOrigTransaction = (tx, coinInfo, currentInputs, addresses) => {
    const inputsMap = (input, i) => {
        var _a;
        const prev_hash = utils_1.bufferUtils.reverseBuffer(input.hash).toString('hex');
        const currentInput = currentInputs.find(inp => inp.prev_hash === prev_hash && inp.prev_index === input.index);
        if (!(currentInput === null || currentInput === void 0 ? void 0 : currentInput.address_n)) {
            throw (0, errors_1.TypedError)('Method_InvalidParameter', `transformOrigTransactions: invalid input at ${tx.getId()} [${i}]`);
        }
        return {
            address_n: currentInput.address_n,
            prev_hash,
            prev_index: input.index,
            script_sig: input.script.toString('hex'),
            sequence: input.sequence,
            script_type: (0, pathUtils_1.getScriptType)(currentInput.address_n),
            multisig: undefined,
            amount: currentInput.amount,
            decred_tree: undefined,
            witness: (_a = tx.getWitness(i)) === null || _a === void 0 ? void 0 : _a.toString('hex'),
            ownership_proof: undefined,
            commitment_data: undefined,
        };
    };
    const outputsMap = (output, i) => {
        var _a, _b;
        const parsed = parseOutputScript(output.script, coinInfo.network);
        switch (parsed.type) {
            case 'data': {
                const op_return_data = (_b = (_a = parsed.data) === null || _a === void 0 ? void 0 : _a.shift()) === null || _b === void 0 ? void 0 : _b.toString('hex');
                if (typeof op_return_data !== 'string') {
                    throw (0, errors_1.TypedError)('Method_InvalidParameter', `transformOrigTransactions: invalid op_return_data at ${tx.getId()} [${i}]`);
                }
                return {
                    script_type: 'PAYTOOPRETURN',
                    amount: '0',
                    op_return_data,
                };
            }
            case 'address': {
                const { address } = parsed;
                const changeAddress = addresses.change.find(addr => addr.address === address);
                const address_n = changeAddress && (0, pathUtils_1.getHDPath)(changeAddress.path);
                const amount = output.value.toString();
                return address_n
                    ? {
                        address_n,
                        amount,
                        script_type: (0, pathUtils_1.getOutputScriptType)(address_n),
                    }
                    : {
                        address,
                        amount,
                        script_type: 'PAYTOADDRESS',
                    };
            }
            case 'unknown':
            default:
                throw (0, errors_1.TypedError)('Method_InvalidParameter', `transformOrigTransactions: invalid output at ${tx.getId()} [${i}]`);
        }
    };
    const refTx = {
        version: tx.version,
        hash: tx.getId(),
        inputs: tx.ins.map(inputsMap),
        outputs: tx.outs.map(outputsMap),
        lock_time: tx.locktime,
        timestamp: tx.timestamp,
        expiry: tx.expiry,
    };
    return enhanceTransaction(refTx, tx);
};
const transformOrigTransactions = (txs, coinInfo, currentInputs, addresses) => txs.map(tx => transformOrigTransaction(tx, coinInfo, currentInputs, addresses));
exports.transformOrigTransactions = transformOrigTransactions;
const transformReferencedTransaction = (tx) => {
    const inputsMap = (input) => ({
        prev_index: input.index,
        sequence: input.sequence,
        prev_hash: utils_1.bufferUtils.reverseBuffer(input.hash).toString('hex'),
        script_sig: input.script.toString('hex'),
    });
    const binOutputsMap = (output) => ({
        amount: output.value.toString(),
        script_pubkey: output.script.toString('hex'),
    });
    const refTx = {
        version: tx.version,
        hash: tx.getId(),
        inputs: tx.ins.map(inputsMap),
        bin_outputs: tx.outs.map(binOutputsMap),
        lock_time: tx.locktime,
        timestamp: tx.timestamp,
        expiry: tx.expiry,
    };
    return enhanceTransaction(refTx, tx);
};
exports.transformReferencedTransaction = transformReferencedTransaction;
const transformReferencedTransactions = (txs) => txs.map(exports.transformReferencedTransaction);
exports.transformReferencedTransactions = transformReferencedTransactions;
const validateReferencedTransactions = ({ transactions, inputs, outputs, addresses, coinInfo, }) => {
    if (!Array.isArray(transactions) || transactions.length === 0)
        return;
    const refTxs = (0, exports.requireReferencedTransactions)(inputs) ? (0, exports.getReferencedTransactions)(inputs) : [];
    const origTxs = (0, exports.getOrigTransactions)(inputs, outputs);
    const transformedTxs = transactions.map(tx => {
        if ('details' in tx) {
            if (!tx.hex)
                throw (0, errors_1.TypedError)('Method_InvalidParameter', `refTx: hex for ${tx.txid} not provided`);
            const srcTx = utxo_lib_1.Transaction.fromHex(tx.hex, { network: coinInfo.network });
            if (origTxs.includes(tx.txid)) {
                if (!addresses)
                    throw (0, errors_1.TypedError)('Method_InvalidParameter', `refTx: addresses for ${tx.txid} not provided`);
                return transformOrigTransaction(srcTx, coinInfo, inputs, addresses);
            }
            return (0, exports.transformReferencedTransaction)(srcTx);
        }
        (0, schema_utils_1.Assert)(schema_utils_1.Type.Object({
            hash: schema_utils_1.Type.String(),
            version: schema_utils_1.Type.Number(),
            lock_time: schema_utils_1.Type.Number(),
            extra_data: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
            timestamp: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
            version_group_id: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
        }), tx);
        if (origTxs.includes(tx.hash)) {
            (0, schema_utils_1.Assert)(schema_utils_1.Type.Object({
                inputs: schema_utils_1.Type.Array(constants_1.PROTO.TxInput, { minItems: 1 }),
                outputs: schema_utils_1.Type.Array(constants_1.PROTO.TxOutputType, { minItems: 1 }),
            }), tx);
            return tx;
        }
        (0, schema_utils_1.Assert)(schema_utils_1.Type.Object({
            inputs: schema_utils_1.Type.Array(constants_1.PROTO.PrevInput, { minItems: 1 }),
            bin_outputs: schema_utils_1.Type.Array(constants_1.PROTO.TxOutputBinType, { minItems: 1 }),
        }), tx);
        return {
            hash: tx.hash,
            version: tx.version,
            extra_data: tx.extra_data,
            lock_time: tx.lock_time,
            timestamp: tx.timestamp,
            version_group_id: tx.version_group_id,
            expiry: tx.expiry,
            inputs: tx.inputs.map(input => ({
                prev_hash: input.prev_hash,
                prev_index: input.prev_index,
                script_sig: input.script_sig,
                sequence: input.sequence,
                decred_tree: input.decred_tree,
            })),
            bin_outputs: tx.bin_outputs.map(output => ({
                amount: output.amount,
                script_pubkey: output.script_pubkey,
                decred_script_version: output.decred_script_version,
            })),
        };
    });
    refTxs.concat(origTxs).forEach(hash => {
        if (!transformedTxs.find(tx => tx.hash === hash)) {
            throw (0, errors_1.TypedError)('Method_InvalidParameter', `refTx: ${hash} not provided`);
        }
    });
    return transformedTxs;
};
exports.validateReferencedTransactions = validateReferencedTransactions;
//# sourceMappingURL=refTx.js.map