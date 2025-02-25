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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotProvider = void 0;
const hot_1 = __importStar(require("../hot"));
const logo_1 = require("../logo");
const makeProvider = () => {
    const hotProvider = {
        on(event, cb) {
            const set = this._events.get(event);
            if (!set)
                this._events.set(event, new Set([cb]));
            else
                set.add(cb);
        },
        removeListener(event, cb) {
            const set = this._events.get(event);
            set?.delete(cb);
        },
        _events: new Map(),
        isMetaMask: hot_1.default.isInjected,
        isHotWallet: true,
        isConnected: () => hot_1.default.isInjected || hotProvider.address != null,
        get account() {
            return { address: this.address, chain: this.chainId };
        },
        get address() {
            return localStorage.getItem("hot-wallet-evm-account") || null;
        },
        set address(address) {
            if (address == null) {
                localStorage.removeItem("hot-wallet-evm-account");
                hotProvider._events.get("accountsChanged")?.forEach((cb) => cb([]));
                hotProvider._events.get("disconnect")?.forEach((cb) => cb());
                return;
            }
            if (this.address == null) {
                hotProvider._events.get("connect")?.forEach((cb) => cb({ chainId: `0x${this.chainId.toString(16)}` }));
            }
            localStorage.setItem("hot-wallet-evm-account", address);
            hotProvider._events.get("accountsChanged")?.forEach((cb) => cb([address]));
        },
        set chainId(chain) {
            const chainId = typeof chain === "string" ? parseInt(chain, 16) : chain;
            localStorage.setItem("hot-wallet-evm-chainId", chainId.toString());
            hotProvider._events.get("chainChanged")?.forEach((cb) => cb(`0x${chainId.toString(16)}`));
        },
        get chainId() {
            return parseInt(localStorage.getItem("hot-wallet-evm-chainId") || "1");
        },
        request: async (data) => {
            if (hot_1.default.isInjected)
                return hot_1.default.request("ethereum", data);
            switch (data.method) {
                case "wallet_revokePermissions":
                    hotProvider.address = null;
                    return null;
                case "wallet_requestPermissions":
                    throw "Unsupported method: wallet_requestPermissions";
                case "eth_accounts":
                    return hotProvider.address ? [hotProvider.address] : [];
                case "eth_requestAccounts": {
                    const acc = await hot_1.default.request("ethereum", { ...data, account: hotProvider.account });
                    hotProvider.address = acc[0];
                    return acc;
                }
                case "eth_chainId":
                    return "0x" + hotProvider.chainId.toString(16);
                case "wallet_switchEthereumChain": {
                    hotProvider.chainId = parseInt(data.params[0]?.chainId || data.params[0], 16);
                    return null;
                }
                case "personal_sign":
                case "eth_sendTransaction":
                case "eth_signTransaction":
                case "eth_signTypedData":
                case "eth_signTypedData_v3":
                case "eth_signTypedData_v4":
                    return hot_1.default.request("ethereum", { ...data, account: hotProvider.account });
                default:
                    if (!hot_1.default.customProvider)
                        throw `Method not implemented ${data} for chain ${hotProvider.chainId}`;
                    return hot_1.default.customProvider?.(data, hotProvider.chainId, hotProvider.address);
            }
        },
    };
    try {
        window.ethereum = undefined;
        window.ethereum = hotProvider;
    }
    catch { }
    async function announceProvider() {
        if (typeof window === "undefined")
            return;
        if (hot_1.default.isInjected) {
            window.ethereum = undefined;
            window.ethereum = hotProvider;
        }
        window?.dispatchEvent(new CustomEvent("eip6963:announceProvider", {
            detail: Object.freeze({
                provider: hotProvider,
                info: {
                    icon: logo_1.logo,
                    rdns: "org.hot-labs",
                    uuid: "cc8e962c-1f42-425c-8845-e8bd2e136fff",
                    name: "HOT Wallet",
                },
            }),
        }));
    }
    try {
        if (typeof window !== "undefined") {
            window?.addEventListener("eip6963:requestProvider", () => announceProvider());
            announceProvider();
        }
    }
    catch { }
    return hotProvider;
};
const hotProvider = (0, hot_1.getExtension)()?.evm || makeProvider();
exports.hotProvider = hotProvider;
//# sourceMappingURL=evm.js.map