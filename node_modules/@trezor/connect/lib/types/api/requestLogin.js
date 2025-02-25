"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestLoginSchema = exports.RequestLoginAsync = exports.LoginChallenge = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
exports.LoginChallenge = schema_utils_1.Type.Object({
    challengeHidden: schema_utils_1.Type.String(),
    challengeVisual: schema_utils_1.Type.String(),
    asyncChallenge: schema_utils_1.Type.Optional(schema_utils_1.Type.Undefined()),
    callback: schema_utils_1.Type.Optional(schema_utils_1.Type.Undefined()),
});
exports.RequestLoginAsync = schema_utils_1.Type.Object({
    challengeHidden: schema_utils_1.Type.Optional(schema_utils_1.Type.Undefined()),
    challengeVisual: schema_utils_1.Type.Optional(schema_utils_1.Type.Undefined()),
    asyncChallenge: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    callback: schema_utils_1.Type.Function([], exports.LoginChallenge),
});
exports.RequestLoginSchema = schema_utils_1.Type.Union([exports.RequestLoginAsync, exports.LoginChallenge]);
//# sourceMappingURL=requestLogin.js.map