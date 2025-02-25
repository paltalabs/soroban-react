import { UInt } from './uint';
import { BinaryParser } from '../serdes/binary-parser';
import bigInt = require('big-integer');
import { Buffer } from 'buffer/';
/**
 * Derived UInt class for serializing/deserializing 64 bit UInt
 */
declare class UInt64 extends UInt {
    protected static readonly width: number;
    static readonly defaultUInt64: UInt64;
    constructor(bytes: Buffer);
    static fromParser(parser: BinaryParser): UInt;
    /**
     * Construct a UInt64 object
     *
     * @param val A UInt64, hex-string, bigInt, or number
     * @returns A UInt64 object
     */
    static from<T extends UInt64 | string | bigInt.BigInteger | number>(val: T): UInt64;
    /**
     * The JSON representation of a UInt64 object
     *
     * @returns a hex-string
     */
    toJSON(): string;
    /**
     * Get the value of the UInt64
     *
     * @returns the number represented buy this.bytes
     */
    valueOf(): bigInt.BigInteger;
    /**
     * Get the bytes representation of the UInt64 object
     *
     * @returns 8 bytes representing the UInt64
     */
    toBytes(): Buffer;
}
export { UInt64 };
