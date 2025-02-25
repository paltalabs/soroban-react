import { Static } from '@trezor/schema-utils';
export declare enum Networks {
    mainnet = 104,
    testnet = 152,
    mijin = 96
}
export type EnumNetworks = Static<typeof EnumNetworks>;
export declare const EnumNetworks: import("@trezor/schema-utils").TEnum<typeof Networks>;
export declare enum TxType {
    TRANSFER = 257,
    COSIGNING = 258,
    IMPORTANCE_TRANSFER = 2049,
    AGGREGATE_MODIFICATION = 4097,
    MULTISIG_SIGNATURE = 4098,
    MULTISIG = 4100,
    PROVISION_NAMESPACE = 8193,
    MOSAIC_CREATION = 16385,
    SUPPLY_CHANGE = 16386
}
export type EnumTxType = Static<typeof EnumTxType>;
export declare const EnumTxType: import("@trezor/schema-utils").TEnum<typeof TxType>;
export declare enum TxVersion {
    mainnet = 1744830464,
    testnet = -1744830464,
    mijin = 1610612736
}
export type EnumTxVersion = Static<typeof EnumTxVersion>;
export declare const EnumTxVersion: import("@trezor/schema-utils").TEnum<typeof TxVersion>;
//# sourceMappingURL=nem.d.ts.map