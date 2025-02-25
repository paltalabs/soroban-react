"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPair = void 0;
const key_pair_base_1 = require("./key_pair_base.cjs");
const key_pair_ed25519_1 = require("./key_pair_ed25519.cjs");
const key_pair_secp256k1_1 = require("./key_pair_secp256k1.cjs");
class KeyPair extends key_pair_base_1.KeyPairBase {
    /**
     * @param curve Name of elliptical curve, case-insensitive
     * @returns Random KeyPair based on the curve
     */
    static fromRandom(curve) {
        switch (curve.toUpperCase()) {
            case 'ED25519': return key_pair_ed25519_1.KeyPairEd25519.fromRandom();
            case 'SECP256K1': return key_pair_secp256k1_1.KeyPairSecp256k1.fromRandom();
            default: throw new Error(`Unknown curve ${curve}`);
        }
    }
    /**
     * Creates a key pair from an encoded key string.
     * @param encodedKey The encoded key string.
     * @returns {KeyPair} The key pair created from the encoded key string.
     */
    static fromString(encodedKey) {
        const parts = encodedKey.split(':');
        if (parts.length === 2) {
            switch (parts[0].toUpperCase()) {
                case 'ED25519': return new key_pair_ed25519_1.KeyPairEd25519(parts[1]);
                case 'SECP256K1': return new key_pair_secp256k1_1.KeyPairSecp256k1(parts[1]);
                default: throw new Error(`Unknown curve: ${parts[0]}`);
            }
        }
        else {
            throw new Error('Invalid encoded key format, must be <curve>:<encoded key>');
        }
    }
}
exports.KeyPair = KeyPair;
