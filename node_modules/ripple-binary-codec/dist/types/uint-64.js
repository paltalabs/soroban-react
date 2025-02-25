"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UInt64 = void 0;
const uint_1 = require("./uint");
const bigInt = require("big-integer");
const big_integer_1 = require("big-integer");
const buffer_1 = require("buffer/");
const HEX_REGEX = /^[a-fA-F0-9]{1,16}$/;
const mask = bigInt(0x00000000ffffffff);
/**
 * Derived UInt class for serializing/deserializing 64 bit UInt
 */
class UInt64 extends uint_1.UInt {
    constructor(bytes) {
        super(bytes !== null && bytes !== void 0 ? bytes : UInt64.defaultUInt64.bytes);
    }
    static fromParser(parser) {
        return new UInt64(parser.read(UInt64.width));
    }
    /**
     * Construct a UInt64 object
     *
     * @param val A UInt64, hex-string, bigInt, or number
     * @returns A UInt64 object
     */
    static from(val) {
        if (val instanceof UInt64) {
            return val;
        }
        let buf = buffer_1.Buffer.alloc(UInt64.width);
        if (typeof val === 'number') {
            if (val < 0) {
                throw new Error('value must be an unsigned integer');
            }
            const number = bigInt(val);
            const intBuf = [buffer_1.Buffer.alloc(4), buffer_1.Buffer.alloc(4)];
            intBuf[0].writeUInt32BE(Number(number.shiftRight(32)), 0);
            intBuf[1].writeUInt32BE(Number(number.and(mask)), 0);
            return new UInt64(buffer_1.Buffer.concat(intBuf));
        }
        if (typeof val === 'string') {
            if (!HEX_REGEX.test(val)) {
                throw new Error(`${val} is not a valid hex-string`);
            }
            const strBuf = val.padStart(16, '0');
            buf = buffer_1.Buffer.from(strBuf, 'hex');
            return new UInt64(buf);
        }
        if ((0, big_integer_1.isInstance)(val)) {
            const intBuf = [buffer_1.Buffer.alloc(4), buffer_1.Buffer.alloc(4)];
            intBuf[0].writeUInt32BE(Number(val.shiftRight(bigInt(32))), 0);
            intBuf[1].writeUInt32BE(Number(val.and(mask)), 0);
            return new UInt64(buffer_1.Buffer.concat(intBuf));
        }
        throw new Error('Cannot construct UInt64 from given value');
    }
    /**
     * The JSON representation of a UInt64 object
     *
     * @returns a hex-string
     */
    toJSON() {
        return this.bytes.toString('hex').toUpperCase();
    }
    /**
     * Get the value of the UInt64
     *
     * @returns the number represented buy this.bytes
     */
    valueOf() {
        const msb = bigInt(this.bytes.slice(0, 4).readUInt32BE(0));
        const lsb = bigInt(this.bytes.slice(4).readUInt32BE(0));
        return msb.shiftLeft(bigInt(32)).or(lsb);
    }
    /**
     * Get the bytes representation of the UInt64 object
     *
     * @returns 8 bytes representing the UInt64
     */
    toBytes() {
        return this.bytes;
    }
}
exports.UInt64 = UInt64;
UInt64.width = 64 / 8; // 8
UInt64.defaultUInt64 = new UInt64(buffer_1.Buffer.alloc(UInt64.width));
//# sourceMappingURL=uint-64.js.map