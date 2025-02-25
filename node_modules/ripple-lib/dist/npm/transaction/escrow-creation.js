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
const common_1 = require("../common");
const ValidationError = utils.common.errors.ValidationError;
function createEscrowCreationTransaction(account, payment) {
    const txJSON = {
        TransactionType: 'EscrowCreate',
        Account: account,
        Destination: payment.destination,
        Amount: common_1.xrpToDrops(payment.amount)
    };
    if (payment.condition != null) {
        txJSON.Condition = payment.condition;
    }
    if (payment.allowCancelAfter != null) {
        txJSON.CancelAfter = common_1.iso8601ToRippleTime(payment.allowCancelAfter);
    }
    if (payment.allowExecuteAfter != null) {
        txJSON.FinishAfter = common_1.iso8601ToRippleTime(payment.allowExecuteAfter);
    }
    if (payment.sourceTag != null) {
        txJSON.SourceTag = payment.sourceTag;
    }
    if (payment.destinationTag != null) {
        txJSON.DestinationTag = payment.destinationTag;
    }
    if (payment.memos != null) {
        txJSON.Memos = payment.memos.map(utils.convertMemo);
    }
    if (Boolean(payment.allowCancelAfter) &&
        Boolean(payment.allowExecuteAfter) &&
        txJSON.CancelAfter <= txJSON.FinishAfter) {
        throw new ValidationError('prepareEscrowCreation: ' +
            '"allowCancelAfter" must be after "allowExecuteAfter"');
    }
    return txJSON;
}
function prepareEscrowCreation(address, escrowCreation, instructions = {}) {
    try {
        common_1.validate.prepareEscrowCreation({ address, escrowCreation, instructions });
        const txJSON = createEscrowCreationTransaction(address, escrowCreation);
        return utils.prepareTransaction(txJSON, this, instructions);
    }
    catch (e) {
        return Promise.reject(e);
    }
}
exports.default = prepareEscrowCreation;
//# sourceMappingURL=escrow-creation.js.map