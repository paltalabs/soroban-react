"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Blockfrost;
const tslib_1 = require("tslib");
const errors_1 = require("@trezor/blockchain-link-types/lib/constants/errors");
const constants_1 = require("@trezor/blockchain-link-types/lib/constants");
const blockfrost_1 = require("@trezor/blockchain-link-utils/lib/blockfrost");
const websocket_1 = require("./websocket");
const baseWorker_1 = require("../baseWorker");
const getInfo = (request) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const api = yield request.connect();
    const info = yield api.getServerInfo();
    return {
        type: constants_1.RESPONSES.GET_INFO,
        payload: Object.assign({ url: api.options.url }, info),
    };
});
const getBlockHash = (request) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const api = yield request.connect();
    const blockMessage = yield api.getBlockHash(request.payload);
    return {
        type: constants_1.RESPONSES.GET_BLOCK_HASH,
        payload: blockMessage.hash,
    };
});
const getAccountBalanceHistory = (request) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const socket = yield request.connect();
    const history = yield socket.getAccountBalanceHistory(request.payload);
    return {
        type: constants_1.RESPONSES.GET_ACCOUNT_BALANCE_HISTORY,
        payload: history,
    };
});
const getTransaction = (request) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const api = yield request.connect();
    const txData = yield api.getTransaction(request.payload);
    const tx = (0, blockfrost_1.transformTransaction)({ txData });
    return {
        type: constants_1.RESPONSES.GET_TRANSACTION,
        payload: tx,
    };
});
const estimateFee = (request) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const api = yield request.connect();
    const resp = yield api.estimateFee(request.payload);
    const feeOptions = [];
    feeOptions.push({ feePerUnit: resp.lovelacePerByte.toString() });
    return {
        type: constants_1.RESPONSES.ESTIMATE_FEE,
        payload: feeOptions,
    };
});
const pushTransaction = (request) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const api = yield request.connect();
    const payload = yield api.pushTransaction(request.payload);
    return {
        type: constants_1.RESPONSES.PUSH_TRANSACTION,
        payload,
    };
});
const getAccountInfo = (request) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const api = yield request.connect();
    const info = yield api.getAccountInfo(request.payload);
    return {
        type: constants_1.RESPONSES.GET_ACCOUNT_INFO,
        payload: (0, blockfrost_1.transformAccountInfo)(info),
    };
});
const getAccountUtxo = (request) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const api = yield request.connect();
    const utxos = yield api.getAccountUtxo(request.payload);
    return {
        type: constants_1.RESPONSES.GET_ACCOUNT_UTXO,
        payload: (0, blockfrost_1.transformUtxos)(utxos),
    };
});
const onNewBlock = ({ post }, event) => {
    post({
        id: -1,
        type: constants_1.RESPONSES.NOTIFICATION,
        payload: {
            type: 'block',
            payload: {
                blockHeight: event.height || 0,
                blockHash: event.hash,
            },
        },
    });
};
const onTransaction = ({ state, post }, event) => {
    var _a;
    const descriptor = event.address;
    const account = state.getAccount(descriptor);
    post({
        id: -1,
        type: constants_1.RESPONSES.NOTIFICATION,
        payload: {
            type: 'notification',
            payload: {
                descriptor: account ? account.descriptor : descriptor,
                tx: account
                    ? (0, blockfrost_1.transformTransaction)(event, (_a = account.addresses) !== null && _a !== void 0 ? _a : account.descriptor)
                    : (0, blockfrost_1.transformTransaction)(event, descriptor),
            },
        },
    });
};
const subscribeBlock = (ctx) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (ctx.state.getSubscription('block'))
        return { subscribed: true };
    const api = yield ctx.connect();
    ctx.state.addSubscription('block');
    api.on('block', ev => onNewBlock(ctx, ev));
    return api.subscribeBlock();
});
const subscribeAccounts = (ctx, accounts) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const api = yield ctx.connect();
    const { state } = ctx;
    state.addAccounts(accounts);
    if (!state.getSubscription('notification')) {
        api.on('notification', ev => onTransaction(ctx, ev));
        state.addSubscription('notification');
    }
    return api.subscribeAddresses(state.getAddresses());
});
const subscribeAddresses = (ctx, addresses) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const api = yield ctx.connect();
    const { state } = ctx;
    state.addAddresses(addresses);
    if (!state.getSubscription('notification')) {
        api.on('notification', ev => onTransaction(ctx, ev));
        state.addSubscription('notification');
    }
    return api.subscribeAddresses(state.getAddresses());
});
const subscribe = (request) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { payload } = request;
    let response;
    if (payload.type === 'accounts') {
        response = yield subscribeAccounts(request, payload.accounts);
    }
    else if (payload.type === 'addresses') {
        response = yield subscribeAddresses(request, payload.addresses);
    }
    else if (payload.type === 'block') {
        response = yield subscribeBlock(request);
    }
    else {
        throw new errors_1.CustomError('invalid_param', '+type');
    }
    return {
        type: constants_1.RESPONSES.SUBSCRIBE,
        payload: response,
    };
});
const unsubscribeBlock = (_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ state, connect }) {
    if (!state.getSubscription('block'))
        return { subscribed: false };
    const api = yield connect();
    api.removeAllListeners('block');
    state.removeSubscription('block');
    return api.unsubscribeBlock();
});
const unsubscribeAccounts = (_a, accounts_1) => tslib_1.__awaiter(void 0, [_a, accounts_1], void 0, function* ({ state, connect }, accounts) {
    state.removeAccounts(accounts || state.getAccounts());
    const api = yield connect();
    const subscribed = state.getAddresses();
    if (subscribed.length < 1) {
        api.removeAllListeners('notification');
        state.removeSubscription('notification');
        return api.unsubscribeAddresses();
    }
    return api.subscribeAddresses(subscribed);
});
const unsubscribeAddresses = (_a, addresses_1) => tslib_1.__awaiter(void 0, [_a, addresses_1], void 0, function* ({ state, connect }, addresses) {
    const socket = yield connect();
    if (!addresses) {
        state.removeAccounts(state.getAccounts());
    }
    const subscribed = state.removeAddresses(addresses || state.getAddresses());
    if (subscribed.length < 1) {
        socket.removeAllListeners('notification');
        state.removeSubscription('notification');
        return socket.unsubscribeAddresses();
    }
    return socket.subscribeAddresses(subscribed);
});
const unsubscribe = (request) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { payload } = request;
    let response;
    if (payload.type === 'accounts') {
        response = yield unsubscribeAccounts(request, payload.accounts);
    }
    else if (payload.type === 'addresses') {
        response = yield unsubscribeAddresses(request, payload.addresses);
    }
    else if (payload.type === 'block') {
        response = yield unsubscribeBlock(request);
    }
    else {
        throw new errors_1.CustomError('invalid_param', '+type');
    }
    return {
        type: constants_1.RESPONSES.UNSUBSCRIBE,
        payload: response,
    };
});
const onRequest = (request) => {
    switch (request.type) {
        case constants_1.MESSAGES.GET_INFO:
            return getInfo(request);
        case constants_1.MESSAGES.GET_BLOCK_HASH:
            return getBlockHash(request);
        case constants_1.MESSAGES.GET_ACCOUNT_BALANCE_HISTORY:
            return getAccountBalanceHistory(request);
        case constants_1.MESSAGES.GET_ACCOUNT_INFO:
            return getAccountInfo(request);
        case constants_1.MESSAGES.GET_ACCOUNT_UTXO:
            return getAccountUtxo(request);
        case constants_1.MESSAGES.GET_TRANSACTION:
            return getTransaction(request);
        case constants_1.MESSAGES.ESTIMATE_FEE:
            return estimateFee(request);
        case constants_1.MESSAGES.PUSH_TRANSACTION:
            return pushTransaction(request);
        case constants_1.MESSAGES.SUBSCRIBE:
            return subscribe(request);
        case constants_1.MESSAGES.UNSUBSCRIBE:
            return unsubscribe(request);
        default:
            throw new errors_1.CustomError('worker_unknown_request', `+${request.type}`);
    }
};
class BlockfrostWorker extends baseWorker_1.BaseWorker {
    cleanup() {
        if (this.api) {
            this.api.dispose();
            this.api.removeAllListeners();
        }
        super.cleanup();
    }
    isConnected(api) {
        var _a;
        return (_a = api === null || api === void 0 ? void 0 : api.isConnected()) !== null && _a !== void 0 ? _a : false;
    }
    tryConnect(url) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { timeout, pingTimeout, keepAlive } = this.settings;
            const api = new websocket_1.BlockfrostAPI({
                url,
                timeout,
                pingTimeout,
                keepAlive,
                agent: this.proxyAgent,
            });
            yield api.connect();
            api.on('disconnected', () => {
                this.post({ id: -1, type: constants_1.RESPONSES.DISCONNECTED, payload: true });
                this.cleanup();
            });
            this.post({
                id: -1,
                type: constants_1.RESPONSES.CONNECTED,
            });
            return api;
        });
    }
    disconnect() {
        if (this.api) {
            this.api.disconnect();
        }
    }
    messageHandler(event) {
        const _super = Object.create(null, {
            messageHandler: { get: () => super.messageHandler }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (yield _super.messageHandler.call(this, event))
                    return true;
                const request = Object.assign(Object.assign({}, event.data), { connect: () => this.connect(), post: (data) => this.post(data), state: this.state });
                const response = yield onRequest(request);
                this.post(Object.assign({ id: event.data.id }, response));
            }
            catch (error) {
                this.errorResponse(event.data.id, error);
            }
        });
    }
}
function Blockfrost() {
    return new BlockfrostWorker();
}
if (baseWorker_1.CONTEXT === 'worker') {
    const module = new BlockfrostWorker();
    onmessage = module.messageHandler.bind(module);
}
//# sourceMappingURL=index.js.map