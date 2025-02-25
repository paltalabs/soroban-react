import { BinaryParser } from '../serdes/binary-parser';
import { SerializedType, JsonObject } from './serialized-type';
/**
 * The object representation of a Hop, an issuer AccountID, an account AccountID, and a Currency
 */
interface HopObject extends JsonObject {
    issuer?: string;
    account?: string;
    currency?: string;
}
/**
 * Deserialize and Serialize the PathSet type
 */
declare class PathSet extends SerializedType {
    /**
     * Construct a PathSet from an Array of Arrays representing paths
     *
     * @param value A PathSet or Array of Array of HopObjects
     * @returns the PathSet constructed from value
     */
    static from<T extends PathSet | Array<Array<HopObject>>>(value: T): PathSet;
    /**
     * Construct a PathSet from a BinaryParser
     *
     * @param parser A BinaryParser to read PathSet from
     * @returns the PathSet read from parser
     */
    static fromParser(parser: BinaryParser): PathSet;
    /**
     * Get the JSON representation of this PathSet
     *
     * @returns an Array of Array of HopObjects, representing this PathSet
     */
    toJSON(): Array<Array<HopObject>>;
}
export { PathSet };
