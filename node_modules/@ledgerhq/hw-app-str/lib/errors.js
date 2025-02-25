"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StellarDataTooLargeError = exports.StellarUserRefusedError = exports.StellarDataParsingFailedError = exports.StellarHashSigningNotEnabledError = void 0;
const errors_1 = require("@ledgerhq/errors");
/**
 * Error thrown when hash signing is not enabled on the device.
 */
exports.StellarHashSigningNotEnabledError = (0, errors_1.createCustomErrorClass)("StellarHashSigningNotEnabledError");
/**
 * Error thrown when data parsing fails.
 *
 * For example, when parsing the transaction fails, this error is thrown.
 */
exports.StellarDataParsingFailedError = (0, errors_1.createCustomErrorClass)("StellarDataParsingFailedError");
/**
 * Error thrown when the user refuses the request on the device.
 */
exports.StellarUserRefusedError = (0, errors_1.createCustomErrorClass)("StellarUserRefusedError");
/**
 * Error thrown when the data is too large to be processed by the device.
 */
exports.StellarDataTooLargeError = (0, errors_1.createCustomErrorClass)("StellarDataTooLargeError");
//# sourceMappingURL=errors.js.map