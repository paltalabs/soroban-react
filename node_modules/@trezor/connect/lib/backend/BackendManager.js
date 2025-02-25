"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendManager = void 0;
const DataManager_1 = require("../data/DataManager");
const constants_1 = require("../constants");
const Blockchain_1 = require("./Blockchain");
const events_1 = require("../events");
const DEFAULT_IDENTITY = 'default';
class BackendManager {
    constructor() {
        this.instances = {};
        this.reconnect = {};
        this.custom = {};
        this.preferred = {};
    }
    get(shortcut, identity = DEFAULT_IDENTITY) {
        var _a;
        return (_a = this.instances[`${shortcut}/${identity}`]) !== null && _a !== void 0 ? _a : null;
    }
    async getOrConnect({ coinInfo, postMessage, identity }) {
        const coinIdentity = `${coinInfo.shortcut}/${identity !== null && identity !== void 0 ? identity : DEFAULT_IDENTITY}`;
        let backend = this.instances[coinIdentity];
        if (!backend) {
            backend = new Blockchain_1.Blockchain({
                coinInfo: this.patchCoinInfo(coinInfo),
                identity,
                debug: DataManager_1.DataManager.getSettings('debug'),
                proxy: DataManager_1.DataManager.getSettings('proxy'),
                postMessage,
                onDisconnected: pendingSubscriptions => {
                    const reconnectAttempts = pendingSubscriptions ? 0 : undefined;
                    this.onDisconnect({ coinInfo, postMessage, identity }, reconnectAttempts);
                },
            });
            this.setInstance(coinIdentity, backend);
        }
        const reconnect = this.clearReconnect(coinIdentity);
        try {
            const info = await backend.init();
            this.setPreferred(coinInfo.shortcut, info.url);
            return backend;
        }
        catch (error) {
            this.onDisconnect({ coinInfo, postMessage, identity }, reconnect === null || reconnect === void 0 ? void 0 : reconnect.attempts);
            throw error;
        }
    }
    dispose() {
        Object.keys(this.reconnect)
            .filter(this.getReconnectFilter())
            .forEach(this.clearReconnect, this);
        Object.values(this.instances).forEach(i => i.disconnect());
    }
    reconnectAll(coin) {
        const backends = Object.values(this.instances).filter(backend => !coin || coin.shortcut === backend.coinInfo.shortcut);
        backends.forEach(i => i.disconnect());
        return Promise.all(backends.map(this.getOrConnect, this));
    }
    isSupported(coinInfo) {
        const info = this.custom[coinInfo.shortcut] || coinInfo.blockchainLink;
        if (!info) {
            throw constants_1.ERRORS.TypedError('Backend_NotSupported');
        }
    }
    setCustom(shortcut, blockchainLink) {
        this.setPreferred(shortcut, undefined);
        if (blockchainLink) {
            this.custom[shortcut] = blockchainLink;
        }
        else {
            delete this.custom[shortcut];
        }
    }
    setInstance(coinIdentity, instance) {
        if (!instance)
            delete this.instances[coinIdentity];
        else
            this.instances[coinIdentity] = instance;
    }
    setPreferred(shortcut, url) {
        if (!url)
            delete this.preferred[shortcut];
        else
            this.preferred[shortcut] = url;
    }
    onDisconnect({ coinInfo, postMessage, identity }, reconnectAttempt) {
        var _a;
        const coinIdentity = `${coinInfo.shortcut}/${identity !== null && identity !== void 0 ? identity : DEFAULT_IDENTITY}`;
        this.setInstance(coinIdentity, undefined);
        if (reconnectAttempt === undefined || reconnectAttempt === 4) {
            this.setPreferred(coinInfo.shortcut, undefined);
        }
        if (reconnectAttempt === undefined) {
            return;
        }
        const timeout = Math.min(2500 * reconnectAttempt, 20000);
        const time = Date.now() + timeout;
        const handle = setTimeout(() => {
            this.getOrConnect({ coinInfo, postMessage, identity }).catch(() => { });
        }, timeout);
        clearTimeout((_a = this.reconnect[coinIdentity]) === null || _a === void 0 ? void 0 : _a.handle);
        this.reconnect[coinIdentity] = { attempts: reconnectAttempt + 1, handle };
        postMessage((0, events_1.createBlockchainMessage)(events_1.BLOCKCHAIN.RECONNECTING, { coin: coinInfo, identity, time }));
    }
    clearReconnect(coinIdentity) {
        const reconnect = this.reconnect[coinIdentity];
        clearTimeout(reconnect === null || reconnect === void 0 ? void 0 : reconnect.handle);
        delete this.reconnect[coinIdentity];
        return reconnect;
    }
    patchCoinInfo(coinInfo) {
        var _a, _b;
        const custom = this.custom[coinInfo.shortcut];
        const preferred = this.preferred[coinInfo.shortcut];
        const url = preferred ? [preferred] : (_a = custom === null || custom === void 0 ? void 0 : custom.url) !== null && _a !== void 0 ? _a : (_b = coinInfo.blockchainLink) === null || _b === void 0 ? void 0 : _b.url;
        return {
            ...coinInfo,
            blockchainLink: {
                ...coinInfo.blockchainLink,
                ...custom,
                url,
            },
        };
    }
    getReconnectFilter(coinInfo) {
        return (key) => !coinInfo || key.startsWith(`${coinInfo.shortcut}/`);
    }
}
exports.BackendManager = BackendManager;
//# sourceMappingURL=BackendManager.js.map