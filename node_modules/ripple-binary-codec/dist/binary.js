"use strict";
/* eslint-disable func-style */
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionID = exports.sha512Half = exports.binaryToJSON = exports.signingClaimData = exports.signingData = exports.multiSigningData = exports.readJSON = exports.serializeObject = exports.makeParser = exports.BytesList = exports.BinarySerializer = exports.BinaryParser = void 0;
const types_1 = require("./types");
const binary_parser_1 = require("./serdes/binary-parser");
Object.defineProperty(exports, "BinaryParser", { enumerable: true, get: function () { return binary_parser_1.BinaryParser; } });
const hash_prefixes_1 = require("./hash-prefixes");
const binary_serializer_1 = require("./serdes/binary-serializer");
Object.defineProperty(exports, "BinarySerializer", { enumerable: true, get: function () { return binary_serializer_1.BinarySerializer; } });
Object.defineProperty(exports, "BytesList", { enumerable: true, get: function () { return binary_serializer_1.BytesList; } });
const hashes_1 = require("./hashes");
Object.defineProperty(exports, "sha512Half", { enumerable: true, get: function () { return hashes_1.sha512Half; } });
Object.defineProperty(exports, "transactionID", { enumerable: true, get: function () { return hashes_1.transactionID; } });
const enums_1 = require("./enums");
const bigInt = require("big-integer");
/**
 * Construct a BinaryParser
 *
 * @param bytes hex-string to construct BinaryParser from
 * @param definitions rippled definitions used to parse the values of transaction types and such.
 *                          Can be customized for sidechains and amendments.
 * @returns A BinaryParser
 */
const makeParser = (bytes, definitions) => new binary_parser_1.BinaryParser(bytes, definitions);
exports.makeParser = makeParser;
/**
 * Parse BinaryParser into JSON
 *
 * @param parser BinaryParser object
 * @param definitions rippled definitions used to parse the values of transaction types and such.
 *                          Can be customized for sidechains and amendments.
 * @returns JSON for the bytes in the BinaryParser
 */
const readJSON = (parser, definitions = enums_1.DEFAULT_DEFINITIONS) => parser.readType(types_1.coreTypes.STObject).toJSON(definitions);
exports.readJSON = readJSON;
/**
 * Parse a hex-string into its JSON interpretation
 *
 * @param bytes hex-string to parse into JSON
 * @param definitions rippled definitions used to parse the values of transaction types and such.
 *                          Can be customized for sidechains and amendments.
 * @returns JSON
 */
const binaryToJSON = (bytes, definitions) => readJSON(makeParser(bytes, definitions), definitions);
exports.binaryToJSON = binaryToJSON;
/**
 * Function to serialize JSON object representing a transaction
 *
 * @param object JSON object to serialize
 * @param opts options for serializing, including optional prefix, suffix, signingFieldOnly, and definitions
 * @returns A Buffer containing the serialized object
 */
function serializeObject(object, opts = {}) {
    const { prefix, suffix, signingFieldsOnly = false, definitions } = opts;
    const bytesList = new binary_serializer_1.BytesList();
    if (prefix) {
        bytesList.put(prefix);
    }
    const filter = signingFieldsOnly
        ? (f) => f.isSigningField
        : undefined;
    types_1.coreTypes.STObject
        .from(object, filter, definitions)
        .toBytesSink(bytesList);
    if (suffix) {
        bytesList.put(suffix);
    }
    return bytesList.toBytes();
}
exports.serializeObject = serializeObject;
/**
 * Serialize an object for signing
 *
 * @param transaction Transaction to serialize
 * @param prefix Prefix bytes to put before the serialized object
 * @param opts.definitions Custom rippled types to use instead of the default. Used for sidechains and amendments.
 * @returns A Buffer with the serialized object
 */
function signingData(transaction, prefix = hash_prefixes_1.HashPrefix.transactionSig, opts = {}) {
    return serializeObject(transaction, {
        prefix,
        signingFieldsOnly: true,
        definitions: opts.definitions,
    });
}
exports.signingData = signingData;
/**
 * Serialize a signingClaim
 *
 * @param claim A claim object to serialize
 * @param opts.definitions Custom rippled types to use instead of the default. Used for sidechains and amendments.
 * @returns the serialized object with appropriate prefix
 */
function signingClaimData(claim) {
    const num = bigInt(String(claim.amount));
    const prefix = hash_prefixes_1.HashPrefix.paymentChannelClaim;
    const channel = types_1.coreTypes.Hash256.from(claim.channel).toBytes();
    const amount = types_1.coreTypes.UInt64.from(num).toBytes();
    const bytesList = new binary_serializer_1.BytesList();
    bytesList.put(prefix);
    bytesList.put(channel);
    bytesList.put(amount);
    return bytesList.toBytes();
}
exports.signingClaimData = signingClaimData;
/**
 * Serialize a transaction object for multiSigning
 *
 * @param transaction transaction to serialize
 * @param signingAccount Account to sign the transaction with
 * @param opts.definitions Custom rippled types to use instead of the default. Used for sidechains and amendments.
 * @returns serialized transaction with appropriate prefix and suffix
 */
function multiSigningData(transaction, signingAccount, opts = {
    definitions: enums_1.DEFAULT_DEFINITIONS,
}) {
    const prefix = hash_prefixes_1.HashPrefix.transactionMultiSig;
    const suffix = types_1.coreTypes.AccountID.from(signingAccount).toBytes();
    return serializeObject(transaction, {
        prefix,
        suffix,
        signingFieldsOnly: true,
        definitions: opts.definitions,
    });
}
exports.multiSigningData = multiSigningData;
//# sourceMappingURL=binary.js.map