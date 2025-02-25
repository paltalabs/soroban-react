"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XRPLFaucetError = exports.LedgerVersionError = exports.MissingLedgerHistoryError = exports.PendingLedgerVersionError = exports.NotFoundError = exports.ValidationError = exports.ResponseFormatError = exports.TimeoutError = exports.RippledNotInitializedError = exports.DisconnectedError = exports.NotConnectedError = exports.RippledError = exports.ConnectionError = exports.UnexpectedError = exports.RippleError = void 0;
const util_1 = require("util");
const browserHacks = __importStar(require("./browser-hacks"));
class RippleError extends Error {
    constructor(message = '', data) {
        super(message);
        this.name = browserHacks.getConstructorName(this);
        this.message = message;
        this.data = data;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    toString() {
        let result = '[' + this.name + '(' + this.message;
        if (this.data) {
            result += ', ' + util_1.inspect(this.data);
        }
        result += ')]';
        return result;
    }
    inspect() {
        return this.toString();
    }
}
exports.RippleError = RippleError;
class RippledError extends RippleError {
}
exports.RippledError = RippledError;
class UnexpectedError extends RippleError {
}
exports.UnexpectedError = UnexpectedError;
class LedgerVersionError extends RippleError {
}
exports.LedgerVersionError = LedgerVersionError;
class ConnectionError extends RippleError {
}
exports.ConnectionError = ConnectionError;
class NotConnectedError extends ConnectionError {
}
exports.NotConnectedError = NotConnectedError;
class DisconnectedError extends ConnectionError {
}
exports.DisconnectedError = DisconnectedError;
class RippledNotInitializedError extends ConnectionError {
}
exports.RippledNotInitializedError = RippledNotInitializedError;
class TimeoutError extends ConnectionError {
}
exports.TimeoutError = TimeoutError;
class ResponseFormatError extends ConnectionError {
}
exports.ResponseFormatError = ResponseFormatError;
class ValidationError extends RippleError {
}
exports.ValidationError = ValidationError;
class XRPLFaucetError extends RippleError {
}
exports.XRPLFaucetError = XRPLFaucetError;
class NotFoundError extends RippleError {
    constructor(message = 'Not found') {
        super(message);
    }
}
exports.NotFoundError = NotFoundError;
class MissingLedgerHistoryError extends RippleError {
    constructor(message) {
        super(message || 'Server is missing ledger history in the specified range');
    }
}
exports.MissingLedgerHistoryError = MissingLedgerHistoryError;
class PendingLedgerVersionError extends RippleError {
    constructor(message) {
        super(message ||
            "maxLedgerVersion is greater than server's most recent" +
                ' validated ledger');
    }
}
exports.PendingLedgerVersionError = PendingLedgerVersionError;
//# sourceMappingURL=errors.js.map