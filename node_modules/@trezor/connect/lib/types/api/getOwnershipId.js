"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOwnershipId = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const constants_1 = require("../../constants");
const params_1 = require("../params");
exports.GetOwnershipId = schema_utils_1.Type.Object({
    path: params_1.DerivationPath,
    coin: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    multisig: schema_utils_1.Type.Optional(constants_1.PROTO.MultisigRedeemScriptType),
    scriptType: schema_utils_1.Type.Optional(constants_1.PROTO.InternalInputScriptType),
});
//# sourceMappingURL=getOwnershipId.js.map