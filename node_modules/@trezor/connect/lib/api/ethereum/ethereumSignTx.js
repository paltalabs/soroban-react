"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ethereumSignTxEIP1559 = exports.ethereumSignTx = exports.serializeEthereumTx = exports.getCommonForChain = void 0;
const common_1 = require("@ethereumjs/common");
const tx_1 = require("@ethereumjs/tx");
const constants_1 = require("../../constants");
const formatUtils_1 = require("../../utils/formatUtils");
const splitString = (str, len) => {
    if (str == null) {
        return ['', ''];
    }
    const first = str.slice(0, len);
    const second = str.slice(len);
    return [first, second];
};
const processTxRequest = async (typedCall, request, data, chain_id) => {
    if (!request.data_length) {
        let v = request.signature_v;
        const r = request.signature_r;
        const s = request.signature_s;
        if (v == null || r == null || s == null) {
            throw constants_1.ERRORS.TypedError('Runtime', 'processTxRequest: Unexpected request');
        }
        if (chain_id && v <= 1) {
            v += 2 * chain_id + 35;
        }
        return Promise.resolve({
            v: `0x${v.toString(16)}`,
            r: `0x${r}`,
            s: `0x${s}`,
        });
    }
    const [first, rest] = splitString(data, request.data_length * 2);
    const response = await typedCall('EthereumTxAck', 'EthereumTxRequest', { data_chunk: first });
    return processTxRequest(typedCall, response.message, rest, chain_id);
};
const deepHexPrefix = (0, formatUtils_1.deepTransform)(formatUtils_1.addHexPrefix);
const getCommonForChain = (chainId) => {
    if (common_1.Common.isSupportedChainId(BigInt(chainId)))
        return new common_1.Common({ chain: chainId });
    if (chainId === 61)
        return common_1.Common.custom({ name: 'ethereum-classic', networkId: 1, chainId: 61 }, { baseChain: common_1.Chain.Mainnet, hardfork: common_1.Hardfork.Petersburg });
    return common_1.Common.custom({ chainId });
};
exports.getCommonForChain = getCommonForChain;
const serializeEthereumTx = (tx, signature, isLegacy) => {
    const txData = deepHexPrefix({
        ...tx,
        ...signature,
        type: isLegacy ? 0 : 2,
        ...(isLegacy
            ? {
                gasPrice: tx.gasPrice,
                maxFeePerGas: undefined,
                maxPriorityFeePerGas: undefined,
            }
            : {
                gasPrice: undefined,
                maxFeePerGas: tx.maxFeePerGas,
                maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
            }),
    });
    const txOptions = {
        common: (0, exports.getCommonForChain)(tx.chainId),
    };
    const ethTx = tx_1.TransactionFactory.fromTxData(txData, txOptions);
    return `0x${Buffer.from(ethTx.serialize()).toString('hex')}`;
};
exports.serializeEthereumTx = serializeEthereumTx;
const stripLeadingZeroes = (str) => {
    while (/^00/.test(str)) {
        str = str.slice(2);
    }
    return str;
};
const ethereumSignTx = async (typedCall, address_n, to, value, gas_limit, gas_price, nonce, chain_id, chunkify, data, tx_type, definitions) => {
    const length = data == null ? 0 : data.length / 2;
    const [first, rest] = splitString(data, 1024 * 2);
    let message = {
        address_n,
        chain_id,
        nonce: stripLeadingZeroes(nonce),
        gas_price: stripLeadingZeroes(gas_price),
        gas_limit: stripLeadingZeroes(gas_limit),
        to,
        value: stripLeadingZeroes(value),
        definitions,
        chunkify,
    };
    if (length !== 0) {
        message = {
            ...message,
            data_length: length,
            data_initial_chunk: first,
        };
    }
    if (tx_type !== null) {
        message = {
            ...message,
            tx_type,
        };
    }
    const response = await typedCall('EthereumSignTx', 'EthereumTxRequest', message);
    return processTxRequest(typedCall, response.message, rest, chain_id);
};
exports.ethereumSignTx = ethereumSignTx;
const ethereumSignTxEIP1559 = async (typedCall, address_n, to, value, gas_limit, max_gas_fee, max_priority_fee, nonce, chain_id, chunkify, data, access_list, definitions) => {
    const length = data == null ? 0 : data.length / 2;
    const [first, rest] = splitString(data, 1024 * 2);
    const message = {
        address_n,
        nonce: stripLeadingZeroes(nonce),
        max_gas_fee: stripLeadingZeroes(max_gas_fee),
        max_priority_fee: stripLeadingZeroes(max_priority_fee),
        gas_limit: stripLeadingZeroes(gas_limit),
        to,
        value: stripLeadingZeroes(value),
        data_length: length,
        data_initial_chunk: first,
        chain_id,
        access_list: (access_list || []).map(a => ({
            address: a.address,
            storage_keys: a.storageKeys,
        })),
        definitions,
        chunkify,
    };
    const response = await typedCall('EthereumSignTxEIP1559', 'EthereumTxRequest', message);
    return processTxRequest(typedCall, response.message, rest);
};
exports.ethereumSignTxEIP1559 = ethereumSignTxEIP1559;
//# sourceMappingURL=ethereumSignTx.js.map