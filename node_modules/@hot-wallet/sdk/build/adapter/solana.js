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
exports.HotWalletAdapter = exports.HotWalletName = void 0;
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
const web3_js_1 = require("@solana/web3.js");
const hot_1 = __importStar(require("../hot"));
exports.HotWalletName = "HOT";
if (hot_1.default.isInjected) {
    localStorage.setItem("walletName", `"HOT"`);
}
class HotWalletAdapter extends wallet_adapter_base_1.BaseMessageSignerWalletAdapter {
    name = exports.HotWalletName;
    url = "https://hot-labs.org";
    icon = "https://storage.herewallet.app/logo.png";
    supportedTransactionVersions = new Set(["legacy", 0]);
    _connecting = false;
    _publicKey = null;
    _readyState = (0, hot_1.getExtension)() ? wallet_adapter_base_1.WalletReadyState.Unsupported : wallet_adapter_base_1.WalletReadyState.Installed;
    get publicKey() {
        return this._publicKey;
    }
    get connecting() {
        return this._connecting;
    }
    get readyState() {
        return this._readyState;
    }
    _getLocalAccount() {
        try {
            const publicKey = localStorage.getItem("hot:solana-account");
            if (publicKey == null)
                return null;
            return new web3_js_1.PublicKey(publicKey);
        }
        catch {
            return null;
        }
    }
    _parseTransaction(base64) {
        const buf = Buffer.from(base64, "base64");
        try {
            return web3_js_1.Transaction.from(buf);
        }
        catch {
            return web3_js_1.VersionedTransaction.deserialize(new Uint8Array(buf));
        }
    }
    async autoConnect() {
        const account = this._getLocalAccount();
        if (account)
            return await this.connect();
        if (hot_1.default.isInjected)
            return await this.connect();
    }
    async connect() {
        try {
            if (this.connected || this.connecting)
                return;
            this._connecting = true;
            const account = this._getLocalAccount();
            if (account && !hot_1.default.isInjected) {
                await (0, hot_1.wait)(100);
                this._publicKey = account;
                this.emit("connect", account);
                this._connecting = false;
                return;
            }
            const { publicKey } = await hot_1.default.request("solana:connect", {});
            if (!publicKey)
                throw new wallet_adapter_base_1.WalletConnectionError();
            this._publicKey = new web3_js_1.PublicKey(publicKey);
            localStorage.setItem("hot:solana-account", this._publicKey.toString());
            this.emit("connect", this._publicKey);
            this._connecting = false;
        }
        catch (error) {
            console.error(error);
            this.emit("error", error);
            this._connecting = false;
            throw error;
        }
    }
    async disconnect() {
        localStorage.removeItem("hot:solana-account");
        this._publicKey = null;
        this.emit("disconnect");
    }
    async sendTransaction(transaction, connection, options = {}) {
        try {
            if (!this._publicKey)
                throw new wallet_adapter_base_1.WalletNotConnectedError();
            try {
                const { signers, ...sendOptions } = options;
                if ((0, wallet_adapter_base_1.isVersionedTransaction)(transaction)) {
                    signers?.length && transaction.sign(signers);
                }
                else {
                    transaction = (await this.prepareTransaction(transaction, connection, sendOptions));
                    signers?.length && transaction.partialSign(...signers);
                }
                sendOptions.preflightCommitment = sendOptions.preflightCommitment || connection.commitment;
                const { signature } = await hot_1.default.request("solana:signAndSendTransaction", {
                    transaction: Buffer.from(transaction.serialize({ requireAllSignatures: false })).toString("base64"),
                    sendOptions,
                });
                return signature;
            }
            catch (error) {
                if (error instanceof wallet_adapter_base_1.WalletError)
                    throw error;
                throw new wallet_adapter_base_1.WalletSendTransactionError(error?.message, error);
            }
        }
        catch (error) {
            this.emit("error", error);
            throw error;
        }
    }
    async signTransaction(transaction) {
        try {
            if (!this._publicKey)
                throw new wallet_adapter_base_1.WalletNotConnectedError();
            try {
                const tx = Buffer.from(transaction.serialize({ requireAllSignatures: false })).toString("base64");
                const result = await hot_1.default.request("solana:signTransactions", { transactions: [tx] });
                return this._parseTransaction(result.transactions[0]);
            }
            catch (error) {
                throw new wallet_adapter_base_1.WalletSignTransactionError(error?.message, error);
            }
        }
        catch (error) {
            this.emit("error", error);
            throw error;
        }
    }
    async signAllTransactions(transactions) {
        try {
            if (!this._publicKey)
                throw new wallet_adapter_base_1.WalletNotConnectedError();
            try {
                const tx = transactions.map((t) => Buffer.from(t.serialize({ requireAllSignatures: false })).toString("base64"));
                const response = await hot_1.default.request("solana:signTransactions", { transactions: tx });
                return response.transactions.map(this._parseTransaction);
            }
            catch (error) {
                throw new wallet_adapter_base_1.WalletSignTransactionError(error?.message, error);
            }
        }
        catch (error) {
            this.emit("error", error);
            throw error;
        }
    }
    async signMessage(message) {
        try {
            if (!this._publicKey)
                throw new wallet_adapter_base_1.WalletNotConnectedError();
            try {
                const { signature } = await hot_1.default.request("solana:signMessage", {
                    message: Buffer.from(message).toString("base64"),
                });
                return new Uint8Array(Buffer.from(signature, "base64"));
            }
            catch (error) {
                throw new wallet_adapter_base_1.WalletSignMessageError(error?.message, error);
            }
        }
        catch (error) {
            this.emit("error", error);
            throw error;
        }
    }
}
exports.HotWalletAdapter = HotWalletAdapter;
//# sourceMappingURL=solana.js.map