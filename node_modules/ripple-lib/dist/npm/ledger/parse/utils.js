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
exports.isPartialPayment = exports.adjustQualityForXRP = exports.parseTimestamp = exports.hexToString = exports.parseMemos = exports.parseOutcome = exports.parseQuality = void 0;
const ripple_lib_transactionparser_1 = __importDefault(require("ripple-lib-transactionparser"));
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const common = __importStar(require("../../common"));
const amount_1 = __importDefault(require("./amount"));
function adjustQualityForXRP(quality, takerGetsCurrency, takerPaysCurrency) {
    const numeratorShift = takerPaysCurrency === 'XRP' ? -6 : 0;
    const denominatorShift = takerGetsCurrency === 'XRP' ? -6 : 0;
    const shift = numeratorShift - denominatorShift;
    return shift === 0
        ? quality
        : new bignumber_js_1.default(quality).shiftedBy(shift).toString();
}
exports.adjustQualityForXRP = adjustQualityForXRP;
function parseQuality(quality) {
    if (typeof quality !== 'number') {
        return undefined;
    }
    return new bignumber_js_1.default(quality).shiftedBy(-9).toNumber();
}
exports.parseQuality = parseQuality;
function parseTimestamp(rippleTime) {
    if (typeof rippleTime !== 'number') {
        return undefined;
    }
    return common.rippleTimeToISO8601(rippleTime);
}
exports.parseTimestamp = parseTimestamp;
function removeEmptyCounterparty(amount) {
    if (amount.counterparty === '') {
        delete amount.counterparty;
    }
}
function removeEmptyCounterpartyInBalanceChanges(balanceChanges) {
    Object.entries(balanceChanges).forEach(([_, changes]) => {
        changes.forEach(removeEmptyCounterparty);
    });
}
function removeEmptyCounterpartyInOrderbookChanges(orderbookChanges) {
    Object.entries(orderbookChanges).forEach(([_, changes]) => {
        changes.forEach((change) => {
            Object.entries(change).forEach(removeEmptyCounterparty);
        });
    });
}
function isPartialPayment(tx) {
    return (tx.Flags & common.txFlags.Payment.PartialPayment) !== 0;
}
exports.isPartialPayment = isPartialPayment;
function parseDeliveredAmount(tx) {
    if (tx.TransactionType !== 'Payment' ||
        tx.meta.TransactionResult !== 'tesSUCCESS') {
        return undefined;
    }
    if (tx.meta.delivered_amount && tx.meta.delivered_amount === 'unavailable') {
        return undefined;
    }
    if (tx.meta.delivered_amount) {
        return amount_1.default(tx.meta.delivered_amount);
    }
    if (tx.meta.DeliveredAmount) {
        return amount_1.default(tx.meta.DeliveredAmount);
    }
    if (tx.Amount && !isPartialPayment(tx)) {
        return amount_1.default(tx.Amount);
    }
    if (tx.Amount && tx.ledger_index > 4594094) {
        return amount_1.default(tx.Amount);
    }
    return undefined;
}
function parseOutcome(tx) {
    const metadata = tx.meta || tx.metaData;
    if (!metadata) {
        return undefined;
    }
    const balanceChanges = ripple_lib_transactionparser_1.default.parseBalanceChanges(metadata);
    const orderbookChanges = ripple_lib_transactionparser_1.default.parseOrderbookChanges(metadata);
    const channelChanges = ripple_lib_transactionparser_1.default.parseChannelChanges(metadata);
    removeEmptyCounterpartyInBalanceChanges(balanceChanges);
    removeEmptyCounterpartyInOrderbookChanges(orderbookChanges);
    return common.removeUndefined({
        result: tx.meta.TransactionResult,
        timestamp: parseTimestamp(tx.date),
        fee: common.dropsToXrp(tx.Fee),
        balanceChanges: balanceChanges,
        orderbookChanges: orderbookChanges,
        channelChanges: channelChanges,
        ledgerVersion: tx.ledger_index,
        indexInLedger: tx.meta.TransactionIndex,
        deliveredAmount: parseDeliveredAmount(tx)
    });
}
exports.parseOutcome = parseOutcome;
function hexToString(hex) {
    return hex ? Buffer.from(hex, 'hex').toString('utf-8') : undefined;
}
exports.hexToString = hexToString;
function parseMemos(tx) {
    if (!Array.isArray(tx.Memos) || tx.Memos.length === 0) {
        return undefined;
    }
    return tx.Memos.map((m) => {
        return common.removeUndefined({
            type: m.Memo.parsed_memo_type || hexToString(m.Memo.MemoType),
            format: m.Memo.parsed_memo_format || hexToString(m.Memo.MemoFormat),
            data: m.Memo.parsed_memo_data || hexToString(m.Memo.MemoData)
        });
    });
}
exports.parseMemos = parseMemos;
//# sourceMappingURL=utils.js.map