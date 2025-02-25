import { BinaryParser } from '../serdes/binary-parser';
import { JsonObject, SerializedType } from './serialized-type';
import { Buffer } from 'buffer/';
/**
 * Interface for JSON objects that represent amounts
 */
interface AmountObject extends JsonObject {
    value: string;
    currency: string;
    issuer: string;
}
/**
 * Class for serializing/Deserializing Amounts
 */
declare class Amount extends SerializedType {
    static defaultAmount: Amount;
    constructor(bytes: Buffer);
    /**
     * Construct an amount from an IOU or string amount
     *
     * @param value An Amount, object representing an IOU, or a string
     *     representing an integer amount
     * @returns An Amount object
     */
    static from<T extends Amount | AmountObject | string>(value: T): Amount;
    /**
     * Read an amount from a BinaryParser
     *
     * @param parser BinaryParser to read the Amount from
     * @returns An Amount object
     */
    static fromParser(parser: BinaryParser): Amount;
    /**
     * Get the JSON representation of this Amount
     *
     * @returns the JSON interpretation of this.bytes
     */
    toJSON(): AmountObject | string;
    /**
     * Validate XRP amount
     *
     * @param amount String representing XRP amount
     * @returns void, but will throw if invalid amount
     */
    private static assertXrpIsValid;
    /**
     * Validate IOU.value amount
     *
     * @param decimal Decimal.js object representing IOU.value
     * @returns void, but will throw if invalid amount
     */
    private static assertIouIsValid;
    /**
     * Ensure that the value after being multiplied by the exponent does not
     * contain a decimal.
     *
     * @param decimal a Decimal object
     * @returns a string of the object without a decimal
     */
    private static verifyNoDecimal;
    /**
     * Test if this amount is in units of Native Currency(XRP)
     *
     * @returns true if Native (XRP)
     */
    private isNative;
}
export { Amount, AmountObject };
