"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRpcClient = void 0;
const tslib_1 = require("tslib");
const events_1 = require("events");
const utils_1 = require("@trezor/utils");
class JsonRpcClient {
    constructor() {
        this.id = 0;
        this.buffer = '';
        this.emitter = new events_1.EventEmitter();
        this.callbacks = {};
        this.debug = false;
    }
    connect(socket, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.socket)
                return;
            this.debug = (options === null || options === void 0 ? void 0 : options.debug) || false;
            try {
                this.socket = socket;
                yield this.socket.connect(this);
            }
            catch (err) {
                this.socket = undefined;
                throw new Error(`JSON RPC connection failed: [${err}]`);
            }
        });
    }
    isConnected() {
        return !!this.socket;
    }
    close() {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.close();
        this.socket = undefined;
        this.onClose();
    }
    request(method, ...params) {
        return new Promise((resolve, reject) => {
            const id = ++this.id;
            const request = JSON.stringify({
                jsonrpc: '2.0',
                method,
                params,
                id,
            });
            this.callbacks[id] = (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            };
            this.send(request);
        });
    }
    on(event, listener) {
        this.emitter.on(event, listener);
    }
    off(event, listener) {
        this.emitter.off(event, listener);
    }
    send(message) {
        const socket = this.socket || (0, utils_1.throwError)('Connection not established');
        this.log('SENDING:', message);
        socket.send(`${message}\n`);
    }
    response(response) {
        const { id, method, params, result, error } = response;
        if (!id) {
            this.emitter.emit(method, params);
        }
        else {
            const callback = this.callbacks[id];
            if (callback) {
                delete this.callbacks[id];
                callback(error, result);
            }
            else {
                this.log(`Can't get callback for ${id}`);
            }
        }
    }
    onMessage(body) {
        const msg = JSON.parse(body);
        this.log('RECEIVED:', msg);
        this.response(msg);
    }
    onConnect() {
        this.log('onConnect');
    }
    onReceive(chunk) {
        const msgs = (this.buffer + chunk).split('\n');
        this.buffer = msgs.pop() || '';
        msgs.filter(msg => !!msg).forEach(this.onMessage, this);
    }
    onEnd(e) {
        this.log(`onEnd: [${e}]`);
    }
    onError(error) {
        this.log(`onError: [${error}]`);
    }
    onClose() {
        this.log('onClose');
        Object.values(this.callbacks).forEach(cb => cb(new Error('Connection closed')));
        this.callbacks = {};
        this.emitter.removeAllListeners();
    }
    log(...data) {
        if (this.debug) {
            console.log(...data);
        }
    }
}
exports.JsonRpcClient = JsonRpcClient;
//# sourceMappingURL=json-rpc.js.map