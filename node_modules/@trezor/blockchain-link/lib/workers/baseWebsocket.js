"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseWebsocket = void 0;
const tslib_1 = require("tslib");
const ws_1 = tslib_1.__importDefault(require("ws"));
const utils_1 = require("@trezor/utils");
const errors_1 = require("@trezor/blockchain-link-types/lib/constants/errors");
const DEFAULT_TIMEOUT = 20 * 1000;
const DEFAULT_PING_TIMEOUT = 50 * 1000;
class BaseWebsocket extends utils_1.TypedEmitter {
    constructor(options) {
        super();
        this.subscriptions = [];
        this.emitter = this;
        this.options = options;
        this.messages = (0, utils_1.createDeferredManager)({
            timeout: this.options.timeout || DEFAULT_TIMEOUT,
            onTimeout: this.onTimeout.bind(this),
        });
    }
    setPingTimeout() {
        if (this.pingTimeout) {
            clearTimeout(this.pingTimeout);
        }
        this.pingTimeout = setTimeout(this.onPing.bind(this), this.options.pingTimeout || DEFAULT_PING_TIMEOUT);
    }
    onTimeout() {
        const { ws } = this;
        if (!ws)
            return;
        this.messages.rejectAll(new errors_1.CustomError('websocket_timeout'));
        ws.close();
    }
    onPing() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.ws && this.isConnected()) {
                try {
                    if (this.subscriptions.length > 0 || this.options.keepAlive) {
                        yield this.ping();
                    }
                    else {
                        this.ws.close();
                    }
                }
                catch (_a) {
                }
            }
        });
    }
    onError() {
        this.onClose();
    }
    sendMessage(message) {
        var _a, _b;
        const { ws } = this;
        if (!ws)
            throw new errors_1.CustomError('websocket_not_initialized');
        const { promiseId, promise } = this.messages.create();
        const req = Object.assign({ id: promiseId.toString() }, message);
        this.setPingTimeout();
        (_b = (_a = this.options).onSending) === null || _b === void 0 ? void 0 : _b.call(_a, message);
        ws.send(JSON.stringify(req));
        return promise;
    }
    onMessage(message) {
        try {
            const resp = JSON.parse(message);
            const { id, data } = resp;
            const messageSettled = data.error
                ? this.messages.reject(Number(id), new errors_1.CustomError('websocket_error_message', data.error.message))
                : this.messages.resolve(Number(id), data);
            if (!messageSettled) {
                const subs = this.subscriptions.find(s => s.id === id);
                if (subs) {
                    subs.callback(data);
                }
            }
        }
        catch (_a) {
        }
        this.setPingTimeout();
    }
    addSubscription(type, callback) {
        const id = this.messages.nextId().toString();
        this.subscriptions.push({ id, type, callback });
    }
    removeSubscription(type) {
        const index = this.subscriptions.findIndex(s => s.type === type);
        if (index >= 0) {
            this.subscriptions.splice(index, 1);
        }
        return index;
    }
    connect() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            if (this.connectPromise) {
                return this.connectPromise;
            }
            if (((_a = this.ws) === null || _a === void 0 ? void 0 : _a.readyState) === ws_1.default.CLOSING) {
                yield new Promise(resolve => this.emitter.once('disconnected', resolve));
            }
            const dfd = (0, utils_1.createDeferred)(-1);
            this.connectPromise = dfd.promise;
            const ws = this.createWebsocket();
            const connectionTimeout = setTimeout(() => {
                ws.emit('error', new errors_1.CustomError('websocket_timeout'));
                try {
                    ws.once('error', () => { });
                    ws.close();
                }
                catch (_a) {
                }
            }, this.options.connectionTimeout || this.options.timeout || DEFAULT_TIMEOUT);
            ws.once('error', error => {
                clearTimeout(connectionTimeout);
                this.onClose();
                dfd.reject(new errors_1.CustomError('websocket_runtime_error', error.message));
            });
            ws.on('open', () => {
                clearTimeout(connectionTimeout);
                this.init();
                dfd.resolve();
            });
            this.ws = ws;
            return dfd.promise.finally(() => {
                this.connectPromise = undefined;
            });
        });
    }
    init() {
        const { ws } = this;
        if (!ws || !this.isConnected()) {
            throw Error('Websocket init cannot be called');
        }
        ws.removeAllListeners();
        ws.on('error', this.onError.bind(this));
        ws.on('message', this.onMessage.bind(this));
        ws.on('close', () => {
            this.onClose();
        });
    }
    disconnect() {
        var _a;
        this.emitter.emit('disconnected');
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.close();
    }
    isConnected() {
        var _a;
        return ((_a = this.ws) === null || _a === void 0 ? void 0 : _a.readyState) === ws_1.default.OPEN;
    }
    onClose() {
        var _a;
        if (this.pingTimeout) {
            clearTimeout(this.pingTimeout);
        }
        this.disconnect();
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.removeAllListeners();
        this.messages.rejectAll(new errors_1.CustomError('websocket_runtime_error', 'Websocket closed unexpectedly'));
    }
    dispose() {
        this.removeAllListeners();
        this.onClose();
    }
}
exports.BaseWebsocket = BaseWebsocket;
//# sourceMappingURL=baseWebsocket.js.map