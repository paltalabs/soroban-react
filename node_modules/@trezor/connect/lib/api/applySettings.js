"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_utils_1 = require("@trezor/schema-utils");
const AbstractMethod_1 = require("../core/AbstractMethod");
const applySettings_1 = require("../types/api/applySettings");
class ApplySettings extends AbstractMethod_1.AbstractMethod {
    init() {
        this.requiredPermissions = ['management'];
        this.useDeviceState = false;
        const { payload } = this;
        (0, schema_utils_1.Assert)(applySettings_1.ApplySettings, payload);
        this.params = {
            ...payload,
            _passphrase_source: payload.passphrase_source,
        };
    }
    get confirmation() {
        return {
            view: 'device-management',
            customConfirmButton: {
                className: 'confirm',
                label: 'Proceed',
            },
            label: 'Do you really want to change device settings?',
        };
    }
    async run() {
        const cmd = this.device.getCommands();
        const response = await cmd.typedCall('ApplySettings', 'Success', this.params);
        return response.message;
    }
}
exports.default = ApplySettings;
//# sourceMappingURL=applySettings.js.map