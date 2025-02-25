"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StellarOperationMessage = exports.StellarSignedTx = exports.StellarSignTransaction = exports.StellarTransaction = exports.StellarOperation = exports.StellarClaimClaimableBalanceOperation = exports.StellarInflationOperation = exports.StellarBumpSequenceOperation = exports.StellarManageDataOperation = exports.StellarAccountMergeOperation = exports.StellarAllowTrustOperation = exports.StellarChangeTrustOperation = exports.StellarSetOptionsOperation = exports.StellarManageBuyOfferOperation = exports.StellarManageSellOfferOperation = exports.StellarPassiveSellOfferOperation = exports.StellarPathPaymentStrictSendOperation = exports.StellarPathPaymentStrictReceiveOperation = exports.StellarPaymentOperation = exports.StellarCreateAccountOperation = exports.StellarAsset = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const constants_1 = require("../../../constants");
const params_1 = require("../../params");
exports.StellarAsset = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Union([constants_1.PROTO.EnumStellarAssetType, schema_utils_1.Type.KeyOfEnum(constants_1.PROTO.StellarAssetType)]),
    code: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    issuer: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
});
exports.StellarCreateAccountOperation = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Literal('createAccount'),
    source: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    destination: schema_utils_1.Type.String(),
    startingBalance: schema_utils_1.Type.String(),
});
exports.StellarPaymentOperation = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Literal('payment'),
    source: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    destination: schema_utils_1.Type.String(),
    asset: exports.StellarAsset,
    amount: schema_utils_1.Type.String(),
});
exports.StellarPathPaymentStrictReceiveOperation = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Literal('pathPaymentStrictReceive'),
    source: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    sendAsset: exports.StellarAsset,
    sendMax: schema_utils_1.Type.Uint(),
    destination: schema_utils_1.Type.String(),
    destAsset: exports.StellarAsset,
    destAmount: schema_utils_1.Type.Uint(),
    path: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.StellarAsset)),
});
exports.StellarPathPaymentStrictSendOperation = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Literal('pathPaymentStrictSend'),
    source: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    sendAsset: exports.StellarAsset,
    sendAmount: schema_utils_1.Type.Uint(),
    destination: schema_utils_1.Type.String(),
    destAsset: exports.StellarAsset,
    destMin: schema_utils_1.Type.Uint(),
    path: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.StellarAsset)),
});
exports.StellarPassiveSellOfferOperation = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Literal('createPassiveSellOffer'),
    source: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    buying: exports.StellarAsset,
    selling: exports.StellarAsset,
    amount: schema_utils_1.Type.Uint(),
    price: schema_utils_1.Type.Object({
        n: schema_utils_1.Type.Number(),
        d: schema_utils_1.Type.Number(),
    }),
});
exports.StellarManageSellOfferOperation = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Literal('manageSellOffer'),
    source: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    buying: exports.StellarAsset,
    selling: exports.StellarAsset,
    amount: schema_utils_1.Type.Uint(),
    offerId: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    price: schema_utils_1.Type.Object({
        n: schema_utils_1.Type.Number(),
        d: schema_utils_1.Type.Number(),
    }),
});
exports.StellarManageBuyOfferOperation = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Literal('manageBuyOffer'),
    source: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    buying: exports.StellarAsset,
    selling: exports.StellarAsset,
    amount: schema_utils_1.Type.Uint(),
    offerId: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    price: schema_utils_1.Type.Object({
        n: schema_utils_1.Type.Number(),
        d: schema_utils_1.Type.Number(),
    }),
});
exports.StellarSetOptionsOperation = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Literal('setOptions'),
    source: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    signer: schema_utils_1.Type.Optional(schema_utils_1.Type.Object({
        type: constants_1.PROTO.EnumStellarSignerType,
        key: schema_utils_1.Type.Union([schema_utils_1.Type.String(), schema_utils_1.Type.Buffer()]),
        weight: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    })),
    inflationDest: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    clearFlags: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    setFlags: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    masterWeight: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    lowThreshold: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    medThreshold: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    highThreshold: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    homeDomain: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
});
exports.StellarChangeTrustOperation = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Literal('changeTrust'),
    source: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    line: exports.StellarAsset,
    limit: schema_utils_1.Type.String(),
});
exports.StellarAllowTrustOperation = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Literal('allowTrust'),
    source: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    trustor: schema_utils_1.Type.String(),
    assetCode: schema_utils_1.Type.String(),
    assetType: constants_1.PROTO.EnumStellarAssetType,
    authorize: schema_utils_1.Type.Optional(schema_utils_1.Type.Union([schema_utils_1.Type.Boolean(), schema_utils_1.Type.Undefined()])),
});
exports.StellarAccountMergeOperation = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Literal('accountMerge'),
    source: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    destination: schema_utils_1.Type.String(),
});
exports.StellarManageDataOperation = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Literal('manageData'),
    source: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    name: schema_utils_1.Type.String(),
    value: schema_utils_1.Type.Optional(schema_utils_1.Type.Union([schema_utils_1.Type.String(), schema_utils_1.Type.Buffer()])),
});
exports.StellarBumpSequenceOperation = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Literal('bumpSequence'),
    source: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    bumpTo: schema_utils_1.Type.Uint(),
});
exports.StellarInflationOperation = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Literal('inflation'),
    source: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
});
exports.StellarClaimClaimableBalanceOperation = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Literal('claimClaimableBalance'),
    source: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    balanceId: schema_utils_1.Type.String(),
});
exports.StellarOperation = schema_utils_1.Type.Union([
    exports.StellarCreateAccountOperation,
    exports.StellarPaymentOperation,
    exports.StellarPathPaymentStrictReceiveOperation,
    exports.StellarPathPaymentStrictSendOperation,
    exports.StellarPassiveSellOfferOperation,
    exports.StellarManageSellOfferOperation,
    exports.StellarManageBuyOfferOperation,
    exports.StellarSetOptionsOperation,
    exports.StellarChangeTrustOperation,
    exports.StellarAllowTrustOperation,
    exports.StellarAccountMergeOperation,
    exports.StellarInflationOperation,
    exports.StellarManageDataOperation,
    exports.StellarBumpSequenceOperation,
    exports.StellarClaimClaimableBalanceOperation,
]);
exports.StellarTransaction = schema_utils_1.Type.Object({
    source: schema_utils_1.Type.String(),
    fee: schema_utils_1.Type.Number(),
    sequence: schema_utils_1.Type.Uint(),
    timebounds: schema_utils_1.Type.Optional(schema_utils_1.Type.Object({
        minTime: schema_utils_1.Type.Number(),
        maxTime: schema_utils_1.Type.Number(),
    })),
    memo: schema_utils_1.Type.Optional(schema_utils_1.Type.Object({
        type: constants_1.PROTO.EnumStellarMemoType,
        id: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
        text: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
        hash: schema_utils_1.Type.Optional(schema_utils_1.Type.Union([schema_utils_1.Type.String(), schema_utils_1.Type.Buffer()])),
    })),
    operations: schema_utils_1.Type.Array(exports.StellarOperation),
});
exports.StellarSignTransaction = schema_utils_1.Type.Object({
    path: params_1.DerivationPath,
    networkPassphrase: schema_utils_1.Type.String(),
    transaction: exports.StellarTransaction,
});
exports.StellarSignedTx = schema_utils_1.Type.Object({
    publicKey: schema_utils_1.Type.String(),
    signature: schema_utils_1.Type.String(),
});
exports.StellarOperationMessage = schema_utils_1.Type.Union([
    schema_utils_1.Type.Intersect([
        schema_utils_1.Type.Object({
            type: schema_utils_1.Type.Literal('StellarCreateAccountOp'),
        }),
        constants_1.PROTO.StellarCreateAccountOp,
    ]),
    schema_utils_1.Type.Intersect([
        schema_utils_1.Type.Object({
            type: schema_utils_1.Type.Literal('StellarPaymentOp'),
        }),
        constants_1.PROTO.StellarPaymentOp,
    ]),
    schema_utils_1.Type.Intersect([
        schema_utils_1.Type.Object({
            type: schema_utils_1.Type.Literal('StellarPathPaymentStrictReceiveOp'),
        }),
        constants_1.PROTO.StellarPathPaymentStrictReceiveOp,
    ]),
    schema_utils_1.Type.Intersect([
        schema_utils_1.Type.Object({
            type: schema_utils_1.Type.Literal('StellarPathPaymentStrictSendOp'),
        }),
        constants_1.PROTO.StellarPathPaymentStrictSendOp,
    ]),
    schema_utils_1.Type.Intersect([
        schema_utils_1.Type.Object({
            type: schema_utils_1.Type.Literal('StellarManageSellOfferOp'),
        }),
        constants_1.PROTO.StellarManageSellOfferOp,
    ]),
    schema_utils_1.Type.Intersect([
        schema_utils_1.Type.Object({
            type: schema_utils_1.Type.Literal('StellarManageBuyOfferOp'),
        }),
        constants_1.PROTO.StellarManageBuyOfferOp,
    ]),
    schema_utils_1.Type.Intersect([
        schema_utils_1.Type.Object({
            type: schema_utils_1.Type.Literal('StellarCreatePassiveSellOfferOp'),
        }),
        constants_1.PROTO.StellarCreatePassiveSellOfferOp,
    ]),
    schema_utils_1.Type.Intersect([
        schema_utils_1.Type.Object({
            type: schema_utils_1.Type.Literal('StellarSetOptionsOp'),
        }),
        constants_1.PROTO.StellarSetOptionsOp,
    ]),
    schema_utils_1.Type.Intersect([
        schema_utils_1.Type.Object({
            type: schema_utils_1.Type.Literal('StellarChangeTrustOp'),
        }),
        constants_1.PROTO.StellarChangeTrustOp,
    ]),
    schema_utils_1.Type.Intersect([
        schema_utils_1.Type.Object({
            type: schema_utils_1.Type.Literal('StellarAllowTrustOp'),
        }),
        constants_1.PROTO.StellarAllowTrustOp,
    ]),
    schema_utils_1.Type.Intersect([
        schema_utils_1.Type.Object({
            type: schema_utils_1.Type.Literal('StellarAccountMergeOp'),
        }),
        constants_1.PROTO.StellarAccountMergeOp,
    ]),
    schema_utils_1.Type.Intersect([
        schema_utils_1.Type.Object({
            type: schema_utils_1.Type.Literal('StellarManageDataOp'),
        }),
        constants_1.PROTO.StellarManageDataOp,
    ]),
    schema_utils_1.Type.Intersect([
        schema_utils_1.Type.Object({
            type: schema_utils_1.Type.Literal('StellarBumpSequenceOp'),
        }),
        constants_1.PROTO.StellarBumpSequenceOp,
    ]),
    schema_utils_1.Type.Intersect([
        schema_utils_1.Type.Object({
            type: schema_utils_1.Type.Literal('StellarClaimClaimableBalanceOp'),
        }),
        constants_1.PROTO.StellarClaimClaimableBalanceOp,
    ]),
]);
//# sourceMappingURL=index.js.map