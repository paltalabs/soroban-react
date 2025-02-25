/** All supported key types */
export var KeyType;
(function (KeyType) {
    KeyType[KeyType["ED25519"] = 0] = "ED25519";
    KeyType[KeyType["SECP256K1"] = 1] = "SECP256K1";
})(KeyType || (KeyType = {}));
export const KeySize = {
    SECRET_KEY: 32,
    ED25519_PUBLIC_KEY: 32,
    SECP256k1_PUBLIC_KEY: 64,
};
