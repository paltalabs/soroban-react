"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicKey = exports.GetPublicKey = exports.GetAddress = exports.DerivationPath = exports.Bundle = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const Bundle = (type) => schema_utils_1.Type.Object({ bundle: schema_utils_1.Type.Array(type, { minItems: 1 }) });
exports.Bundle = Bundle;
exports.DerivationPath = schema_utils_1.Type.Union([schema_utils_1.Type.String(), schema_utils_1.Type.Array(schema_utils_1.Type.Number())], {
    description: 'Derivation Path (BIP32).',
    $id: 'DerivationPath',
});
exports.GetAddress = schema_utils_1.Type.Object({
    path: exports.DerivationPath,
    address: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    showOnTrezor: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean({ default: true })),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    useEventListener: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
});
exports.GetPublicKey = schema_utils_1.Type.Object({
    path: exports.DerivationPath,
    showOnTrezor: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    suppressBackupWarning: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
});
exports.PublicKey = schema_utils_1.Type.Object({
    publicKey: schema_utils_1.Type.String(),
    path: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    serializedPath: schema_utils_1.Type.String(),
});
//# sourceMappingURL=params.js.map