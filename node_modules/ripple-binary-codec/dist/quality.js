"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quality = void 0;
const types_1 = require("./types");
const decimal_js_1 = require("decimal.js");
const bigInt = require("big-integer");
const buffer_1 = require("buffer/");
/**
 * class for encoding and decoding quality
 */
class quality {
    /**
     * Encode quality amount
     *
     * @param arg string representation of an amount
     * @returns Serialized quality
     */
    static encode(quality) {
        const decimal = new decimal_js_1.Decimal(quality);
        const exponent = decimal.e - 15;
        const qualityString = decimal.times(`1e${-exponent}`).abs().toString();
        const bytes = types_1.coreTypes.UInt64.from(bigInt(qualityString)).toBytes();
        bytes[0] = exponent + 100;
        return bytes;
    }
    /**
     * Decode quality amount
     *
     * @param arg hex-string denoting serialized quality
     * @returns deserialized quality
     */
    static decode(quality) {
        const bytes = buffer_1.Buffer.from(quality, 'hex').slice(-8);
        const exponent = bytes[0] - 100;
        const mantissa = new decimal_js_1.Decimal(`0x${bytes.slice(1).toString('hex')}`);
        return mantissa.times(`1e${exponent}`);
    }
}
exports.quality = quality;
//# sourceMappingURL=quality.js.map