"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractTransport = exports.isTransportInstance = void 0;
const tslib_1 = require("tslib");
const protobuf = tslib_1.__importStar(require("protobufjs/light"));
const utils_1 = require("@trezor/utils");
const result_1 = require("../utils/result");
const ERRORS = tslib_1.__importStar(require("../errors"));
const constants_1 = require("../constants");
const isTransportInstance = (transport) => {
    const requiredMethods = [
        'init',
        'enumerate',
        'listen',
        'acquire',
        'release',
        'send',
        'receive',
        'call',
    ];
    if (transport && typeof transport === 'object') {
        return !requiredMethods.some(m => typeof transport[m] !== 'function');
    }
    return false;
};
exports.isTransportInstance = isTransportInstance;
const getKey = ({ path, product }) => `${path}${product}`;
class TransportEmitter extends utils_1.TypedEmitter {
}
class AbstractTransport extends TransportEmitter {
    constructor({ messages, logger, id }) {
        super();
        this.isOutdated = false;
        this.version = '';
        this.stopped = true;
        this.listening = false;
        this.unknownError = (err, expectedErrors = []) => {
            var _a;
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.error(this.name, 'unexpected error: ', err);
            return (0, result_1.unknownError)(typeof err !== 'string' ? err : new Error(err), expectedErrors);
        };
        this.scheduleAction = (action, params, errors = []) => {
            const { signal, clear } = this.mergeAbort(params === null || params === void 0 ? void 0 : params.signal);
            return (0, utils_1.scheduleAction)(action, Object.assign(Object.assign({ timeout: constants_1.ACTION_TIMEOUT }, params), { signal }))
                .catch(err => (0, result_1.unknownError)(err, [ERRORS.ABORTED_BY_TIMEOUT, ERRORS.ABORTED_BY_SIGNAL, ...errors]))
                .finally(clear);
        };
        this.descriptors = [];
        this.messages = protobuf.Root.fromJSON(messages || {});
        this.abortController = new AbortController();
        this.logger = logger;
        this.id = id;
    }
    stop() {
        this.removeAllListeners();
        this.stopped = true;
        this.listening = false;
        this.abortController.abort();
        this.abortController = new AbortController();
        this.descriptors = [];
    }
    handleDescriptorsChange(nextDescriptors) {
        if (this.stopped) {
            return;
        }
        const oldDescriptors = new Map(this.descriptors.map(d => [getKey(d), d]));
        const newDescriptors = new Map(nextDescriptors.map(d => [getKey(d), d]));
        this.descriptors
            .filter(d => !newDescriptors.has(getKey(d)))
            .forEach(descriptor => this.emit(constants_1.TRANSPORT.DEVICE_DISCONNECTED, descriptor));
        nextDescriptors.forEach(descriptor => {
            const prevDescriptor = oldDescriptors.get(getKey(descriptor));
            if (!prevDescriptor) {
                this.emit(constants_1.TRANSPORT.DEVICE_CONNECTED, descriptor);
            }
            else if (prevDescriptor.session !== descriptor.session) {
                this.emit(constants_1.TRANSPORT.DEVICE_SESSION_CHANGED, descriptor);
            }
        });
        this.descriptors = nextDescriptors;
    }
    getDescriptor(path) {
        return this.descriptors.find(d => d.path === path);
    }
    getMessage(message = 'GetFeatures') {
        return !!this.messages.get(message);
    }
    updateMessages(messages) {
        this.messages = protobuf.Root.fromJSON(messages);
    }
    success(payload) {
        return (0, result_1.success)(payload);
    }
    error(payload) {
        return (0, result_1.error)(payload);
    }
    mergeAbort(signal) {
        if (!signal) {
            return { signal: this.abortController.signal, clear: () => { } };
        }
        const controller = new AbortController();
        const onAbort = () => controller.abort();
        signal.addEventListener('abort', onAbort);
        this.abortController.signal.addEventListener('abort', onAbort);
        const clear = () => {
            signal.removeEventListener('abort', onAbort);
            this.abortController.signal.removeEventListener('abort', onAbort);
        };
        return { signal: controller.signal, clear };
    }
}
exports.AbstractTransport = AbstractTransport;
//# sourceMappingURL=abstract.js.map