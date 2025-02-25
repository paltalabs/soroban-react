"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrezorConnect = exports.CoreInIframe = void 0;
const tslib_1 = require("tslib");
const events_1 = tslib_1.__importDefault(require("events"));
const ERRORS = tslib_1.__importStar(require("@trezor/connect/lib/constants/errors"));
const events_2 = require("@trezor/connect/lib/events");
const factory_1 = require("@trezor/connect/lib/factory");
const debug_1 = require("@trezor/connect/lib/utils/debug");
const config_1 = require("@trezor/connect/lib/data/config");
const createDeferredManager_1 = require("@trezor/utils/lib/createDeferredManager");
const iframe = tslib_1.__importStar(require("../iframe"));
const popup = tslib_1.__importStar(require("../popup"));
const button_1 = tslib_1.__importDefault(require("../webusb/button"));
const connectSettings_1 = require("../connectSettings");
class CoreInIframe {
    constructor() {
        this.eventEmitter = new events_1.default();
        this.boundHandleMessage = this.handleMessage.bind(this);
        this.boundDispose = this.dispose.bind(this);
        this._settings = (0, connectSettings_1.parseConnectSettings)();
        this._log = (0, debug_1.initLog)('@trezor/connect-web');
        this._messagePromises = (0, createDeferredManager_1.createDeferredManager)({ initialId: 1 });
    }
    initPopupManager() {
        const pm = new popup.PopupManager(this._settings, { logger: this._log });
        pm.on(events_2.POPUP.CLOSED, (error) => {
            iframe.postMessage({
                type: events_2.POPUP.CLOSED,
                payload: error ? { error } : null,
            });
        });
        return pm;
    }
    manifest(data) {
        this._settings = (0, connectSettings_1.parseConnectSettings)(Object.assign(Object.assign({}, this._settings), { manifest: data }));
    }
    dispose() {
        this.eventEmitter.removeAllListeners();
        iframe.dispose();
        this._settings = (0, connectSettings_1.parseConnectSettings)();
        if (this._popupManager) {
            this._popupManager.close();
        }
        window.removeEventListener('message', this.boundHandleMessage);
        window.removeEventListener('unload', this.boundDispose);
        return Promise.resolve(undefined);
    }
    cancel(error) {
        if (this._popupManager) {
            this._popupManager.emit(events_2.POPUP.CLOSED, error);
        }
    }
    handleMessage(messageEvent) {
        if (messageEvent.origin !== iframe.origin)
            return;
        const message = (0, events_2.parseMessage)(messageEvent.data);
        this._log.log('handleMessage', message);
        switch (message.event) {
            case events_2.RESPONSE_EVENT: {
                const { id = 0, success, payload, device } = message;
                const resolved = this._messagePromises.resolve(id, {
                    id,
                    success,
                    payload,
                    device,
                });
                if (!resolved)
                    this._log.warn(`Unknown message id ${id}`);
                break;
            }
            case events_2.DEVICE_EVENT:
                this.eventEmitter.emit(message.event, message);
                this.eventEmitter.emit(message.type, message.payload);
                break;
            case events_2.TRANSPORT_EVENT:
                this.eventEmitter.emit(message.event, message);
                this.eventEmitter.emit(message.type, message.payload);
                break;
            case events_2.BLOCKCHAIN_EVENT:
                this.eventEmitter.emit(message.event, message);
                this.eventEmitter.emit(message.type, message.payload);
                break;
            case events_2.UI_EVENT:
                if (message.type === events_2.IFRAME.BOOTSTRAP) {
                    iframe.clearTimeout();
                    break;
                }
                if (message.type === events_2.IFRAME.LOADED) {
                    iframe.initPromise.resolve();
                }
                if (message.type === events_2.IFRAME.ERROR) {
                    iframe.initPromise.reject(message.payload.error);
                }
                this.eventEmitter.emit(message.event, message);
                this.eventEmitter.emit(message.type, message.payload);
                break;
            default:
                this._log.log('Undefined message', messageEvent.data);
        }
    }
    async init(settings) {
        var _a, _b;
        if (iframe.instance) {
            throw ERRORS.TypedError('Init_AlreadyInitialized');
        }
        this._settings = (0, connectSettings_1.parseConnectSettings)(Object.assign(Object.assign({}, this._settings), settings));
        if (!this._settings.manifest) {
            throw ERRORS.TypedError('Init_ManifestMissing');
        }
        if (!((_a = this._settings.transports) === null || _a === void 0 ? void 0 : _a.length)) {
            this._settings.transports = ['BridgeTransport', 'WebUsbTransport'];
        }
        if (this._settings.lazyLoad) {
            this._settings.lazyLoad = false;
            return;
        }
        if (!this._popupManager) {
            this._popupManager = this.initPopupManager();
        }
        this._log.enabled = !!this._settings.debug;
        window.addEventListener('message', this.boundHandleMessage);
        window.addEventListener('unload', this.boundDispose);
        await iframe.init(this._settings);
        if (this._settings.coreMode === 'auto') {
            const { promiseId, promise } = this._messagePromises.create();
            this._log.debug('coreMode = auto, Checking bridge availability');
            iframe.postMessage({ id: promiseId, type: events_2.TRANSPORT.GET_INFO });
            const response = await promise;
            this._log.debug('Bridge availability response', response);
            if (response.payload === undefined &&
                navigator.usb &&
                ((_b = this._settings.transports) === null || _b === void 0 ? void 0 : _b.includes('WebUsbTransport'))) {
                throw ERRORS.TypedError('Transport_Missing');
            }
        }
        if (this._settings.sharedLogger !== false) {
            iframe.initIframeLogger();
        }
    }
    async call(params) {
        if (!iframe.instance && !iframe.timeout) {
            this._settings = (0, connectSettings_1.parseConnectSettings)(this._settings);
            if (!this._settings.manifest) {
                return (0, events_2.createErrorMessage)(ERRORS.TypedError('Init_ManifestMissing'));
            }
            if (!this._popupManager) {
                this._popupManager = this.initPopupManager();
            }
            try {
                await this.init(this._settings);
            }
            catch (error) {
                if (this._popupManager) {
                    this._popupManager.clear();
                }
                return (0, events_2.createErrorMessage)(error);
            }
        }
        if (iframe.timeout) {
            await iframe.initPromise.promise;
        }
        if (iframe.error) {
            return (0, events_2.createErrorMessage)(iframe.error);
        }
        if (this._settings.popup && this._popupManager) {
            this._popupManager.request();
        }
        try {
            const { promiseId, promise } = this._messagePromises.create();
            iframe.postMessage({ id: promiseId, type: events_2.IFRAME.CALL, payload: params });
            const response = await promise;
            if (response) {
                if (!response.success &&
                    response.payload.code !== 'Device_CallInProgress' &&
                    this._popupManager) {
                    this._popupManager.unlock();
                }
                return response;
            }
            if (this._popupManager) {
                this._popupManager.unlock();
            }
            return (0, events_2.createErrorMessage)(ERRORS.TypedError('Method_NoResponse'));
        }
        catch (error) {
            this._log.error('__call error', error);
            if (this._popupManager) {
                this._popupManager.clear(false);
            }
            return (0, events_2.createErrorMessage)(error);
        }
    }
    uiResponse(response) {
        if (!iframe.instance) {
            throw ERRORS.TypedError('Init_NotInitialized');
        }
        iframe.postMessage(response);
    }
    renderWebUSBButton(className) {
        (0, button_1.default)(className, this._settings.webusbSrc);
    }
    async requestLogin(params) {
        if (typeof params.callback === 'function') {
            const { callback } = params;
            const loginChallengeListener = async (event) => {
                const { data } = event;
                if (data && data.type === events_2.UI.LOGIN_CHALLENGE_REQUEST) {
                    try {
                        const payload = await callback();
                        iframe.postMessage({
                            type: events_2.UI.LOGIN_CHALLENGE_RESPONSE,
                            payload,
                        });
                    }
                    catch (error) {
                        iframe.postMessage({
                            type: events_2.UI.LOGIN_CHALLENGE_RESPONSE,
                            payload: error.message,
                        });
                    }
                }
            };
            window.addEventListener('message', loginChallengeListener, false);
            const response = await this.call(Object.assign(Object.assign({ method: 'requestLogin' }, params), { asyncChallenge: true, callback: null }));
            window.removeEventListener('message', loginChallengeListener);
            return response;
        }
        return this.call(Object.assign({ method: 'requestLogin' }, params));
    }
    disableWebUSB() {
        if (!iframe.instance) {
            throw ERRORS.TypedError('Init_NotInitialized');
        }
        iframe.postMessage({ type: events_2.TRANSPORT.DISABLE_WEBUSB });
    }
    async requestWebUSBDevice() {
        try {
            await window.navigator.usb.requestDevice({ filters: config_1.config.webusb });
            iframe.postMessage({ type: events_2.TRANSPORT.REQUEST_DEVICE });
        }
        catch (_a) {
        }
    }
}
exports.CoreInIframe = CoreInIframe;
const impl = new CoreInIframe();
exports.TrezorConnect = (0, factory_1.factory)({
    eventEmitter: impl.eventEmitter,
    init: impl.init.bind(impl),
    call: impl.call.bind(impl),
    manifest: impl.manifest.bind(impl),
    requestLogin: impl.requestLogin.bind(impl),
    uiResponse: impl.uiResponse.bind(impl),
    cancel: impl.cancel.bind(impl),
    dispose: impl.dispose.bind(impl),
}, {
    renderWebUSBButton: impl.renderWebUSBButton.bind(impl),
    disableWebUSB: impl.disableWebUSB.bind(impl),
    requestWebUSBDevice: impl.requestWebUSBDevice.bind(impl),
});
//# sourceMappingURL=core-in-iframe.js.map