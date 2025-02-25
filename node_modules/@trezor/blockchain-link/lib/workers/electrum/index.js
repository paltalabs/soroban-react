"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Electrum;
const tslib_1 = require("tslib");
const errors_1 = require("@trezor/blockchain-link-types/lib/constants/errors");
const constants_1 = require("@trezor/blockchain-link-types/lib/constants");
const baseWorker_1 = require("../baseWorker");
const M = tslib_1.__importStar(require("./methods"));
const L = tslib_1.__importStar(require("./listeners"));
const sockets_1 = require("./sockets");
const caching_1 = require("./client/caching");
const onRequest = (request) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const client = yield request.connect();
    switch (request.type) {
        case constants_1.MESSAGES.GET_INFO:
            return {
                type: constants_1.RESPONSES.GET_INFO,
                payload: yield M.getInfo(client),
            };
        case constants_1.MESSAGES.GET_BLOCK_HASH:
            return {
                type: constants_1.RESPONSES.GET_BLOCK_HASH,
                payload: yield M.getBlockHash(client, request.payload),
            };
        case constants_1.MESSAGES.GET_ACCOUNT_INFO:
            return {
                type: constants_1.RESPONSES.GET_ACCOUNT_INFO,
                payload: yield M.getAccountInfo(client, request.payload),
            };
        case constants_1.MESSAGES.GET_ACCOUNT_UTXO:
            return {
                type: constants_1.RESPONSES.GET_ACCOUNT_UTXO,
                payload: yield M.getAccountUtxo(client, request.payload),
            };
        case constants_1.MESSAGES.GET_TRANSACTION:
            return {
                type: constants_1.RESPONSES.GET_TRANSACTION,
                payload: yield M.getTransaction(client, request.payload),
            };
        case constants_1.MESSAGES.GET_TRANSACTION_HEX:
            return {
                type: constants_1.RESPONSES.GET_TRANSACTION_HEX,
                payload: yield client.request('blockchain.transaction.get', request.payload, false),
            };
        case constants_1.MESSAGES.GET_ACCOUNT_BALANCE_HISTORY:
            return {
                type: constants_1.RESPONSES.GET_ACCOUNT_BALANCE_HISTORY,
                payload: yield M.getAccountBalanceHistory(client, request.payload),
            };
        case constants_1.MESSAGES.ESTIMATE_FEE:
            return {
                type: constants_1.RESPONSES.ESTIMATE_FEE,
                payload: yield M.estimateFee(client, request.payload),
            };
        case constants_1.MESSAGES.PUSH_TRANSACTION:
            return {
                type: constants_1.RESPONSES.PUSH_TRANSACTION,
                payload: yield M.pushTransaction(client, request.payload),
            };
        case constants_1.MESSAGES.SUBSCRIBE:
            switch (request.payload.type) {
                case 'block':
                    return {
                        type: constants_1.RESPONSES.SUBSCRIBE,
                        payload: request.blockListener.subscribe(),
                    };
                case 'addresses':
                case 'accounts':
                    return {
                        type: constants_1.RESPONSES.SUBSCRIBE,
                        payload: yield request.txListener.subscribe(request.payload),
                    };
                default:
                    throw new errors_1.CustomError(`Subscription ${request.payload.type} not implemented`);
            }
        case constants_1.MESSAGES.UNSUBSCRIBE:
            switch (request.payload.type) {
                case 'block':
                    return {
                        type: constants_1.RESPONSES.UNSUBSCRIBE,
                        payload: request.blockListener.unsubscribe(),
                    };
                case 'addresses':
                case 'accounts':
                    return {
                        type: constants_1.RESPONSES.UNSUBSCRIBE,
                        payload: yield request.txListener.unsubscribe(request.payload),
                    };
                default:
                    throw new errors_1.CustomError(`Subscription ${request.payload.type} not implemented`);
            }
        case 'raw': {
            const { method, params } = request.payload;
            return client
                .request(method, ...params)
                .then((res) => ({ type: method, payload: res }));
        }
        default:
            throw new errors_1.CustomError('worker_unknown_request', `+${request.type}`);
    }
});
class ElectrumWorker extends baseWorker_1.BaseWorker {
    constructor() {
        super();
        this.blockListener = L.blockListener(this);
        this.txListener = L.txListener(this);
    }
    isConnected(api) {
        var _a;
        return (_a = api === null || api === void 0 ? void 0 : api.isConnected()) !== null && _a !== void 0 ? _a : false;
    }
    tryConnect(url) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { debug, timeout, keepAlive, name } = this.settings;
            const socket = (0, sockets_1.createSocket)(url, {
                timeout,
                keepAlive,
                proxyAgent: this.proxyAgent,
            });
            const api = new caching_1.CachingElectrumClient();
            yield api.connect(socket, {
                url,
                coin: name !== null && name !== void 0 ? name : 'BTC',
                debug,
                client: {
                    name: 'blockchain-link',
                    protocolVersion: '1.4',
                },
            });
            this.post({
                id: -1,
                type: constants_1.RESPONSES.CONNECTED,
            });
            return api;
        });
    }
    disconnect() {
        var _a;
        if ((_a = this.api) === null || _a === void 0 ? void 0 : _a.isConnected()) {
            this.api.close();
        }
    }
    cleanup() {
        if (this.api) {
            this.api.close();
        }
        super.cleanup();
    }
    messageHandler(event) {
        const _super = Object.create(null, {
            messageHandler: { get: () => super.messageHandler }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (yield _super.messageHandler.call(this, event))
                    return true;
                const request = Object.assign(Object.assign({}, event.data), { connect: () => this.connect(), post: (data) => this.post(data), state: this.state, blockListener: this.blockListener, txListener: this.txListener });
                const response = yield onRequest(request);
                this.post(Object.assign({ id: event.data.id }, response));
            }
            catch (error) {
                this.errorResponse(event.data.id, error);
            }
        });
    }
}
function Electrum() {
    return new ElectrumWorker();
}
if (baseWorker_1.CONTEXT === 'worker') {
    const module = new ElectrumWorker();
    onmessage = module.messageHandler.bind(module);
}
//# sourceMappingURL=index.js.map