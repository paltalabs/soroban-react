"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebextensionStateStorage = void 0;
const connect_common_1 = require("@trezor/connect-common");
class WebextensionStateStorage {
    constructor(origin) {
        this.origin = origin;
    }
    loadState(device) {
        var _a;
        if (!((_a = device.getState()) === null || _a === void 0 ? void 0 : _a.sessionId)) {
            const { preferredDevice } = connect_common_1.storage.loadForOrigin(this.origin) || {};
            if ((preferredDevice === null || preferredDevice === void 0 ? void 0 : preferredDevice.internalState) &&
                (preferredDevice === null || preferredDevice === void 0 ? void 0 : preferredDevice.internalStateExpiration) &&
                preferredDevice.internalStateExpiration > new Date().getTime()) {
                return { sessionId: preferredDevice.internalState };
            }
        }
        return undefined;
    }
    saveState(device, state) {
        var _a;
        const expirationDelay = Math.max(1000 * 60 * 15, (_a = device.features.auto_lock_delay_ms) !== null && _a !== void 0 ? _a : 0);
        connect_common_1.storage.saveForOrigin(store => {
            return {
                ...store,
                preferredDevice: store.preferredDevice
                    ? {
                        ...store.preferredDevice,
                        state: state.staticSessionId,
                        internalState: state.sessionId,
                        internalStateExpiration: Date.now() + expirationDelay,
                    }
                    : undefined,
            };
        }, this.origin);
    }
}
exports.WebextensionStateStorage = WebextensionStateStorage;
//# sourceMappingURL=StateStorage.js.map