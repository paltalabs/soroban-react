"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionID = exports.sha512Half = exports.Sha512Half = void 0;
const hash_prefixes_1 = require("./hash-prefixes");
const createHash = require("create-hash");
const hash_256_1 = require("./types/hash-256");
const binary_serializer_1 = require("./serdes/binary-serializer");
const buffer_1 = require("buffer/");
/**
 * Class for hashing with SHA512
 * @extends BytesList So SerializedTypes can write bytes to a Sha512Half
 */
class Sha512Half extends binary_serializer_1.BytesList {
    constructor() {
        super(...arguments);
        this.hash = createHash('sha512');
    }
    /**
     * Construct a new Sha512Hash and write bytes this.hash
     *
     * @param bytes bytes to write to this.hash
     * @returns the new Sha512Hash object
     */
    static put(bytes) {
        return new Sha512Half().put(bytes);
    }
    /**
     * Write bytes to an existing Sha512Hash
     *
     * @param bytes bytes to write to object
     * @returns the Sha512 object
     */
    put(bytes) {
        this.hash.update(bytes);
        return this;
    }
    /**
     * Compute SHA512 hash and slice in half
     *
     * @returns half of a SHA512 hash
     */
    finish256() {
        return buffer_1.Buffer.from(this.hash.digest().slice(0, 32));
    }
    /**
     * Constructs a Hash256 from the Sha512Half object
     *
     * @returns a Hash256 object
     */
    finish() {
        return new hash_256_1.Hash256(this.finish256());
    }
}
exports.Sha512Half = Sha512Half;
/**
 * compute SHA512 hash of a list of bytes
 *
 * @param args zero or more arguments to hash
 * @returns the sha512half hash of the arguments.
 */
function sha512Half(...args) {
    const hash = new Sha512Half();
    args.forEach((a) => hash.put(a));
    return hash.finish256();
}
exports.sha512Half = sha512Half;
/**
 * Construct a transactionID from a Serialized Transaction
 *
 * @param serialized bytes to hash
 * @returns a Hash256 object
 */
function transactionID(serialized) {
    return new hash_256_1.Hash256(sha512Half(hash_prefixes_1.HashPrefix.transactionID, serialized));
}
exports.transactionID = transactionID;
//# sourceMappingURL=hashes.js.map