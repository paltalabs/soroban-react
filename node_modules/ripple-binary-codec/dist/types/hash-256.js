"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash256 = void 0;
const hash_1 = require("./hash");
const buffer_1 = require("buffer/");
/**
 * Hash with a width of 256 bits
 */
class Hash256 extends hash_1.Hash {
    constructor(bytes) {
        super(bytes !== null && bytes !== void 0 ? bytes : Hash256.ZERO_256.bytes);
    }
}
exports.Hash256 = Hash256;
Hash256.width = 32;
Hash256.ZERO_256 = new Hash256(buffer_1.Buffer.alloc(Hash256.width));
//# sourceMappingURL=hash-256.js.map