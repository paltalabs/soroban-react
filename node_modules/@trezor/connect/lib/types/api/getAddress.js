"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAddress = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const constants_1 = require("../../constants");
const params_1 = require("../params");
exports.GetAddress = schema_utils_1.Type.Composite([
    params_1.GetAddress,
    schema_utils_1.Type.Object({
        coin: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
        crossChain: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
        multisig: schema_utils_1.Type.Optional(constants_1.PROTO.MultisigRedeemScriptType),
        scriptType: schema_utils_1.Type.Optional(constants_1.PROTO.InternalInputScriptType),
        unlockPath: schema_utils_1.Type.Optional(constants_1.PROTO.UnlockPath),
    }),
]);
//# sourceMappingURL=getAddress.js.map