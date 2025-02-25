"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntermediaryVersion = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
exports.IntermediaryVersion = schema_utils_1.Type.Union([schema_utils_1.Type.Literal(1), schema_utils_1.Type.Literal(2), schema_utils_1.Type.Literal(3)]);
//# sourceMappingURL=firmware.js.map