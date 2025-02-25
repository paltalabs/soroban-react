"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UInt8 = void 0;
const uint_1 = require("./uint");
const buffer_1 = require("buffer/");
/**
 * Derived UInt class for serializing/deserializing 8 bit UInt
 */
class UInt8 extends uint_1.UInt {
    constructor(bytes) {
        super(bytes !== null && bytes !== void 0 ? bytes : UInt8.defaultUInt8.bytes);
    }
    static fromParser(parser) {
        return new UInt8(parser.read(UInt8.width));
    }
    /**
     * Construct a UInt8 object from a number
     *
     * @param val UInt8 object or number
     */
    static from(val) {
        if (val instanceof UInt8) {
            return val;
        }
        if (typeof val === 'number') {
            const buf = buffer_1.Buffer.alloc(UInt8.width);
            buf.writeUInt8(val, 0);
            return new UInt8(buf);
        }
        throw new Error('Cannot construct UInt8 from given value');
    }
    /**
     * get the value of a UInt8 object
     *
     * @returns the number represented by this.bytes
     */
    valueOf() {
        return this.bytes.readUInt8(0);
    }
}
exports.UInt8 = UInt8;
UInt8.width = 8 / 8; // 1
UInt8.defaultUInt8 = new UInt8(buffer_1.Buffer.alloc(UInt8.width));
//# sourceMappingURL=uint-8.js.map