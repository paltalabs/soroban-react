"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEMSignTransaction = exports.NEMTransaction = exports.NEMMultisigTransaction = exports.NEMRegularTransaction = exports.NEMSupplyChangeTransaction = exports.NEMMosaicCreationTransaction = exports.NEMProvisionNamespaceTransaction = exports.NEMAggregateModificationTransaction = exports.NEMImportanceTransaction = exports.NEMTransferTransaction = exports.TransactionCommon = exports.Message = exports.Modification = exports.NEMMosaic = exports.MosaicDefinition = exports.MosaicID = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const constants_1 = require("../../../constants");
const params_1 = require("../../params");
exports.MosaicID = schema_utils_1.Type.Object({
    namespaceId: schema_utils_1.Type.String(),
    name: schema_utils_1.Type.String(),
});
exports.MosaicDefinition = schema_utils_1.Type.Object({
    levy: schema_utils_1.Type.Optional(schema_utils_1.Type.Object({
        type: schema_utils_1.Type.Optional(constants_1.PROTO.EnumNEMMosaicLevy),
        fee: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
        recipient: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
        mosaicId: schema_utils_1.Type.Optional(exports.MosaicID),
    })),
    id: exports.MosaicID,
    description: schema_utils_1.Type.String(),
    properties: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(schema_utils_1.Type.Object({
        name: schema_utils_1.Type.Union([
            schema_utils_1.Type.Literal('divisibility'),
            schema_utils_1.Type.Literal('initialSupply'),
            schema_utils_1.Type.Literal('supplyMutable'),
            schema_utils_1.Type.Literal('transferable'),
        ]),
        value: schema_utils_1.Type.String(),
    }))),
});
exports.NEMMosaic = schema_utils_1.Type.Object({
    mosaicId: exports.MosaicID,
    quantity: schema_utils_1.Type.Number(),
});
exports.Modification = schema_utils_1.Type.Object({
    modificationType: constants_1.PROTO.EnumNEMModificationType,
    cosignatoryAccount: schema_utils_1.Type.String(),
});
exports.Message = schema_utils_1.Type.Object({
    payload: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    type: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    publicKey: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
});
exports.TransactionCommon = schema_utils_1.Type.Object({
    version: schema_utils_1.Type.Union([constants_1.NEM.EnumTxVersion, schema_utils_1.Type.Number()]),
    timeStamp: schema_utils_1.Type.Number(),
    fee: schema_utils_1.Type.Number(),
    deadline: schema_utils_1.Type.Number(),
    signer: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
});
exports.NEMTransferTransaction = schema_utils_1.Type.Intersect([
    exports.TransactionCommon,
    schema_utils_1.Type.Object({
        type: schema_utils_1.Type.Literal(constants_1.NEM.TxType.TRANSFER),
        recipient: schema_utils_1.Type.String(),
        amount: schema_utils_1.Type.Uint(),
        mosaics: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.NEMMosaic)),
        message: schema_utils_1.Type.Optional(exports.Message),
    }),
]);
exports.NEMImportanceTransaction = schema_utils_1.Type.Intersect([
    exports.TransactionCommon,
    schema_utils_1.Type.Object({
        type: schema_utils_1.Type.Literal(constants_1.NEM.TxType.IMPORTANCE_TRANSFER),
        importanceTransfer: schema_utils_1.Type.Object({
            mode: constants_1.PROTO.EnumNEMImportanceTransferMode,
            publicKey: schema_utils_1.Type.String(),
        }),
    }),
]);
exports.NEMAggregateModificationTransaction = schema_utils_1.Type.Intersect([
    exports.TransactionCommon,
    schema_utils_1.Type.Object({
        type: schema_utils_1.Type.Literal(constants_1.NEM.TxType.AGGREGATE_MODIFICATION),
        modifications: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.Modification)),
        minCosignatories: schema_utils_1.Type.Object({
            relativeChange: schema_utils_1.Type.Number(),
        }),
    }),
]);
exports.NEMProvisionNamespaceTransaction = schema_utils_1.Type.Intersect([
    exports.TransactionCommon,
    schema_utils_1.Type.Object({
        type: schema_utils_1.Type.Literal(constants_1.NEM.TxType.PROVISION_NAMESPACE),
        newPart: schema_utils_1.Type.String(),
        parent: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
        rentalFeeSink: schema_utils_1.Type.String(),
        rentalFee: schema_utils_1.Type.Number(),
    }),
]);
exports.NEMMosaicCreationTransaction = schema_utils_1.Type.Intersect([
    exports.TransactionCommon,
    schema_utils_1.Type.Object({
        type: schema_utils_1.Type.Literal(constants_1.NEM.TxType.MOSAIC_CREATION),
        mosaicDefinition: exports.MosaicDefinition,
        creationFeeSink: schema_utils_1.Type.String(),
        creationFee: schema_utils_1.Type.Number(),
    }),
]);
exports.NEMSupplyChangeTransaction = schema_utils_1.Type.Intersect([
    exports.TransactionCommon,
    schema_utils_1.Type.Object({
        type: schema_utils_1.Type.Literal(constants_1.NEM.TxType.SUPPLY_CHANGE),
        mosaicId: exports.MosaicID,
        supplyType: constants_1.PROTO.EnumNEMSupplyChangeType,
        delta: schema_utils_1.Type.Number(),
    }),
]);
exports.NEMRegularTransaction = schema_utils_1.Type.Union([
    exports.NEMTransferTransaction,
    exports.NEMImportanceTransaction,
    exports.NEMAggregateModificationTransaction,
    exports.NEMProvisionNamespaceTransaction,
    exports.NEMMosaicCreationTransaction,
    exports.NEMSupplyChangeTransaction,
]);
exports.NEMMultisigTransaction = schema_utils_1.Type.Intersect([
    exports.TransactionCommon,
    schema_utils_1.Type.Object({
        type: schema_utils_1.Type.Union([
            schema_utils_1.Type.Literal(constants_1.NEM.TxType.COSIGNING),
            schema_utils_1.Type.Literal(constants_1.NEM.TxType.MULTISIG),
            schema_utils_1.Type.Literal(constants_1.NEM.TxType.MULTISIG_SIGNATURE),
        ]),
        otherTrans: exports.NEMRegularTransaction,
    }),
]);
exports.NEMTransaction = schema_utils_1.Type.Union([exports.NEMRegularTransaction, exports.NEMMultisigTransaction]);
exports.NEMSignTransaction = schema_utils_1.Type.Object({
    path: params_1.DerivationPath,
    transaction: exports.NEMTransaction,
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
});
//# sourceMappingURL=index.js.map