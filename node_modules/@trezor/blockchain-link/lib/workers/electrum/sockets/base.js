"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketBase = void 0;
const tslib_1 = require("tslib");
const TIMEOUT = 10000;
const KEEP_ALIVE = true;
class SocketBase {
    constructor({ host, port, timeout, keepAlive }) {
        this.host = host;
        this.port = port;
        this.timeout = timeout !== undefined ? timeout : TIMEOUT;
        this.keepAlive = keepAlive !== undefined ? keepAlive : KEEP_ALIVE;
    }
    connect(listener) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.socket = yield this.openSocket(listener);
        });
    }
    close() {
        var _a, _b;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.end();
        (_b = this.socket) === null || _b === void 0 ? void 0 : _b.destroy();
    }
    send(data) {
        var _a;
        return (_a = this.socket) === null || _a === void 0 ? void 0 : _a.write(data);
    }
    configureSocket(socket) {
        socket.setTimeout(this.timeout);
        socket.setEncoding('utf8');
        socket.setKeepAlive(this.keepAlive);
        socket.setNoDelay(true);
    }
    bindSocket(socket, listener) {
        socket.on('connect', () => {
            socket.setTimeout(0);
            listener.onConnect();
        });
        socket.on('close', e => {
            listener.onClose(e);
        });
        socket.on('timeout', () => {
            const e = new Error('ETIMEDOUT');
            e.errorno = 'ETIMEDOUT';
            e.code = 'ETIMEDOUT';
            e.connect = false;
            socket.emit('error', e);
        });
        socket.on('data', chunk => {
            socket.setTimeout(0);
            listener.onReceive(chunk);
        });
        socket.on('end', (e) => {
            socket.setTimeout(0);
            listener.onEnd(e);
        });
        socket.on('error', e => {
            listener.onError(e);
        });
    }
}
exports.SocketBase = SocketBase;
//# sourceMappingURL=base.js.map