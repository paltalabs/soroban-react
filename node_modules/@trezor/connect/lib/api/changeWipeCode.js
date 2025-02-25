"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractMethod_1 = require("../core/AbstractMethod");
const paramsValidator_1 = require("./common/paramsValidator");
class ChangeWipeCode extends AbstractMethod_1.AbstractMethod {
    init() {
        this.requiredPermissions = ['management'];
        this.useDeviceState = false;
        const { payload } = this;
        (0, paramsValidator_1.validateParams)(payload, [{ name: 'remove', type: 'boolean' }]);
        this.params = {
            remove: payload.remove,
        };
    }
    async run() {
        const cmd = this.device.getCommands();
        const response = await cmd.typedCall('ChangeWipeCode', 'Success', this.params);
        return response.message;
    }
}
exports.default = ChangeWipeCode;
//# sourceMappingURL=changeWipeCode.js.map