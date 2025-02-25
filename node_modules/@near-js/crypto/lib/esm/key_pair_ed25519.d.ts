import { KeyPairString } from './constants';
import { KeyPairBase, Signature } from './key_pair_base';
import { PublicKey } from './public_key';
/**
 * This class provides key pair functionality for Ed25519 curve:
 * generating key pairs, encoding key pairs, signing and verifying.
 */
export declare class KeyPairEd25519 extends KeyPairBase {
    readonly publicKey: PublicKey;
    readonly secretKey: string;
    readonly extendedSecretKey: string;
    /**
     * Construct an instance of key pair given a secret key.
     * It's generally assumed that these are encoded in base58.
     * @param extendedSecretKey
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
    static fromRandom(): KeyPairEd25519;
    /**
     * Signs a message using the key pair's secret key.
     * @param message The message to be signed.
     * @returns {Signature} The signature object containing the signature and the public key.
     */
    sign(message: Uint8Array): Signature;
    /**
     * Verifies the signature of a message using the key pair's public key.
     * @param message The message to be verified.
     * @param signature The signature to be verified.
     * @returns {boolean} `true` if the signature is valid, otherwise `false`.
     */
    verify(message: Uint8Array, signature: Uint8Array): boolean;
    /**
     * Returns a string representation of the key pair in the format 'ed25519:[extendedSecretKey]'.
     * @returns {string} The string representation of the key pair.
     */
    toString(): KeyPairString;
    /**
     * Retrieves the public key associated with the key pair.
     * @returns {PublicKey} The public key.
     */
    getPublicKey(): PublicKey;
}
//# sourceMappingURL=key_pair_ed25519.d.ts.map