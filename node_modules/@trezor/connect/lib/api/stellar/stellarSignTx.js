"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stellarSignTx = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const constants_1 = require("../../constants");
const stellar_1 = require("../../types/api/stellar");
const processTxRequest = async (typedCall, operations, index) => {
    const lastOp = index + 1 >= operations.length;
    const { type, ...op } = operations[index];
    if (lastOp) {
        const response = await typedCall(type, 'StellarSignedTx', op);
        return response.message;
    }
    await typedCall(type, 'StellarTxOpRequest', op);
    return processTxRequest(typedCall, operations, index + 1);
};
const transformSignMessage = (tx) => {
    if (!tx.timebounds) {
        throw constants_1.ERRORS.TypedError('Runtime', 'transformSignMessage: Unspecified timebounds are not supported');
    }
    const msg = {
        address_n: [],
        network_passphrase: '',
        source_account: tx.source,
        fee: tx.fee,
        sequence_number: tx.sequence,
        timebounds_start: tx.timebounds.minTime,
        timebounds_end: tx.timebounds.maxTime,
        memo_type: constants_1.PROTO.StellarMemoType.NONE,
        num_operations: tx.operations.length,
    };
    if (tx.memo) {
        msg.memo_type = tx.memo.type;
        msg.memo_text = tx.memo.text;
        msg.memo_id = tx.memo.id;
        msg.memo_hash = tx.memo.hash;
    }
    return msg;
};
const transformOperation = (op) => {
    (0, schema_utils_1.Assert)(stellar_1.StellarOperation, op);
    switch (op.type) {
        case 'createAccount':
            return {
                type: 'StellarCreateAccountOp',
                source_account: op.source,
                new_account: op.destination,
                starting_balance: op.startingBalance,
            };
        case 'payment':
            return {
                type: 'StellarPaymentOp',
                source_account: op.source,
                destination_account: op.destination,
                asset: op.asset,
                amount: op.amount,
            };
        case 'pathPaymentStrictReceive':
            return {
                type: 'StellarPathPaymentStrictReceiveOp',
                source_account: op.source,
                send_asset: op.sendAsset,
                send_max: op.sendMax,
                destination_account: op.destination,
                destination_asset: op.destAsset,
                destination_amount: op.destAmount,
                paths: op.path,
            };
        case 'pathPaymentStrictSend':
            return {
                type: 'StellarPathPaymentStrictSendOp',
                source_account: op.source,
                send_asset: op.sendAsset,
                send_amount: op.sendAmount,
                destination_account: op.destination,
                destination_asset: op.destAsset,
                destination_min: op.destMin,
                paths: op.path,
            };
        case 'createPassiveSellOffer':
            return {
                type: 'StellarCreatePassiveSellOfferOp',
                source_account: op.source,
                buying_asset: op.buying,
                selling_asset: op.selling,
                amount: op.amount,
                price_n: op.price.n,
                price_d: op.price.d,
            };
        case 'manageSellOffer':
            return {
                type: 'StellarManageSellOfferOp',
                source_account: op.source,
                buying_asset: op.buying,
                selling_asset: op.selling,
                amount: op.amount,
                offer_id: op.offerId || 0,
                price_n: op.price.n,
                price_d: op.price.d,
            };
        case 'manageBuyOffer':
            return {
                type: 'StellarManageBuyOfferOp',
                source_account: op.source,
                buying_asset: op.buying,
                selling_asset: op.selling,
                amount: op.amount,
                offer_id: op.offerId || 0,
                price_n: op.price.n,
                price_d: op.price.d,
            };
        case 'setOptions': {
            const signer = op.signer
                ? {
                    signer_type: op.signer.type,
                    signer_key: op.signer.key,
                    signer_weight: op.signer.weight,
                }
                : undefined;
            return {
                type: 'StellarSetOptionsOp',
                source_account: op.source,
                clear_flags: op.clearFlags,
                set_flags: op.setFlags,
                master_weight: op.masterWeight,
                low_threshold: op.lowThreshold,
                medium_threshold: op.medThreshold,
                high_threshold: op.highThreshold,
                home_domain: op.homeDomain,
                inflation_destination_account: op.inflationDest,
                ...signer,
            };
        }
        case 'changeTrust':
            return {
                type: 'StellarChangeTrustOp',
                source_account: op.source,
                asset: op.line,
                limit: op.limit,
            };
        case 'allowTrust':
            return {
                type: 'StellarAllowTrustOp',
                source_account: op.source,
                trusted_account: op.trustor,
                asset_type: op.assetType,
                asset_code: op.assetCode,
                is_authorized: !!op.authorize,
            };
        case 'accountMerge':
            return {
                type: 'StellarAccountMergeOp',
                source_account: op.source,
                destination_account: op.destination,
            };
        case 'manageData':
            return {
                type: 'StellarManageDataOp',
                source_account: op.source,
                key: op.name,
                value: op.value,
            };
        case 'bumpSequence':
            return {
                type: 'StellarBumpSequenceOp',
                source_account: op.source,
                bump_to: op.bumpTo,
            };
        case 'claimClaimableBalance':
            return {
                type: 'StellarClaimClaimableBalanceOp',
                source_account: op.source,
                balance_id: op.balanceId,
            };
    }
};
const stellarSignTx = async (typedCall, address_n, networkPassphrase, tx) => {
    const message = transformSignMessage(tx);
    message.address_n = address_n;
    message.network_passphrase = networkPassphrase;
    const operations = [];
    tx.operations.forEach(op => {
        const transformed = transformOperation(op);
        if (transformed) {
            operations.push(transformed);
        }
    });
    await typedCall('StellarSignTx', 'StellarTxOpRequest', message);
    return processTxRequest(typedCall, operations, 0);
};
exports.stellarSignTx = stellarSignTx;
//# sourceMappingURL=stellarSignTx.js.map