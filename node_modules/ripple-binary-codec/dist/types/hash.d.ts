import { Comparable } from './serialized-type';
import { BinaryParser } from '../serdes/binary-parser';
import { Buffer } from 'buffer/';
/**
 * Base class defining how to encode and decode hashes
 */
declare class Hash extends Comparable {
    static readonly width: number;
    constructor(bytes: Buffer);
    /**
     * Construct a Hash object from an existing Hash object or a hex-string
     *
     * @param value A hash object or hex-string of a hash
     */
    static from<T extends Hash | string>(value: T): Hash;
    /**
     * Read a Hash object from a BinaryParser
     *
     * @param parser BinaryParser to read the hash from
     * @param hint length of the bytes to read, optional
     */
    static fromParser(parser: BinaryParser, hint?: number): Hash;
    /**
     * Overloaded operator for comparing two hash objects
     *
     * @param other The Hash to compare this to
     */
    compareTo(other: Hash): number;
    /**
     * @returns the hex-string representation of this Hash
     */
    toString(): string;
    /**
     * Returns four bits at the specified depth within a hash
     *
     * @param depth The depth of the four bits
     * @returns The number represented by the four bits
     */
    nibblet(depth: number): number;
}
export { Hash };
