import { BytesList } from '../serdes/binary-serializer';
import { BinaryParser } from '../serdes/binary-parser';
import bigInt = require('big-integer');
import { Buffer } from 'buffer/';
import { XrplDefinitionsBase } from '../enums';
type JSON = string | number | boolean | null | undefined | JSON[] | JsonObject;
type JsonObject = {
    [key: string]: JSON;
};
/**
 * The base class for all binary-codec types
 */
declare class SerializedType {
    protected readonly bytes: Buffer;
    constructor(bytes: Buffer);
    static fromParser(parser: BinaryParser, hint?: number): SerializedType;
    static from(value: SerializedType | JSON | bigInt.BigInteger): SerializedType;
    /**
     * Write the bytes representation of a SerializedType to a BytesList
     *
     * @param list The BytesList to write SerializedType bytes to
     */
    toBytesSink(list: BytesList): void;
    /**
     * Get the hex representation of a SerializedType's bytes
     *
     * @returns hex String of this.bytes
     */
    toHex(): string;
    /**
     * Get the bytes representation of a SerializedType
     *
     * @returns A buffer of the bytes
     */
    toBytes(): Buffer;
    /**
     * Return the JSON representation of a SerializedType
     *
     * @param _definitions rippled definitions used to parse the values of transaction types and such.
     *                          Unused in default, but used in STObject, STArray
     *                          Can be customized for sidechains and amendments.
     * @returns any type, if not overloaded returns hexString representation of bytes
     */
    toJSON(_definitions?: XrplDefinitionsBase): JSON;
    /**
     * @returns hexString representation of this.bytes
     */
    toString(): string;
}
/**
 * Base class for SerializedTypes that are comparable
 */
declare class Comparable extends SerializedType {
    lt(other: Comparable): boolean;
    eq(other: Comparable): boolean;
    gt(other: Comparable): boolean;
    gte(other: Comparable): boolean;
    lte(other: Comparable): boolean;
    /**
     * Overload this method to define how two Comparable SerializedTypes are compared
     *
     * @param other The comparable object to compare this to
     * @returns A number denoting the relationship of this and other
     */
    compareTo(other: Comparable): number;
}
export { SerializedType, Comparable, JSON, JsonObject };
