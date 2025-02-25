"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceModelInternal = exports.DeviceUniquePath = exports.FirmwareType = void 0;
var FirmwareType;
(function (FirmwareType) {
    FirmwareType["BitcoinOnly"] = "bitcoin-only";
    FirmwareType["Regular"] = "regular";
})(FirmwareType || (exports.FirmwareType = FirmwareType = {}));
const DeviceUniquePath = (id) => id;
exports.DeviceUniquePath = DeviceUniquePath;
var protobuf_1 = require("@trezor/protobuf");
Object.defineProperty(exports, "DeviceModelInternal", { enumerable: true, get: function () { return protobuf_1.DeviceModelInternal; } });
//# sourceMappingURL=device.js.map