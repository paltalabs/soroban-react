"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrezorConnect = exports.CoreInModule = void 0;
const tslib_1 = require("tslib");
const events_1 = tslib_1.__importDefault(require("events"));
const utils_1 = require("@trezor/utils");
const ERRORS = tslib_1.__importStar(require("../constants/errors"));
const events_2 = require("../events");
const factory_1 = require("../factory");
const debug_1 = require("../utils/debug");
const connectSettings_1 = require("../data/connectSettings");
class CoreInModule {
    constructor(onCoreHook) {
        this.eventEmitter = new events_1.default();
        this.boundOnCoreEvent = this.onCoreEvent.bind(this);
        this.initSettings = (settings = {}) => {
            var _a;
            this._settings = (0, connectSettings_1.parseConnectSettings)({
                ...this._settings,
                ...settings,
                popup: false,
            });
            if (!this._settings.manifest) {
                throw ERRORS.TypedError('Init_ManifestMissing');
            }
            if (!((_a = this._settings.transports) === null || _a === void 0 ? void 0 : _a.length)) {
                this._settings.transports = ['BridgeTransport'];
            }
        };
        this._settings = (0, connectSettings_1.parseConnectSettings)();
        this._log = (0, debug_1.initLog)('@trezor/connect-web');
        this._messagePromises = (0, utils_1.createDeferredManager)({ initialId: 1 });
        this.onCoreHook = onCoreHook;
    }
    async initCoreManager() {
        const { connectSrc } = this._settings;
        const { initCoreState, initTransport } = await Promise.resolve(`${`${connectSrc}js/core.js`}`).then(s => tslib_1.__importStar(require(s))).catch(_err => {
            this._log.error('_err', _err);
        });
        if (!initCoreState)
            return;
        if (initTransport) {
            this._log.debug('initiating transport with settings: ', this._settings);
            await initTransport(this._settings);
        }
        this._coreManager = initCoreState();
        return this._coreManager;
    }
    manifest(data) {
        this._settings = (0, connectSettings_1.parseConnectSettings)({
            ...this._settings,
            manifest: data,
        });
    }
    dispose() {
        this.eventEmitter.removeAllListeners();
        this._settings = (0, connectSettings_1.parseConnectSettings)();
        if (this._coreManager) {
            this._coreManager.dispose();
        }
        return Promise.resolve(undefined);
    }
    cancel(error) {
        if (this._coreManager) {
            const core = this._coreManager.get();
            if (!core) {
                throw ERRORS.TypedError('Runtime', 'postMessage: _core not found');
            }
            this.handleCoreMessage({
                type: events_2.POPUP.CLOSED,
                payload: error ? { error } : null,
            });
        }
    }
    handleCoreMessage(message) {
        const core = this._coreManager.get();
        if (!core) {
            throw ERRORS.TypedError('Runtime', 'postMessage: _core not found');
        }
        core.handleMessage(message);
    }
    onCoreEvent(rawMessage) {
        var _a;
        let message = (0, utils_1.cloneObject)(rawMessage);
        if (this.onCoreHook) {
            message = this.onCoreHook(message);
        }
        const { event, type, payload } = message;
        if (type === events_2.UI.REQUEST_UI_WINDOW) {
            (_a = this._coreManager.get()) === null || _a === void 0 ? void 0 : _a.handleMessage({ type: events_2.POPUP.HANDSHAKE });
            return;
        }
        if (type === events_2.POPUP.CANCEL_POPUP_REQUEST)
            return;
        switch (event) {
            case events_2.RESPONSE_EVENT: {
                const { id = 0, success, device } = message;
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
                this.eventEmitter.emit(event, message);
                this.eventEmitter.emit(type, payload);
                break;
            case events_2.TRANSPORT_EVENT:
                this.eventEmitter.emit(event, message);
                this.eventEmitter.emit(type, payload);
                break;
            case events_2.BLOCKCHAIN_EVENT:
                this.eventEmitter.emit(event, message);
                this.eventEmitter.emit(type, payload);
                break;
            case events_2.UI_EVENT:
                this.eventEmitter.emit(event, message);
                this.eventEmitter.emit(type, payload);
                break;
            default:
                this._log.warn('Undefined message', event, message);
        }
    }
    async init(settings = {}) {
        var _a;
        if (this._coreManager && (this._coreManager.get() || this._coreManager.getPending())) {
            throw ERRORS.TypedError('Init_AlreadyInitialized');
        }
        this._settings = (0, connectSettings_1.parseConnectSettings)({ ...this._settings, ...settings });
        if (!this._settings.manifest) {
            throw ERRORS.TypedError('Init_ManifestMissing');
        }
        this._settings.lazyLoad = true;
        if (!((_a = this._settings.transports) === null || _a === void 0 ? void 0 : _a.length)) {
            this._settings.transports = ['BridgeTransport', 'WebUsbTransport'];
        }
        if (!this._coreManager) {
            this._coreManager = await this.initCoreManager();
            await this._coreManager.getOrInit(this._settings, this.boundOnCoreEvent);
        }
        this._log.enabled = !!this._settings.debug;
    }
    initCore() {
        this.initSettings({ lazyLoad: false });
        return this._coreManager.getOrInit(this._settings, this.boundOnCoreEvent);
    }
    async call(params) {
        try {
            const { promiseId, promise } = this._messagePromises.create();
            const payload = (0, utils_1.cloneObject)(params);
            this.handleCoreMessage({
                type: events_2.IFRAME.CALL,
                id: promiseId,
                payload,
            });
            const response = (0, utils_1.cloneObject)(await promise);
            return response !== null && response !== void 0 ? response : (0, events_2.createErrorMessage)(ERRORS.TypedError('Method_NoResponse'));
        }
        catch (error) {
            this._log.error('call', error);
            return (0, events_2.createErrorMessage)(error);
        }
    }
    uiResponse(response) {
        const core = this._coreManager.get();
        if (!core) {
            throw ERRORS.TypedError('Runtime', 'postMessage: _core not found');
        }
        this.handleCoreMessage(response);
    }
    async requestLogin(params) {
        if (typeof params.callback === 'function') {
            const { callback } = params;
            const core = this._coreManager.get();
            const loginChallengeListener = async (event) => {
                const { data } = event;
                if (data && data.type === events_2.UI.LOGIN_CHALLENGE_REQUEST) {
                    try {
                        const payload = await callback();
                        this.handleCoreMessage({
                            type: events_2.UI.LOGIN_CHALLENGE_RESPONSE,
                            payload,
                        });
                    }
                    catch (error) {
                        this.handleCoreMessage({
                            type: events_2.UI.LOGIN_CHALLENGE_RESPONSE,
                            payload: error.message,
                        });
                    }
                }
            };
            core === null || core === void 0 ? void 0 : core.on(events_2.CORE_EVENT, loginChallengeListener);
            const response = await this.call({
                method: 'requestLogin',
                ...params,
                asyncChallenge: true,
                callback: null,
            });
            core === null || core === void 0 ? void 0 : core.removeListener(events_2.CORE_EVENT, loginChallengeListener);
            return response;
        }
        return this.call({ method: 'requestLogin', ...params });
    }
}
exports.CoreInModule = CoreInModule;
const impl = new CoreInModule();
exports.TrezorConnect = (0, factory_1.factory)({
    eventEmitter: impl.eventEmitter,
    manifest: impl.manifest.bind(impl),
    init: impl.init.bind(impl),
    call: impl.call.bind(impl),
    requestLogin: impl.requestLogin.bind(impl),
    uiResponse: impl.uiResponse.bind(impl),
    cancel: impl.cancel.bind(impl),
    dispose: impl.dispose.bind(impl),
});
//# sourceMappingURL=core-in-module.js.map