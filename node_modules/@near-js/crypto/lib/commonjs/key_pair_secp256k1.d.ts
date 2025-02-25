import { KeyPairString } from './constants';
import { KeyPairBase, Signature } from './key_pair_base';
import { PublicKey } from './public_key';
/**
 * This class provides key pair functionality for secp256k1 curve:
 * generating key pairs, encoding key pairs, signing and verifying.
 * nearcore expects secp256k1 public keys to be 64 bytes at all times,
 * even when string encoded the secp256k1 library returns 65 byte keys
 * (including a 1 byte header that indicates how the pubkey was encoded).
 * We'll force the secp256k1 library to always encode uncompressed
 * keys with the corresponding 0x04 header byte, then manually
 * insert/remove that byte as needed.
 */
export declare class KeyPairSecp256k1 extends KeyPairBase {
    readonly publicKey: PublicKey;
    readonly secretKey: string;
    readonly extendedSecretKey: string;
    /**
     * Construct an instance of key pair given a secret key.
     * It's generally assumed that these are encoded in base58.
     * @param {string} extendedSecretKey
     */
    constructor(extendedSecretKey: string);
    /**
     * Generate a new random keypair.
     * @example
     * const keyRandom = KeyPair.fromRandom();
     * keyRandom.publicKey
     * // returns [PUBLIC_KEY]
     *
     * keyRandom.secretKey
     * // returns [SECRET_KEY]
     */
    static fromRandom(): KeyPairSecp256k1;
    sign(message: Uint8Array): Signature;
    verify(message: Uint8Array, signature: Uint8Array): boolean;
    toString(): KeyPairString;
    getPublicKey(): PublicKey;
}
//# sourceMappingURL=key_pair_secp256k1.d.ts.map