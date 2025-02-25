"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UInt32 = void 0;
const uint_1 = require("./uint");
const buffer_1 = require("buffer/");
/**
 * Derived UInt class for serializing/deserializing 32 bit UInt
 */
class UInt32 extends uint_1.UInt {
    constructor(bytes) {
        super(bytes !== null && bytes !== void 0 ? bytes : UInt32.defaultUInt32.bytes);
    }
    static fromParser(parser) {
        return new UInt32(parser.read(UInt32.width));
    }
    /**
     * Construct a UInt32 object from a number
     *
     * @param val UInt32 object or number
     */
    static from(val) {
        if (val instanceof UInt32) {
            return val;
        }
        const buf = buffer_1.Buffer.alloc(UInt32.width);
        if (typeof val === 'string') {
            const num = Number.parseInt(val);
            buf.writeUInt32BE(num, 0);
            return new UInt32(buf);
        }
        if (typeof val === 'number') {
            buf.writeUInt32BE(val, 0);
            return new UInt32(buf);
        }
        throw new Error('Cannot construct UInt32 from given value');
    }
    /**
     * get the value of a UInt32 object
     *
     * @returns the number represented by this.bytes
     */
    valueOf() {
        return this.bytes.readUInt32BE(0);
    }
}
exports.UInt32 = UInt32;
UInt32.width = 32 / 8; // 4
UInt32.defaultUInt32 = new UInt32(buffer_1.Buffer.alloc(UInt32.width));
//# sourceMappingURL=uint-32.js.map