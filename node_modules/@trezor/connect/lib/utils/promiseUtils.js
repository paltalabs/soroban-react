"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveAfter = void 0;
const utils_1 = require("@trezor/utils");
const resolveAfter = (msec, value) => {
    const { promise, reject, resolve } = (0, utils_1.createDeferred)();
    const timeout = setTimeout(resolve, msec, value);
    return {
        promise: promise.finally(() => clearTimeout(timeout)),
        reject,
    };
};
exports.resolveAfter = resolveAfter;
//# sourceMappingURL=promiseUtils.js.map