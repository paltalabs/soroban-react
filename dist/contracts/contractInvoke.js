"use strict";
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
exports.contractInvoke = contractInvoke;
var StellarSdk = __importStar(require("@stellar/stellar-sdk"));
var stellar_sdk_1 = require("@stellar/stellar-sdk");
var contractTransaction_1 = require("./contractTransaction");
var transaction_1 = require("./transaction");
var xdr = StellarSdk.xdr;
// Dummy source account for simulation. The public key for this is all 0-bytes.
var defaultAddress = 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF';
/**
 * Invokes a smart contract method.
 * @param {InvokeArgs} args - Arguments for invoking the smart contract.
 * @returns {Promise<TxResponse | StellarSdk.xdr.ScVal>} - A promise resolving to the transaction response or the result of the simulation.
 * @throws {Error} - If there are errors during the contract invocation process.
 */
function contractInvoke(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var sorobanServer, address, activeNetwork, networkPassphrase, source, error_1, txn, simulated, res;
        var contractAddress = _b.contractAddress, method = _b.method, _c = _b.args, args = _c === void 0 ? [] : _c, _d = _b.signAndSend, signAndSend = _d === void 0 ? false : _d, _e = _b.fee, fee = _e === void 0 ? 100 : _e, skipAddingFootprint = _b.skipAddingFootprint, secretKey = _b.secretKey, sorobanContext = _b.sorobanContext, _f = _b.reconnectAfterTx, reconnectAfterTx = _f === void 0 ? true : _f, _g = _b.timeoutSeconds, timeoutSeconds = _g === void 0 ? 20 : _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    sorobanServer = sorobanContext.sorobanServer, address = sorobanContext.address, activeNetwork = sorobanContext.activeNetwork;
                    if (!activeNetwork) {
                        throw new Error('No active Chain');
                    }
                    if (!sorobanServer) {
                        throw new Error('No connected to a Server..');
                    }
                    networkPassphrase = activeNetwork;
                    source = null;
                    if (!secretKey) return [3 /*break*/, 2];
                    return [4 /*yield*/, sorobanServer.getAccount(StellarSdk.Keypair.fromSecret(secretKey).publicKey())];
                case 1:
                    source = _h.sent();
                    return [3 /*break*/, 5];
                case 2:
                    _h.trys.push([2, 4, , 5]);
                    if (!address)
                        throw new Error('No address');
                    return [4 /*yield*/, sorobanServer.getAccount(address)];
                case 3:
                    source = _h.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _h.sent();
                    source = new StellarSdk.Account(defaultAddress, '0');
                    return [3 /*break*/, 5];
                case 5:
                    txn = (0, contractTransaction_1.contractTransaction)({
                        source: source,
                        networkPassphrase: networkPassphrase,
                        contractAddress: contractAddress,
                        method: method,
                        args: args,
                    });
                    return [4 /*yield*/, (sorobanServer === null || sorobanServer === void 0 ? void 0 : sorobanServer.simulateTransaction(txn))];
                case 6:
                    simulated = _h.sent();
                    if (stellar_sdk_1.rpc.Api.isSimulationError(simulated)) {
                        throw new Error(simulated.error);
                    }
                    else if (!simulated.result) {
                        throw new Error("invalid simulation: no result in ".concat(simulated));
                    }
                    if (!(!signAndSend && simulated)) return [3 /*break*/, 7];
                    return [2 /*return*/, simulated.result.retval];
                case 7: return [4 /*yield*/, (0, transaction_1.signAndSendTransaction)({
                        txn: txn,
                        skipAddingFootprint: skipAddingFootprint,
                        secretKey: secretKey,
                        sorobanContext: sorobanContext,
                        timeoutSeconds: timeoutSeconds,
                    })];
                case 8:
                    res = _h.sent();
                    if (reconnectAfterTx) {
                        sorobanContext.connect();
                    }
                    return [2 /*return*/, res];
            }
        });
    });
}
