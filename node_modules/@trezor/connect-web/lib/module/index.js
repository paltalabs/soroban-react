"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const factory_1 = require("@trezor/connect/lib/factory");
const config_1 = require("@trezor/connect/lib/data/config");
const dynamic_1 = require("@trezor/connect/lib/impl/dynamic");
const core_in_module_1 = require("@trezor/connect/lib/impl/core-in-module");
const exports_1 = require("@trezor/connect/lib/exports");
const connect_common_1 = require("@trezor/connect-common");
const transportInfo_1 = require("@trezor/connect/lib/data/transportInfo");
const udevInfo_1 = require("@trezor/connect/lib/data/udevInfo");
const impl = new dynamic_1.TrezorConnectDynamic({
    implementations: [
        {
            type: 'core-in-module',
            impl: new core_in_module_1.CoreInModule((message) => {
                if (message.event === exports_1.TRANSPORT_EVENT) {
                    const platform = (0, connect_common_1.getInstallerPackage)();
                    message.payload.bridge = (0, transportInfo_1.suggestBridgeInstaller)(platform);
                    message.payload.udev = (0, udevInfo_1.suggestUdevInstaller)(platform);
                }
                return message;
            }),
        },
    ],
    getInitTarget: () => 'core-in-module',
    handleErrorFallback: () => new Promise(resolve => resolve(false)),
});
const disableWebUSB = () => {
    if (!impl.lastSettings) {
        throw exports_1.ERRORS.TypedError('Init_NotInitialized');
    }
    impl.getTarget().handleCoreMessage({ type: exports_1.TRANSPORT.DISABLE_WEBUSB });
};
const requestWebUSBDevice = async () => {
    await window.navigator.usb.requestDevice({ filters: config_1.config.webusb });
    impl.getTarget().handleCoreMessage({ type: exports_1.TRANSPORT.REQUEST_DEVICE });
};
const TrezorConnect = (0, factory_1.factory)({
    eventEmitter: impl.eventEmitter,
    init: impl.init.bind(impl),
    call: impl.call.bind(impl),
    manifest: impl.manifest.bind(impl),
    requestLogin: impl.requestLogin.bind(impl),
    uiResponse: impl.uiResponse.bind(impl),
    cancel: impl.cancel.bind(impl),
    dispose: impl.dispose.bind(impl),
}, {
    disableWebUSB: disableWebUSB.bind(impl),
    requestWebUSBDevice: requestWebUSBDevice.bind(impl),
});
exports.default = TrezorConnect;
tslib_1.__exportStar(require("@trezor/connect/lib/exports"), exports);
//# sourceMappingURL=index.js.map