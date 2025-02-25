import { XrplDefinitionsBase } from '../enums';
import { SerializedType, JsonObject } from './serialized-type';
import { BinaryParser } from '../serdes/binary-parser';
/**
 * Class for serializing and deserializing Arrays of Objects
 */
declare class STArray extends SerializedType {
    /**
     * Construct an STArray from a BinaryParser
     *
     * @param parser BinaryParser to parse an STArray from
     * @returns An STArray Object
     */
    static fromParser(parser: BinaryParser): STArray;
    /**
     * Construct an STArray from an Array of JSON Objects
     *
     * @param value STArray or Array of Objects to parse into an STArray
     * @param definitions optional, types and values to use to encode/decode a transaction
     * @returns An STArray object
     */
    static from<T extends STArray | Array<JsonObject>>(value: T, definitions?: XrplDefinitionsBase): STArray;
    /**
     * Return the JSON representation of this.bytes
     *
     * @param definitions optional, types and values to use to encode/decode a transaction
     * @returns An Array of JSON objects
     */
    toJSON(definitions?: XrplDefinitionsBase): Array<JsonObject>;
}
export { STArray };
