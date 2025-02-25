"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataManager = void 0;
const tslib_1 = require("tslib");
const coins_json_1 = tslib_1.__importDefault(require("@trezor/connect-common/files/coins.json"));
const coins_eth_json_1 = tslib_1.__importDefault(require("@trezor/connect-common/files/coins-eth.json"));
const releases_json_1 = tslib_1.__importDefault(require("@trezor/connect-common/files/bridge/releases.json"));
const messages_json_1 = tslib_1.__importDefault(require("@trezor/protobuf/messages.json"));
const coinInfo_1 = require("./coinInfo");
const firmwareInfo_1 = require("./firmwareInfo");
const transportInfo_1 = require("./transportInfo");
const types_1 = require("../types");
const assetUtils_1 = require("../utils/assetUtils");
class DataManager {
    static load(settings, withAssets = true) {
        this.settings = settings;
        if (!withAssets)
            return;
        const assetsMap = {
            coins: coins_json_1.default,
            coinsEth: coins_eth_json_1.default,
            bridge: releases_json_1.default,
            ...Object.fromEntries(Object.entries(assetUtils_1.firmwareAssets).map(([key, value]) => [
                `firmware-${key.toLowerCase()}`,
                value,
            ])),
        };
        Object.assign(this.assets, assetsMap);
        (0, transportInfo_1.parseBridgeJSON)(this.assets.bridge);
        (0, coinInfo_1.parseCoinsJson)({
            ...this.assets.coins,
            ...this.assets.coinsEth,
        });
        for (const model in types_1.DeviceModelInternal) {
            const firmwareKey = `firmware-${model.toLowerCase()}`;
            const modelType = types_1.DeviceModelInternal[model];
            if (this.assets[firmwareKey]) {
                (0, firmwareInfo_1.parseFirmware)(this.assets[firmwareKey], modelType);
            }
        }
    }
    static getProtobufMessages() {
        return this.messages;
    }
    static getSettings(key) {
        if (!this.settings)
            return null;
        if (typeof key === 'string') {
            return this.settings[key];
        }
        return this.settings;
    }
}
exports.DataManager = DataManager;
DataManager.assets = {};
DataManager.messages = messages_json_1.default;
//# sourceMappingURL=DataManager.js.map