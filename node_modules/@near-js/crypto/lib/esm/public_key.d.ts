import { KeyType } from './constants';
declare class ED25519PublicKey {
    keyType: KeyType;
    data: Uint8Array;
}
declare class SECP256K1PublicKey {
    keyType: KeyType;
    data: Uint8Array;
}
/**
 * DUPLICATED FROM @near-js/types - REPLACE WITH IMPORTED REFERENCE AND DELETE
 * This ends up being necessary for Wallet Selector dependencies with
 * outdated peer dependencies and should only be temporary
 */
declare abstract class Enum {
    abstract enum: string;
    constructor(properties: any);
}
/**
 * PublicKey representation that has type and bytes of the key.
 */
export declare class PublicKey extends Enum {
    enum: string;
    ed25519Key?: ED25519PublicKey;
    secp256k1Key?: SECP256K1PublicKey;
    constructor(publicKey: {
        keyType: KeyType;
        data: Uint8Array;
    });
    /**
     * Creates a PublicKey instance from a string or an existing PublicKey instance.
     * @param value The string or PublicKey instance to create a PublicKey from.
     * @returns {PublicKey} The PublicKey instance.
     */
    static from(value: string | PublicKey): PublicKey;
    /**
     * Creates a PublicKey instance from an encoded key string.
     * @param encodedKey The encoded key string.
     * @returns {PublicKey} The PublicKey instance created from the encoded key string.
     */
    static fromString(encodedKey: string): PublicKey;
    /**
     * Returns a string representation of the public key.
     * @returns {string} The string representation of the public key.
     */
    toString(): string;
    /**
     * Verifies a message signature using the public key.
     * @param message The message to be verified.
     * @param signature The signature to be verified.
     * @returns {boolean} `true` if the signature is valid, otherwise `false`.
     */
    verify(message: Uint8Array, signature: Uint8Array): boolean;
    get keyPair(): ED25519PublicKey | SECP256K1PublicKey;
    get keyType(): KeyType;
    get data(): Uint8Array;
}
export {};
//# sourceMappingURL=public_key.d.ts.map