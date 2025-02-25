"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupHotWallet = setupHotWallet;
const nep0314_1 = require("../helpers/nep0314");
const __1 = require("..");
function setupHotWallet() {
    return async () => {
        return {
            id: "hot-wallet",
            type: "injected",
            metadata: {
                name: "HOT Wallet",
                description: "Multichain wallet under HOT Protocol",
                downloadUrl: "https://www.hotdao.ai/wallet",
                iconUrl: "https://storage.herewallet.app/logo.png",
                topLevelInjected: __1.HOT.isInjected,
                useUrlAccountImport: false,
                deprecated: false,
                available: true,
            },
            init: async (config) => {
                __1.HOT.subscribe("near:accountsChanged", (e) => config.emitter.emit("accountsChanged", e));
                __1.HOT.subscribe("near:signedOut", (e) => config.emitter.emit("signedOut", e));
                __1.HOT.subscribe("near:signedIn", (e) => config.emitter.emit("signedIn", e));
                return {
                    async getAccounts() {
                        try {
                            if (__1.HOT.isInjected)
                                return [await __1.HOT.request("near:signIn", {})];
                            return JSON.parse(localStorage.getItem("hot:near-account") || "");
                        }
                        catch {
                            return [];
                        }
                    },
                    async signIn(data) {
                        const result = await __1.HOT.request("near:signIn", {});
                        const accounts = [{ accountId: result.accountId, publicKey: result.publicKey }];
                        localStorage.setItem("hot:near-account", JSON.stringify(accounts));
                        config.emitter.emit("signedIn", {
                            contractId: data.contractId,
                            methodNames: data.methodNames ?? [],
                            accounts,
                        });
                        return accounts;
                    },
                    async signOut() {
                        if (__1.HOT.isInjected)
                            __1.HOT.request("near:signOut", {});
                        config.emitter.emit("signedOut", null);
                        localStorage.setItem("hot:near-account", "[]");
                    },
                    async signMessage(params) {
                        const request = {
                            message: params.message,
                            nonce: Array.from(new Uint8Array(params.nonce)),
                            recipient: params.recipient,
                        };
                        const result = await __1.HOT.request("near:signMessage", request);
                        if (!(0, nep0314_1.verifySignature)(request, result))
                            throw "Signature invalid";
                        return result;
                    },
                    async signAndSendTransaction(params) {
                        const receiverId = params.receiverId || config.store.getState().contract?.contractId || "";
                        const { transactions } = await __1.HOT.request("near:signAndSendTransactions", {
                            transactions: [{ actions: params.actions, receiverId, signerId: params.signerId }],
                        });
                        return transactions[0];
                    },
                    async signAndSendTransactions(params) {
                        const { transactions } = await __1.HOT.request("near:signAndSendTransactions", params);
                        return transactions;
                    },
                    async verifyOwner() {
                        throw Error("HOT:verifyOwner is deprecated, use signMessage method with implementation NEP0413 Standard");
                    },
                };
            },
        };
    };
}
//# sourceMappingURL=near.js.map