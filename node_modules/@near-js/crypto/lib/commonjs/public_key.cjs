"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicKey = void 0;
const utils_1 = require("@near-js/utils");
const ed25519_1 = require("@noble/curves/ed25519");
const secp256k1_1 = __importDefault(require("secp256k1"));
const constants_1 = require("./constants.cjs");
function key_type_to_str(keyType) {
    switch (keyType) {
        case constants_1.KeyType.ED25519: return 'ed25519';
        case constants_1.KeyType.SECP256K1: return 'secp256k1';
        default: throw new Error(`Unknown key type ${keyType}`);
    }
}
function str_to_key_type(keyType) {
    switch (keyType.toLowerCase()) {
        case 'ed25519': return constants_1.KeyType.ED25519;
        case 'secp256k1': return constants_1.KeyType.SECP256K1;
        default: throw new Error(`Unknown key type ${keyType}`);
    }
}
class ED25519PublicKey {
    keyType = constants_1.KeyType.ED25519;
    data;
}
class SECP256K1PublicKey {
    keyType = constants_1.KeyType.SECP256K1;
    data;
}
function resolveEnumKeyName(keyType) {
    switch (keyType) {
        case constants_1.KeyType.ED25519: {
            return 'ed25519Key';
        }
        case constants_1.KeyType.SECP256K1: {
            return 'secp256k1Key';
        }
        default: {
            throw Error(`unknown type ${keyType}`);
        }
    }
}
/**
 * DUPLICATED FROM @near-js/types - REPLACE WITH IMPORTED REFERENCE AND DELETE
 * This ends up being necessary for Wallet Selector dependencies with
 * outdated peer dependencies and should only be temporary
 */
class Enum {
    constructor(properties) {
        if (Object.keys(properties).length !== 1) {
            throw new Error('Enum can only take single value');
        }
        Object.keys(properties).map((key) => {
            this[key] = properties[key];
        });
    }
}
/**
 * PublicKey representation that has type and bytes of the key.
 */
class PublicKey extends Enum {
    enum;
    ed25519Key;
    secp256k1Key;
    constructor(publicKey) {
        const keyName = resolveEnumKeyName(publicKey.keyType);
        super({ [keyName]: publicKey });
        this[keyName] = publicKey;
        this.enum = keyName;
    }
    /**
     * Creates a PublicKey instance from a string or an existing PublicKey instance.
     * @param value The string or PublicKey instance to create a PublicKey from.
     * @returns {PublicKey} The PublicKey instance.
     */
    static from(value) {
        if (typeof value === 'string') {
            return PublicKey.fromString(value);
        }
        return value;
    }
    /**
     * Creates a PublicKey instance from an encoded key string.
     * @param encodedKey The encoded key string.
     * @returns {PublicKey} The PublicKey instance created from the encoded key string.
     */
    static fromString(encodedKey) {
        const parts = encodedKey.split(':');
        let publicKey;
        let keyType;
        if (parts.length === 1) {
            publicKey = parts[0];
        }
        else if (parts.length === 2) {
            publicKey = parts[1];
            keyType = str_to_key_type(parts[0]);
        }
        else {
            throw new Error('Invalid encoded key format, must be <curve>:<encoded key>');
        }
        const decodedPublicKey = (0, utils_1.baseDecode)(publicKey);
        if (!keyType) {
            keyType = decodedPublicKey.length === constants_1.KeySize.SECP256k1_PUBLIC_KEY ? constants_1.KeyType.SECP256K1 : constants_1.KeyType.ED25519;
        }
        const keySize = keyType === constants_1.KeyType.ED25519 ? constants_1.KeySize.ED25519_PUBLIC_KEY : constants_1.KeySize.SECP256k1_PUBLIC_KEY;
        if (decodedPublicKey.length !== keySize) {
            throw new Error(`Invalid public key size (${decodedPublicKey.length}), must be ${keySize}`);
        }
        return new PublicKey({ keyType, data: decodedPublicKey });
    }
    /**
     * Returns a string representation of the public key.
     * @returns {string} The string representation of the public key.
     */
    toString() {
        const encodedKey = (0, utils_1.baseEncode)(this.data);
        return `${key_type_to_str(this.keyType)}:${encodedKey}`;
    }
    /**
     * Verifies a message signature using the public key.
     * @param message The message to be verified.
     * @param signature The signature to be verified.
     * @returns {boolean} `true` if the signature is valid, otherwise `false`.
     */
    verify(message, signature) {
        const keyType = this.keyType;
        const data = this.data;
        switch (keyType) {
            case constants_1.KeyType.ED25519:
                return ed25519_1.ed25519.verify(signature, message, data);
            case constants_1.KeyType.SECP256K1:
                return secp256k1_1.default.ecdsaVerify(signature.subarray(0, 64), message, new Uint8Array([0x04, ...data]));
            default:
                throw new Error(`Unknown key type: ${keyType}`);
        }
    }
    get keyPair() {
        return this.ed25519Key || this.secp256k1Key;
    }
    get keyType() {
        return this.keyPair.keyType;
    }
    get data() {
        return this.keyPair.data;
    }
}
exports.PublicKey = PublicKey;
