"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blob = void 0;
const serialized_type_1 = require("./serialized-type");
const buffer_1 = require("buffer/");
/**
 * Variable length encoded type
 */
class Blob extends serialized_type_1.SerializedType {
    constructor(bytes) {
        super(bytes);
    }
    /**
     * Defines how to read a Blob from a BinaryParser
     *
     * @param parser The binary parser to read the Blob from
     * @param hint The length of the blob, computed by readVariableLengthLength() and passed in
     * @returns A Blob object
     */
    static fromParser(parser, hint) {
        return new Blob(parser.read(hint));
    }
    /**
     * Create a Blob object from a hex-string
     *
     * @param value existing Blob object or a hex-string
     * @returns A Blob object
     */
    static from(value) {
        if (value instanceof Blob) {
            return value;
        }
        if (typeof value === 'string') {
            return new Blob(buffer_1.Buffer.from(value, 'hex'));
        }
        throw new Error('Cannot construct Blob from value given');
    }
}
exports.Blob = Blob;
//# sourceMappingURL=blob.js.map