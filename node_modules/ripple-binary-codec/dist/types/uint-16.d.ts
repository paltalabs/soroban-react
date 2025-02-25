import { UInt } from './uint';
import { BinaryParser } from '../serdes/binary-parser';
import { Buffer } from 'buffer/';
/**
 * Derived UInt class for serializing/deserializing 16 bit UInt
 */
declare class UInt16 extends UInt {
    protected static readonly width: number;
    static readonly defaultUInt16: UInt16;
    constructor(bytes: Buffer);
    static fromParser(parser: BinaryParser): UInt;
    /**
     * Construct a UInt16 object from a number
     *
     * @param val UInt16 object or number
     */
    static from<T extends UInt16 | number>(val: T): UInt16;
    /**
     * get the value of a UInt16 object
     *
     * @returns the number represented by this.bytes
     */
    valueOf(): number;
}
export { UInt16 };
