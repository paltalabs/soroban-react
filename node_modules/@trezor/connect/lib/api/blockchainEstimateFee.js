"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractMethod_1 = require("../core/AbstractMethod");
const paramsValidator_1 = require("./common/paramsValidator");
const constants_1 = require("../constants");
const Fees_1 = require("./bitcoin/Fees");
const BlockchainLink_1 = require("../backend/BlockchainLink");
const coinInfo_1 = require("../data/coinInfo");
class BlockchainEstimateFee extends AbstractMethod_1.AbstractMethod {
    init() {
        this.useDevice = false;
        this.useUi = false;
        const { payload } = this;
        (0, paramsValidator_1.validateParams)(payload, [
            { name: 'coin', type: 'string', required: true },
            { name: 'identity', type: 'string' },
            { name: 'request', type: 'object' },
        ]);
        const { request, identity } = payload;
        if (request) {
            (0, paramsValidator_1.validateParams)(request, [
                { name: 'blocks', type: 'array' },
                { name: 'specific', type: 'object' },
                { name: 'feeLevels', type: 'string' },
            ]);
            if (request.specific) {
                (0, paramsValidator_1.validateParams)(request.specific, [
                    { name: 'conservative', type: 'boolean' },
                    { name: 'data', type: 'string' },
                    { name: 'from', type: 'string' },
                    { name: 'to', type: 'string' },
                    { name: 'txsize', type: 'number' },
                    { name: 'isCreatingAccount', type: 'boolean' },
                ]);
            }
        }
        const coinInfo = (0, coinInfo_1.getCoinInfo)(payload.coin);
        if (!coinInfo) {
            throw constants_1.ERRORS.TypedError('Method_UnknownCoin');
        }
        (0, BlockchainLink_1.isBackendSupported)(coinInfo);
        this.params = {
            coinInfo,
            identity,
            request,
        };
    }
    async run() {
        const { coinInfo, identity, request } = this.params;
        const feeInfo = {
            blockTime: coinInfo.blockTime,
            minFee: coinInfo.minFee,
            maxFee: coinInfo.maxFee,
            dustLimit: coinInfo.type === 'bitcoin' ? coinInfo.dustLimit : undefined,
            levels: [],
        };
        if (request && request.feeLevels) {
            const fees = new Fees_1.FeeLevels(coinInfo);
            if (request.feeLevels === 'smart') {
                const backend = await (0, BlockchainLink_1.initBlockchain)(coinInfo, this.postMessage, identity);
                await fees.load(backend);
            }
            feeInfo.levels = fees.levels;
        }
        else {
            const backend = await (0, BlockchainLink_1.initBlockchain)(coinInfo, this.postMessage, identity);
            feeInfo.levels = await backend.estimateFee(request || {});
        }
        return feeInfo;
    }
}
exports.default = BlockchainEstimateFee;
//# sourceMappingURL=blockchainEstimateFee.js.map