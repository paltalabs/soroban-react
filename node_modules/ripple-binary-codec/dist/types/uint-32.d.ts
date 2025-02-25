import { UInt } from './uint';
import { BinaryParser } from '../serdes/binary-parser';
import { Buffer } from 'buffer/';
/**
 * Derived UInt class for serializing/deserializing 32 bit UInt
 */
declare class UInt32 extends UInt {
    protected static readonly width: number;
    static readonly defaultUInt32: UInt32;
    constructor(bytes: Buffer);
    static fromParser(parser: BinaryParser): UInt;
    /**
     * Construct a UInt32 object from a number
     *
     * @param val UInt32 object or number
     */
    static from<T extends UInt32 | number | string>(val: T): UInt32;
    /**
     * get the value of a UInt32 object
     *
     * @returns the number represented by this.bytes
     */
    valueOf(): number;
}
export { UInt32 };
