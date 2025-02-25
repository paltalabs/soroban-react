import { SerializedType } from './serialized-type';
import { BinaryParser } from '../serdes/binary-parser';
import { Buffer } from 'buffer/';
/**
 * Class for serializing and deserializing vectors of Hash256
 */
declare class Vector256 extends SerializedType {
    constructor(bytes: Buffer);
    /**
     * Construct a Vector256 from a BinaryParser
     *
     * @param parser BinaryParser to
     * @param hint length of the vector, in bytes, optional
     * @returns a Vector256 object
     */
    static fromParser(parser: BinaryParser, hint?: number): Vector256;
    /**
     * Construct a Vector256 object from an array of hashes
     *
     * @param value A Vector256 object or array of hex-strings representing Hash256's
     * @returns a Vector256 object
     */
    static from<T extends Vector256 | Array<string>>(value: T): Vector256;
    /**
     * Return an Array of hex-strings represented by this.bytes
     *
     * @returns An Array of strings representing the Hash256 objects
     */
    toJSON(): Array<string>;
}
export { Vector256 };
