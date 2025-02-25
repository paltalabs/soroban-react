"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptWord = exports.promptPin = exports.promptPassphrase = exports.cancelPrompt = void 0;
const transport_1 = require("@trezor/transport");
const constants_1 = require("../constants");
const events_1 = require("../events");
const cancelPrompt = (device, expectResponse = true) => {
    const session = device.getLocalSession();
    if (!session) {
        return Promise.resolve({
            success: false,
            error: transport_1.TRANSPORT_ERROR.SESSION_NOT_FOUND,
        });
    }
    const cancelArgs = {
        session,
        name: 'Cancel',
        data: {},
        protocol: device.protocol,
    };
    return expectResponse ? device.transport.call(cancelArgs) : device.transport.send(cancelArgs);
};
exports.cancelPrompt = cancelPrompt;
const prompt = (event, ...[device, ...args]) => {
    return new Promise((resolve, reject) => {
        const cancelAndReject = (error) => (0, exports.cancelPrompt)(device).then(onCancel => {
            var _a;
            return reject(error ||
                new Error(onCancel.success
                    ? (_a = onCancel.payload) === null || _a === void 0 ? void 0 : _a.message.message
                    : onCancel.error));
        });
        if (device.listenerCount(event) > 0) {
            device.setCancelableAction(cancelAndReject);
            const callback = (...[response, error]) => {
                device.clearCancelableAction();
                if (error || response == null) {
                    cancelAndReject(error);
                }
                else {
                    resolve(response);
                }
            };
            const emitArgs = [event, device, ...args, callback];
            device.emit(...emitArgs);
        }
        else {
            cancelAndReject(constants_1.ERRORS.TypedError('Runtime', `${event} callback not configured`));
        }
    });
};
const promptPassphrase = (device) => {
    return prompt(events_1.DEVICE.PASSPHRASE, device);
};
exports.promptPassphrase = promptPassphrase;
const promptPin = (device, type) => {
    return prompt(events_1.DEVICE.PIN, device, type);
};
exports.promptPin = promptPin;
const promptWord = (device, type) => {
    return prompt(events_1.DEVICE.WORD, device, type);
};
exports.promptWord = promptWord;
//# sourceMappingURL=prompts.js.map