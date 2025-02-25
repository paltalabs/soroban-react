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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContractValue = useContractValue;
var react_1 = __importDefault(require("react"));
var stellar_sdk_1 = require("@stellar/stellar-sdk");
var StellarSdk = __importStar(require("@stellar/stellar-sdk"));
var contractTransaction_1 = require("./contractTransaction");
var defaultAddress_1 = require("./defaultAddress");
var xdr = StellarSdk.xdr;
// useContractValue is a hook that fetches the value of a contract method. It
// might be better named `useSimulateTransaction`, but not sure which is more clear...
// TODO: Allow user to specify the wallet of the submitter, fees, etc... Maybe
// a separate (lower-level) hook for `useSimulateTransaction` would be cleaner?
/**
 * A React hook that fetches the value of a contract method.
 * @param {useContractValueProps} options - The options object.
 * @returns {ContractValueType} An object containing the result, loading state, or error.
 */
function useContractValue(_a) {
    var _this = this;
    var contractAddress = _a.contractAddress, method = _a.method, args = _a.args, source = _a.source, sorobanContext = _a.sorobanContext;
    var activeNetwork = sorobanContext.activeNetwork, address = sorobanContext.address, sorobanServer = sorobanContext.sorobanServer;
    var _b = react_1.default.useState({ loading: true }), value = _b[0], setValue = _b[1];
    var _c = react_1.default.useState(args ? args.map(function (p) { return p.toXDR().toString('base64'); }) : undefined), xdrParams = _c[0], setXdrParams = _c[1];
    react_1.default.useEffect(function () {
        source = source !== null && source !== void 0 ? source : new StellarSdk.Account(address !== null && address !== void 0 ? address : defaultAddress_1.defaultAddress, '0');
        if (!activeNetwork) {
            setValue({ error: 'No active chain' });
            return;
        }
        if (!sorobanServer) {
            setValue({ error: 'Not connected to sorobanServer' });
            return;
        }
        ;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setValue({ loading: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetchContractValue({
                                sorobanServer: sorobanServer,
                                networkPassphrase: activeNetwork,
                                contractAddress: contractAddress,
                                method: method,
                                args: args,
                                source: source,
                            })];
                    case 2:
                        result = _a.sent();
                        setValue({ result: result });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        if (typeof error_1 == 'string') {
                            setValue({ error: error_1 });
                            return [2 /*return*/];
                        }
                        if ('message' in error_1) {
                            setValue({ error: error_1.message });
                            return [2 /*return*/];
                        }
                        setValue({ error: error_1 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); })();
        // Have this re-fetch if the contractId/method/args change. Total hack with
        // xdr-base64 to enforce real equality instead of object equality
        // shenanigans.
    }, [contractAddress, method, xdrParams, activeNetwork, sorobanServer, args]);
    return value;
}
/**
 * Fetches the value of a contract method by simulating a transaction on the Soroban network.
 * @param {fetchContractValueProps} options - The options object containing sorobanServer, network passphrase, contract address, method, arguments, and source account.
 * @returns {Promise<StellarSdk.xdr.ScVal>} A promise that resolves with the value of the contract method.
 * @throws {Error} If the simulation encounters an error or if no result is returned.
 */
function fetchContractValue(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var txn, a, simulated;
        var sorobanServer = _b.sorobanServer, networkPassphrase = _b.networkPassphrase, contractAddress = _b.contractAddress, method = _b.method, args = _b.args, source = _b.source;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    txn = (0, contractTransaction_1.contractTransaction)({
                        source: source,
                        networkPassphrase: networkPassphrase,
                        contractAddress: contractAddress,
                        method: method,
                        args: args,
                    });
                    a = Math.random();
                    return [4 /*yield*/, (sorobanServer === null || sorobanServer === void 0 ? void 0 : sorobanServer.simulateTransaction(txn))];
                case 1:
                    simulated = _c.sent();
                    if (stellar_sdk_1.rpc.Api.isSimulationError(simulated)) {
                        throw new Error(simulated.error);
                    }
                    else if (!simulated.result) {
                        throw new Error("invalid simulation: no result in ".concat(simulated));
                    }
                    return [2 /*return*/, simulated.result.retval];
            }
        });
    });
}
