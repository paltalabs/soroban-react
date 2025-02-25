"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractMethod_1 = require("../core/AbstractMethod");
const DataManager_1 = require("../data/DataManager");
class GetSettings extends AbstractMethod_1.AbstractMethod {
    init() {
        this.requiredPermissions = [];
        this.useDevice = false;
        this.useUi = false;
    }
    run() {
        return Promise.resolve(DataManager_1.DataManager.getSettings());
    }
}
exports.default = GetSettings;
//# sourceMappingURL=getSettings.js.map