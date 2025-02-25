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
exports.serverInfo = exports.validate = exports.errors = exports.constants = exports.ensureClassicAddress = void 0;
const constants = __importStar(require("./constants"));
exports.constants = constants;
const errors = __importStar(require("./errors"));
exports.errors = errors;
const validate = __importStar(require("./validate"));
exports.validate = validate;
const serverInfo = __importStar(require("./serverinfo"));
exports.serverInfo = serverInfo;
const ripple_address_codec_1 = require("ripple-address-codec");
function ensureClassicAddress(account) {
    if (ripple_address_codec_1.isValidXAddress(account)) {
        const { classicAddress, tag } = ripple_address_codec_1.xAddressToClassicAddress(account);
        if (tag !== false) {
            throw new Error('This command does not support the use of a tag. Use an address without a tag.');
        }
        return classicAddress;
    }
    else {
        return account;
    }
}
exports.ensureClassicAddress = ensureClassicAddress;
var utils_1 = require("./utils");
Object.defineProperty(exports, "dropsToXrp", { enumerable: true, get: function () { return utils_1.dropsToXrp; } });
Object.defineProperty(exports, "xrpToDrops", { enumerable: true, get: function () { return utils_1.xrpToDrops; } });
Object.defineProperty(exports, "toRippledAmount", { enumerable: true, get: function () { return utils_1.toRippledAmount; } });
Object.defineProperty(exports, "removeUndefined", { enumerable: true, get: function () { return utils_1.removeUndefined; } });
Object.defineProperty(exports, "convertKeysFromSnakeCaseToCamelCase", { enumerable: true, get: function () { return utils_1.convertKeysFromSnakeCaseToCamelCase; } });
Object.defineProperty(exports, "iso8601ToRippleTime", { enumerable: true, get: function () { return utils_1.iso8601ToRippleTime; } });
Object.defineProperty(exports, "rippleTimeToISO8601", { enumerable: true, get: function () { return utils_1.rippleTimeToISO8601; } });
var connection_1 = require("./connection");
Object.defineProperty(exports, "Connection", { enumerable: true, get: function () { return connection_1.Connection; } });
var txflags_1 = require("./txflags");
Object.defineProperty(exports, "txFlags", { enumerable: true, get: function () { return txflags_1.txFlags; } });
//# sourceMappingURL=index.js.map