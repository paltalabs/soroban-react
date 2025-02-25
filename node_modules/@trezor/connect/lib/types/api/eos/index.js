"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EosSignTransaction = exports.EosSDKTransaction = exports.EosTxAction = exports.EosTxActionCommon = exports.EosAuthorization = exports.EosTxHeader = exports.EosPublicKey = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const constants_1 = require("../../../constants");
const params_1 = require("../../params");
exports.EosPublicKey = schema_utils_1.Type.Object({
    wifPublicKey: schema_utils_1.Type.String(),
    rawPublicKey: schema_utils_1.Type.String(),
    path: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    serializedPath: schema_utils_1.Type.String(),
});
exports.EosTxHeader = schema_utils_1.Type.Object({
    expiration: schema_utils_1.Type.Union([schema_utils_1.Type.Uint(), schema_utils_1.Type.String()]),
    refBlockNum: schema_utils_1.Type.Number(),
    refBlockPrefix: schema_utils_1.Type.Number(),
    maxNetUsageWords: schema_utils_1.Type.Number(),
    maxCpuUsageMs: schema_utils_1.Type.Number(),
    delaySec: schema_utils_1.Type.Number(),
});
exports.EosAuthorization = schema_utils_1.Type.Object({
    threshold: schema_utils_1.Type.Number(),
    keys: schema_utils_1.Type.Array(constants_1.PROTO.EosAuthorizationKey),
    accounts: schema_utils_1.Type.Array(schema_utils_1.Type.Object({
        permission: constants_1.PROTO.EosPermissionLevel,
        weight: schema_utils_1.Type.Number(),
    })),
    waits: schema_utils_1.Type.Array(constants_1.PROTO.EosAuthorizationWait),
});
exports.EosTxActionCommon = schema_utils_1.Type.Object({
    account: schema_utils_1.Type.String(),
    authorization: schema_utils_1.Type.Array(constants_1.PROTO.EosPermissionLevel),
});
exports.EosTxAction = schema_utils_1.Type.Union([
    schema_utils_1.Type.Intersect([
        exports.EosTxActionCommon,
        schema_utils_1.Type.Object({
            name: schema_utils_1.Type.Literal('transfer'),
            data: schema_utils_1.Type.Object({
                from: schema_utils_1.Type.String(),
                to: schema_utils_1.Type.String(),
                quantity: schema_utils_1.Type.String(),
                memo: schema_utils_1.Type.String(),
            }),
        }),
    ]),
    schema_utils_1.Type.Intersect([
        exports.EosTxActionCommon,
        schema_utils_1.Type.Object({
            name: schema_utils_1.Type.Literal('delegatebw'),
            data: schema_utils_1.Type.Object({
                from: schema_utils_1.Type.String(),
                receiver: schema_utils_1.Type.String(),
                stake_net_quantity: schema_utils_1.Type.String(),
                stake_cpu_quantity: schema_utils_1.Type.String(),
                transfer: schema_utils_1.Type.Boolean(),
            }),
        }),
    ]),
    schema_utils_1.Type.Intersect([
        exports.EosTxActionCommon,
        schema_utils_1.Type.Object({
            name: schema_utils_1.Type.Literal('undelegatebw'),
            data: schema_utils_1.Type.Object({
                from: schema_utils_1.Type.String(),
                receiver: schema_utils_1.Type.String(),
                unstake_net_quantity: schema_utils_1.Type.String(),
                unstake_cpu_quantity: schema_utils_1.Type.String(),
            }),
        }),
    ]),
    schema_utils_1.Type.Intersect([
        exports.EosTxActionCommon,
        schema_utils_1.Type.Object({
            name: schema_utils_1.Type.Literal('buyram'),
            data: schema_utils_1.Type.Object({
                payer: schema_utils_1.Type.String(),
                receiver: schema_utils_1.Type.String(),
                quant: schema_utils_1.Type.String(),
            }),
        }),
    ]),
    schema_utils_1.Type.Intersect([
        exports.EosTxActionCommon,
        schema_utils_1.Type.Object({
            name: schema_utils_1.Type.Literal('buyrambytes'),
            data: constants_1.PROTO.EosActionBuyRamBytes,
        }),
    ]),
    schema_utils_1.Type.Intersect([
        exports.EosTxActionCommon,
        schema_utils_1.Type.Object({
            name: schema_utils_1.Type.Literal('sellram'),
            data: constants_1.PROTO.EosActionSellRam,
        }),
    ]),
    schema_utils_1.Type.Intersect([
        exports.EosTxActionCommon,
        schema_utils_1.Type.Object({
            name: schema_utils_1.Type.Literal('voteproducer'),
            data: schema_utils_1.Type.Object({
                voter: schema_utils_1.Type.String(),
                proxy: schema_utils_1.Type.String(),
                producers: schema_utils_1.Type.Array(schema_utils_1.Type.String()),
            }),
        }),
    ]),
    schema_utils_1.Type.Intersect([
        exports.EosTxActionCommon,
        schema_utils_1.Type.Object({
            name: schema_utils_1.Type.Literal('refund'),
            data: constants_1.PROTO.EosActionRefund,
        }),
    ]),
    schema_utils_1.Type.Intersect([
        exports.EosTxActionCommon,
        schema_utils_1.Type.Object({
            name: schema_utils_1.Type.Literal('updateauth'),
            data: schema_utils_1.Type.Object({
                account: schema_utils_1.Type.String(),
                permission: schema_utils_1.Type.String(),
                parent: schema_utils_1.Type.String(),
                auth: exports.EosAuthorization,
            }),
        }),
    ]),
    schema_utils_1.Type.Intersect([
        exports.EosTxActionCommon,
        schema_utils_1.Type.Object({
            name: schema_utils_1.Type.Literal('deleteauth'),
            data: constants_1.PROTO.EosActionDeleteAuth,
        }),
    ]),
    schema_utils_1.Type.Intersect([
        exports.EosTxActionCommon,
        schema_utils_1.Type.Object({
            name: schema_utils_1.Type.Literal('linkauth'),
            data: constants_1.PROTO.EosActionLinkAuth,
        }),
    ]),
    schema_utils_1.Type.Intersect([
        exports.EosTxActionCommon,
        schema_utils_1.Type.Object({
            name: schema_utils_1.Type.Literal('unlinkauth'),
            data: constants_1.PROTO.EosActionUnlinkAuth,
        }),
    ]),
    schema_utils_1.Type.Intersect([
        exports.EosTxActionCommon,
        schema_utils_1.Type.Object({
            name: schema_utils_1.Type.Literal('newaccount'),
            data: schema_utils_1.Type.Object({
                creator: schema_utils_1.Type.String(),
                name: schema_utils_1.Type.String(),
                owner: exports.EosAuthorization,
                active: exports.EosAuthorization,
            }),
        }),
    ]),
]);
exports.EosSDKTransaction = schema_utils_1.Type.Object({
    chainId: schema_utils_1.Type.String(),
    header: exports.EosTxHeader,
    actions: schema_utils_1.Type.Array(schema_utils_1.Type.Union([
        exports.EosTxAction,
        schema_utils_1.Type.Intersect([
            exports.EosTxActionCommon,
            schema_utils_1.Type.Object({
                name: schema_utils_1.Type.String(),
                data: schema_utils_1.Type.String(),
            }),
        ]),
    ])),
});
exports.EosSignTransaction = schema_utils_1.Type.Object({
    path: params_1.DerivationPath,
    transaction: exports.EosSDKTransaction,
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
});
//# sourceMappingURL=index.js.map