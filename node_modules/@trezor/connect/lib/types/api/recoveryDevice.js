"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryDevice = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const constants_1 = require("../../constants");
exports.RecoveryDevice = schema_utils_1.Type.Composite([
    constants_1.PROTO.RecoveryDevice,
    schema_utils_1.Type.Object({
        word_count: schema_utils_1.Type.Optional(schema_utils_1.Type.Union([schema_utils_1.Type.Literal(12), schema_utils_1.Type.Literal(18), schema_utils_1.Type.Literal(24)])),
    }),
]);
//# sourceMappingURL=recoveryDevice.js.map