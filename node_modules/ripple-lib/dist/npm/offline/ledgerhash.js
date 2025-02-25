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
const _ = __importStar(require("lodash"));
const hashes_1 = require("../common/hashes");
const common = __importStar(require("../common"));
function convertLedgerHeader(header) {
    return {
        account_hash: header.stateHash,
        close_time: common.iso8601ToRippleTime(header.closeTime),
        close_time_resolution: header.closeTimeResolution,
        close_flags: header.closeFlags,
        hash: header.ledgerHash,
        ledger_hash: header.ledgerHash,
        ledger_index: header.ledgerVersion.toString(),
        parent_hash: header.parentLedgerHash,
        parent_close_time: common.iso8601ToRippleTime(header.parentCloseTime),
        total_coins: header.totalDrops,
        transaction_hash: header.transactionHash
    };
}
function hashLedgerHeader(ledgerHeader) {
    const header = convertLedgerHeader(ledgerHeader);
    return hashes_1.computeLedgerHash(header);
}
function computeTransactionHash(ledger, options) {
    let transactions;
    if (ledger.rawTransactions) {
        transactions = JSON.parse(ledger.rawTransactions);
    }
    else if (ledger.transactions) {
        try {
            transactions = ledger.transactions.map((tx) => JSON.parse(tx.rawTransaction));
        }
        catch (e) {
            if (e.toString() ===
                'SyntaxError: Unexpected' + ' token u in JSON at position 0') {
                throw new common.errors.ValidationError('ledger' + ' is missing raw transactions');
            }
        }
    }
    else {
        if (options.computeTreeHashes) {
            throw new common.errors.ValidationError('transactions' + ' property is missing from the ledger');
        }
        return ledger.transactionHash;
    }
    const txs = transactions.map((tx) => {
        const mergeTx = Object.assign({}, _.omit(tx, 'tx'), tx.tx || {});
        const renameMeta = Object.assign({}, _.omit(mergeTx, 'meta'), tx.meta ? { metaData: tx.meta } : {});
        return renameMeta;
    });
    const transactionHash = hashes_1.computeTransactionTreeHash(txs);
    if (ledger.transactionHash != null &&
        ledger.transactionHash !== transactionHash) {
        throw new common.errors.ValidationError('transactionHash in header' +
            ' does not match computed hash of transactions', {
            transactionHashInHeader: ledger.transactionHash,
            computedHashOfTransactions: transactionHash
        });
    }
    return transactionHash;
}
function computeStateHash(ledger, options) {
    if (ledger.rawState == null) {
        if (options.computeTreeHashes) {
            throw new common.errors.ValidationError('rawState' + ' property is missing from the ledger');
        }
        return ledger.stateHash;
    }
    const state = JSON.parse(ledger.rawState);
    const stateHash = hashes_1.computeStateTreeHash(state);
    if (ledger.stateHash != null && ledger.stateHash !== stateHash) {
        throw new common.errors.ValidationError('stateHash in header' + ' does not match computed hash of state');
    }
    return stateHash;
}
function computeLedgerHeaderHash(ledger, options = {}) {
    const subhashes = {
        transactionHash: computeTransactionHash(ledger, options),
        stateHash: computeStateHash(ledger, options)
    };
    return hashLedgerHeader(Object.assign({}, ledger, subhashes));
}
exports.default = computeLedgerHeaderHash;
//# sourceMappingURL=ledgerhash.js.map