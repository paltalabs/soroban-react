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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const utils = __importStar(require("./utils"));
const validate = utils.common.validate;
const trustlineFlags = utils.common.txFlags.TrustSet;
function convertQuality(quality) {
    return new bignumber_js_1.default(quality)
        .shiftedBy(9)
        .integerValue(bignumber_js_1.default.ROUND_DOWN)
        .toNumber();
}
function createTrustlineTransaction(account, trustline) {
    const limit = {
        currency: trustline.currency,
        issuer: trustline.counterparty,
        value: trustline.limit
    };
    const txJSON = {
        TransactionType: 'TrustSet',
        Account: account,
        LimitAmount: limit,
        Flags: 0
    };
    if (trustline.qualityIn != null) {
        txJSON.QualityIn = convertQuality(trustline.qualityIn);
    }
    if (trustline.qualityOut != null) {
        txJSON.QualityOut = convertQuality(trustline.qualityOut);
    }
    if (trustline.authorized === true) {
        txJSON.Flags |= trustlineFlags.SetAuth;
    }
    if (trustline.ripplingDisabled != null) {
        txJSON.Flags |= trustline.ripplingDisabled
            ? trustlineFlags.NoRipple
            : trustlineFlags.ClearNoRipple;
    }
    if (trustline.frozen != null) {
        txJSON.Flags |= trustline.frozen
            ? trustlineFlags.SetFreeze
            : trustlineFlags.ClearFreeze;
    }
    if (trustline.memos != null) {
        txJSON.Memos = trustline.memos.map(utils.convertMemo);
    }
    return txJSON;
}
function prepareTrustline(address, trustline, instructions = {}) {
    try {
        validate.prepareTrustline({ address, trustline, instructions });
        const txJSON = createTrustlineTransaction(address, trustline);
        return utils.prepareTransaction(txJSON, this, instructions);
    }
    catch (e) {
        return Promise.reject(e);
    }
}
exports.default = prepareTrustline;
//# sourceMappingURL=trustline.js.map