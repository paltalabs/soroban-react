"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_utils_1 = require("@trezor/schema-utils");
const AbstractMethod_1 = require("../core/AbstractMethod");
const events_1 = require("../events");
const constants_1 = require("../constants");
const paramsValidator_1 = require("./common/paramsValidator");
class SetBusy extends AbstractMethod_1.AbstractMethod {
    init() {
        this.useDeviceState = false;
        this.requiredPermissions = ['management'];
        const { payload } = this;
        (0, schema_utils_1.Assert)(constants_1.PROTO.SetBusy, payload);
        this.firmwareRange = (0, paramsValidator_1.getFirmwareRange)(this.name, undefined, this.firmwareRange);
        this.params = {
            expiry_ms: payload.expiry_ms,
        };
    }
    async run() {
        const cmd = this.device.getCommands();
        const { message } = await cmd.typedCall('SetBusy', 'Success', this.params);
        if (this.keepSession && !!this.params.expiry_ms) {
            this.device.features.busy = true;
            this.postMessage((0, events_1.createDeviceMessage)(events_1.DEVICE.CHANGED, this.device.toMessageObject()));
        }
        return message;
    }
}
exports.default = SetBusy;
//# sourceMappingURL=setBusy.js.map