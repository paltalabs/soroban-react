"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseWorker = exports.CONTEXT = void 0;
const tslib_1 = require("tslib");
const socks_proxy_agent_1 = require("socks-proxy-agent");
const errors_1 = require("@trezor/blockchain-link-types/lib/constants/errors");
const constants_1 = require("@trezor/blockchain-link-types/lib/constants");
const utils_1 = require("./utils");
const state_1 = require("./state");
exports.CONTEXT = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ||
    typeof importScripts !== 'undefined'
    ? 'worker'
    : 'main';
class BaseWorker {
    constructor() {
        this.settings = {};
        if (exports.CONTEXT === 'worker') {
            this.post = (data) => self.postMessage(data);
        }
        else {
            this.post = (data) => this.onmessage({ data });
        }
        this.state = new state_1.WorkerState();
        setTimeout(() => {
            this.post({ id: -1, type: constants_1.MESSAGES.HANDSHAKE });
        }, 10);
    }
    debug(...args) {
        if (!this.settings.debug)
            return;
        const debugPrefix = `[Worker "${this.settings.name}"]:`;
        const fn = args[0];
        if (fn === 'warn' || fn === 'error') {
            console[fn](debugPrefix, ...args.slice(1));
        }
        else {
            console.log(debugPrefix, ...args);
        }
    }
    cleanup() {
        this.api = undefined;
        this.state.cleanup();
    }
    connect() {
        if (this.isConnected(this.api)) {
            return Promise.resolve(this.api);
        }
        if (!this.connectPromise) {
            const urls = Array.isArray(this.settings.server)
                ? this.settings.server.filter(url => typeof url === 'string')
                : [];
            if (urls.length < 1) {
                throw new errors_1.CustomError('connect', 'Endpoint not set');
            }
            const endpoints = (0, utils_1.prioritizeEndpoints)(urls);
            this.connectPromise = this.connectRecursive(endpoints).then(api => {
                this.debug('Connected');
                this.api = api;
                this.connectPromise = undefined;
                return api;
            });
        }
        return this.connectPromise;
    }
    connectRecursive([url, ...rest]) {
        if (!url) {
            throw new errors_1.CustomError('connect', 'All backends are down');
        }
        if (this.proxyAgent) {
            this.proxyAgent.protocol = /^(https|wss):/.test(url) ? 'https:' : 'http:';
        }
        this.debug('Connecting to', url);
        return this.tryConnect(url).catch(error => {
            this.debug('Connection failed', error);
            return this.connectRecursive(rest);
        });
    }
    disconnect() {
    }
    messageHandler(event) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!event.data)
                return true;
            const { data } = event;
            const { id } = data;
            this.debug('onmessage', data);
            if (data.type === constants_1.MESSAGES.HANDSHAKE) {
                this.settings = data.settings;
                const { proxy } = data.settings;
                if (proxy) {
                    const agentUri = typeof proxy === 'string' ? proxy : `socks://${proxy.host}:${proxy.port}`;
                    const socketOptions = typeof proxy === 'object' ? { timeout: proxy === null || proxy === void 0 ? void 0 : proxy.timeout } : undefined;
                    this.proxyAgent = new socks_proxy_agent_1.SocksProxyAgent(agentUri, socketOptions);
                }
                else {
                    this.proxyAgent = undefined;
                }
                return true;
            }
            if (data.type === constants_1.MESSAGES.CONNECT) {
                yield this.connect();
                this.post({ id, type: constants_1.RESPONSES.CONNECT, payload: true });
                return true;
            }
            if (data.type === constants_1.MESSAGES.DISCONNECT) {
                this.disconnect();
                this.post({ id, type: constants_1.RESPONSES.DISCONNECTED, payload: true });
                return true;
            }
            if (data.type === constants_1.MESSAGES.TERMINATE) {
                this.disconnect();
                this.cleanup();
                return true;
            }
        });
    }
    errorResponse(id, error) {
        const payload = { code: '', message: '' };
        if (error instanceof Error) {
            payload.message = error.message;
            payload.code = error instanceof errors_1.CustomError && error.code ? error.code : '';
        }
        this.post({
            id,
            type: constants_1.RESPONSES.ERROR,
            payload,
        });
    }
    postMessage(data) {
        this.messageHandler({ data });
    }
    onmessage(_evt) {
    }
    onmessageerror(_error) {
    }
    onerror(_error) {
    }
    terminate() {
        this.postMessage({ id: -1, type: constants_1.MESSAGES.TERMINATE });
    }
}
exports.BaseWorker = BaseWorker;
//# sourceMappingURL=baseWorker.js.map