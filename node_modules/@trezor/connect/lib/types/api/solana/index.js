"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaSignedTransaction = exports.SolanaSignTransaction = exports.SolanaTxAdditionalInfo = exports.SolanaTxTokenAccountInfo = exports.SolanaPublicKey = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const params_1 = require("../../params");
exports.SolanaPublicKey = schema_utils_1.Type.Intersect([
    params_1.PublicKey,
    schema_utils_1.Type.Object({
        publicKey: schema_utils_1.Type.String(),
    }),
]);
exports.SolanaTxTokenAccountInfo = schema_utils_1.Type.Object({
    baseAddress: schema_utils_1.Type.String(),
    tokenProgram: schema_utils_1.Type.String(),
    tokenMint: schema_utils_1.Type.String(),
    tokenAccount: schema_utils_1.Type.String(),
});
exports.SolanaTxAdditionalInfo = schema_utils_1.Type.Object({
    tokenAccountsInfos: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.SolanaTxTokenAccountInfo, { minItems: 1 })),
});
exports.SolanaSignTransaction = schema_utils_1.Type.Object({
    path: schema_utils_1.Type.Union([schema_utils_1.Type.String(), schema_utils_1.Type.Array(schema_utils_1.Type.Number())]),
    serializedTx: schema_utils_1.Type.String(),
    additionalInfo: schema_utils_1.Type.Optional(exports.SolanaTxAdditionalInfo),
});
exports.SolanaSignedTransaction = schema_utils_1.Type.Object({
    signature: schema_utils_1.Type.String(),
});
//# sourceMappingURL=index.js.map