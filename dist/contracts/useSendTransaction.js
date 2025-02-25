"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSendTransaction = useSendTransaction;
var react_1 = __importDefault(require("react"));
var transaction_1 = require("./transaction");
/**
 * React hook for retrieving a function that can be used to send a transaction. Upon sending, it will poll sorobanServer.getTransactionStatus, until the transaction succeeds/fails, and return the result.
 * @param defaultTxn The default transaction to use.
 * @param defaultOptions The default options for sending the transaction.
 * @returns A sendTransaction function
 */
function useSendTransaction(defaultTxn, defaultOptions) {
    var _a = react_1.default.useState('idle'), status = _a[0], setState = _a[1];
    // TODO: as the sorobanContext is passed each time sendTransaction is called
    // we don't need anymore a useCallback hook. Convert useSendTransaction to a
    var sendTransaction = react_1.default.useCallback(function (passedTxn, passedOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var sorobanContext, txn, activeNetwork, activeConnector, sorobanServer, _a, timeout, skipAddingFootprint;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (passedOptions === null || passedOptions === void 0 ? void 0 : passedOptions.sorobanContext) {
                            sorobanContext = passedOptions === null || passedOptions === void 0 ? void 0 : passedOptions.sorobanContext;
                        }
                        txn = passedTxn !== null && passedTxn !== void 0 ? passedTxn : defaultTxn;
                        if (!((passedOptions === null || passedOptions === void 0 ? void 0 : passedOptions.secretKey) || (sorobanContext === null || sorobanContext === void 0 ? void 0 : sorobanContext.kit))) {
                            throw new Error('No secret key or active wallet. Provide at least one of those');
                        }
                        if (!txn ||
                            !(sorobanContext === null || sorobanContext === void 0 ? void 0 : sorobanContext.kit) ||
                            !(sorobanContext === null || sorobanContext === void 0 ? void 0 : sorobanContext.activeNetwork)) {
                            throw new Error('No transaction or wallet or chain');
                        }
                        if (!sorobanContext.sorobanServer)
                            throw new Error('Not connected to sorobanServer');
                        activeNetwork = sorobanContext === null || sorobanContext === void 0 ? void 0 : sorobanContext.activeNetwork;
                        activeConnector = sorobanContext === null || sorobanContext === void 0 ? void 0 : sorobanContext.kit;
                        sorobanServer = sorobanContext === null || sorobanContext === void 0 ? void 0 : sorobanContext.sorobanServer;
                        _a = __assign(__assign({ timeout: 60000, skipAddingFootprint: false }, defaultOptions), passedOptions), timeout = _a.timeout, skipAddingFootprint = _a.skipAddingFootprint;
                        setState('loading');
                        return [4 /*yield*/, (0, transaction_1.signAndSendTransaction)({
                                txn: txn,
                                secretKey: passedOptions === null || passedOptions === void 0 ? void 0 : passedOptions.secretKey,
                                skipAddingFootprint: skipAddingFootprint,
                                sorobanContext: sorobanContext,
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }, [defaultTxn]);
    return {
        isIdle: status == 'idle',
        isError: status == 'error',
        isLoading: status == 'loading',
        isSuccess: status == 'success',
        sendTransaction: sendTransaction,
        reset: function () { },
        status: status,
    };
}
