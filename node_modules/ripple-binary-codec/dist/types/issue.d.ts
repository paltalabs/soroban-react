import { BinaryParser } from '../serdes/binary-parser';
import { JsonObject, SerializedType } from './serialized-type';
import { Buffer } from 'buffer/';
/**
 * Interface for JSON objects that represent amounts
 */
interface IssueObject extends JsonObject {
    currency: string;
    issuer?: string;
}
/**
 * Class for serializing/Deserializing Amounts
 */
declare class Issue extends SerializedType {
    static readonly ZERO_ISSUED_CURRENCY: Issue;
    constructor(bytes: Buffer);
    /**
     * Construct an amount from an IOU or string amount
     *
     * @param value An Amount, object representing an IOU, or a string
     *     representing an integer amount
     * @returns An Amount object
     */
    static from<T extends Issue | IssueObject>(value: T): Issue;
    /**
     * Read an amount from a BinaryParser
     *
     * @param parser BinaryParser to read the Amount from
     * @returns An Amount object
     */
    static fromParser(parser: BinaryParser): Issue;
    /**
     * Get the JSON representation of this Amount
     *
     * @returns the JSON interpretation of this.bytes
     */
    toJSON(): IssueObject;
}
export { Issue, IssueObject };
