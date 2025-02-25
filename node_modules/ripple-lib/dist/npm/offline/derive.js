"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveXAddress = exports.deriveAddress = exports.deriveKeypair = void 0;
const ripple_keypairs_1 = require("ripple-keypairs");
Object.defineProperty(exports, "deriveKeypair", { enumerable: true, get: function () { return ripple_keypairs_1.deriveKeypair; } });
Object.defineProperty(exports, "deriveAddress", { enumerable: true, get: function () { return ripple_keypairs_1.deriveAddress; } });
const ripple_address_codec_1 = require("ripple-address-codec");
function deriveXAddress(options) {
    const classicAddress = ripple_keypairs_1.deriveAddress(options.publicKey);
    return ripple_address_codec_1.classicAddressToXAddress(classicAddress, options.tag, options.test);
}
exports.deriveXAddress = deriveXAddress;
//# sourceMappingURL=derive.js.map