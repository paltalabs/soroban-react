"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractMessageChannel = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("@trezor/utils");
class AbstractMessageChannel extends utils_1.TypedEmitter {
    constructor({ sendFn, channel, logger, lazyHandshake = false, legacyMode = false, }) {
        super();
        this.messagePromises = {};
        this.messagesQueue = [];
        this.messageID = 0;
        this.isConnected = false;
        this.handshakeMaxRetries = 5;
        this.handshakeRetryInterval = 2000;
        this.channel = channel;
        this.sendFn = sendFn;
        this.lazyHandshake = lazyHandshake;
        this.legacyMode = legacyMode;
        this.logger = logger;
    }
    init() {
        if (!this.handshakeFinished) {
            this.handshakeFinished = (0, utils_1.createDeferred)();
            if (this.legacyMode) {
                setTimeout(() => {
                    var _a;
                    (_a = this.handshakeFinished) === null || _a === void 0 ? void 0 : _a.resolve();
                }, 500);
            }
            if (!this.lazyHandshake) {
                this.handshakeWithPeer();
            }
        }
        return this.handshakeFinished.promise;
    }
    handshakeWithPeer() {
        var _a;
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log(this.channel.here, 'handshake');
        return (0, utils_1.scheduleAction)(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            this.postMessage({
                type: 'channel-handshake-request',
                data: { success: true, payload: undefined },
            }, { usePromise: false, useQueue: false });
            yield ((_a = this.handshakeFinished) === null || _a === void 0 ? void 0 : _a.promise);
        }), {
            attempts: this.handshakeMaxRetries,
            timeout: this.handshakeRetryInterval,
        })
            .then(() => {
            var _a;
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log(this.channel.here, 'handshake confirmed');
            this.messagesQueue.forEach(message => {
                message.channel = this.channel;
                this.sendFn(message);
            });
            this.messagesQueue = [];
        })
            .catch(() => {
            var _a;
            (_a = this.handshakeFinished) === null || _a === void 0 ? void 0 : _a.reject(new Error('handshake failed'));
            this.handshakeFinished = undefined;
        });
    }
    onMessage(_message) {
        var _a, _b;
        let message = _message;
        if (this.legacyMode &&
            message.type === undefined &&
            'data' in message &&
            typeof message.data === 'object' &&
            message.data !== null &&
            'type' in message.data &&
            typeof message.data.type === 'string') {
            message = message.data;
        }
        const { channel, id, type } = message, data = tslib_1.__rest(message, ["channel", "id", "type"]);
        if (!this.legacyMode) {
            if (!(channel === null || channel === void 0 ? void 0 : channel.peer) || channel.peer !== this.channel.here) {
                return;
            }
            if (!(channel === null || channel === void 0 ? void 0 : channel.here) || this.channel.peer !== channel.here) {
                return;
            }
        }
        if (type === 'channel-handshake-request') {
            this.postMessage({
                type: 'channel-handshake-confirm',
                data: { success: true, payload: undefined },
            }, { usePromise: false, useQueue: false });
            if (this.lazyHandshake) {
                this.handshakeWithPeer();
            }
            return;
        }
        if (type === 'channel-handshake-confirm') {
            (_a = this.handshakeFinished) === null || _a === void 0 ? void 0 : _a.resolve(undefined);
            return;
        }
        if (this.messagePromises[id]) {
            this.messagePromises[id].resolve(Object.assign({ id }, data));
            delete this.messagePromises[id];
        }
        const messagePromisesLength = Object.keys(this.messagePromises).length;
        if (messagePromisesLength > 5) {
            (_b = this.logger) === null || _b === void 0 ? void 0 : _b.warn(`too many message promises (${messagePromisesLength}). this feels unexpected!`);
        }
        this.emit('message', message);
    }
    postMessage(message, { usePromise = true, useQueue = true } = {}) {
        message.channel = this.channel;
        if (!usePromise) {
            try {
                this.sendFn(message);
            }
            catch (_a) {
                if (useQueue) {
                    this.messagesQueue.push(message);
                }
            }
            return;
        }
        this.messageID++;
        message.id = this.messageID;
        this.messagePromises[message.id] = (0, utils_1.createDeferred)();
        try {
            this.sendFn(message);
        }
        catch (_b) {
            if (useQueue) {
                this.messagesQueue.push(message);
            }
        }
        return this.messagePromises[message.id].promise;
    }
    resolveMessagePromises(resolvePayload) {
        Object.keys(this.messagePromises).forEach(id => this.messagePromises[id].resolve({
            id,
            payload: resolvePayload,
        }));
    }
    clear() {
        this.handshakeFinished = undefined;
    }
}
exports.AbstractMessageChannel = AbstractMessageChannel;
//# sourceMappingURL=abstract.js.map