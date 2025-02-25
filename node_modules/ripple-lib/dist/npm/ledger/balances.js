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
function getTrustlineBalanceAmount(trustline) {
    return {
        currency: trustline.specification.currency,
        counterparty: trustline.specification.counterparty,
        value: trustline.state.balance
    };
}
function formatBalances(options, balances) {
    const result = balances.trustlines.map(getTrustlineBalanceAmount);
    if (!(options.counterparty || (options.currency && options.currency !== 'XRP'))) {
        const xrpBalance = {
            currency: 'XRP',
            value: balances.xrp
        };
        result.unshift(xrpBalance);
    }
    if (options.limit && result.length > options.limit) {
        const toRemove = result.length - options.limit;
        result.splice(-toRemove, toRemove);
    }
    return result;
}
function getLedgerVersionHelper(connection, optionValue) {
    if (optionValue != null && optionValue !== null) {
        return Promise.resolve(optionValue);
    }
    return connection.getLedgerVersion();
}
function getBalances(address, options = {}) {
    common_1.validate.getTrustlines({ address, options });
    address = common_1.ensureClassicAddress(address);
    return Promise.all([
        getLedgerVersionHelper(this.connection, options.ledgerVersion).then((ledgerVersion) => utils.getXRPBalance(this.connection, address, ledgerVersion)),
        this.getTrustlines(address, options)
    ]).then((results) => formatBalances(options, { xrp: results[0], trustlines: results[1] }));
}
exports.default = getBalances;
//# sourceMappingURL=balances.js.map