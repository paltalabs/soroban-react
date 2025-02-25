import { DeviceModelId } from ".";
export function isDeviceModelId(val) {
    if (!val)
        return false;
    return Object.values(DeviceModelId).includes(val);
}
export const stringToDeviceModelId = (strDeviceModelId, defaultDeviceModelId) => {
    if (!isDeviceModelId(strDeviceModelId))
        return defaultDeviceModelId;
    return DeviceModelId[strDeviceModelId];
};
//# sourceMappingURL=helpers.js.map