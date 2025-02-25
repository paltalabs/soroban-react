"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeCoinjoin = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const params_1 = require("../params");
const constants_1 = require("../../constants");
exports.AuthorizeCoinjoin = schema_utils_1.Type.Object({
    path: params_1.DerivationPath,
    coordinator: schema_utils_1.Type.String(),
    maxRounds: schema_utils_1.Type.Number(),
    maxCoordinatorFeeRate: schema_utils_1.Type.Number(),
    maxFeePerKvbyte: schema_utils_1.Type.Number(),
    coin: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    scriptType: schema_utils_1.Type.Optional(constants_1.PROTO.InternalInputScriptType),
    amountUnit: schema_utils_1.Type.Optional(constants_1.PROTO.EnumAmountUnit),
    preauthorized: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
});
//# sourceMappingURL=authorizeCoinjoin.js.map