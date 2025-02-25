"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPairEd25519 = void 0;
const utils_1 = require("@near-js/utils");
const ed25519_1 = require("@noble/curves/ed25519");
const randombytes_1 = __importDefault(require("randombytes"));
const constants_1 = require("./constants.cjs");
const key_pair_base_1 = require("./key_pair_base.cjs");
const public_key_1 = require("./public_key.cjs");
/**
 * This class provides key pair functionality for Ed25519 curve:
 * generating key pairs, encoding key pairs, signing and verifying.
 */
class KeyPairEd25519 extends key_pair_base_1.KeyPairBase {
    publicKey;
    secretKey;
    extendedSecretKey;
    /**
     * Construct an instance of key pair given a secret key.
     * It's generally assumed that these are encoded in base58.
     * @param extendedSecretKey
     */
    constructor(extendedSecretKey) {
        super();
        const decoded = (0, utils_1.baseDecode)(extendedSecretKey);
        const secretKey = new Uint8Array(decoded.slice(0, constants_1.KeySize.SECRET_KEY));
        const publicKey = ed25519_1.ed25519.getPublicKey(new Uint8Array(secretKey));
        this.publicKey = new public_key_1.PublicKey({ keyType: constants_1.KeyType.ED25519, data: publicKey });
        this.secretKey = (0, utils_1.baseEncode)(secretKey);
        this.extendedSecretKey = extendedSecretKey;
    }
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
    static fromRandom() {
        const secretKey = (0, randombytes_1.default)(constants_1.KeySize.SECRET_KEY);
        const publicKey = ed25519_1.ed25519.getPublicKey(new Uint8Array(secretKey));
        const extendedSecretKey = new Uint8Array([...secretKey, ...publicKey]);
        return new KeyPairEd25519((0, utils_1.baseEncode)(extendedSecretKey));
    }
    /**
     * Signs a message using the key pair's secret key.
     * @param message The message to be signed.
     * @returns {Signature} The signature object containing the signature and the public key.
     */
    sign(message) {
        const signature = ed25519_1.ed25519.sign(message, (0, utils_1.baseDecode)(this.secretKey));
        return { signature, publicKey: this.publicKey };
    }
    /**
     * Verifies the signature of a message using the key pair's public key.
     * @param message The message to be verified.
     * @param signature The signature to be verified.
     * @returns {boolean} `true` if the signature is valid, otherwise `false`.
     */
    verify(message, signature) {
        return this.publicKey.verify(message, signature);
    }
    /**
     * Returns a string representation of the key pair in the format 'ed25519:[extendedSecretKey]'.
     * @returns {string} The string representation of the key pair.
     */
    toString() {
        return `ed25519:${this.extendedSecretKey}`;
    }
    /**
     * Retrieves the public key associated with the key pair.
     * @returns {PublicKey} The public key.
     */
    getPublicKey() {
        return this.publicKey;
    }
}
exports.KeyPairEd25519 = KeyPairEd25519;
