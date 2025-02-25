"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_utils_1 = require("@trezor/schema-utils");
const AbstractMethod_1 = require("../core/AbstractMethod");
const constants_1 = require("../constants");
const coinInfo_1 = require("../data/coinInfo");
const types_1 = require("../types");
class GetCoinInfo extends AbstractMethod_1.AbstractMethod {
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
        this.params = {
            coinInfo,
        };
    }
    run() {
        return Promise.resolve(this.params.coinInfo);
    }
}
exports.default = GetCoinInfo;
//# sourceMappingURL=getCoinInfo.js.map