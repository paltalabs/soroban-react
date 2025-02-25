"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector256 = void 0;
const serialized_type_1 = require("./serialized-type");
const hash_256_1 = require("./hash-256");
const binary_serializer_1 = require("../serdes/binary-serializer");
/**
 * TypeGuard for Array<string>
 */
function isStrings(arg) {
    return Array.isArray(arg) && (arg.length === 0 || typeof arg[0] === 'string');
}
/**
 * Class for serializing and deserializing vectors of Hash256
 */
class Vector256 extends serialized_type_1.SerializedType {
    constructor(bytes) {
        super(bytes);
    }
    /**
     * Construct a Vector256 from a BinaryParser
     *
     * @param parser BinaryParser to
     * @param hint length of the vector, in bytes, optional
     * @returns a Vector256 object
     */
    static fromParser(parser, hint) {
        const bytesList = new binary_serializer_1.BytesList();
        const bytes = hint !== null && hint !== void 0 ? hint : parser.size();
        const hashes = bytes / 32;
        for (let i = 0; i < hashes; i++) {
            hash_256_1.Hash256.fromParser(parser).toBytesSink(bytesList);
        }
        return new Vector256(bytesList.toBytes());
    }
    /**
     * Construct a Vector256 object from an array of hashes
     *
     * @param value A Vector256 object or array of hex-strings representing Hash256's
     * @returns a Vector256 object
     */
    static from(value) {
        if (value instanceof Vector256) {
            return value;
        }
        if (isStrings(value)) {
            const bytesList = new binary_serializer_1.BytesList();
            value.forEach((hash) => {
                hash_256_1.Hash256.from(hash).toBytesSink(bytesList);
            });
            return new Vector256(bytesList.toBytes());
        }
        throw new Error('Cannot construct Vector256 from given value');
    }
    /**
     * Return an Array of hex-strings represented by this.bytes
     *
     * @returns An Array of strings representing the Hash256 objects
     */
    toJSON() {
        if (this.bytes.byteLength % 32 !== 0) {
            throw new Error('Invalid bytes for Vector256');
        }
        const result = [];
        for (let i = 0; i < this.bytes.byteLength; i += 32) {
            result.push(this.bytes
                .slice(i, i + 32)
                .toString('hex')
                .toUpperCase());
        }
        return result;
    }
}
exports.Vector256 = Vector256;
//# sourceMappingURL=vector-256.js.map