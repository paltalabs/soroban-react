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
exports.setTrustline = setTrustline;
var StellarSdk = __importStar(require("@stellar/stellar-sdk"));
/**
 * Sets a trustline for a token on the Stellar network.
 * @param {Object} options - The options object.
 * @param {string} options.tokenSymbol - The symbol of the token.
 * @param {string} options.tokenAdmin - The public key of the token's administrator.
 * @param {SorobanContextType} options.sorobanContext - The Soroban context.
 * @returns {Promise<StellarSdk.TransactionResponse>} A promise that resolves with the transaction response.
 * @throws {Error} Throws an error if there is no active chain, no sorobanServer connected, or if network passphrase is missing.
 */
function setTrustline(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var activeNetwork, address, horizonServer, networkPassphrase, source, operation, txn, signResult, signedTxXdr, transactionToSubmit, response, error_1;
        var _c, _d;
        var tokenSymbol = _b.tokenSymbol, tokenAdmin = _b.tokenAdmin, sorobanContext = _b.sorobanContext;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    activeNetwork = sorobanContext.activeNetwork, address = sorobanContext.address, horizonServer = sorobanContext.horizonServer;
                    networkPassphrase = (_c = sorobanContext.activeNetwork) !== null && _c !== void 0 ? _c : '';
                    if (!activeNetwork) {
                        throw new Error('No active Chain');
                    }
                    if (!horizonServer) {
                        throw new Error('No connected to a Server');
                    }
                    // if (signAndSend && !secretKey && !sorobanContext.activeConnector) {
                    //   throw new Error(
                    //     'contractInvoke: You are trying to sign a txn without providing a source, secretKey or active connector'
                    //   )
                    // }
                    if (!networkPassphrase)
                        throw new Error('No networkPassphrase');
                    return [4 /*yield*/, horizonServer.loadAccount(address)];
                case 1:
                    source = _e.sent();
                    operation = StellarSdk.Operation.changeTrust({
                        source: source.accountId(),
                        asset: new StellarSdk.Asset(tokenSymbol, tokenAdmin),
                    });
                    txn = new StellarSdk.TransactionBuilder(source, {
                        fee: '100',
                        timebounds: { minTime: 0, maxTime: 0 },
                        networkPassphrase: networkPassphrase,
                    })
                        .addOperation(operation)
                        .setTimeout(StellarSdk.TimeoutInfinite)
                        .build();
                    return [4 /*yield*/, ((_d = sorobanContext.kit) === null || _d === void 0 ? void 0 : _d.signTransaction(txn.toXDR(), {
                            networkPassphrase: networkPassphrase,
                        }))];
                case 2:
                    signResult = _e.sent();
                    if (!signResult || !signResult.signedTxXdr) {
                        throw new Error('Failed to sign transaction');
                    }
                    signedTxXdr = signResult.signedTxXdr;
                    transactionToSubmit = StellarSdk.TransactionBuilder.fromXDR(signedTxXdr, networkPassphrase);
                    _e.label = 3;
                case 3:
                    _e.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, horizonServer.submitTransaction(transactionToSubmit)];
                case 4:
                    response = _e.sent();
                    return [2 /*return*/, response];
                case 5:
                    error_1 = _e.sent();
                    console.log(error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
