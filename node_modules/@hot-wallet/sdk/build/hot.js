"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtension = exports.RequestFailed = exports.wait = void 0;
const uuid4_1 = __importDefault(require("uuid4"));
const utils_1 = require("@near-js/utils");
const proxy_1 = require("./helpers/proxy");
const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};
exports.wait = wait;
class RequestFailed extends Error {
    payload;
    name = "RequestFailed";
    constructor(payload) {
        super();
        this.payload = payload;
    }
}
exports.RequestFailed = RequestFailed;
const getExtension = () => {
    if (typeof window === "undefined")
        return null;
    return window.hotExtension;
};
exports.getExtension = getExtension;
let connector;
if (typeof window !== "undefined") {
    window.addEventListener("message", (e) => {
        if (e.data === "hot-close") {
            connector?.remove();
            connector = undefined;
        }
    });
}
const createIframe = (widget) => {
    connector?.remove();
    connector = document.createElement("div");
    const iframe = document.createElement("iframe");
    connector?.appendChild(iframe);
    iframe.src = widget;
    iframe.allow = "usb";
    iframe.style.border = "none";
    iframe.style.borderRadius = "16px";
    iframe.style.background = "#fff";
    iframe.style.overflow = "hidden";
    iframe.style.background = "#1D1F20";
    iframe.style.border = "1px solid #2C3034";
    iframe.style.width = "375px";
    iframe.style.height = "560px";
    iframe.onclick = (e) => e.stopPropagation();
    connector.style.padding = "16px";
    connector.style.zIndex = "100000000000000";
    connector.style.position = "fixed";
    connector.style.display = "flex";
    connector.style.justifyContent = "center";
    connector.style.alignItems = "center";
    connector.style.top = "0";
    connector.style.left = "0";
    connector.style.width = "100%";
    connector.style.height = "100%";
    connector.style.background = "rgba(0, 0, 0, 0.1)";
    connector.style.backdropFilter = "blur(24px)";
    connector.onclick = () => {
        connector?.remove();
        connector = undefined;
    };
    document.body.appendChild(connector);
    return connector;
};
class HOT {
    walletId = "https://t.me/herewalletbot/app";
    ancestorOrigins = [
        "http://localhost:1234",
        "https://my.herewallet.app",
        "https://tgapp-dev.herewallet.app",
        "https://tgapp.herewallet.app",
        "https://beta.herewallet.app",
    ];
    connection = new Promise((resolve) => {
        if (typeof window === "undefined")
            return resolve(null);
        if (window?.self === window?.top)
            return resolve(null);
        this.injectedRequest("initialized", {})
            .then(resolve)
            .catch(() => resolve(null));
    });
    get isInjected() {
        if (typeof window === "undefined")
            return false;
        if (window.hotExtension != null)
            return window.hotExtension.autoRun;
        return this.ancestorOrigins.includes(window.location.ancestorOrigins?.[0]);
    }
    openInHotBrowserUrl = null;
    toggleOpenInHotBrowser(url) {
        this.openInHotBrowserUrl = url;
    }
    customProvider;
    setupEthProvider(provider) {
        this.customProvider = provider;
    }
    async injectedRequest(method, request) {
        const id = (0, uuid4_1.default)();
        return new Promise((resolve, reject) => {
            const handler = (e) => {
                if (e.data.id !== id)
                    return;
                window?.removeEventListener("message", handler);
                if (e.data.success)
                    return resolve(e.data.payload);
                else
                    return reject(e.data.payload);
            };
            window?.parent.postMessage({ $hot: true, method, request, id }, "*");
            window?.addEventListener("message", handler);
        });
    }
    subscribe(event, cb) {
        if (!window.hotExtension)
            return () => { };
        return window.hotExtension.subscribe(event, cb);
    }
    async request(method, request) {
        if (window.hotExtension != null)
            return window.hotExtension.request(method, request);
        if (this.isInjected)
            return this.injectedRequest(method, request);
        const id = (0, uuid4_1.default)();
        const WebApp = window?.Telegram?.WebApp;
        const requestId = await (0, proxy_1.createRequest)({
            inside: !!this.openInHotBrowserUrl || (method === "ethereum" && this.customProvider == null),
            origin: typeof this.openInHotBrowserUrl === "string" ? this.openInHotBrowserUrl : location.href,
            $hot: true,
            method,
            request,
            id,
        });
        const link = `${this.walletId}?startapp=hotconnect-${(0, utils_1.baseEncode)(requestId)}`;
        if (WebApp)
            WebApp?.openTelegramLink(link);
        else {
            const origin = `https://hot-labs.org/hot-widget/index.html`;
            createIframe(`${origin}?hotconnect-${(0, utils_1.baseEncode)(requestId)}`);
        }
        const poolResponse = async () => {
            await (0, exports.wait)(3000);
            const data = await (0, proxy_1.getResponse)(requestId).catch(() => null);
            if (data == null)
                return await poolResponse();
            if (data.success)
                return data.payload;
            throw new RequestFailed(data.payload);
        };
        const result = await poolResponse();
        connector?.remove();
        return result;
    }
}
exports.default = new HOT();
//# sourceMappingURL=hot.js.map