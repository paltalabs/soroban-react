"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UInt = void 0;
const serialized_type_1 = require("./serialized-type");
/**
 * Compare numbers and bigInts n1 and n2
 *
 * @param n1 First object to compare
 * @param n2 Second object to compare
 * @returns -1, 0, or 1, depending on how the two objects compare
 */
function compare(n1, n2) {
    return n1 < n2 ? -1 : n1 == n2 ? 0 : 1;
}
/**
 * Base class for serializing and deserializing unsigned integers.
 */
class UInt extends serialized_type_1.Comparable {
    constructor(bytes) {
        super(bytes);
    }
    /**
     * Overload of compareTo for Comparable
     *
     * @param other other UInt to compare this to
     * @returns -1, 0, or 1 depending on how the objects relate to each other
     */
    compareTo(other) {
        return compare(this.valueOf(), other.valueOf());
    }
    /**
     * Convert a UInt object to JSON
     *
     * @returns number or string represented by this.bytes
     */
    toJSON() {
        const val = this.valueOf();
        return typeof val === 'number' ? val : val.toString();
    }
}
exports.UInt = UInt;
//# sourceMappingURL=uint.js.map