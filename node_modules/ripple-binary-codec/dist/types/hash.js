"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash = void 0;
const serialized_type_1 = require("./serialized-type");
const buffer_1 = require("buffer/");
/**
 * Base class defining how to encode and decode hashes
 */
class Hash extends serialized_type_1.Comparable {
    constructor(bytes) {
        super(bytes);
        if (this.bytes.byteLength !== this.constructor.width) {
            throw new Error(`Invalid Hash length ${this.bytes.byteLength}`);
        }
    }
    /**
     * Construct a Hash object from an existing Hash object or a hex-string
     *
     * @param value A hash object or hex-string of a hash
     */
    static from(value) {
        if (value instanceof this) {
            return value;
        }
        if (typeof value === 'string') {
            return new this(buffer_1.Buffer.from(value, 'hex'));
        }
        throw new Error('Cannot construct Hash from given value');
    }
    /**
     * Read a Hash object from a BinaryParser
     *
     * @param parser BinaryParser to read the hash from
     * @param hint length of the bytes to read, optional
     */
    static fromParser(parser, hint) {
        return new this(parser.read(hint !== null && hint !== void 0 ? hint : this.width));
    }
    /**
     * Overloaded operator for comparing two hash objects
     *
     * @param other The Hash to compare this to
     */
    compareTo(other) {
        return this.bytes.compare(this.constructor.from(other).bytes);
    }
    /**
     * @returns the hex-string representation of this Hash
     */
    toString() {
        return this.toHex();
    }
    /**
     * Returns four bits at the specified depth within a hash
     *
     * @param depth The depth of the four bits
     * @returns The number represented by the four bits
     */
    nibblet(depth) {
        const byteIx = depth > 0 ? (depth / 2) | 0 : 0;
        let b = this.bytes[byteIx];
        if (depth % 2 === 0) {
            b = (b & 0xf0) >>> 4;
        }
        else {
            b = b & 0x0f;
        }
        return b;
    }
}
exports.Hash = Hash;
//# sourceMappingURL=hash.js.map