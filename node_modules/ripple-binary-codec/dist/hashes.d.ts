import { Hash256 } from './types/hash-256';
import { BytesList } from './serdes/binary-serializer';
import { Buffer } from 'buffer/';
/**
 * Class for hashing with SHA512
 * @extends BytesList So SerializedTypes can write bytes to a Sha512Half
 */
declare class Sha512Half extends BytesList {
    private hash;
    /**
     * Construct a new Sha512Hash and write bytes this.hash
     *
     * @param bytes bytes to write to this.hash
     * @returns the new Sha512Hash object
     */
    static put(bytes: Buffer): Sha512Half;
    /**
     * Write bytes to an existing Sha512Hash
     *
     * @param bytes bytes to write to object
     * @returns the Sha512 object
     */
    put(bytes: Buffer): Sha512Half;
    /**
     * Compute SHA512 hash and slice in half
     *
     * @returns half of a SHA512 hash
     */
    finish256(): Buffer;
    /**
     * Constructs a Hash256 from the Sha512Half object
     *
     * @returns a Hash256 object
     */
    finish(): Hash256;
}
/**
 * compute SHA512 hash of a list of bytes
 *
 * @param args zero or more arguments to hash
 * @returns the sha512half hash of the arguments.
 */
declare function sha512Half(...args: Buffer[]): Buffer;
/**
 * Construct a transactionID from a Serialized Transaction
 *
 * @param serialized bytes to hash
 * @returns a Hash256 object
 */
declare function transactionID(serialized: Buffer): Hash256;
export { Sha512Half, sha512Half, transactionID };
