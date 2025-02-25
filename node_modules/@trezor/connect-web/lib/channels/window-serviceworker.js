"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowServiceWorkerChannel = void 0;
const connect_common_1 = require("@trezor/connect-common");
class WindowServiceWorkerChannel extends connect_common_1.AbstractMessageChannel {
    constructor({ name, channel, }) {
        super({
            channel,
            sendFn: (message) => {
                if (!this.port)
                    throw new Error('port not assigned');
                this.port.postMessage(message);
            },
        });
        const port = chrome.runtime.connect({ name });
        this.port = port;
        this.connect();
    }
    connect() {
        var _a;
        (_a = this.port) === null || _a === void 0 ? void 0 : _a.onMessage.addListener((message) => {
            if (message.channel.here === this.channel.here)
                return;
            this.onMessage(message);
        });
        this.isConnected = true;
    }
    disconnect() {
        var _a;
        if (!this.isConnected)
            return;
        (_a = this.port) === null || _a === void 0 ? void 0 : _a.disconnect();
        this.isConnected = false;
    }
}
exports.WindowServiceWorkerChannel = WindowServiceWorkerChannel;
//# sourceMappingURL=window-serviceworker.js.map