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
function createPaymentChannelFundTransaction(account, fund) {
    const txJSON = {
        Account: account,
        TransactionType: 'PaymentChannelFund',
        Channel: fund.channel,
        Amount: common_1.xrpToDrops(fund.amount)
    };
    if (fund.expiration != null) {
        txJSON.Expiration = common_1.iso8601ToRippleTime(fund.expiration);
    }
    return txJSON;
}
function preparePaymentChannelFund(address, paymentChannelFund, instructions = {}) {
    try {
        common_1.validate.preparePaymentChannelFund({
            address,
            paymentChannelFund,
            instructions
        });
        const txJSON = createPaymentChannelFundTransaction(address, paymentChannelFund);
        return utils.prepareTransaction(txJSON, this, instructions);
    }
    catch (e) {
        return Promise.reject(e);
    }
}
exports.default = preparePaymentChannelFund;
//# sourceMappingURL=payment-channel-fund.js.map