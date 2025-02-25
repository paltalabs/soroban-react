"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectFeeLevel = exports.FeeLevel = exports.FeeInfo = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
exports.FeeInfo = schema_utils_1.Type.Object({
    blockTime: schema_utils_1.Type.Number(),
    minFee: schema_utils_1.Type.Number(),
    maxFee: schema_utils_1.Type.Number(),
    dustLimit: schema_utils_1.Type.Number(),
});
exports.FeeLevel = schema_utils_1.Type.Object({
    label: schema_utils_1.Type.Union([
        schema_utils_1.Type.Literal('high'),
        schema_utils_1.Type.Literal('normal'),
        schema_utils_1.Type.Literal('economy'),
        schema_utils_1.Type.Literal('low'),
        schema_utils_1.Type.Literal('custom'),
    ]),
    feePerUnit: schema_utils_1.Type.String(),
    blocks: schema_utils_1.Type.Number(),
    feeLimit: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    feePerTx: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
});
exports.SelectFeeLevel = schema_utils_1.Type.Union([
    schema_utils_1.Type.Object({
        name: schema_utils_1.Type.String(),
        fee: schema_utils_1.Type.Literal('0'),
        feePerByte: schema_utils_1.Type.Optional(schema_utils_1.Type.Undefined()),
        disabled: schema_utils_1.Type.Literal(true),
    }),
    schema_utils_1.Type.Object({
        name: schema_utils_1.Type.String(),
        fee: schema_utils_1.Type.String(),
        feePerByte: schema_utils_1.Type.String(),
        minutes: schema_utils_1.Type.Number(),
        total: schema_utils_1.Type.String(),
    }),
]);
//# sourceMappingURL=fees.js.map