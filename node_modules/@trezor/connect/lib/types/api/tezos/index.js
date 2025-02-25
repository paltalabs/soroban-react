"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TezosSignTransaction = exports.TezosOperation = exports.TezosDelegationOperation = exports.TezosOriginationOperation = exports.TezosTransactionOperation = exports.TezosParametersManager = exports.TezosManagerTransfer = exports.TezosRevealOperation = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const params_1 = require("../../params");
exports.TezosRevealOperation = schema_utils_1.Type.Object({
    source: schema_utils_1.Type.String(),
    fee: schema_utils_1.Type.Number(),
    counter: schema_utils_1.Type.Number(),
    gas_limit: schema_utils_1.Type.Number(),
    storage_limit: schema_utils_1.Type.Number(),
    public_key: schema_utils_1.Type.String(),
});
exports.TezosManagerTransfer = schema_utils_1.Type.Object({
    destination: schema_utils_1.Type.String(),
    amount: schema_utils_1.Type.Number(),
});
exports.TezosParametersManager = schema_utils_1.Type.Object({
    set_delegate: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    cancel_delegate: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    transfer: schema_utils_1.Type.Optional(exports.TezosManagerTransfer),
});
exports.TezosTransactionOperation = schema_utils_1.Type.Object({
    source: schema_utils_1.Type.String(),
    destination: schema_utils_1.Type.String(),
    amount: schema_utils_1.Type.Number(),
    counter: schema_utils_1.Type.Number(),
    fee: schema_utils_1.Type.Number(),
    gas_limit: schema_utils_1.Type.Number(),
    storage_limit: schema_utils_1.Type.Number(),
    parameters: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(schema_utils_1.Type.Number())),
    parameters_manager: schema_utils_1.Type.Optional(exports.TezosParametersManager),
});
exports.TezosOriginationOperation = schema_utils_1.Type.Object({
    source: schema_utils_1.Type.String(),
    balance: schema_utils_1.Type.Number(),
    delegate: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    script: params_1.DerivationPath,
    fee: schema_utils_1.Type.Number(),
    counter: schema_utils_1.Type.Number(),
    gas_limit: schema_utils_1.Type.Number(),
    storage_limit: schema_utils_1.Type.Number(),
});
exports.TezosDelegationOperation = schema_utils_1.Type.Object({
    source: schema_utils_1.Type.String(),
    delegate: schema_utils_1.Type.String(),
    fee: schema_utils_1.Type.Number(),
    counter: schema_utils_1.Type.Number(),
    gas_limit: schema_utils_1.Type.Number(),
    storage_limit: schema_utils_1.Type.Number(),
});
exports.TezosOperation = schema_utils_1.Type.Object({
    reveal: schema_utils_1.Type.Optional(exports.TezosRevealOperation),
    transaction: schema_utils_1.Type.Optional(exports.TezosTransactionOperation),
    origination: schema_utils_1.Type.Optional(exports.TezosOriginationOperation),
    delegation: schema_utils_1.Type.Optional(exports.TezosDelegationOperation),
});
exports.TezosSignTransaction = schema_utils_1.Type.Object({
    path: params_1.DerivationPath,
    branch: schema_utils_1.Type.String(),
    operation: exports.TezosOperation,
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
});
//# sourceMappingURL=index.js.map