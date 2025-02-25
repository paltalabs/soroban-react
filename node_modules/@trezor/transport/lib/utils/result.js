"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownError = exports.error = exports.success = void 0;
const errors_1 = require("../errors");
const success = (payload) => ({
    success: true,
    payload,
});
exports.success = success;
const error = ({ error, message }) => ({
    success: false,
    error,
    message,
});
exports.error = error;
const unknownError = (err, expectedErrors = []) => {
    const expectedErr = expectedErrors.find(eE => eE === err.message);
    if (expectedErr) {
        return (0, exports.error)({ error: expectedErr });
    }
    return {
        success: false,
        error: errors_1.UNEXPECTED_ERROR,
        message: err.message,
    };
};
exports.unknownError = unknownError;
//# sourceMappingURL=result.js.map