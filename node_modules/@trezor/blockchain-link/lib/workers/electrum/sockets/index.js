"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSocket = void 0;
const utils_1 = require("@trezor/utils");
const errors_1 = require("@trezor/blockchain-link-types/lib/constants/errors");
const tcp_1 = require("./tcp");
const tls_1 = require("./tls");
const tor_1 = require("./tor");
const createSocket = (url, options) => {
    const parsed = (0, utils_1.parseElectrumUrl)(url);
    if (!parsed)
        throw new errors_1.CustomError('Invalid electrum url');
    const { host, port, protocol } = parsed;
    const { timeout, keepAlive, proxyAgent } = options || {};
    if (proxyAgent) {
        return new tor_1.TorSocket({
            host,
            port,
            timeout,
            keepAlive,
            proxyAgent,
        });
    }
    switch (protocol) {
        case 't':
            return new tcp_1.TcpSocket({ host, port, timeout, keepAlive });
        case 's':
        default:
            return new tls_1.TlsSocket({ host, port, timeout, keepAlive });
    }
};
exports.createSocket = createSocket;
//# sourceMappingURL=index.js.map