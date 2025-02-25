"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEMGetAddress = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const params_1 = require("../params");
exports.NEMGetAddress = schema_utils_1.Type.Composite([
    params_1.GetAddress,
    schema_utils_1.Type.Object({
        network: schema_utils_1.Type.Number(),
    }),
]);
//# sourceMappingURL=nemGetAddress.js.map