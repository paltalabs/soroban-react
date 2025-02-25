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
exports.fromURLToServer = fromURLToServer;
exports.fromURLToHorizonServer = fromURLToHorizonServer;
exports.SorobanReactProvider = SorobanReactProvider;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var types_1 = require("./types");
var StellarSdk = __importStar(require("@stellar/stellar-sdk"));
var _1 = require(".");
var stellar_wallets_kit_1 = require("@creit.tech/stellar-wallets-kit");
var freighter_api_1 = require("@stellar/freighter-api");
/**
 * Converts a Soroban RPC URL to a Soroban RPC Server object.
 * @param {string} sorobanRpcUrl - Soroban RPC URL.
 * @returns {StellarSdk.rpc.Server} - Soroban RPC Server object.
 */
function fromURLToServer(sorobanRpcUrl) {
    var opts = undefined;
    // Allow HTTP only if the URL starts with "http://"
    if (sorobanRpcUrl.startsWith("http://")) {
        opts = { allowHttp: true };
    }
    opts = {
        allowHttp: false, // Use HTTPS (Ankr does not support HTTP)
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ /* request payload */}),
    };
    // Validate and sanitize the RPC URL
    var sanitizedRpcUrl = sorobanRpcUrl;
    try {
        var url = new URL(sorobanRpcUrl);
        sanitizedRpcUrl = url.toString();
    }
    catch (error) {
        console.error("Invalid Soroban RPC URL:", error);
        throw new Error("Invalid Soroban RPC URL provided.");
    }
    // Initialize Soroban RPC Server
    return new StellarSdk.rpc.Server(sanitizedRpcUrl, opts);
}
/**
 * Converts a horizon network URL to a Horizon sorobanServer object.
 * @param {string} networkUrl - Network URL.
 * @returns {StellarSdk.Horizon.Server} - Horizon sorobanServer object.
 */
function fromURLToHorizonServer(networkUrl) {
    return new StellarSdk.Horizon.Server(networkUrl, {
        allowHttp: networkUrl.startsWith('http://'),
    });
}
/**
 * SorobanReactProvider component.
 * Provides context for Soroban React application.
 * @param {SorobanReactProviderProps} props - Props for the component.
 */
function SorobanReactProvider(_a) {
    var _this = this;
    var appName = _a.appName, allowedNetworkDetails = _a.allowedNetworkDetails, _b = _a.activeNetwork, activeNetwork = _b === void 0 ? types_1.WalletNetwork.TESTNET : _b, // Non mandatory fields default to default Context fields value
    modules = _a.modules, _c = _a.deployments, deployments = _c === void 0 ? [] : _c, children = _a.children;
    var kit = new stellar_wallets_kit_1.StellarWalletsKit({
        network: activeNetwork,
        selectedWalletId: stellar_wallets_kit_1.FREIGHTER_ID,
        modules: modules ? modules : (0, stellar_wallets_kit_1.allowAllModules)(),
    });
    var isConnectedRef = (0, react_1.useRef)(false);
    var activeNetworkDetails = allowedNetworkDetails.find(function (allowedNetworkDetails) { return allowedNetworkDetails.network === activeNetwork; });
    if (!activeNetworkDetails) {
        throw new Error("Active network details not found for chain: ".concat(activeNetwork));
    }
    var sorobanServer = fromURLToServer(activeNetworkDetails.sorobanRpcUrl);
    var horizonServer = fromURLToHorizonServer(activeNetworkDetails.horizonRpcUrl);
    var _d = react_1.default.useState({
        appName: appName,
        allowedNetworkDetails: allowedNetworkDetails,
        activeNetwork: activeNetwork,
        deployments: deployments,
        modules: modules,
        sorobanServer: sorobanServer,
        horizonServer: horizonServer,
        connect: function () { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, kit.openModal({
                                onWalletSelected: function (option) { return __awaiter(_this, void 0, void 0, function () {
                                    var selectedModuleId, address, networkPassphrase_1, activeNetworkDetails_1;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                selectedModuleId = option.id;
                                                kit.setWallet(selectedModuleId);
                                                return [4 /*yield*/, kit.getAddress()];
                                            case 1:
                                                address = (_a.sent()).address;
                                                if (!(selectedModuleId === stellar_wallets_kit_1.FREIGHTER_ID)) return [3 /*break*/, 3];
                                                return [4 /*yield*/, kit.getNetwork()];
                                            case 2:
                                                networkPassphrase_1 = (_a.sent()).networkPassphrase;
                                                activeNetworkDetails_1 = allowedNetworkDetails.find(function (allowedNetworkDetails) { return allowedNetworkDetails.network === networkPassphrase_1; });
                                                if (!activeNetworkDetails_1) {
                                                    throw new Error("Your Wallet network is not supported in this app. Please change to one of the supported networks: ".concat(allowedNetworkDetails));
                                                }
                                                else {
                                                    activeNetwork = networkPassphrase_1;
                                                    sorobanServer = fromURLToServer(activeNetworkDetails_1.sorobanRpcUrl);
                                                    horizonServer = fromURLToHorizonServer(activeNetworkDetails_1.horizonRpcUrl);
                                                }
                                                _a.label = 3;
                                            case 3:
                                                isConnectedRef.current = true;
                                                setSorobanContext(function (c) { return (__assign(__assign({}, c), { selectedModuleId: selectedModuleId, activeNetwork: activeNetwork, address: address, sorobanServer: sorobanServer, horizonServer: horizonServer, kit: kit })); });
                                                return [2 /*return*/];
                                        }
                                    });
                                }); },
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log("Failed to connect wallet kit with error: ", e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        disconnect: function () { return __awaiter(_this, void 0, void 0, function () {
            var address, selectedModuleId;
            return __generator(this, function (_a) {
                isConnectedRef.current = false;
                address = undefined;
                selectedModuleId = undefined;
                setSorobanContext(function (c) { return (__assign(__assign({}, c), { selectedModuleId: selectedModuleId, address: address })); });
                return [2 /*return*/];
            });
        }); },
        // todo: set RPC urls
        setActiveNetwork: function (network) {
            var activeNetworkDetails = allowedNetworkDetails.find(function (allowedNetworkDetails) { return allowedNetworkDetails.network === network; });
            if (!activeNetworkDetails) {
                console.error("Please change to one of the supported networks:", allowedNetworkDetails);
                throw new Error("Active network details not found for chain: ".concat(activeNetwork));
            }
            var sorobanServer = fromURLToServer(activeNetworkDetails.sorobanRpcUrl);
            var horizonServer = fromURLToHorizonServer(activeNetworkDetails.horizonRpcUrl);
            setSorobanContext(function (c) { return (__assign(__assign({}, c), { sorobanServer: sorobanServer, horizonServer: horizonServer, activeNetwork: activeNetwork })); });
        },
        setActiveWalletAndConnect: function (wallet) { return __awaiter(_this, void 0, void 0, function () {
            var address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Changing wallet to ', wallet);
                        kit.setWallet(wallet);
                        return [4 /*yield*/, kit.getAddress()];
                    case 1:
                        address = (_a.sent()).address;
                        isConnectedRef.current = true;
                        setSorobanContext(function (c) { return (__assign(__assign({}, c), { address: address })); });
                        return [2 /*return*/];
                }
            });
        }); },
    }), mySorobanContext = _d[0], setSorobanContext = _d[1];
    function checkFreighterDisconnected() {
        return __awaiter(this, void 0, void 0, function () {
            var _a, appIsAllowed, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // only for freighter
                        if (mySorobanContext.selectedModuleId !== stellar_wallets_kit_1.FREIGHTER_ID)
                            return [2 /*return*/, false];
                        return [4 /*yield*/, (0, freighter_api_1.isAllowed)()];
                    case 1:
                        _a = _b.sent(), appIsAllowed = _a.isAllowed, error = _a.error;
                        if (error) {
                            console.error('Error checking if app is allowed:', error);
                            return [2 /*return*/, false];
                        }
                        if (!!appIsAllowed) return [3 /*break*/, 3];
                        console.warn('App is not allowed anymore by Freighter.');
                        return [4 /*yield*/, mySorobanContext.disconnect()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    }
    // Handle changes of address in "realtime"
    react_1.default.useEffect(function () {
        var timeoutId = null;
        // If it turns out that requesting an update from Freighter is too taxing,
        // then this could be increased. Humans perceive 100ms response times as instantaneous
        // (source: https://www.pubnub.com/blog/how-fast-is-realtime-human-perception-and-technology/)
        // but you also have to consider the re-render time of components.
        var freighterCheckIntervalMs = 200;
        function checkForAddressChanges() {
            return __awaiter(this, void 0, void 0, function () {
                var hasNoticedWalletUpdate, networkPassphrase, address_1, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!mySorobanContext.kit || !isConnectedRef.current || !mySorobanContext.selectedModuleId)
                                return [2 /*return*/];
                            return [4 /*yield*/, checkFreighterDisconnected()];
                        case 1:
                            if (_a.sent())
                                return [2 /*return*/];
                            hasNoticedWalletUpdate = false;
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, 6, 7]);
                            return [4 /*yield*/, mySorobanContext.kit.getNetwork()];
                        case 3:
                            networkPassphrase = (_a.sent()).networkPassphrase;
                            return [4 /*yield*/, mySorobanContext.kit.getAddress()];
                        case 4:
                            address_1 = (_a.sent()).address;
                            if (mySorobanContext.address !== address_1) {
                                console.log('SorobanReactProvider: address changed from:', mySorobanContext.address, ' to: ', address_1);
                                hasNoticedWalletUpdate = true;
                                setSorobanContext(function (c) { return (__assign(__assign({}, c), { address: address_1 })); });
                            }
                            return [3 /*break*/, 7];
                        case 5:
                            error_1 = _a.sent();
                            // I would recommend keeping the try/catch so that any exceptions in this async function
                            // will get handled. Otherwise React could complain. I believe that eventually it may cause huge
                            // problems, but that might be a NodeJS specific approach to exceptions not handled in promises.
                            console.error('SorobanReactProvider: error while getting address changes: ', error_1);
                            return [3 /*break*/, 7];
                        case 6:
                            if (!hasNoticedWalletUpdate)
                                timeoutId = setTimeout(checkForAddressChanges, freighterCheckIntervalMs);
                            return [7 /*endfinally*/];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        }
        checkForAddressChanges();
        return function () {
            if (timeoutId != null)
                clearTimeout(timeoutId);
        };
    }, [mySorobanContext]);
    // Handle changes of network in "realtime" if getNetworkDetails exists
    // this works for Freighter. We can also use this function to check
    // for other changes in the wallet, like if the user has disconnected.
    react_1.default.useEffect(function () {
        var timeoutId = null;
        var freighterCheckIntervalMs = 200;
        function checkForNetworkChanges() {
            return __awaiter(this, void 0, void 0, function () {
                var hasNoticedWalletUpdate, networkPassphrase_2, activeNetwork_1, activeNetworkDetails_2, sorobanServer_1, horizonServer_1, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!mySorobanContext.kit ||
                                !isConnectedRef.current ||
                                !mySorobanContext.selectedModuleId ||
                                // network changes are only supported by freighter
                                mySorobanContext.selectedModuleId !== stellar_wallets_kit_1.FREIGHTER_ID)
                                return [2 /*return*/];
                            return [4 /*yield*/, checkFreighterDisconnected()];
                        case 1:
                            if (_a.sent())
                                return [2 /*return*/];
                            return [4 /*yield*/, checkFreighterDisconnected()];
                        case 2:
                            _a.sent();
                            hasNoticedWalletUpdate = false;
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, 6, 7]);
                            return [4 /*yield*/, mySorobanContext.kit.getNetwork()];
                        case 4:
                            networkPassphrase_2 = (_a.sent()).networkPassphrase;
                            activeNetwork_1 = networkPassphrase_2;
                            // We check that we have a valid network details and not a blank one like the one xbull connector would return
                            if (activeNetwork_1 !== mySorobanContext.activeNetwork) {
                                console.log('SorobanReactProvider: network changed from:', mySorobanContext.activeNetwork, ' to: ', networkPassphrase_2);
                                hasNoticedWalletUpdate = true;
                                activeNetworkDetails_2 = allowedNetworkDetails.find(function (allowedNetworkDetails) { return allowedNetworkDetails.network === networkPassphrase_2; });
                                if (!activeNetworkDetails_2) {
                                    console.error("Please change to one of the supported networks:", allowedNetworkDetails);
                                    throw new Error("Active network details not found for chain: ".concat(activeNetwork_1));
                                }
                                sorobanServer_1 = fromURLToServer(activeNetworkDetails_2.sorobanRpcUrl);
                                horizonServer_1 = fromURLToHorizonServer(activeNetworkDetails_2.horizonRpcUrl);
                                setSorobanContext(function (c) { return (__assign(__assign({}, c), { sorobanServer: sorobanServer_1, horizonServer: horizonServer_1, activeNetwork: activeNetwork_1 })); });
                            }
                            return [3 /*break*/, 7];
                        case 5:
                            error_2 = _a.sent();
                            console.error('SorobanReactProvider: error while getting network changes: ', error_2);
                            return [3 /*break*/, 7];
                        case 6:
                            if (!hasNoticedWalletUpdate)
                                timeoutId = setTimeout(checkForNetworkChanges, freighterCheckIntervalMs);
                            return [7 /*endfinally*/];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        }
        checkForNetworkChanges();
        return function () {
            if (timeoutId != null)
                clearTimeout(timeoutId);
        };
    }, [mySorobanContext]);
    return ((0, jsx_runtime_1.jsx)(_1.SorobanContext.Provider, { value: mySorobanContext, children: children }));
}
