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
const claimFlags = utils.common.txFlags.PaymentChannelClaim;
const common_1 = require("../common");
function createPaymentChannelClaimTransaction(account, claim) {
    const txJSON = {
        Account: account,
        TransactionType: 'PaymentChannelClaim',
        Channel: claim.channel,
        Flags: 0
    };
    if (claim.balance != null) {
        txJSON.Balance = common_1.xrpToDrops(claim.balance);
    }
    if (claim.amount != null) {
        txJSON.Amount = common_1.xrpToDrops(claim.amount);
    }
    if (Boolean(claim.signature) !== Boolean(claim.publicKey)) {
        throw new ValidationError('"signature" and "publicKey" fields on' +
            ' PaymentChannelClaim must only be specified together.');
    }
    if (claim.signature != null) {
        txJSON.Signature = claim.signature;
    }
    if (claim.publicKey != null) {
        txJSON.PublicKey = claim.publicKey;
    }
    if (claim.renew === true && claim.close === true) {
        throw new ValidationError('"renew" and "close" flags on PaymentChannelClaim' +
            ' are mutually exclusive');
    }
    if (claim.renew === true) {
        txJSON.Flags |= claimFlags.Renew;
    }
    if (claim.close === true) {
        txJSON.Flags |= claimFlags.Close;
    }
    return txJSON;
}
function preparePaymentChannelClaim(address, paymentChannelClaim, instructions = {}) {
    try {
        common_1.validate.preparePaymentChannelClaim({
            address,
            paymentChannelClaim,
            instructions
        });
        const txJSON = createPaymentChannelClaimTransaction(address, paymentChannelClaim);
        return utils.prepareTransaction(txJSON, this, instructions);
    }
    catch (e) {
        return Promise.reject(e);
    }
}
exports.default = preparePaymentChannelClaim;
//# sourceMappingURL=payment-channel-claim.js.map