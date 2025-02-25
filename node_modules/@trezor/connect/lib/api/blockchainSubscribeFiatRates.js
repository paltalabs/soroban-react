"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractMethod_1 = require("../core/AbstractMethod");
const paramsValidator_1 = require("./common/paramsValidator");
const constants_1 = require("../constants");
const BlockchainLink_1 = require("../backend/BlockchainLink");
const coinInfo_1 = require("../data/coinInfo");
class BlockchainSubscribeFiatRates extends AbstractMethod_1.AbstractMethod {
    init() {
        this.useDevice = false;
        this.useUi = false;
        const { payload } = this;
        (0, paramsValidator_1.validateParams)(payload, [
            { name: 'currency', type: 'string', required: false },
            { name: 'coin', type: 'string', required: true },
            { name: 'identity', type: 'string' },
        ]);
        const coinInfo = (0, coinInfo_1.getCoinInfo)(payload.coin);
        if (!coinInfo) {
            throw constants_1.ERRORS.TypedError('Method_UnknownCoin');
        }
        (0, BlockchainLink_1.isBackendSupported)(coinInfo);
        this.params = {
            currency: payload.currency,
            coinInfo,
            identity: payload.identity,
        };
    }
    async run() {
        const backend = await (0, BlockchainLink_1.initBlockchain)(this.params.coinInfo, this.postMessage, this.params.identity);
        return backend.subscribeFiatRates(this.params.currency);
    }
}
exports.default = BlockchainSubscribeFiatRates;
//# sourceMappingURL=blockchainSubscribeFiatRates.js.map