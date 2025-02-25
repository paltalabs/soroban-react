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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLedgerClose = exports.getLedgerVersion = exports.isConnected = exports.disconnect = exports.connect = void 0;
const common = __importStar(require("../common"));
function isConnected() {
    return this.connection.isConnected();
}
exports.isConnected = isConnected;
function getLedgerVersion() {
    return this.connection.getLedgerVersion();
}
exports.getLedgerVersion = getLedgerVersion;
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        return this.connection.connect();
    });
}
exports.connect = connect;
function disconnect() {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.connection.disconnect();
    });
}
exports.disconnect = disconnect;
function formatLedgerClose(ledgerClose) {
    return {
        baseFeeXRP: common.dropsToXrp(ledgerClose.fee_base),
        ledgerHash: ledgerClose.ledger_hash,
        ledgerVersion: ledgerClose.ledger_index,
        ledgerTimestamp: common.rippleTimeToISO8601(ledgerClose.ledger_time),
        reserveBaseXRP: common.dropsToXrp(ledgerClose.reserve_base),
        reserveIncrementXRP: common.dropsToXrp(ledgerClose.reserve_inc),
        transactionCount: ledgerClose.txn_count,
        validatedLedgerVersions: ledgerClose.validated_ledgers
    };
}
exports.formatLedgerClose = formatLedgerClose;
//# sourceMappingURL=server.js.map