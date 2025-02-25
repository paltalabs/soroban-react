"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeySize = exports.KeyType = void 0;
/** All supported key types */
var KeyType;
(function (KeyType) {
    KeyType[KeyType["ED25519"] = 0] = "ED25519";
    KeyType[KeyType["SECP256K1"] = 1] = "SECP256K1";
})(KeyType || (exports.KeyType = KeyType = {}));
exports.KeySize = {
    SECRET_KEY: 32,
    ED25519_PUBLIC_KEY: 32,
    SECP256k1_PUBLIC_KEY: 64,
};
