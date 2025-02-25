"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CipherKeyValue = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const params_1 = require("../params");
exports.CipherKeyValue = schema_utils_1.Type.Object({
    path: params_1.DerivationPath,
    key: schema_utils_1.Type.String(),
    value: schema_utils_1.Type.Union([schema_utils_1.Type.String(), schema_utils_1.Type.Buffer()]),
    encrypt: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    askOnEncrypt: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    askOnDecrypt: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    iv: schema_utils_1.Type.Optional(schema_utils_1.Type.Union([schema_utils_1.Type.String(), schema_utils_1.Type.Buffer()])),
});
//# sourceMappingURL=cipherKeyValue.js.map