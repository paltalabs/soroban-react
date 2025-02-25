"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToDeviceModelId = exports.isDeviceModelId = void 0;
const _1 = require(".");
function isDeviceModelId(val) {
    if (!val)
        return false;
    return Object.values(_1.DeviceModelId).includes(val);
}
exports.isDeviceModelId = isDeviceModelId;
const stringToDeviceModelId = (strDeviceModelId, defaultDeviceModelId) => {
    if (!isDeviceModelId(strDeviceModelId))
        return defaultDeviceModelId;
    return _1.DeviceModelId[strDeviceModelId];
};
exports.stringToDeviceModelId = stringToDeviceModelId;
//# sourceMappingURL=helpers.js.map