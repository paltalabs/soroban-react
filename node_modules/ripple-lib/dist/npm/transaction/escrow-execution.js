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
const utils = __importStar(require("./utils"));
const validate = utils.common.validate;
const ValidationError = utils.common.errors.ValidationError;
function createEscrowExecutionTransaction(account, payment) {
    const txJSON = {
        TransactionType: 'EscrowFinish',
        Account: account,
        Owner: payment.owner,
        OfferSequence: payment.escrowSequence
    };
    if (Boolean(payment.condition) !== Boolean(payment.fulfillment)) {
        throw new ValidationError('"condition" and "fulfillment" fields on' +
            ' EscrowFinish must only be specified together.');
    }
    if (payment.condition != null) {
        txJSON.Condition = payment.condition;
    }
    if (payment.fulfillment != null) {
        txJSON.Fulfillment = payment.fulfillment;
    }
    if (payment.memos != null) {
        txJSON.Memos = payment.memos.map(utils.convertMemo);
    }
    return txJSON;
}
function prepareEscrowExecution(address, escrowExecution, instructions = {}) {
    try {
        validate.prepareEscrowExecution({ address, escrowExecution, instructions });
        const txJSON = createEscrowExecutionTransaction(address, escrowExecution);
        return utils.prepareTransaction(txJSON, this, instructions);
    }
    catch (e) {
        return Promise.reject(e);
    }
}
exports.default = prepareEscrowExecution;
//# sourceMappingURL=escrow-execution.js.map