"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash128 = void 0;
const hash_1 = require("./hash");
const buffer_1 = require("buffer/");
/**
 * Hash with a width of 128 bits
 */
class Hash128 extends hash_1.Hash {
    constructor(bytes) {
        if (bytes && bytes.byteLength === 0) {
            bytes = Hash128.ZERO_128.bytes;
        }
        super(bytes !== null && bytes !== void 0 ? bytes : Hash128.ZERO_128.bytes);
    }
    /**
     * Get the hex representation of a hash-128 bytes, allowing unset
     *
     * @returns hex String of this.bytes
     */
    toHex() {
        const hex = this.toBytes().toString('hex').toUpperCase();
        if (/^0+$/.exec(hex)) {
            return '';
        }
        return hex;
    }
}
exports.Hash128 = Hash128;
Hash128.width = 16;
Hash128.ZERO_128 = new Hash128(buffer_1.Buffer.alloc(Hash128.width));
//# sourceMappingURL=hash-128.js.map