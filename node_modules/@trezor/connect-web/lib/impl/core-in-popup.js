"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrezorConnect = exports.CoreInPopup = void 0;
const tslib_1 = require("tslib");
const events_1 = tslib_1.__importDefault(require("events"));
const events_2 = require("@trezor/connect/lib/events");
const ERRORS = tslib_1.__importStar(require("@trezor/connect/lib/constants/errors"));
const factory_1 = require("@trezor/connect/lib/factory");
const debug_1 = require("@trezor/connect/lib/utils/debug");
const utils_1 = require("@trezor/utils");
const connectSettings_1 = require("../connectSettings");
const popup = tslib_1.__importStar(require("../popup"));
class CoreInPopup {
    constructor() {
        this.eventEmitter = new events_1.default();
        this._settings = (0, connectSettings_1.parseConnectSettings)();
        this.logger = (0, debug_1.initLog)('@trezor/connect-web');
        this.popupManagerLogger = (0, debug_1.initLog)('@trezor/connect-web/popupManager');
    }
    logWriterFactory(popupManager) {
        return {
            add: (message) => {
                popupManager.channel.postMessage({
                    event: events_2.UI_EVENT,
                    type: events_2.IFRAME.LOG,
                    payload: message,
                }, { usePromise: false, useQueue: true });
            },
        };
    }
    manifest(data) {
        this._settings = (0, connectSettings_1.parseConnectSettings)(Object.assign(Object.assign({}, this._settings), { manifest: data }));
    }
    dispose() {
        this.eventEmitter.removeAllListeners();
        this._settings = (0, connectSettings_1.parseConnectSettings)();
        if (this._popupManager) {
            this._popupManager.close();
        }
        return Promise.resolve(undefined);
    }
    cancel(error) {
        if (this._popupManager) {
            this._popupManager.emit(events_2.POPUP.CLOSED, error);
        }
    }
    init(settings) {
        var _a, _b;
        const oldSettings = (0, connectSettings_1.parseConnectSettings)(Object.assign({}, this._settings));
        const newSettings = (0, connectSettings_1.parseConnectSettings)(Object.assign(Object.assign({}, this._settings), settings));
        if (!((_a = newSettings.transports) === null || _a === void 0 ? void 0 : _a.length)) {
            newSettings.transports = ['BridgeTransport', 'WebUsbTransport'];
        }
        newSettings.useCoreInPopup = true;
        if (typeof window !== 'undefined' && ((_b = window === null || window === void 0 ? void 0 : window.location) === null || _b === void 0 ? void 0 : _b.origin)) {
            newSettings.origin = window.location.origin;
        }
        const equalSettings = JSON.stringify(oldSettings) === JSON.stringify(newSettings);
        this._settings = newSettings;
        if (!this._popupManager || !equalSettings) {
            if (this._popupManager)
                this._popupManager.close();
            this._popupManager = new popup.PopupManager(this._settings, {
                logger: this.popupManagerLogger,
            });
            (0, debug_1.setLogWriter)(() => this.logWriterFactory(this._popupManager));
        }
        this.logger.enabled = !!settings.debug;
        if (!this._settings.manifest) {
            throw ERRORS.TypedError('Init_ManifestMissing');
        }
        this.logger.debug('initiated');
        return Promise.resolve();
    }
    async call(params) {
        this.logger.debug('call', params);
        if (!this._popupManager) {
            return (0, events_2.createErrorMessage)(ERRORS.TypedError('Init_NotInitialized'));
        }
        if (this._settings.popup) {
            await this._popupManager.request();
        }
        const popupClosed = (0, utils_1.createDeferred)();
        const popupClosedHandler = () => {
            this.logger.log('Popup closed during initialization');
            popupClosed.reject(ERRORS.TypedError('Method_Interrupted'));
        };
        this._popupManager.once(events_2.POPUP.CLOSED, popupClosedHandler);
        try {
            this.logger.debug('call: popup initialing');
            await Promise.race([popupClosed.promise, this.callInit()]);
            this.logger.debug('call: popup initialized');
            const response = await this._popupManager.channel.postMessage({
                type: events_2.IFRAME.CALL,
                payload: params,
            });
            this.logger.debug('call: response: ', response);
            if (response) {
                if (this._popupManager && response.success) {
                    this._popupManager.clear();
                }
                return {
                    success: response.success,
                    payload: response.payload,
                    device: response.device,
                };
            }
            throw ERRORS.TypedError('Method_NoResponse');
        }
        catch (error) {
            this.logger.error('call: error', error);
            this._popupManager.clear(false);
            return (0, events_2.createErrorMessage)(error);
        }
        finally {
            this._popupManager.removeListener(events_2.POPUP.CLOSED, popupClosedHandler);
        }
    }
    async callInit() {
        var _a, _b;
        if (!this._popupManager) {
            throw ERRORS.TypedError('Init_NotInitialized');
        }
        await this._popupManager.channel.init();
        if (this._settings.env === 'webextension') {
            await ((_a = this._popupManager.popupPromise) === null || _a === void 0 ? void 0 : _a.promise);
            this._popupManager.channel.postMessage({
                type: events_2.POPUP.INIT,
                payload: {
                    settings: this._settings,
                    useCore: true,
                },
            });
        }
        await ((_b = this._popupManager.handshakePromise) === null || _b === void 0 ? void 0 : _b.promise);
    }
    uiResponse(response) {
        var _a, _b;
        const { type, payload } = response;
        (_b = (_a = this._popupManager) === null || _a === void 0 ? void 0 : _a.channel) === null || _b === void 0 ? void 0 : _b.postMessage({ event: events_2.UI_EVENT, type, payload });
    }
    renderWebUSBButton() { }
    requestLogin() {
        throw ERRORS.TypedError('Method_InvalidPackage');
    }
    disableWebUSB() {
        throw ERRORS.TypedError('Method_InvalidPackage');
    }
    requestWebUSBDevice() {
        throw ERRORS.TypedError('Method_InvalidPackage');
    }
}
exports.CoreInPopup = CoreInPopup;
const impl = new CoreInPopup();
exports.TrezorConnect = (0, factory_1.factory)({
    eventEmitter: impl.eventEmitter,
    init: impl.init.bind(impl),
    call: impl.call.bind(impl),
    manifest: impl.manifest.bind(impl),
    requestLogin: impl.requestLogin.bind(impl),
    uiResponse: impl.uiResponse.bind(impl),
    cancel: impl.cancel.bind(impl),
    dispose: impl.dispose.bind(impl),
});
//# sourceMappingURL=core-in-popup.js.map