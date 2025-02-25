import { BinaryParser } from '../serdes/binary-parser';
import { JsonObject, SerializedType } from './serialized-type';
import { Buffer } from 'buffer/';
import { IssueObject } from './issue';
/**
 * Interface for JSON objects that represent cross-chain bridges
 */
interface XChainBridgeObject extends JsonObject {
    LockingChainDoor: string;
    LockingChainIssue: IssueObject | string;
    IssuingChainDoor: string;
    IssuingChainIssue: IssueObject | string;
}
/**
 * Class for serializing/deserializing XChainBridges
 */
declare class XChainBridge extends SerializedType {
    static readonly ZERO_XCHAIN_BRIDGE: XChainBridge;
    static readonly TYPE_ORDER: {
        name: string;
        type: typeof SerializedType;
    }[];
    constructor(bytes: Buffer);
    /**
     * Construct a cross-chain bridge from a JSON
     *
     * @param value XChainBridge or JSON to parse into an XChainBridge
     * @returns An XChainBridge object
     */
    static from<T extends XChainBridge | XChainBridgeObject>(value: T): XChainBridge;
    /**
     * Read an XChainBridge from a BinaryParser
     *
     * @param parser BinaryParser to read the XChainBridge from
     * @returns An XChainBridge object
     */
    static fromParser(parser: BinaryParser): XChainBridge;
    /**
     * Get the JSON representation of this XChainBridge
     *
     * @returns the JSON interpretation of this.bytes
     */
    toJSON(): XChainBridgeObject;
}
export { XChainBridge, XChainBridgeObject };
