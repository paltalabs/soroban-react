"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractMethod_1 = require("../core/AbstractMethod");
const paramsValidator_1 = require("./common/paramsValidator");
const DataManager_1 = require("../data/DataManager");
const BlockchainLink_1 = require("../backend/BlockchainLink");
class SetProxy extends AbstractMethod_1.AbstractMethod {
    init() {
        this.requiredPermissions = [];
        this.useDevice = false;
        this.useUi = false;
        (0, paramsValidator_1.validateParams)(this.payload, []);
    }
    async run() {
        const { proxy } = DataManager_1.DataManager.getSettings();
        const isChanged = proxy !== this.payload.proxy;
        if (isChanged) {
            DataManager_1.DataManager.getSettings().proxy = this.payload.proxy;
            await (0, BlockchainLink_1.reconnectAllBackends)();
        }
        return { message: 'Success' };
    }
}
exports.default = SetProxy;
//# sourceMappingURL=setProxy.js.map