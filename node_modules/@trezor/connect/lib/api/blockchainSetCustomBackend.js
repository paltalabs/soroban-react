"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractMethod_1 = require("../core/AbstractMethod");
const paramsValidator_1 = require("./common/paramsValidator");
const constants_1 = require("../constants");
const BlockchainLink_1 = require("../backend/BlockchainLink");
const coinInfo_1 = require("../data/coinInfo");
class BlockchainSetCustomBackend extends AbstractMethod_1.AbstractMethod {
    init() {
        this.requiredPermissions = [];
        this.useDevice = false;
        this.useUi = false;
        const { payload } = this;
        (0, paramsValidator_1.validateParams)(payload, [
            { name: 'coin', type: 'string', required: true },
            { name: 'blockchainLink', type: 'object' },
        ]);
        const coinInfo = (0, coinInfo_1.getCoinInfo)(payload.coin);
        if (!coinInfo) {
            throw constants_1.ERRORS.TypedError('Method_UnknownCoin');
        }
        (0, BlockchainLink_1.setCustomBackend)(coinInfo, payload.blockchainLink);
        this.params = {
            coinInfo,
        };
    }
    get info() {
        return '';
    }
    async run() {
        await (0, BlockchainLink_1.reconnectAllBackends)(this.params.coinInfo);
        return true;
    }
}
exports.default = BlockchainSetCustomBackend;
//# sourceMappingURL=blockchainSetCustomBackend.js.map