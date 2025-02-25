"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_utils_1 = require("@trezor/schema-utils");
const AbstractMethod_1 = require("../core/AbstractMethod");
const events_1 = require("../events");
const paramsValidator_1 = require("./common/paramsValidator");
const deviceAuthenticityConfig_1 = require("../data/deviceAuthenticityConfig");
const authenticateDevice_1 = require("../types/api/authenticateDevice");
const verifyAuthenticityProof_1 = require("./firmware/verifyAuthenticityProof");
class AuthenticateDevice extends AbstractMethod_1.AbstractMethod {
    init() {
        this.useEmptyPassphrase = true;
        this.allowDeviceMode = [events_1.UI.INITIALIZE, events_1.UI.SEEDLESS];
        this.requiredPermissions = ['management'];
        this.useDeviceState = false;
        this.firmwareRange = (0, paramsValidator_1.getFirmwareRange)(this.name, null, this.firmwareRange);
        const { payload } = this;
        (0, schema_utils_1.Assert)(authenticateDevice_1.AuthenticateDeviceParams, payload);
        this.params = {
            config: payload.config,
            allowDebugKeys: payload.allowDebugKeys,
        };
    }
    async run() {
        const challenge = (0, verifyAuthenticityProof_1.getRandomChallenge)();
        const { message } = await this.device
            .getCommands()
            .typedCall('AuthenticateDevice', 'AuthenticityProof', {
            challenge: challenge.toString('hex'),
        });
        const config = this.params.config || deviceAuthenticityConfig_1.deviceAuthenticityConfig;
        const valid = await (0, verifyAuthenticityProof_1.verifyAuthenticityProof)({
            ...message,
            challenge,
            config,
            allowDebugKeys: this.params.allowDebugKeys,
            deviceModel: this.device.features.internal_model,
        });
        return valid;
    }
}
exports.default = AuthenticateDevice;
//# sourceMappingURL=authenticateDevice.js.map