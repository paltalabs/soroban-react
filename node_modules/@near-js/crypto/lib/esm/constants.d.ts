/** All supported key types */
export declare enum KeyType {
    ED25519 = 0,
    SECP256K1 = 1
}
export declare const KeySize: {
    SECRET_KEY: number;
    ED25519_PUBLIC_KEY: number;
    SECP256k1_PUBLIC_KEY: number;
};
export type CurveType = 'ed25519' | 'ED25519' | 'secp256k1' | 'SECP256K1';
export type KeyPairString = `ed25519:${string}` | `secp256k1:${string}`;
//# sourceMappingURL=constants.d.ts.map