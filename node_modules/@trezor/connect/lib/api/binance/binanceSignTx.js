"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTx = exports.validate = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const constants_1 = require("../../constants");
const binance_1 = require("../../types/api/binance");
const processTxRequest = async (typedCall, messages, index) => {
    const { type, ...params } = messages[index];
    const lastOp = index + 1 >= messages.length;
    if (lastOp) {
        const response = await typedCall(type, 'BinanceSignedTx', params);
        return response.message;
    }
    await typedCall(type, 'BinanceTxRequest', params);
    index++;
    return processTxRequest(typedCall, messages, index);
};
const validate = (tx) => {
    (0, schema_utils_1.Assert)(binance_1.BinanceSDKTransaction, tx);
    const preparedTx = {
        chain_id: tx.chain_id,
        account_number: tx.account_number || 0,
        memo: tx.memo,
        sequence: tx.sequence || 0,
        source: tx.source || 0,
        messages: [],
    };
    const { transfer, placeOrder, cancelOrder } = tx;
    if (transfer) {
        preparedTx.messages.push({
            ...transfer,
            type: 'BinanceTransferMsg',
        });
    }
    if (placeOrder) {
        preparedTx.messages.push({
            ...placeOrder,
            type: 'BinanceOrderMsg',
        });
    }
    if (cancelOrder) {
        preparedTx.messages.push({
            ...cancelOrder,
            type: 'BinanceCancelMsg',
        });
    }
    if (preparedTx.messages.length < 1) {
        throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'Transaction does not have any message');
    }
    return preparedTx;
};
exports.validate = validate;
const signTx = async (typedCall, address_n, tx, chunkify) => {
    const { account_number, chain_id, memo, sequence, source, messages } = tx;
    const msg_count = messages.length;
    await typedCall('BinanceSignTx', 'BinanceTxRequest', {
        address_n,
        msg_count,
        account_number,
        chain_id,
        memo,
        sequence,
        source,
        chunkify,
    });
    return processTxRequest(typedCall, messages, 0);
};
exports.signTx = signTx;
//# sourceMappingURL=binanceSignTx.js.map