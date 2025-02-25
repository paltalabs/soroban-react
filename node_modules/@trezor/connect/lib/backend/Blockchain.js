"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = void 0;
const tslib_1 = require("tslib");
const blockchain_link_1 = tslib_1.__importDefault(require("@trezor/blockchain-link"));
const events_1 = require("../events");
const constants_1 = require("../constants");
const workers_1 = require("../workers/workers");
const getWorker = (type) => {
    switch (type) {
        case 'blockbook':
            return workers_1.BlockbookWorker;
        case 'ripple':
            return workers_1.RippleWorker;
        case 'blockfrost':
            return workers_1.BlockfrostWorker;
        case 'electrum':
            return workers_1.ElectrumWorker;
        case 'solana':
            return workers_1.SolanaWorker;
        default:
            return null;
    }
};
const getNormalizedTrezorShortcut = (shortcut) => {
    if (shortcut === 'tXRP') {
        return 'XRP';
    }
    if (['OP', 'BASE'].includes(shortcut)) {
        return 'ETH';
    }
    return shortcut;
};
class Blockchain {
    constructor(options) {
        this.feeForBlock = [];
        this.feeTimestamp = 0;
        this.identity = options.identity;
        this.coinInfo = options.coinInfo;
        this.postMessage = options.postMessage;
        this.onDisconnected = options.onDisconnected;
        const { blockchainLink } = options.coinInfo;
        if (!blockchainLink) {
            throw constants_1.ERRORS.TypedError('Backend_NotSupported');
        }
        const worker = getWorker(blockchainLink.type);
        if (!worker) {
            throw constants_1.ERRORS.TypedError('Backend_WorkerMissing', `BlockchainLink worker not found ${blockchainLink.type}`);
        }
        const server = blockchainLink.url;
        this.link = new blockchain_link_1.default({
            name: this.coinInfo.shortcut,
            worker,
            server,
            debug: options.debug,
            proxy: options.proxy,
            ...(blockchainLink.type === 'ripple' ? { throttleBlockEvent: 60 * 1000 } : {}),
        });
    }
    onError(error) {
        var _a;
        const pendingSubscriptions = this.link.listenerCount('block') ||
            this.link.listenerCount('notification') ||
            this.link.listenerCount('fiatRates');
        this.link.dispose();
        this.postMessage((0, events_1.createBlockchainMessage)(events_1.BLOCKCHAIN.ERROR, {
            coin: this.coinInfo,
            identity: this.identity,
            error: error.message,
            code: error.code,
        }));
        (_a = this.onDisconnected) === null || _a === void 0 ? void 0 : _a.call(this, !!pendingSubscriptions);
    }
    async initLink() {
        let info;
        try {
            await this.link.connect();
            info = await this.link.getInfo();
        }
        catch (error) {
            throw constants_1.ERRORS.TypedError('Backend_Error', error.message);
        }
        this.serverInfo = info;
        const trezorShortcut = getNormalizedTrezorShortcut(this.coinInfo.shortcut);
        const backendShortcut = this.serverInfo.shortcut;
        if (trezorShortcut.toLowerCase() !== backendShortcut.toLowerCase()) {
            throw constants_1.ERRORS.TypedError('Backend_Invalid');
        }
        this.link.on('disconnected', () => {
            this.onError(constants_1.ERRORS.TypedError('Backend_Disconnected'));
        });
        return info;
    }
    init() {
        if (!this.initPromise) {
            this.initPromise = this.initLink()
                .then(info => {
                this.postMessage((0, events_1.createBlockchainMessage)(events_1.BLOCKCHAIN.CONNECT, {
                    coin: this.coinInfo,
                    identity: this.identity,
                    ...info,
                }));
                this.initPromise = Promise.resolve(info);
                return info;
            })
                .catch(error => {
                this.postMessage((0, events_1.createBlockchainMessage)(events_1.BLOCKCHAIN.ERROR, {
                    coin: this.coinInfo,
                    identity: this.identity,
                    error: error.message,
                    code: error.code,
                }));
                this.initPromise = Promise.reject(error);
                this.link.dispose();
                return this.initPromise;
            });
        }
        return this.initPromise;
    }
    getTransactions(txs) {
        return Promise.all(txs.map(id => this.link.getTransaction(id)));
    }
    getTransactionHexes(txids) {
        return Promise.all(txids.map(id => this.link.getTransactionHex(id)));
    }
    getCurrentFiatRates(params) {
        return this.link.getCurrentFiatRates(params);
    }
    getFiatRatesForTimestamps(params) {
        return this.link.getFiatRatesForTimestamps(params);
    }
    getAccountBalanceHistory(params) {
        return this.link.getAccountBalanceHistory(params);
    }
    getNetworkInfo() {
        return this.link.getInfo();
    }
    getAccountInfo(request) {
        return this.link.getAccountInfo(request);
    }
    getAccountUtxo(descriptor) {
        return this.link.getAccountUtxo(descriptor);
    }
    rpcCall(params) {
        return this.link.rpcCall(params);
    }
    async estimateFee(request) {
        const { blocks } = request;
        const useCache = !request.specific && Array.isArray(blocks) && blocks.length > 0;
        if (useCache) {
            const outdated = Date.now() - this.feeTimestamp > 20 * 60 * 1000;
            const unknownBlocks = outdated
                ? blocks
                : blocks.filter(block => !this.feeForBlock[block]);
            if (unknownBlocks.length < 1) {
                return blocks.map(block => this.feeForBlock[block]);
            }
            this.feeForBlock = [];
            const fees = await this.link.estimateFee(request);
            blocks.forEach((block, index) => {
                this.feeForBlock[block] = fees[index];
            });
            this.feeTimestamp = Date.now();
            return fees;
        }
        return this.link.estimateFee(request);
    }
    subscribeBlocks() {
        if (this.link.listenerCount('block') === 0) {
            this.link.on('block', block => {
                this.postMessage((0, events_1.createBlockchainMessage)(events_1.BLOCKCHAIN.BLOCK, {
                    coin: this.coinInfo,
                    ...block,
                }));
            });
        }
        return this.link.subscribe({ type: 'block' });
    }
    subscribeAccounts(accounts) {
        if (this.link.listenerCount('notification') === 0) {
            this.link.on('notification', notification => {
                this.postMessage((0, events_1.createBlockchainMessage)(events_1.BLOCKCHAIN.NOTIFICATION, {
                    coin: this.coinInfo,
                    notification,
                }));
            });
        }
        return this.link.subscribe({
            type: 'accounts',
            accounts,
        });
    }
    subscribeFiatRates(_currency) {
        if (this.link.listenerCount('fiatRates') === 0) {
            this.link.on('fiatRates', ({ rates }) => {
                this.postMessage((0, events_1.createBlockchainMessage)(events_1.BLOCKCHAIN.FIAT_RATES_UPDATE, {
                    coin: this.coinInfo,
                    rates,
                }));
            });
        }
        return this.link.subscribe({
            type: 'fiatRates',
        });
    }
    unsubscribeBlocks() {
        this.link.removeAllListeners('block');
        return this.link.unsubscribe({ type: 'block' });
    }
    unsubscribeAccounts(accounts) {
        return this.link.unsubscribe({ type: 'accounts', accounts });
    }
    unsubscribeFiatRates() {
        this.link.removeAllListeners('fiatRates');
        return this.link.unsubscribe({ type: 'fiatRates' });
    }
    async unsubscribeAll() {
        this.link.removeAllListeners('notification');
        await this.unsubscribeFiatRates();
        return this.unsubscribeBlocks();
    }
    pushTransaction(tx) {
        return this.link.pushTransaction(tx);
    }
    disconnect() {
        this.link.removeAllListeners();
        this.link.disconnect();
        this.onError(constants_1.ERRORS.TypedError('Backend_Disconnected'));
    }
}
exports.Blockchain = Blockchain;
//# sourceMappingURL=Blockchain.js.map