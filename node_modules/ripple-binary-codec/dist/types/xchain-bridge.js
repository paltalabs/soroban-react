"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XChainBridge = void 0;
const binary_parser_1 = require("../serdes/binary-parser");
const account_id_1 = require("./account-id");
const serialized_type_1 = require("./serialized-type");
const buffer_1 = require("buffer/");
const issue_1 = require("./issue");
/**
 * Type guard for XChainBridgeObject
 */
function isXChainBridgeObject(arg) {
    const keys = Object.keys(arg).sort();
    return (keys.length === 4 &&
        keys[0] === 'IssuingChainDoor' &&
        keys[1] === 'IssuingChainIssue' &&
        keys[2] === 'LockingChainDoor' &&
        keys[3] === 'LockingChainIssue');
}
/**
 * Class for serializing/deserializing XChainBridges
 */
class XChainBridge extends serialized_type_1.SerializedType {
    constructor(bytes) {
        super(bytes !== null && bytes !== void 0 ? bytes : XChainBridge.ZERO_XCHAIN_BRIDGE.bytes);
    }
    /**
     * Construct a cross-chain bridge from a JSON
     *
     * @param value XChainBridge or JSON to parse into an XChainBridge
     * @returns An XChainBridge object
     */
    static from(value) {
        if (value instanceof XChainBridge) {
            return value;
        }
        if (!isXChainBridgeObject(value)) {
            throw new Error('Invalid type to construct an XChainBridge');
        }
        const bytes = [];
        this.TYPE_ORDER.forEach((item) => {
            const { name, type } = item;
            if (type === account_id_1.AccountID) {
                bytes.push(buffer_1.Buffer.from([0x14]));
            }
            const object = type.from(value[name]);
            bytes.push(object.toBytes());
        });
        return new XChainBridge(buffer_1.Buffer.concat(bytes));
    }
    /**
     * Read an XChainBridge from a BinaryParser
     *
     * @param parser BinaryParser to read the XChainBridge from
     * @returns An XChainBridge object
     */
    static fromParser(parser) {
        const bytes = [];
        this.TYPE_ORDER.forEach((item) => {
            const { type } = item;
            if (type === account_id_1.AccountID) {
                parser.skip(1);
                bytes.push(buffer_1.Buffer.from([0x14]));
            }
            const object = type.fromParser(parser);
            bytes.push(object.toBytes());
        });
        return new XChainBridge(buffer_1.Buffer.concat(bytes));
    }
    /**
     * Get the JSON representation of this XChainBridge
     *
     * @returns the JSON interpretation of this.bytes
     */
    toJSON() {
        const parser = new binary_parser_1.BinaryParser(this.toString());
        const json = {};
        XChainBridge.TYPE_ORDER.forEach((item) => {
            const { name, type } = item;
            if (type === account_id_1.AccountID) {
                parser.skip(1);
            }
            const object = type.fromParser(parser).toJSON();
            json[name] = object;
        });
        return json;
    }
}
exports.XChainBridge = XChainBridge;
XChainBridge.ZERO_XCHAIN_BRIDGE = new XChainBridge(buffer_1.Buffer.concat([
    buffer_1.Buffer.from([0x14]),
    buffer_1.Buffer.alloc(40),
    buffer_1.Buffer.from([0x14]),
    buffer_1.Buffer.alloc(40),
]));
XChainBridge.TYPE_ORDER = [
    { name: 'LockingChainDoor', type: account_id_1.AccountID },
    { name: 'LockingChainIssue', type: issue_1.Issue },
    { name: 'IssuingChainDoor', type: account_id_1.AccountID },
    { name: 'IssuingChainIssue', type: issue_1.Issue },
];
//# sourceMappingURL=xchain-bridge.js.map