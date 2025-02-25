"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumVerifyMessage = exports.EthereumSignTypedHash = exports.EthereumSignTypedData = exports.EthereumSignTypedDataMessage = exports.EthereumSignTypedDataTypes = exports.EthereumSignedTx = exports.EthereumSignTransaction = exports.EthereumTransactionEIP1559 = exports.EthereumAccessList = exports.EthereumTransaction = exports.EthereumSignMessage = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const params_1 = require("../../params");
exports.EthereumSignMessage = schema_utils_1.Type.Object({
    path: params_1.DerivationPath,
    message: schema_utils_1.Type.String(),
    hex: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
});
exports.EthereumTransaction = schema_utils_1.Type.Object({
    to: schema_utils_1.Type.String(),
    value: schema_utils_1.Type.String(),
    gasPrice: schema_utils_1.Type.String(),
    gasLimit: schema_utils_1.Type.String(),
    maxFeePerGas: schema_utils_1.Type.Optional(schema_utils_1.Type.Undefined()),
    maxPriorityFeePerGas: schema_utils_1.Type.Optional(schema_utils_1.Type.Undefined()),
    nonce: schema_utils_1.Type.String(),
    data: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    chainId: schema_utils_1.Type.Number(),
    txType: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
});
exports.EthereumAccessList = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
    storageKeys: schema_utils_1.Type.Array(schema_utils_1.Type.String()),
});
exports.EthereumTransactionEIP1559 = schema_utils_1.Type.Object({
    to: schema_utils_1.Type.String(),
    value: schema_utils_1.Type.String(),
    gasLimit: schema_utils_1.Type.String(),
    gasPrice: schema_utils_1.Type.Optional(schema_utils_1.Type.Undefined()),
    nonce: schema_utils_1.Type.String(),
    data: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    chainId: schema_utils_1.Type.Number(),
    maxFeePerGas: schema_utils_1.Type.String(),
    maxPriorityFeePerGas: schema_utils_1.Type.String(),
    accessList: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.EthereumAccessList)),
});
exports.EthereumSignTransaction = schema_utils_1.Type.Object({
    path: params_1.DerivationPath,
    transaction: schema_utils_1.Type.Union([exports.EthereumTransaction, exports.EthereumTransactionEIP1559]),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
});
exports.EthereumSignedTx = schema_utils_1.Type.Object({
    v: schema_utils_1.Type.String(),
    r: schema_utils_1.Type.String(),
    s: schema_utils_1.Type.String(),
    serializedTx: schema_utils_1.Type.String(),
});
const EthereumSignTypedDataTypeProperty = schema_utils_1.Type.Object({
    name: schema_utils_1.Type.String(),
    type: schema_utils_1.Type.String(),
});
exports.EthereumSignTypedDataTypes = schema_utils_1.Type.Object({
    EIP712Domain: schema_utils_1.Type.Array(EthereumSignTypedDataTypeProperty),
}, {
    additionalProperties: schema_utils_1.Type.Array(EthereumSignTypedDataTypeProperty),
});
exports.EthereumSignTypedDataMessage = schema_utils_1.Type.Object({
    types: exports.EthereumSignTypedDataTypes,
    primaryType: schema_utils_1.Type.String(),
    domain: schema_utils_1.Type.Object({
        name: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
        version: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
        chainId: schema_utils_1.Type.Optional(schema_utils_1.Type.Union([schema_utils_1.Type.Number(), schema_utils_1.Type.BigInt(), schema_utils_1.Type.String()])),
        verifyingContract: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
        salt: schema_utils_1.Type.Optional(schema_utils_1.Type.Union([schema_utils_1.Type.ArrayBuffer(), schema_utils_1.Type.String()])),
    }),
    message: schema_utils_1.Type.Object({}, {
        additionalProperties: schema_utils_1.Type.Any(),
    }),
});
exports.EthereumSignTypedData = schema_utils_1.Type.Object({
    path: params_1.DerivationPath,
    data: exports.EthereumSignTypedDataMessage,
    metamask_v4_compat: schema_utils_1.Type.Boolean(),
    domain_separator_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.Undefined()),
    message_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.Undefined()),
});
exports.EthereumSignTypedHash = schema_utils_1.Type.Object({
    path: params_1.DerivationPath,
    data: exports.EthereumSignTypedDataMessage,
    metamask_v4_compat: schema_utils_1.Type.Boolean(),
    domain_separator_hash: schema_utils_1.Type.String(),
    message_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
});
exports.EthereumVerifyMessage = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
    message: schema_utils_1.Type.String(),
    hex: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    signature: schema_utils_1.Type.String(),
});
//# sourceMappingURL=index.js.map