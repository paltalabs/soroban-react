"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bigNumber_1 = require("@trezor/utils/lib/bigNumber");
const AbstractMethod_1 = require("../core/AbstractMethod");
const paramsValidator_1 = require("./common/paramsValidator");
const coinInfo_1 = require("../data/coinInfo");
const pathUtils_1 = require("../utils/pathUtils");
const constants_1 = require("../constants");
const BlockchainLink_1 = require("../backend/BlockchainLink");
const bitcoin_1 = require("./bitcoin");
class SignTransaction extends AbstractMethod_1.AbstractMethod {
    init() {
        var _a, _b, _c;
        this.requiredPermissions = ['read', 'write'];
        const { payload } = this;
        (0, paramsValidator_1.validateParams)(payload, [
            { name: 'coin', type: 'string', required: true },
            { name: 'identity', type: 'string' },
            { name: 'inputs', type: 'array', required: true },
            { name: 'outputs', type: 'array', required: true },
            { name: 'paymentRequests', type: 'array', allowEmpty: true },
            { name: 'coinjoinRequest', type: 'object' },
            { name: 'refTxs', type: 'array', allowEmpty: true },
            { name: 'account', type: 'object' },
            { name: 'locktime', type: 'number' },
            { name: 'timestamp', type: 'number' },
            { name: 'version', type: 'number' },
            { name: 'expiry', type: 'number' },
            { name: 'overwintered', type: 'boolean' },
            { name: 'versionGroupId', type: 'number' },
            { name: 'branchId', type: 'number' },
            { name: 'decredStakingTicket', type: 'boolean' },
            { name: 'push', type: 'boolean' },
            { name: 'preauthorized', type: 'boolean' },
            { name: 'amountUnit', type: ['number', 'string'] },
            { name: 'unlockPath', type: 'object' },
            { name: 'serialize', type: 'boolean' },
            { name: 'chunkify', type: 'boolean' },
        ]);
        if (payload.unlockPath) {
            (0, paramsValidator_1.validateParams)(payload.unlockPath, [
                { name: 'address_n', required: true, type: 'array' },
                { name: 'mac', required: true, type: 'string' },
            ]);
        }
        const coinInfo = (0, coinInfo_1.getBitcoinNetwork)(payload.coin);
        if (!coinInfo) {
            throw constants_1.ERRORS.TypedError('Method_UnknownCoin');
        }
        this.firmwareRange = (0, paramsValidator_1.getFirmwareRange)(this.name, coinInfo, this.firmwareRange);
        this.preauthorized = payload.preauthorized;
        const inputs = (0, bitcoin_1.validateTrezorInputs)(payload.inputs, coinInfo);
        const outputs = (0, bitcoin_1.validateTrezorOutputs)(payload.outputs, coinInfo);
        if (payload.refTxs && ((_a = payload.account) === null || _a === void 0 ? void 0 : _a.transactions)) {
            console.warn('two sources of referential transactions were passed. payload.refTxs have precedence');
        }
        const refTxs = (0, bitcoin_1.validateReferencedTransactions)({
            transactions: payload.refTxs || ((_b = payload.account) === null || _b === void 0 ? void 0 : _b.transactions),
            inputs,
            outputs,
            coinInfo,
            addresses: (_c = payload.account) === null || _c === void 0 ? void 0 : _c.addresses,
        });
        const outputsWithAmount = outputs.filter(output => typeof output.amount === 'string' &&
            !Object.prototype.hasOwnProperty.call(output, 'op_return_data'));
        if (outputsWithAmount.length > 0) {
            const total = outputsWithAmount.reduce((bn, output) => bn.plus(typeof output.amount === 'string' ? output.amount : '0'), new bigNumber_1.BigNumber(0));
            if (total.lt(coinInfo.dustLimit)) {
                throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'Total amount is below dust limit.');
            }
        }
        this.params = {
            inputs,
            outputs,
            paymentRequests: payload.paymentRequests || [],
            refTxs,
            addresses: payload.account ? payload.account.addresses : undefined,
            options: {
                lock_time: payload.locktime,
                timestamp: payload.timestamp,
                version: payload.version,
                expiry: payload.expiry,
                overwintered: payload.overwintered,
                version_group_id: payload.versionGroupId,
                branch_id: payload.branchId,
                decred_staking_ticket: payload.decredStakingTicket,
                amount_unit: payload.amountUnit,
                serialize: payload.serialize,
                coinjoin_request: payload.coinjoinRequest,
                chunkify: typeof payload.chunkify === 'boolean' ? payload.chunkify : false,
            },
            coinInfo,
            identity: payload.identity,
            push: typeof payload.push === 'boolean' ? payload.push : false,
            unlockPath: payload.unlockPath,
        };
        this.params.options = (0, bitcoin_1.enhanceSignTx)(this.params.options, coinInfo);
        if (this.params.push) {
            this.requiredPermissions.push('push_tx');
        }
    }
    get info() {
        const coinInfo = (0, coinInfo_1.getBitcoinNetwork)(this.payload.coin);
        return (0, pathUtils_1.getLabel)('Sign #NETWORK transaction', coinInfo);
    }
    async fetchAddresses(blockchain) {
        const { device, params: { inputs, coinInfo }, } = this;
        const accountPath = inputs.find(i => i.address_n);
        if (!accountPath || !accountPath.address_n) {
            throw constants_1.ERRORS.TypedError('Runtime', 'Account not found');
        }
        const address_n = accountPath.address_n.slice(0, 3);
        const node = await device.getCommands().getHDNode({ address_n }, { coinInfo });
        const account = await blockchain.getAccountInfo({
            descriptor: node.xpubSegwit || node.xpub,
            details: 'tokens',
        });
        return account.addresses;
    }
    async fetchRefTxs(useLegacySignProcess) {
        const { params: { inputs, outputs, options, coinInfo, identity, addresses }, } = this;
        const requiredRefTxs = (0, bitcoin_1.requireReferencedTransactions)(inputs, options, coinInfo);
        const refTxsIds = requiredRefTxs ? (0, bitcoin_1.getReferencedTransactions)(inputs) : [];
        const origTxsIds = !useLegacySignProcess ? (0, bitcoin_1.getOrigTransactions)(inputs, outputs) : [];
        if (!refTxsIds.length && !origTxsIds.length) {
            return [];
        }
        (0, BlockchainLink_1.isBackendSupported)(coinInfo);
        const blockchain = await (0, BlockchainLink_1.initBlockchain)(coinInfo, this.postMessage, identity);
        const refTxs = !refTxsIds.length
            ? []
            : await blockchain
                .getTransactionHexes(refTxsIds)
                .then((0, bitcoin_1.parseTransactionHexes)(coinInfo.network))
                .then(rawTxs => {
                (0, bitcoin_1.enhanceTrezorInputs)(this.params.inputs, rawTxs);
                return (0, bitcoin_1.transformReferencedTransactions)(rawTxs);
            });
        const origTxs = !origTxsIds.length
            ? []
            : await blockchain
                .getTransactionHexes(origTxsIds)
                .then((0, bitcoin_1.parseTransactionHexes)(coinInfo.network))
                .then(async (rawOrigTxs) => {
                const accountAddresses = addresses !== null && addresses !== void 0 ? addresses : (await this.fetchAddresses(blockchain));
                if (!accountAddresses)
                    return [];
                return (0, bitcoin_1.transformOrigTransactions)(rawOrigTxs, coinInfo, inputs, accountAddresses);
            });
        return refTxs.concat(origTxs);
    }
    async run() {
        var _a;
        const { device, params } = this;
        const useLegacySignProcess = !!device.unavailableCapabilities.replaceTransaction;
        const refTxs = (_a = params.refTxs) !== null && _a !== void 0 ? _a : (await this.fetchRefTxs(useLegacySignProcess));
        if (this.preauthorized) {
            await device.getCommands().preauthorize(true);
        }
        else if (params.unlockPath) {
            await device.getCommands().unlockPath(params.unlockPath);
        }
        const signTxMethod = !useLegacySignProcess ? bitcoin_1.signTx : bitcoin_1.signTxLegacy;
        const response = await signTxMethod({
            ...params,
            refTxs,
            typedCall: device.getCommands().typedCall.bind(device.getCommands()),
        });
        if (!response.serializedTx) {
            return response;
        }
        let bitcoinTx;
        if (params.options.decred_staking_ticket) {
            await (0, bitcoin_1.verifyTicketTx)(device.getCommands().getHDNode.bind(device.getCommands()), params.inputs, params.outputs, response.serializedTx, params.coinInfo);
        }
        else {
            bitcoinTx = await (0, bitcoin_1.verifyTx)(device.getCommands().getHDNode.bind(device.getCommands()), params.inputs, params.outputs, response.serializedTx, params.coinInfo, params.unlockPath);
            if (bitcoinTx.hasWitnesses()) {
                response.witnesses = bitcoinTx.ins.map((_, i) => { var _a; return (_a = bitcoinTx === null || bitcoinTx === void 0 ? void 0 : bitcoinTx.getWitness(i)) === null || _a === void 0 ? void 0 : _a.toString('hex'); });
            }
        }
        if (bitcoinTx && params.addresses) {
            response.signedTransaction = (0, bitcoin_1.createPendingTransaction)(bitcoinTx, {
                addresses: params.addresses,
                inputs: params.inputs,
                outputs: params.outputs,
            });
        }
        if (params.push) {
            (0, BlockchainLink_1.isBackendSupported)(params.coinInfo);
            const blockchain = await (0, BlockchainLink_1.initBlockchain)(params.coinInfo, this.postMessage, params.identity);
            const txid = await blockchain.pushTransaction(response.serializedTx);
            return {
                ...response,
                txid,
            };
        }
        return response;
    }
}
exports.default = SignTransaction;
//# sourceMappingURL=signTransaction.js.map