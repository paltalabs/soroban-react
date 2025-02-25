"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOTWALLET_ID = void 0;
const __1 = require("..");
exports.HOTWALLET_ID = "hot-wallet";
class HotWalletModule {
    moduleType;
    productId;
    productName;
    productUrl;
    productIcon;
    constructor() {
        this.moduleType = "HOT_WALLET";
        this.productId = exports.HOTWALLET_ID;
        this.productName = "HOT Wallet";
        this.productUrl = "https://hot-labs.org/wallet";
        this.productIcon = "https://storage.herewallet.app/logo.png";
    }
    isAvailable() {
        return Promise.resolve(true);
    }
    async getAddress() {
        return await __1.HOT.request("stellar:getAddress", {});
    }
    async signTransaction(xdr, opts) {
        return await __1.HOT.request("stellar:signTransaction", { xdr, accountToSign: opts?.address });
    }
    async signAuthEntry(authEntry, opts) {
        return await __1.HOT.request("stellar:signAuthEntry", { authEntry, accountToSign: opts?.address });
    }
    async signMessage(message, opts) {
        return await __1.HOT.request("stellar:signMessage", { message, accountToSign: opts?.address });
    }
    async getNetwork() {
        return { network: "mainnet", networkPassphrase: "Public Global Stellar Network ; September 2015" };
    }
}
exports.default = HotWalletModule;
//# sourceMappingURL=stellar.js.map