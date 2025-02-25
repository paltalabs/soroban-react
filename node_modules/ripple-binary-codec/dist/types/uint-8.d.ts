import { UInt } from './uint';
import { BinaryParser } from '../serdes/binary-parser';
import { Buffer } from 'buffer/';
/**
 * Derived UInt class for serializing/deserializing 8 bit UInt
 */
declare class UInt8 extends UInt {
    protected static readonly width: number;
    static readonly defaultUInt8: UInt8;
    constructor(bytes: Buffer);
    static fromParser(parser: BinaryParser): UInt;
    /**
     * Construct a UInt8 object from a number
     *
     * @param val UInt8 object or number
     */
    static from<T extends UInt8 | number>(val: T): UInt8;
    /**
     * get the value of a UInt8 object
     *
     * @returns the number represented by this.bytes
     */
    valueOf(): number;
}
export { UInt8 };
