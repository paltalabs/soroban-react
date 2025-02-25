"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const utils_1 = require("@trezor/utils");
const storageVersion = 2;
const storageName = `storage_v${storageVersion}`;
const getEmptyState = () => ({
    origin: {},
});
let memoryStorage = getEmptyState();
const getPermanentStorage = () => {
    const ls = localStorage.getItem(storageName);
    return ls ? JSON.parse(ls) : getEmptyState();
};
class Storage extends utils_1.TypedEmitter {
    save(getNewState, temporary = false) {
        if (temporary || !global.window) {
            memoryStorage = getNewState(memoryStorage);
            return;
        }
        try {
            const newState = getNewState(getPermanentStorage());
            localStorage.setItem(storageName, JSON.stringify(newState));
            this.emit('changed', newState);
        }
        catch (_a) {
            console.warn('long term storage not available');
            memoryStorage = getNewState(memoryStorage);
        }
    }
    saveForOrigin(getNewState, origin, temporary = false) {
        this.save(state => {
            var _a;
            return (Object.assign(Object.assign({}, state), { origin: Object.assign(Object.assign({}, state.origin), { [origin]: getNewState(((_a = state.origin) === null || _a === void 0 ? void 0 : _a[origin]) || {}) }) }));
        }, temporary);
    }
    load(temporary = false) {
        var _a;
        if (temporary || !((_a = global === null || global === void 0 ? void 0 : global.window) === null || _a === void 0 ? void 0 : _a.localStorage)) {
            return memoryStorage;
        }
        try {
            return getPermanentStorage();
        }
        catch (_b) {
            console.warn('long term storage not available');
            return memoryStorage;
        }
    }
    loadForOrigin(origin, temporary = false) {
        var _a;
        const state = this.load(temporary);
        return ((_a = state.origin) === null || _a === void 0 ? void 0 : _a[origin]) || {};
    }
}
const storage = new Storage();
exports.storage = storage;
//# sourceMappingURL=storage.js.map