"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_utils_1 = require("@trezor/schema-utils");
const AbstractMethod_1 = require("../core/AbstractMethod");
const constants_1 = require("../constants");
const events_1 = require("../events");
const paramsValidator_1 = require("./common/paramsValidator");
class GetFirmwareHash extends AbstractMethod_1.AbstractMethod {
    init() {
        this.requiredPermissions = ['management'];
        this.useEmptyPassphrase = true;
        this.useDeviceState = false;
        this.allowDeviceMode = [events_1.UI.INITIALIZE];
        const { payload } = this;
        (0, schema_utils_1.Assert)(constants_1.PROTO.GetFirmwareHash, payload);
        this.firmwareRange = (0, paramsValidator_1.getFirmwareRange)(this.name, null, this.firmwareRange);
        this.params = {
            challenge: payload.challenge,
        };
    }
    async run() {
        const cmd = this.device.getCommands();
        const response = await cmd.typedCall('GetFirmwareHash', 'FirmwareHash', this.params);
        return response.message;
    }
}
exports.default = GetFirmwareHash;
//# sourceMappingURL=getFirmwareHash.js.map