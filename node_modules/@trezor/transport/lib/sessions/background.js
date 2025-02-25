"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsBackground = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("@trezor/utils");
const types_1 = require("../types");
const ERRORS = tslib_1.__importStar(require("../errors"));
function typedObjectKeys(obj) {
    return Object.keys(obj);
}
const lockDuration = 1000 * 4;
class SessionsBackground extends utils_1.TypedEmitter {
    constructor() {
        super(...arguments);
        this.descriptors = {};
        this.pathInternalPathPublicMap = {};
        this.locksQueue = [];
        this.locksTimeoutQueue = [];
        this.lastSessionId = 0;
        this.lastPathId = 0;
    }
    handleMessage(message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                switch (message.type) {
                    case 'handshake':
                        result = this.handshake();
                        break;
                    case 'enumerateDone':
                        result = yield this.enumerateDone(message.payload);
                        break;
                    case 'acquireIntent':
                        result = yield this.acquireIntent(message.payload);
                        break;
                    case 'acquireDone':
                        result = yield this.acquireDone(message.payload);
                        break;
                    case 'getSessions':
                        result = yield this.getSessions();
                        break;
                    case 'releaseIntent':
                        result = yield this.releaseIntent(message.payload);
                        break;
                    case 'releaseDone':
                        result = yield this.releaseDone(message.payload);
                        break;
                    case 'getPathBySession':
                        result = this.getPathBySession(message.payload);
                        break;
                    case 'dispose':
                        this.dispose();
                        break;
                    default:
                        throw new Error(ERRORS.UNEXPECTED_ERROR);
                }
                result = JSON.parse(JSON.stringify(Object.assign(Object.assign({}, result), { id: message.id })));
                return result;
            }
            catch (err) {
                console.error('Session background error', err);
                return Object.assign(Object.assign({}, this.error(ERRORS.UNEXPECTED_ERROR)), { id: message.type });
            }
            finally {
                if (result && result.success && result.payload) {
                    if ('descriptors' in result.payload) {
                        const { descriptors } = result.payload;
                        this.emit('descriptors', Object.values(descriptors));
                    }
                    if ('releaseRequest' in result.payload && result.payload.releaseRequest) {
                        const { releaseRequest } = result.payload;
                        this.emit('releaseRequest', releaseRequest);
                    }
                }
            }
        });
    }
    handshake() {
        return this.success(undefined);
    }
    enumerateDone(payload) {
        const disconnectedDevices = typedObjectKeys(this.descriptors).filter(pathInternal => !payload.descriptors.find(d => d.path === pathInternal));
        disconnectedDevices.forEach(d => {
            delete this.descriptors[d];
            delete this.pathInternalPathPublicMap[d];
        });
        payload.descriptors.forEach(d => {
            if (!this.pathInternalPathPublicMap[d.path]) {
                this.pathInternalPathPublicMap[d.path] = (0, types_1.PathPublic)(`${(this.lastPathId += 1)}`);
            }
            if (!this.descriptors[d.path]) {
                this.descriptors[d.path] = Object.assign(Object.assign({}, d), { path: this.pathInternalPathPublicMap[d.path], session: null });
            }
        });
        return Promise.resolve(this.success({
            descriptors: Object.values(this.descriptors),
        }));
    }
    acquireIntent(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const pathInternal = this.getInternal(payload.path);
            if (!pathInternal) {
                return this.error(ERRORS.DESCRIPTOR_NOT_FOUND);
            }
            const previous = (_a = this.descriptors[pathInternal]) === null || _a === void 0 ? void 0 : _a.session;
            if (payload.previous && payload.previous !== previous) {
                return this.error(ERRORS.SESSION_WRONG_PREVIOUS);
            }
            if (!this.descriptors[pathInternal]) {
                return this.error(ERRORS.DESCRIPTOR_NOT_FOUND);
            }
            yield this.waitInQueue();
            if (previous !== ((_b = this.descriptors[pathInternal]) === null || _b === void 0 ? void 0 : _b.session)) {
                this.clearLock();
                return this.error(ERRORS.SESSION_WRONG_PREVIOUS);
            }
            this.lastSessionId++;
            const session = (0, types_1.Session)(`${this.lastSessionId}`);
            const releaseRequest = previous ? this.descriptors[pathInternal] : undefined;
            return this.success({ session, path: pathInternal, releaseRequest });
        });
    }
    acquireDone(payload) {
        this.clearLock();
        const pathInternal = this.getInternal(payload.path);
        if (!pathInternal || !this.descriptors[pathInternal]) {
            return this.error(ERRORS.DESCRIPTOR_NOT_FOUND);
        }
        this.descriptors[pathInternal].session = (0, types_1.Session)(`${this.lastSessionId}`);
        this.descriptors[pathInternal].sessionOwner = payload.sessionOwner;
        return Promise.resolve(this.success({
            descriptors: Object.values(this.descriptors),
        }));
    }
    releaseIntent(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pathResult = this.getPathBySession({ session: payload.session });
            if (!pathResult.success) {
                return pathResult;
            }
            const { path } = pathResult.payload;
            yield this.waitInQueue();
            return this.success({ path });
        });
    }
    releaseDone(payload) {
        this.descriptors[payload.path].session = null;
        this.descriptors[payload.path].sessionOwner = undefined;
        this.clearLock();
        return Promise.resolve(this.success({ descriptors: Object.values(this.descriptors) }));
    }
    getSessions() {
        return Promise.resolve(this.success({ descriptors: Object.values(this.descriptors) }));
    }
    getPathBySession({ session }) {
        const path = typedObjectKeys(this.descriptors).find(pathKey => { var _a; return ((_a = this.descriptors[pathKey]) === null || _a === void 0 ? void 0 : _a.session) === session; });
        if (!path) {
            return this.error(ERRORS.SESSION_NOT_FOUND);
        }
        return this.success({ path });
    }
    startLock() {
        const dfd = (0, utils_1.createDeferred)();
        const timeout = setTimeout(() => {
            dfd.resolve(undefined);
        }, lockDuration);
        this.locksQueue.push({ id: timeout, dfd });
        this.locksTimeoutQueue.push(timeout);
        return this.locksQueue.length - 1;
    }
    clearLock() {
        const lock = this.locksQueue[0];
        if (lock) {
            this.locksQueue[0].dfd.resolve(undefined);
            this.locksQueue.shift();
            clearTimeout(this.locksTimeoutQueue[0]);
            this.locksTimeoutQueue.shift();
        }
    }
    waitForUnlocked(myIndex) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (myIndex > 0) {
                const beforeMe = this.locksQueue.slice(0, myIndex);
                if (beforeMe.length) {
                    yield Promise.all(beforeMe.map(lock => lock.dfd.promise));
                }
            }
        });
    }
    waitInQueue() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const myIndex = this.startLock();
            yield this.waitForUnlocked(myIndex);
        });
    }
    success(payload) {
        return {
            success: true,
            payload,
        };
    }
    error(error) {
        return {
            success: false,
            error,
        };
    }
    getInternal(pathPublic) {
        return typedObjectKeys(this.pathInternalPathPublicMap).find(internal => this.pathInternalPathPublicMap[internal] === pathPublic);
    }
    dispose() {
        this.locksQueue.forEach(lock => clearTimeout(lock.id));
        this.locksTimeoutQueue.forEach(timeout => clearTimeout(timeout));
        this.descriptors = {};
        this.lastSessionId = 0;
        this.removeAllListeners();
    }
}
exports.SessionsBackground = SessionsBackground;
//# sourceMappingURL=background.js.map