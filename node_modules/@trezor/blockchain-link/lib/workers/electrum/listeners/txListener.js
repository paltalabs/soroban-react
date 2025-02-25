"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.txListener = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("@trezor/utils");
const constants_1 = require("@trezor/blockchain-link-types/lib/constants");
const blockbook_1 = require("@trezor/blockchain-link-utils/lib/blockbook");
const utils_2 = require("../utils");
const mostRecent = (previous, current) => {
    if (previous === undefined)
        return current;
    if (previous.height === -1)
        return previous;
    if (current.height === -1)
        return current;
    if (previous.height === 0)
        return previous;
    if (current.height === 0)
        return current;
    return previous.height >= current.height ? previous : current;
};
const txListener = (worker) => {
    const { state } = worker;
    const api = () => { var _a; return (_a = worker.api) !== null && _a !== void 0 ? _a : (0, utils_1.throwError)('API not created'); };
    const addressManager = (0, utils_2.createAddressManager)(() => { var _a; return (_a = api().getInfo()) === null || _a === void 0 ? void 0 : _a.network; });
    const onTransaction = (_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ([scripthash, _status]) {
        const { descriptor, addresses } = addressManager.getInfo(scripthash);
        if (descriptor === scripthash) {
            return;
        }
        const history = yield api().request('blockchain.scripthash.get_history', scripthash);
        const recent = history.reduce(mostRecent, undefined);
        if (!recent)
            return;
        const [tx] = yield (0, utils_2.getTransactions)(api(), [recent]);
        worker.post({
            id: -1,
            type: constants_1.RESPONSES.NOTIFICATION,
            payload: {
                type: 'notification',
                payload: {
                    descriptor,
                    tx: (0, blockbook_1.transformTransaction)(tx, addresses !== null && addresses !== void 0 ? addresses : descriptor),
                },
            },
        });
    });
    const subscribe = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const shToSubscribe = data.type === 'accounts'
            ? addressManager.addAccounts(data.accounts)
            : addressManager.addAddresses(data.addresses);
        if (!shToSubscribe.length)
            return { subscribed: false };
        if (!state.getSubscription('notification')) {
            api().on('blockchain.scripthash.subscribe', onTransaction);
            state.addSubscription('notification');
        }
        yield Promise.all(shToSubscribe.map(scripthash => api().request('blockchain.scripthash.subscribe', scripthash)));
        return { subscribed: true };
    });
    const unsubscribe = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const shToUnsubscribe = data.type === 'accounts'
            ? addressManager.removeAccounts(data.accounts)
            : addressManager.removeAddresses(data.addresses);
        if (!shToUnsubscribe.length)
            return { subscribed: false };
        if (state.getSubscription('notification') && !addressManager.getCount()) {
            api().off('blockchain.scripthash.subscribe', onTransaction);
            state.removeSubscription('notification');
        }
        yield Promise.all(shToUnsubscribe.map(scripthash => api().request('blockchain.scripthash.unsubscribe', scripthash)));
        return { subscribed: false };
    });
    return {
        subscribe,
        unsubscribe,
    };
};
exports.txListener = txListener;
//# sourceMappingURL=txListener.js.map