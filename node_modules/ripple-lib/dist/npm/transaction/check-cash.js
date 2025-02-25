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
const ValidationError = utils.common.errors.ValidationError;
const toRippledAmount = utils.common.toRippledAmount;
const common_1 = require("../common");
function createCheckCashTransaction(account, checkCash) {
    if (checkCash.amount && checkCash.deliverMin) {
        throw new ValidationError('"amount" and "deliverMin" properties on ' +
            'CheckCash are mutually exclusive');
    }
    const txJSON = {
        Account: account,
        TransactionType: 'CheckCash',
        CheckID: checkCash.checkID
    };
    if (checkCash.amount != null) {
        txJSON.Amount = toRippledAmount(checkCash.amount);
    }
    if (checkCash.deliverMin != null) {
        txJSON.DeliverMin = toRippledAmount(checkCash.deliverMin);
    }
    return txJSON;
}
function prepareCheckCash(address, checkCash, instructions = {}) {
    try {
        common_1.validate.prepareCheckCash({ address, checkCash, instructions });
        const txJSON = createCheckCashTransaction(address, checkCash);
        return utils.prepareTransaction(txJSON, this, instructions);
    }
    catch (e) {
        return Promise.reject(e);
    }
}
exports.default = prepareCheckCash;
//# sourceMappingURL=check-cash.js.map