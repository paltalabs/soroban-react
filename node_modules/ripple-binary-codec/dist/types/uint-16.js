"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UInt16 = void 0;
const uint_1 = require("./uint");
const buffer_1 = require("buffer/");
/**
 * Derived UInt class for serializing/deserializing 16 bit UInt
 */
class UInt16 extends uint_1.UInt {
    constructor(bytes) {
        super(bytes !== null && bytes !== void 0 ? bytes : UInt16.defaultUInt16.bytes);
    }
    static fromParser(parser) {
        return new UInt16(parser.read(UInt16.width));
    }
    /**
     * Construct a UInt16 object from a number
     *
     * @param val UInt16 object or number
     */
    static from(val) {
        if (val instanceof UInt16) {
            return val;
        }
        if (typeof val === 'number') {
            const buf = buffer_1.Buffer.alloc(UInt16.width);
            buf.writeUInt16BE(val, 0);
            return new UInt16(buf);
        }
        throw new Error('Can not construct UInt16 with given value');
    }
    /**
     * get the value of a UInt16 object
     *
     * @returns the number represented by this.bytes
     */
    valueOf() {
        return this.bytes.readUInt16BE(0);
    }
}
exports.UInt16 = UInt16;
UInt16.width = 16 / 8; // 2
UInt16.defaultUInt16 = new UInt16(buffer_1.Buffer.alloc(UInt16.width));
//# sourceMappingURL=uint-16.js.map