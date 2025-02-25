"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash160 = void 0;
const hash_1 = require("./hash");
const buffer_1 = require("buffer/");
/**
 * Hash with a width of 160 bits
 */
class Hash160 extends hash_1.Hash {
    constructor(bytes) {
        if (bytes && bytes.byteLength === 0) {
            bytes = Hash160.ZERO_160.bytes;
        }
        super(bytes !== null && bytes !== void 0 ? bytes : Hash160.ZERO_160.bytes);
    }
}
exports.Hash160 = Hash160;
Hash160.width = 20;
Hash160.ZERO_160 = new Hash160(buffer_1.Buffer.alloc(Hash160.width));
//# sourceMappingURL=hash-160.js.map