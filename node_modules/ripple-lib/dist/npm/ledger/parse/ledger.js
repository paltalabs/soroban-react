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
exports.parseLedger = void 0;
const _ = __importStar(require("lodash"));
const common_1 = require("../../common");
const transaction_1 = __importDefault(require("./transaction"));
function parseTransactionWrapper(ledgerVersion, tx) {
    const transaction = Object.assign({}, _.omit(tx, 'metaData'), {
        meta: tx.metaData,
        ledger_index: ledgerVersion
    });
    const result = transaction_1.default(transaction, true);
    if (!result.outcome.ledgerVersion) {
        result.outcome.ledgerVersion = ledgerVersion;
    }
    return result;
}
function parseTransactions(transactions, ledgerVersion) {
    if (_.isEmpty(transactions)) {
        return {};
    }
    if (typeof transactions[0] === 'string') {
        return { transactionHashes: transactions };
    }
    return {
        transactions: transactions.map(_.partial(parseTransactionWrapper, ledgerVersion))
    };
}
function parseState(state) {
    if (_.isEmpty(state)) {
        return {};
    }
    if (typeof state[0] === 'string') {
        return { stateHashes: state };
    }
    return { rawState: JSON.stringify(state) };
}
function parseLedger(ledger) {
    const ledgerVersion = parseInt(ledger.ledger_index, 10);
    return common_1.removeUndefined(Object.assign({
        stateHash: ledger.account_hash,
        closeTime: common_1.rippleTimeToISO8601(ledger.close_time),
        closeTimeResolution: ledger.close_time_resolution,
        closeFlags: ledger.close_flags,
        ledgerHash: ledger.ledger_hash,
        ledgerVersion: ledgerVersion,
        parentLedgerHash: ledger.parent_hash,
        parentCloseTime: common_1.rippleTimeToISO8601(ledger.parent_close_time),
        totalDrops: ledger.total_coins,
        transactionHash: ledger.transaction_hash
    }, parseTransactions(ledger.transactions, ledgerVersion), parseState(ledger.accountState)));
}
exports.parseLedger = parseLedger;
//# sourceMappingURL=ledger.js.map