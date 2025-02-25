"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPairSecp256k1 = void 0;
const utils_1 = require("@near-js/utils");
const randombytes_1 = __importDefault(require("randombytes"));
const secp256k1_1 = __importDefault(require("secp256k1"));
const constants_1 = require("./constants.cjs");
const key_pair_base_1 = require("./key_pair_base.cjs");
const public_key_1 = require("./public_key.cjs");
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
class KeyPairSecp256k1 extends key_pair_base_1.KeyPairBase {
    publicKey;
    secretKey;
    extendedSecretKey;
    /**
     * Construct an instance of key pair given a secret key.
     * It's generally assumed that these are encoded in base58.
     * @param {string} extendedSecretKey
     */
    constructor(extendedSecretKey) {
        super();
        const decoded = (0, utils_1.baseDecode)(extendedSecretKey);
        const secretKey = new Uint8Array(decoded.slice(0, constants_1.KeySize.SECRET_KEY));
        const withHeader = secp256k1_1.default.publicKeyCreate(new Uint8Array(secretKey), false);
        const data = withHeader.subarray(1, withHeader.length); // remove the 0x04 header byte
        this.publicKey = new public_key_1.PublicKey({
            keyType: constants_1.KeyType.SECP256K1,
            data
        });
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
        // TODO: find better way to generate PK
        const secretKey = (0, randombytes_1.default)(constants_1.KeySize.SECRET_KEY);
        const withHeader = secp256k1_1.default.publicKeyCreate(new Uint8Array(secretKey), false);
        const publicKey = withHeader.subarray(1, withHeader.length);
        const extendedSecretKey = new Uint8Array([...secretKey, ...publicKey]);
        return new KeyPairSecp256k1((0, utils_1.baseEncode)(extendedSecretKey));
    }
    sign(message) {
        // nearcore expects 65 byte signatures formed by appending the recovery id to the 64 byte signature
        const { signature, recid } = secp256k1_1.default.ecdsaSign(message, (0, utils_1.baseDecode)(this.secretKey));
        return { signature: new Uint8Array([...signature, recid]), publicKey: this.publicKey };
    }
    verify(message, signature) {
        return this.publicKey.verify(message, signature);
    }
    toString() {
        return `secp256k1:${this.extendedSecretKey}`;
    }
    getPublicKey() {
        return this.publicKey;
    }
}
exports.KeyPairSecp256k1 = KeyPairSecp256k1;
