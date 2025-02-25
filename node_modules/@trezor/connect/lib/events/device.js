"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeviceMessage = exports.DEVICE = exports.DEVICE_EVENT = void 0;
exports.DEVICE_EVENT = 'DEVICE_EVENT';
exports.DEVICE = {
    CONNECT: 'device-connect',
    CONNECT_UNACQUIRED: 'device-connect_unacquired',
    DISCONNECT: 'device-disconnect',
    CHANGED: 'device-changed',
    BUTTON: 'button',
    PIN: 'pin',
    PASSPHRASE: 'passphrase',
    PASSPHRASE_ON_DEVICE: 'passphrase_on_device',
    WORD: 'word',
};
const createDeviceMessage = (type, payload) => ({
    event: exports.DEVICE_EVENT,
    type,
    payload,
});
exports.createDeviceMessage = createDeviceMessage;
//# sourceMappingURL=device.js.map