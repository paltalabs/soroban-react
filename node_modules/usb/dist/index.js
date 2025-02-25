"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibUSBException = exports.useUsbDkBackend = exports.getDeviceList = exports.Transfer = exports.Device = exports.webusb = exports.findBySerialNumber = exports.findByIds = exports.usb = void 0;
const util_1 = require("util");
const webusb_1 = require("./webusb");
const usb = require("./usb");
exports.usb = usb;
/**
 * Convenience method to get the first device with the specified VID and PID, or `undefined` if no such device is present.
 * @param vid
 * @param pid
 */
const findByIds = (vid, pid) => {
    const devices = usb.getDeviceList();
    return devices.find(item => item.deviceDescriptor.idVendor === vid && item.deviceDescriptor.idProduct === pid);
};
exports.findByIds = findByIds;
/**
 * Convenience method to get the device with the specified serial number, or `undefined` if no such device is present.
 * @param serialNumber
 */
const findBySerialNumber = async (serialNumber) => {
    const devices = usb.getDeviceList();
    const opened = (device) => !!device.interfaces;
    for (const device of devices) {
        try {
            if (!opened(device)) {
                device.open();
            }
            const getStringDescriptor = (0, util_1.promisify)(device.getStringDescriptor).bind(device);
            const buffer = await getStringDescriptor(device.deviceDescriptor.iSerialNumber);
            if (buffer && buffer.toString() === serialNumber) {
                return device;
            }
        }
        catch {
            // Ignore any errors, device may be a system device or inaccessible
        }
        finally {
            try {
                if (opened(device)) {
                    device.close();
                }
            }
            catch {
                // Ignore any errors, device may be a system device or inaccessible
            }
        }
    }
    return undefined;
};
exports.findBySerialNumber = findBySerialNumber;
const webusb = new webusb_1.WebUSB();
exports.webusb = webusb;
// Usb types
var usb_1 = require("./usb");
Object.defineProperty(exports, "Device", { enumerable: true, get: function () { return usb_1.Device; } });
Object.defineProperty(exports, "Transfer", { enumerable: true, get: function () { return usb_1.Transfer; } });
Object.defineProperty(exports, "getDeviceList", { enumerable: true, get: function () { return usb_1.getDeviceList; } });
Object.defineProperty(exports, "useUsbDkBackend", { enumerable: true, get: function () { return usb_1.useUsbDkBackend; } });
Object.defineProperty(exports, "LibUSBException", { enumerable: true, get: function () { return usb_1.LibUSBException; } });
__exportStar(require("./usb/capability"), exports);
__exportStar(require("./usb/descriptors"), exports);
__exportStar(require("./usb/endpoint"), exports);
__exportStar(require("./usb/interface"), exports);
// WebUSB types
__exportStar(require("./webusb"), exports);
__exportStar(require("./webusb/webusb-device"), exports);
//# sourceMappingURL=index.js.map