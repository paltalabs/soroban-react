"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_utils_1 = require("@trezor/schema-utils");
const AbstractMethod_1 = require("../core/AbstractMethod");
const constants_1 = require("../constants");
const BlockchainLink_1 = require("../backend/BlockchainLink");
const coinInfo_1 = require("../data/coinInfo");
const types_1 = require("../types");
class BlockchainDisconnect extends AbstractMethod_1.AbstractMethod {
    init() {
        this.requiredPermissions = [];
        this.useDevice = false;
        this.useUi = false;
        const { payload } = this;
        (0, schema_utils_1.Assert)(types_1.CoinObj, payload);
        const coinInfo = (0, coinInfo_1.getCoinInfo)(payload.coin);
        if (!coinInfo) {
            throw constants_1.ERRORS.TypedError('Method_UnknownCoin');
        }
        (0, BlockchainLink_1.isBackendSupported)(coinInfo);
        this.params = {
            coinInfo,
            identity: payload.identity,
        };
    }
    get info() {
        return '';
    }
    run() {
        const backend = (0, BlockchainLink_1.findBackend)(this.params.coinInfo.shortcut, this.params.identity);
        backend === null || backend === void 0 ? void 0 : backend.disconnect();
        return Promise.resolve({ disconnected: true });
    }
}
exports.default = BlockchainDisconnect;
//# sourceMappingURL=blockchainDisconnect.js.map