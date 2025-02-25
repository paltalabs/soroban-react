"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSupported = exports.getFirstLedgerDevice = exports.getLedgerDevices = exports.requestLedgerDevice = void 0;
const devices_1 = require("@ledgerhq/devices");
const ledgerDevices = [
    {
        vendorId: devices_1.ledgerUSBVendorId,
    },
];
function requestLedgerDevice() {
    return __awaiter(this, void 0, void 0, function* () {
        const device = yield navigator.usb.requestDevice({
            filters: ledgerDevices,
        });
        return device;
    });
}
exports.requestLedgerDevice = requestLedgerDevice;
function getLedgerDevices() {
    return __awaiter(this, void 0, void 0, function* () {
        const devices = yield navigator.usb.getDevices();
        return devices.filter(d => d.vendorId === devices_1.ledgerUSBVendorId);
    });
}
exports.getLedgerDevices = getLedgerDevices;
function getFirstLedgerDevice() {
    return __awaiter(this, void 0, void 0, function* () {
        const existingDevices = yield getLedgerDevices();
        if (existingDevices.length > 0)
            return existingDevices[0];
        return requestLedgerDevice();
    });
}
exports.getFirstLedgerDevice = getFirstLedgerDevice;
const isSupported = () => Promise.resolve(!!navigator && !!navigator.usb && typeof navigator.usb.getDevices === "function");
exports.isSupported = isSupported;
//# sourceMappingURL=webusb.js.map