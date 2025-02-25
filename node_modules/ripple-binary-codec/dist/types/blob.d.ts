import { SerializedType } from './serialized-type';
import { BinaryParser } from '../serdes/binary-parser';
import { Buffer } from 'buffer/';
/**
 * Variable length encoded type
 */
declare class Blob extends SerializedType {
    constructor(bytes: Buffer);
    /**
     * Defines how to read a Blob from a BinaryParser
     *
     * @param parser The binary parser to read the Blob from
     * @param hint The length of the blob, computed by readVariableLengthLength() and passed in
     * @returns A Blob object
     */
    static fromParser(parser: BinaryParser, hint: number): Blob;
    /**
     * Create a Blob object from a hex-string
     *
     * @param value existing Blob object or a hex-string
     * @returns A Blob object
     */
    static from<T extends Blob | string>(value: T): Blob;
}
export { Blob };
