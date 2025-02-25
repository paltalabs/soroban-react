"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockListener = void 0;
const utils_1 = require("@trezor/utils");
const constants_1 = require("@trezor/blockchain-link-types/lib/constants");
const utils_2 = require("../utils");
const blockListener = (worker) => {
    const { state } = worker;
    const api = () => { var _a; return (_a = worker.api) !== null && _a !== void 0 ? _a : (0, utils_1.throwError)('API not created'); };
    const onBlock = (blocks) => {
        blocks.forEach(({ height, hex }) => worker.post({
            id: -1,
            type: constants_1.RESPONSES.NOTIFICATION,
            payload: {
                type: 'block',
                payload: {
                    blockHeight: height,
                    blockHash: (0, utils_2.blockheaderToBlockhash)(hex),
                },
            },
        }));
    };
    const subscribe = () => {
        if (!state.getSubscription('block')) {
            state.addSubscription('block');
            api().on('blockchain.headers.subscribe', onBlock);
        }
        return { subscribed: true };
    };
    const unsubscribe = () => {
        if (state.getSubscription('block')) {
            api().off('blockchain.headers.subscribe', onBlock);
            state.removeSubscription('block');
        }
        return { subscribed: false };
    };
    return {
        subscribe,
        unsubscribe,
    };
};
exports.blockListener = blockListener;
//# sourceMappingURL=blockListener.js.map