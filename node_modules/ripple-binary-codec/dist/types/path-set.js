"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathSet = void 0;
const account_id_1 = require("./account-id");
const currency_1 = require("./currency");
const binary_parser_1 = require("../serdes/binary-parser");
const serialized_type_1 = require("./serialized-type");
const buffer_1 = require("buffer/");
/**
 * Constants for separating Paths in a PathSet
 */
const PATHSET_END_BYTE = 0x00;
const PATH_SEPARATOR_BYTE = 0xff;
/**
 * Constant for masking types of a Hop
 */
const TYPE_ACCOUNT = 0x01;
const TYPE_CURRENCY = 0x10;
const TYPE_ISSUER = 0x20;
/**
 * TypeGuard for HopObject
 */
function isHopObject(arg) {
    return (arg.issuer !== undefined ||
        arg.account !== undefined ||
        arg.currency !== undefined);
}
/**
 * TypeGuard for PathSet
 */
function isPathSet(arg) {
    return ((Array.isArray(arg) && arg.length === 0) ||
        (Array.isArray(arg) && Array.isArray(arg[0]) && arg[0].length === 0) ||
        (Array.isArray(arg) && Array.isArray(arg[0]) && isHopObject(arg[0][0])));
}
/**
 * Serialize and Deserialize a Hop
 */
class Hop extends serialized_type_1.SerializedType {
    /**
     * Create a Hop from a HopObject
     *
     * @param value Either a hop or HopObject to create a hop with
     * @returns a Hop
     */
    static from(value) {
        if (value instanceof Hop) {
            return value;
        }
        const bytes = [buffer_1.Buffer.from([0])];
        if (value.account) {
            bytes.push(account_id_1.AccountID.from(value.account).toBytes());
            bytes[0][0] |= TYPE_ACCOUNT;
        }
        if (value.currency) {
            bytes.push(currency_1.Currency.from(value.currency).toBytes());
            bytes[0][0] |= TYPE_CURRENCY;
        }
        if (value.issuer) {
            bytes.push(account_id_1.AccountID.from(value.issuer).toBytes());
            bytes[0][0] |= TYPE_ISSUER;
        }
        return new Hop(buffer_1.Buffer.concat(bytes));
    }
    /**
     * Construct a Hop from a BinaryParser
     *
     * @param parser BinaryParser to read the Hop from
     * @returns a Hop
     */
    static fromParser(parser) {
        const type = parser.readUInt8();
        const bytes = [buffer_1.Buffer.from([type])];
        if (type & TYPE_ACCOUNT) {
            bytes.push(parser.read(account_id_1.AccountID.width));
        }
        if (type & TYPE_CURRENCY) {
            bytes.push(parser.read(currency_1.Currency.width));
        }
        if (type & TYPE_ISSUER) {
            bytes.push(parser.read(account_id_1.AccountID.width));
        }
        return new Hop(buffer_1.Buffer.concat(bytes));
    }
    /**
     * Get the JSON interpretation of this hop
     *
     * @returns a HopObject, an JS object with optional account, issuer, and currency
     */
    toJSON() {
        const hopParser = new binary_parser_1.BinaryParser(this.bytes.toString('hex'));
        const type = hopParser.readUInt8();
        let account, currency, issuer;
        if (type & TYPE_ACCOUNT) {
            account = account_id_1.AccountID.fromParser(hopParser).toJSON();
        }
        if (type & TYPE_CURRENCY) {
            currency = currency_1.Currency.fromParser(hopParser).toJSON();
        }
        if (type & TYPE_ISSUER) {
            issuer = account_id_1.AccountID.fromParser(hopParser).toJSON();
        }
        const result = {};
        if (account) {
            result.account = account;
        }
        if (issuer) {
            result.issuer = issuer;
        }
        if (currency) {
            result.currency = currency;
        }
        return result;
    }
    /**
     * get a number representing the type of this hop
     *
     * @returns a number to be bitwise and-ed with TYPE_ constants to describe the types in the hop
     */
    type() {
        return this.bytes[0];
    }
}
/**
 * Class for serializing/deserializing Paths
 */
class Path extends serialized_type_1.SerializedType {
    /**
     * construct a Path from an array of Hops
     *
     * @param value Path or array of HopObjects to construct a Path
     * @returns the Path
     */
    static from(value) {
        if (value instanceof Path) {
            return value;
        }
        const bytes = [];
        value.forEach((hop) => {
            bytes.push(Hop.from(hop).toBytes());
        });
        return new Path(buffer_1.Buffer.concat(bytes));
    }
    /**
     * Read a Path from a BinaryParser
     *
     * @param parser BinaryParser to read Path from
     * @returns the Path represented by the bytes read from the BinaryParser
     */
    static fromParser(parser) {
        const bytes = [];
        while (!parser.end()) {
            bytes.push(Hop.fromParser(parser).toBytes());
            if (parser.peek() === PATHSET_END_BYTE ||
                parser.peek() === PATH_SEPARATOR_BYTE) {
                break;
            }
        }
        return new Path(buffer_1.Buffer.concat(bytes));
    }
    /**
     * Get the JSON representation of this Path
     *
     * @returns an Array of HopObject constructed from this.bytes
     */
    toJSON() {
        const json = [];
        const pathParser = new binary_parser_1.BinaryParser(this.toString());
        while (!pathParser.end()) {
            json.push(Hop.fromParser(pathParser).toJSON());
        }
        return json;
    }
}
/**
 * Deserialize and Serialize the PathSet type
 */
class PathSet extends serialized_type_1.SerializedType {
    /**
     * Construct a PathSet from an Array of Arrays representing paths
     *
     * @param value A PathSet or Array of Array of HopObjects
     * @returns the PathSet constructed from value
     */
    static from(value) {
        if (value instanceof PathSet) {
            return value;
        }
        if (isPathSet(value)) {
            const bytes = [];
            value.forEach((path) => {
                bytes.push(Path.from(path).toBytes());
                bytes.push(buffer_1.Buffer.from([PATH_SEPARATOR_BYTE]));
            });
            bytes[bytes.length - 1] = buffer_1.Buffer.from([PATHSET_END_BYTE]);
            return new PathSet(buffer_1.Buffer.concat(bytes));
        }
        throw new Error('Cannot construct PathSet from given value');
    }
    /**
     * Construct a PathSet from a BinaryParser
     *
     * @param parser A BinaryParser to read PathSet from
     * @returns the PathSet read from parser
     */
    static fromParser(parser) {
        const bytes = [];
        while (!parser.end()) {
            bytes.push(Path.fromParser(parser).toBytes());
            bytes.push(parser.read(1));
            if (bytes[bytes.length - 1][0] == PATHSET_END_BYTE) {
                break;
            }
        }
        return new PathSet(buffer_1.Buffer.concat(bytes));
    }
    /**
     * Get the JSON representation of this PathSet
     *
     * @returns an Array of Array of HopObjects, representing this PathSet
     */
    toJSON() {
        const json = [];
        const pathParser = new binary_parser_1.BinaryParser(this.toString());
        while (!pathParser.end()) {
            json.push(Path.fromParser(pathParser).toJSON());
            pathParser.skip(1);
        }
        return json;
    }
}
exports.PathSet = PathSet;
//# sourceMappingURL=path-set.js.map