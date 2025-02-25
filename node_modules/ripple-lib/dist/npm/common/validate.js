"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tx_json = exports.instructions = exports.apiOptions = exports.verifyPaymentChannelClaim = exports.signPaymentChannelClaim = exports.generateAddress = exports.computeLedgerHash = exports.submit = exports.combine = exports.sign = exports.prepareTicketCreate = exports.prepareCheckCancel = exports.prepareCheckCash = exports.prepareCheckCreate = exports.preparePaymentChannelClaim = exports.preparePaymentChannelFund = exports.preparePaymentChannelCreate = exports.prepareEscrowExecution = exports.prepareEscrowCancellation = exports.prepareEscrowCreation = exports.prepareSettings = exports.prepareTrustline = exports.prepareOrderCancellation = exports.prepareOrder = exports.preparePayment = exports.getLedger = exports.getPaymentChannel = exports.getTransaction = exports.getOrderbook = exports.getOrders = exports.getBalanceSheet = exports.getBalances = exports.getTrustlines = exports.getAccountInfo = exports.getSettings = exports.getTransactions = exports.getPaths = void 0;
const _ = __importStar(require("lodash"));
const errors_1 = require("./errors");
const schema_validator_1 = require("./schema-validator");
function error(text) {
    return new errors_1.ValidationError(text);
}
function validateLedgerRange(options) {
    if (options != null &&
        options.minLedgerVersion != null &&
        options.maxLedgerVersion != null) {
        if (Number(options.minLedgerVersion) > Number(options.maxLedgerVersion)) {
            throw error('minLedgerVersion must not be greater than maxLedgerVersion');
        }
    }
}
function validateOptions(schema, instance) {
    schema_validator_1.schemaValidate(schema, instance);
    validateLedgerRange(instance.options);
}
exports.getPaths = _.partial(schema_validator_1.schemaValidate, 'getPathsParameters');
exports.getTransactions = _.partial(validateOptions, 'getTransactionsParameters');
exports.getSettings = _.partial(validateOptions, 'getSettingsParameters');
exports.getAccountInfo = _.partial(validateOptions, 'getAccountInfoParameters');
exports.getTrustlines = _.partial(validateOptions, 'getTrustlinesParameters');
exports.getBalances = _.partial(validateOptions, 'getBalancesParameters');
exports.getBalanceSheet = _.partial(validateOptions, 'getBalanceSheetParameters');
exports.getOrders = _.partial(validateOptions, 'getOrdersParameters');
exports.getOrderbook = _.partial(validateOptions, 'getOrderbookParameters');
exports.getTransaction = _.partial(validateOptions, 'getTransactionParameters');
exports.getPaymentChannel = _.partial(validateOptions, 'getPaymentChannelParameters');
exports.getLedger = _.partial(validateOptions, 'getLedgerParameters');
exports.preparePayment = _.partial(schema_validator_1.schemaValidate, 'preparePaymentParameters');
exports.prepareOrder = _.partial(schema_validator_1.schemaValidate, 'prepareOrderParameters');
exports.prepareOrderCancellation = _.partial(schema_validator_1.schemaValidate, 'prepareOrderCancellationParameters');
exports.prepareTrustline = _.partial(schema_validator_1.schemaValidate, 'prepareTrustlineParameters');
exports.prepareSettings = _.partial(schema_validator_1.schemaValidate, 'prepareSettingsParameters');
exports.prepareEscrowCreation = _.partial(schema_validator_1.schemaValidate, 'prepareEscrowCreationParameters');
exports.prepareEscrowCancellation = _.partial(schema_validator_1.schemaValidate, 'prepareEscrowCancellationParameters');
exports.prepareEscrowExecution = _.partial(schema_validator_1.schemaValidate, 'prepareEscrowExecutionParameters');
exports.preparePaymentChannelCreate = _.partial(schema_validator_1.schemaValidate, 'preparePaymentChannelCreateParameters');
exports.preparePaymentChannelFund = _.partial(schema_validator_1.schemaValidate, 'preparePaymentChannelFundParameters');
exports.preparePaymentChannelClaim = _.partial(schema_validator_1.schemaValidate, 'preparePaymentChannelClaimParameters');
exports.prepareCheckCreate = _.partial(schema_validator_1.schemaValidate, 'prepareCheckCreateParameters');
exports.prepareCheckCash = _.partial(schema_validator_1.schemaValidate, 'prepareCheckCashParameters');
exports.prepareCheckCancel = _.partial(schema_validator_1.schemaValidate, 'prepareCheckCancelParameters');
exports.prepareTicketCreate = _.partial(schema_validator_1.schemaValidate, 'prepareTicketParameters');
exports.sign = _.partial(schema_validator_1.schemaValidate, 'signParameters');
exports.combine = _.partial(schema_validator_1.schemaValidate, 'combineParameters');
exports.submit = _.partial(schema_validator_1.schemaValidate, 'submitParameters');
exports.computeLedgerHash = _.partial(schema_validator_1.schemaValidate, 'computeLedgerHashParameters');
exports.generateAddress = _.partial(schema_validator_1.schemaValidate, 'generateAddressParameters');
exports.signPaymentChannelClaim = _.partial(schema_validator_1.schemaValidate, 'signPaymentChannelClaimParameters');
exports.verifyPaymentChannelClaim = _.partial(schema_validator_1.schemaValidate, 'verifyPaymentChannelClaimParameters');
exports.apiOptions = _.partial(schema_validator_1.schemaValidate, 'api-options');
exports.instructions = _.partial(schema_validator_1.schemaValidate, 'instructions');
exports.tx_json = _.partial(schema_validator_1.schemaValidate, 'tx-json');
//# sourceMappingURL=validate.js.map