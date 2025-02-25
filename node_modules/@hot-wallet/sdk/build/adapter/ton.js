"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hot_1 = __importDefault(require("../hot"));
if (hot_1.default.isInjected && typeof window !== "undefined") {
    // @ts-ignore
    window.hotWallet = {
        tonconnect: {
            deviceInfo: {
                appName: "hot",
                appVersion: "1",
                maxProtocolVersion: 2,
                platform: "ios",
                features: ["SendTransaction", { name: "SendTransaction", maxMessages: 4 }],
            },
            walletInfo: {
                name: "hotWallet",
                image: "https://storage.herewallet.app/logo.png",
                about_url: "https://hot-labs.org",
            },
            protocolVersion: 2,
            isWalletBrowser: true,
            connect: (_, request) => {
                return hot_1.default.request("ton:connect", request);
            },
            restoreConnection: () => {
                return hot_1.default.request("ton:restoreConnection", {});
            },
            disconnect: () => {
                return hot_1.default.request("ton:disconnect", {});
            },
            send: async (request) => {
                return hot_1.default.request("ton:send", request);
            },
            listen: () => {
                return function () { };
            },
        },
    };
}
//# sourceMappingURL=ton.js.map