"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateDeviceParams = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const deviceAuthenticityConfigTypes_1 = require("../../data/deviceAuthenticityConfigTypes");
exports.AuthenticateDeviceParams = schema_utils_1.Type.Object({
    config: schema_utils_1.Type.Optional(deviceAuthenticityConfigTypes_1.DeviceAuthenticityConfig),
    allowDebugKeys: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
});
//# sourceMappingURL=authenticateDevice.js.map