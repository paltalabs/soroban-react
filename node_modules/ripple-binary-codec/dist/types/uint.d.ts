import bigInt = require('big-integer');
import { Comparable } from './serialized-type';
import { Buffer } from 'buffer/';
/**
 * Base class for serializing and deserializing unsigned integers.
 */
declare abstract class UInt extends Comparable {
    protected static width: number;
    constructor(bytes: Buffer);
    /**
     * Overload of compareTo for Comparable
     *
     * @param other other UInt to compare this to
     * @returns -1, 0, or 1 depending on how the objects relate to each other
     */
    compareTo(other: UInt): number;
    /**
     * Convert a UInt object to JSON
     *
     * @returns number or string represented by this.bytes
     */
    toJSON(): number | string;
    /**
     * Get the value of the UInt represented by this.bytes
     *
     * @returns the value
     */
    abstract valueOf(): number | bigInt.BigInteger;
}
export { UInt };
