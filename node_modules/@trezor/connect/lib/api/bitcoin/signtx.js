"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTx = void 0;
const constants_1 = require("../../constants");
const requestPrevTxInfo = ({ typedCall, txRequest: { request_type, details }, refTxs, }) => {
    const { tx_hash } = details;
    if (!tx_hash) {
        throw constants_1.ERRORS.TypedError('Runtime', 'requestPrevTxInfo: unknown details.tx_hash');
    }
    const tx = refTxs[tx_hash.toLowerCase()];
    if (!tx) {
        throw constants_1.ERRORS.TypedError('Runtime', `requestPrevTxInfo: Requested unknown tx: ${tx_hash}`);
    }
    if (request_type === 'TXINPUT') {
        if (!tx.bin_outputs)
            throw constants_1.ERRORS.TypedError('Runtime', `requestPrevTxInfo: Requested unknown TXINPUT: ${tx_hash}`);
        return typedCall('TxAckPrevInput', 'TxRequest', {
            tx: { input: tx.inputs[details.request_index] },
        });
    }
    if (request_type === 'TXOUTPUT') {
        if (!tx.bin_outputs)
            throw constants_1.ERRORS.TypedError('Runtime', `requestPrevTxInfo: Requested unknown TXOUTPUT: ${tx_hash}`);
        return typedCall('TxAckPrevOutput', 'TxRequest', {
            tx: { output: tx.bin_outputs[details.request_index] },
        });
    }
    if (request_type === 'TXORIGINPUT') {
        if (!tx.outputs)
            throw constants_1.ERRORS.TypedError('Runtime', `requestPrevTxInfo: Requested unknown TXORIGINPUT: ${tx_hash}`);
        return typedCall('TxAckInput', 'TxRequest', {
            tx: { input: tx.inputs[details.request_index] },
        });
    }
    if (request_type === 'TXORIGOUTPUT') {
        if (!tx.outputs)
            throw constants_1.ERRORS.TypedError('Runtime', `requestPrevTxInfo: Requested unknown TXORIGOUTPUT: ${tx_hash}`);
        return typedCall('TxAckOutput', 'TxRequest', {
            tx: { output: tx.outputs[details.request_index] },
        });
    }
    if (request_type === 'TXEXTRADATA') {
        if (typeof details.extra_data_len !== 'number') {
            throw constants_1.ERRORS.TypedError('Runtime', 'requestPrevTxInfo: Missing extra_data_len');
        }
        if (typeof details.extra_data_offset !== 'number') {
            throw constants_1.ERRORS.TypedError('Runtime', 'requestPrevTxInfo: Missing extra_data_offset');
        }
        if (typeof tx.extra_data !== 'string') {
            throw constants_1.ERRORS.TypedError('Runtime', `requestPrevTxInfo: No extra data for transaction ${tx.hash}`);
        }
        const data = tx.extra_data;
        const dataLen = details.extra_data_len;
        const dataOffset = details.extra_data_offset;
        const extra_data_chunk = data.substring(dataOffset * 2, (dataOffset + dataLen) * 2);
        return typedCall('TxAckPrevExtraData', 'TxRequest', { tx: { extra_data_chunk } });
    }
    if (request_type === 'TXMETA') {
        const data = tx.extra_data;
        const meta = {
            version: tx.version,
            lock_time: tx.lock_time,
            inputs_count: tx.inputs.length,
            outputs_count: tx.outputs ? tx.outputs.length : tx.bin_outputs.length,
            timestamp: tx.timestamp,
            version_group_id: tx.version_group_id,
            expiry: tx.expiry,
            branch_id: tx.branch_id,
            extra_data_len: data ? data.length / 2 : undefined,
        };
        return typedCall('TxAckPrevMeta', 'TxRequest', { tx: meta });
    }
    throw constants_1.ERRORS.TypedError('Runtime', `requestPrevTxInfo: Unknown request type: ${request_type}`);
};
const requestSignedTxInfo = ({ typedCall, txRequest: { request_type, details }, inputs, outputs, paymentRequests, }) => {
    if (request_type === 'TXINPUT') {
        return typedCall('TxAckInput', 'TxRequest', {
            tx: { input: inputs[details.request_index] },
        });
    }
    if (request_type === 'TXOUTPUT') {
        return typedCall('TxAckOutput', 'TxRequest', {
            tx: { output: outputs[details.request_index] },
        });
    }
    if (request_type === 'TXPAYMENTREQ') {
        const req = paymentRequests[details.request_index];
        if (!req) {
            throw constants_1.ERRORS.TypedError('Runtime', `requestPrevTxInfo: Requested unknown payment request at ${details.request_index}`);
        }
        return typedCall('TxAckPaymentRequest', 'TxRequest', {
            nonce: req.nonce,
            recipient_name: req.recipient_name,
            memos: req.memos,
            amount: req.amount,
            signature: req.signature,
        });
    }
    if (request_type === 'TXMETA') {
        throw constants_1.ERRORS.TypedError('Runtime', 'requestSignedTxInfo: Cannot read TXMETA from signed transaction');
    }
    if (request_type === 'TXEXTRADATA') {
        throw constants_1.ERRORS.TypedError('Runtime', 'requestSignedTxInfo: Cannot read TXEXTRADATA from signed transaction');
    }
    throw constants_1.ERRORS.TypedError('Runtime', `requestSignedTxInfo: Unknown request type: ${request_type}`);
};
const requestTxAck = (props) => {
    const { tx_hash } = props.txRequest.details;
    if (tx_hash) {
        return requestPrevTxInfo(props);
    }
    return requestSignedTxInfo(props);
};
const saveTxSignatures = (txRequest, serializedTx, signatures) => {
    const { signature_index, signature, serialized_tx } = txRequest;
    if (serialized_tx) {
        serializedTx.push(serialized_tx);
    }
    if (typeof signature_index === 'number') {
        if (!signature) {
            throw constants_1.ERRORS.TypedError('Runtime', 'saveTxSignatures: Unexpected null in trezor:TxRequestSerialized signature.');
        }
        signatures[signature_index] = signature;
    }
};
const processTxRequest = async (props) => {
    const { txRequest, serializedTx, signatures } = props;
    if (txRequest.serialized)
        saveTxSignatures(txRequest.serialized, serializedTx, signatures);
    if (txRequest.request_type === 'TXFINISHED') {
        return Promise.resolve({
            signatures,
            serializedTx: serializedTx.join(''),
        });
    }
    const { message } = await requestTxAck(props);
    return processTxRequest({
        ...props,
        txRequest: message,
    });
};
const signTx = async ({ typedCall, inputs, outputs, paymentRequests, refTxs, options, coinInfo, }) => {
    const { message } = await typedCall('SignTx', 'TxRequest', {
        ...options,
        version: options.version === undefined && coinInfo.isBitcoin ? 1 : options.version,
        inputs_count: inputs.length,
        outputs_count: outputs.length,
        coin_name: coinInfo.name,
    });
    return processTxRequest({
        typedCall,
        txRequest: message,
        refTxs: refTxs.reduce((record, tx) => ({
            ...record,
            [tx.hash.toLowerCase()]: tx,
        }), {}),
        inputs,
        outputs,
        paymentRequests: paymentRequests || [],
        serializedTx: [],
        signatures: [],
    });
};
exports.signTx = signTx;
//# sourceMappingURL=signtx.js.map