"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowWindowChannel = void 0;
const connect_common_1 = require("@trezor/connect-common");
class WindowWindowChannel extends connect_common_1.AbstractMessageChannel {
    constructor({ windowHere, windowPeer, channel, logger, origin, legacyMode, }) {
        super({
            channel,
            sendFn: (message) => {
                var _a;
                (_a = windowPeer()) === null || _a === void 0 ? void 0 : _a.postMessage(message, origin);
            },
            logger,
            legacyMode,
        });
        this._listener = this.listener.bind(this);
        this._windowHere = windowHere;
        this.connect();
    }
    listener(event) {
        const message = Object.assign(Object.assign({}, event.data), { success: true, origin: event.origin, payload: event.data.payload || {}, channel: event.data.channel || {
                peer: this.channel.here,
                here: this.channel.peer,
            } });
        this.onMessage(message);
    }
    connect() {
        this._windowHere.addEventListener('message', this._listener);
        this.isConnected = true;
    }
    disconnect() {
        if (!this.isConnected)
            return;
        this._windowHere.removeEventListener('message', this._listener);
        this.isConnected = false;
    }
}
exports.WindowWindowChannel = WindowWindowChannel;
//# sourceMappingURL=window-window.js.map