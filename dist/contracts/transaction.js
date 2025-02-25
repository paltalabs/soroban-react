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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAndSendTransaction = signAndSendTransaction;
exports.sendTx = sendTx;
var StellarSdk = __importStar(require("@stellar/stellar-sdk"));
var stellar_sdk_1 = require("@stellar/stellar-sdk");
/**
 * Signs and sends a transaction to the Stellar network.
 * @param {Object} options - The options object.
 * @param {Transaction} options.txn - The transaction to sign and send.
 * @param {string} [options.secretKey] - The secret key for signing the transaction. Required if no active connector is provided in the Soroban context.
 * @param {boolean} [options.skipAddingFootprint=false] - Flag indicating whether to skip adding footprint to the transaction. Defaults to false.
 * @param {SorobanContextType} options.sorobanContext - The Soroban context containing sorobanServer and active connector information.
 * @returns {Promise<TxResponse>} A promise that resolves with the transaction response.
 * @throws {Error} Throws an error if no secret key or active connector is provided, or if there is no sorobanServer or network passphrase.
 */
function signAndSendTransaction(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var networkPassphrase, sorobanServer, signedTxXdr, keypair, signResult, transactionToSubmit, tx, secondsToWait, raw;
        var _c;
        var txn = _b.txn, secretKey = _b.secretKey, _d = _b.skipAddingFootprint, skipAddingFootprint = _d === void 0 ? false : _d, sorobanContext = _b.sorobanContext, _e = _b.timeoutSeconds, timeoutSeconds = _e === void 0 ? 20 : _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    networkPassphrase = sorobanContext.activeNetwork;
                    sorobanServer = sorobanContext.sorobanServer;
                    if (!secretKey && !sorobanContext.kit)
                        throw Error('signAndSend: no secretKey neither address');
                    if (!sorobanServer)
                        throw Error('signAndSend: no sorobanServer');
                    if (!networkPassphrase)
                        throw Error('signAndSend: no networkPassphrase');
                    if (!!skipAddingFootprint) return [3 /*break*/, 2];
                    return [4 /*yield*/, sorobanServer.prepareTransaction(txn)];
                case 1:
                    txn = _f.sent();
                    if (!txn) {
                        throw new Error('No transaction after adding footprint');
                    }
                    _f.label = 2;
                case 2:
                    signedTxXdr = '';
                    if (!secretKey) return [3 /*break*/, 3];
                    keypair = StellarSdk.Keypair.fromSecret(secretKey);
                    txn.sign(keypair);
                    signedTxXdr = txn.toXDR();
                    return [3 /*break*/, 6];
                case 3:
                    if (!sorobanContext.address) return [3 /*break*/, 5];
                    // User has not set a secretKey, txn will be signed using the Connector (wallet) provided in the sorobanContext
                    console.log('TRANSACTION SIGN AND SEND OPTS', {
                        networkPassphrase: networkPassphrase,
                        accountToSign: sorobanContext.address,
                    });
                    return [4 /*yield*/, ((_c = sorobanContext.kit) === null || _c === void 0 ? void 0 : _c.signTransaction(txn.toXDR(), {
                            networkPassphrase: networkPassphrase,
                            address: sorobanContext.address,
                        }))];
                case 4:
                    signResult = _f.sent();
                    if (!signResult || !signResult.signedTxXdr) {
                        throw new Error('Failed to sign transaction');
                    }
                    signedTxXdr = signResult.signedTxXdr;
                    console.log('Wallet has signed: ', signedTxXdr);
                    return [3 /*break*/, 6];
                case 5: throw new Error('signAndSendTransaction: no secretKey, neither active kit');
                case 6:
                    transactionToSubmit = StellarSdk.TransactionBuilder.fromXDR(signedTxXdr, networkPassphrase);
                    tx = transactionToSubmit;
                    secondsToWait = timeoutSeconds;
                    return [4 /*yield*/, sendTx({ tx: tx, secondsToWait: secondsToWait, sorobanServer: sorobanServer })];
                case 7:
                    raw = _f.sent();
                    return [2 /*return*/, raw];
            }
        });
    });
}
function sendTx(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var sendTransactionResponse, getTransactionResponse, waitUntil, waitTime, exponentialFactor, error_1;
        var tx = _b.tx, secondsToWait = _b.secondsToWait, sorobanServer = _b.sorobanServer;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, sorobanServer.sendTransaction(tx)];
                case 1:
                    sendTransactionResponse = _c.sent();
                    return [4 /*yield*/, sorobanServer.getTransaction(sendTransactionResponse.hash)];
                case 2:
                    getTransactionResponse = _c.sent();
                    waitUntil = new Date(Date.now() + secondsToWait * 1000).valueOf();
                    waitTime = 1000;
                    exponentialFactor = 1.5;
                    _c.label = 3;
                case 3:
                    if (!(Date.now() < waitUntil &&
                        getTransactionResponse.status === 'NOT_FOUND')) return [3 /*break*/, 9];
                    // Wait a beat
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, waitTime); })
                        /// Exponential backoff
                    ];
                case 4:
                    // Wait a beat
                    _c.sent();
                    /// Exponential backoff
                    waitTime = waitTime * exponentialFactor;
                    _c.label = 5;
                case 5:
                    _c.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, sorobanServer.getTransaction(sendTransactionResponse.hash)];
                case 6:
                    getTransactionResponse = _c.sent();
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _c.sent();
                    console.log('Failed to get transaction, trying again until timeout...');
                    console.error(error_1);
                    return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 3];
                case 9:
                    console.log('Transaction result is ', getTransactionResponse);
                    if (getTransactionResponse.status ===
                        stellar_sdk_1.rpc.Api.GetTransactionStatus.NOT_FOUND) {
                        console.error("Waited ".concat(secondsToWait, " seconds for transaction to complete, but it did not. ") +
                            "Returning anyway. Check the transaction status manually. " +
                            "Info: ".concat(JSON.stringify(sendTransactionResponse, null, 2)));
                    }
                    return [2 /*return*/, __assign(__assign({}, getTransactionResponse), { txHash: sendTransactionResponse.hash })];
            }
        });
    });
}
