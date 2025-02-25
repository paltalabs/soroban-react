"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const factory_1 = require("@trezor/connect/lib/factory");
const dynamic_1 = require("@trezor/connect/lib/impl/dynamic");
const core_in_iframe_1 = require("./impl/core-in-iframe");
const core_in_popup_1 = require("./impl/core-in-popup");
const core_in_suite_desktop_1 = require("./impl/core-in-suite-desktop");
const connectSettings_1 = require("./connectSettings");
const IFRAME_ERRORS = ['Init_IframeBlocked', 'Init_IframeTimeout', 'Transport_Missing'];
const impl = new dynamic_1.TrezorConnectDynamic({
    implementations: [
        {
            type: 'iframe',
            impl: new core_in_iframe_1.CoreInIframe(),
        },
        {
            type: 'core-in-popup',
            impl: new core_in_popup_1.CoreInPopup(),
        },
        {
            type: 'core-in-suite-desktop',
            impl: new core_in_suite_desktop_1.CoreInSuiteDesktop(),
        },
    ],
    getInitTarget: (settings) => {
        if (settings.coreMode === 'iframe') {
            return 'iframe';
        }
        else if (settings.coreMode === 'popup') {
            return 'core-in-popup';
        }
        else if (settings.coreMode === 'suite-desktop') {
            return 'core-in-suite-desktop';
        }
        else {
            if (settings.coreMode && settings.coreMode !== 'auto') {
                console.warn(`Invalid coreMode: ${settings.coreMode}`);
            }
            return 'iframe';
        }
    },
    handleErrorFallback: async (errorCode) => {
        var _a, _b, _c, _d, _e;
        const env = (0, connectSettings_1.getEnv)();
        const isCoreModeDisabled = ((_a = impl.lastSettings) === null || _a === void 0 ? void 0 : _a.popup) === false || env === 'webextension';
        const isCoreModeAuto = ((_b = impl.lastSettings) === null || _b === void 0 ? void 0 : _b.coreMode) === 'auto' || ((_c = impl.lastSettings) === null || _c === void 0 ? void 0 : _c.coreMode) === undefined;
        if (!isCoreModeDisabled && isCoreModeAuto && IFRAME_ERRORS.includes(errorCode)) {
            const webUsbUnavailableInBrowser = !(navigator === null || navigator === void 0 ? void 0 : navigator.usb);
            const webUsbDisabledInSettings = ((_e = (_d = impl.lastSettings) === null || _d === void 0 ? void 0 : _d.transports) === null || _e === void 0 ? void 0 : _e.includes('WebUsbTransport')) === false;
            if (errorCode === 'Transport_Missing' &&
                (webUsbUnavailableInBrowser || webUsbDisabledInSettings)) {
                return false;
            }
            await impl.switchTarget('core-in-popup');
            return true;
        }
        return false;
    },
});
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
    renderWebUSBButton: impl.getTarget().renderWebUSBButton.bind(impl),
    disableWebUSB: impl.getTarget().disableWebUSB.bind(impl),
    requestWebUSBDevice: impl.getTarget().requestWebUSBDevice.bind(impl),
});
exports.default = TrezorConnect;
tslib_1.__exportStar(require("@trezor/connect/lib/exports"), exports);
//# sourceMappingURL=index.js.map