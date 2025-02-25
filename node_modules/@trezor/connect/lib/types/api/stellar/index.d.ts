import { Static } from '@trezor/schema-utils';
import { PROTO } from '../../../constants';
export type StellarAsset = Static<typeof StellarAsset>;
export declare const StellarAsset: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
    code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>;
export type StellarCreateAccountOperation = Static<typeof StellarCreateAccountOperation>;
export declare const StellarCreateAccountOperation: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"createAccount">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    destination: import("@trezor/schema-utils").TString;
    startingBalance: import("@trezor/schema-utils").TString;
}>;
export type StellarPaymentOperation = Static<typeof StellarPaymentOperation>;
export declare const StellarPaymentOperation: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"payment">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    destination: import("@trezor/schema-utils").TString;
    asset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    amount: import("@trezor/schema-utils").TString;
}>;
export type StellarPathPaymentStrictReceiveOperation = Static<typeof StellarPathPaymentStrictReceiveOperation>;
export declare const StellarPathPaymentStrictReceiveOperation: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"pathPaymentStrictReceive">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    sendAsset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    sendMax: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    destination: import("@trezor/schema-utils").TString;
    destAsset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    destAmount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>>;
}>;
export type StellarPathPaymentStrictSendOperation = Static<typeof StellarPathPaymentStrictSendOperation>;
export declare const StellarPathPaymentStrictSendOperation: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"pathPaymentStrictSend">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    sendAsset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    sendAmount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    destination: import("@trezor/schema-utils").TString;
    destAsset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    destMin: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>>;
}>;
export type StellarPassiveSellOfferOperation = Static<typeof StellarPassiveSellOfferOperation>;
export declare const StellarPassiveSellOfferOperation: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"createPassiveSellOffer">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    buying: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    selling: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    price: import("@trezor/schema-utils").TObject<{
        n: import("@trezor/schema-utils").TNumber;
        d: import("@trezor/schema-utils").TNumber;
    }>;
}>;
export type StellarManageSellOfferOperation = Static<typeof StellarManageSellOfferOperation>;
export declare const StellarManageSellOfferOperation: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"manageSellOffer">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    buying: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    selling: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    offerId: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    price: import("@trezor/schema-utils").TObject<{
        n: import("@trezor/schema-utils").TNumber;
        d: import("@trezor/schema-utils").TNumber;
    }>;
}>;
export type StellarManageBuyOfferOperation = Static<typeof StellarManageBuyOfferOperation>;
export declare const StellarManageBuyOfferOperation: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"manageBuyOffer">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    buying: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    selling: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    offerId: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    price: import("@trezor/schema-utils").TObject<{
        n: import("@trezor/schema-utils").TNumber;
        d: import("@trezor/schema-utils").TNumber;
    }>;
}>;
export type StellarSetOptionsOperation = Static<typeof StellarSetOptionsOperation>;
export declare const StellarSetOptionsOperation: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"setOptions">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    signer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TEnum<typeof PROTO.StellarSignerType>;
        key: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils/lib/custom-types/buffer").TBuffer]>;
        weight: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
    }>>;
    inflationDest: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    clearFlags: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
    setFlags: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
    masterWeight: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    lowThreshold: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    medThreshold: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    highThreshold: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    homeDomain: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>;
export type StellarChangeTrustOperation = Static<typeof StellarChangeTrustOperation>;
export declare const StellarChangeTrustOperation: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"changeTrust">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    line: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    limit: import("@trezor/schema-utils").TString;
}>;
export type StellarAllowTrustOperation = Static<typeof StellarAllowTrustOperation>;
export declare const StellarAllowTrustOperation: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"allowTrust">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    trustor: import("@trezor/schema-utils").TString;
    assetCode: import("@trezor/schema-utils").TString;
    assetType: import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>;
    authorize: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TBoolean, import("@trezor/schema-utils").TUndefined]>>;
}>;
export type StellarAccountMergeOperation = Static<typeof StellarAccountMergeOperation>;
export declare const StellarAccountMergeOperation: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"accountMerge">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    destination: import("@trezor/schema-utils").TString;
}>;
export type StellarManageDataOperation = Static<typeof StellarManageDataOperation>;
export declare const StellarManageDataOperation: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"manageData">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    name: import("@trezor/schema-utils").TString;
    value: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils/lib/custom-types/buffer").TBuffer]>>;
}>;
export type StellarBumpSequenceOperation = Static<typeof StellarBumpSequenceOperation>;
export declare const StellarBumpSequenceOperation: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"bumpSequence">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    bumpTo: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
}>;
export type StellarInflationOperation = Static<typeof StellarInflationOperation>;
export declare const StellarInflationOperation: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"inflation">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>;
export type StellarClaimClaimableBalanceOperation = Static<typeof StellarClaimClaimableBalanceOperation>;
export declare const StellarClaimClaimableBalanceOperation: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"claimClaimableBalance">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    balanceId: import("@trezor/schema-utils").TString;
}>;
export type StellarOperation = Static<typeof StellarOperation>;
export declare const StellarOperation: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"createAccount">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    destination: import("@trezor/schema-utils").TString;
    startingBalance: import("@trezor/schema-utils").TString;
}>, import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"payment">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    destination: import("@trezor/schema-utils").TString;
    asset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    amount: import("@trezor/schema-utils").TString;
}>, import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"pathPaymentStrictReceive">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    sendAsset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    sendMax: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    destination: import("@trezor/schema-utils").TString;
    destAsset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    destAmount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>>;
}>, import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"pathPaymentStrictSend">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    sendAsset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    sendAmount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    destination: import("@trezor/schema-utils").TString;
    destAsset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    destMin: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>>;
}>, import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"createPassiveSellOffer">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    buying: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    selling: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    price: import("@trezor/schema-utils").TObject<{
        n: import("@trezor/schema-utils").TNumber;
        d: import("@trezor/schema-utils").TNumber;
    }>;
}>, import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"manageSellOffer">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    buying: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    selling: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    offerId: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    price: import("@trezor/schema-utils").TObject<{
        n: import("@trezor/schema-utils").TNumber;
        d: import("@trezor/schema-utils").TNumber;
    }>;
}>, import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"manageBuyOffer">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    buying: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    selling: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    offerId: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    price: import("@trezor/schema-utils").TObject<{
        n: import("@trezor/schema-utils").TNumber;
        d: import("@trezor/schema-utils").TNumber;
    }>;
}>, import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"setOptions">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    signer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TEnum<typeof PROTO.StellarSignerType>;
        key: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils/lib/custom-types/buffer").TBuffer]>;
        weight: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
    }>>;
    inflationDest: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    clearFlags: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
    setFlags: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
    masterWeight: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    lowThreshold: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    medThreshold: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    highThreshold: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    homeDomain: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>, import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"changeTrust">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    line: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    limit: import("@trezor/schema-utils").TString;
}>, import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"allowTrust">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    trustor: import("@trezor/schema-utils").TString;
    assetCode: import("@trezor/schema-utils").TString;
    assetType: import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>;
    authorize: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TBoolean, import("@trezor/schema-utils").TUndefined]>>;
}>, import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"accountMerge">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    destination: import("@trezor/schema-utils").TString;
}>, import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"inflation">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>, import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"manageData">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    name: import("@trezor/schema-utils").TString;
    value: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils/lib/custom-types/buffer").TBuffer]>>;
}>, import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"bumpSequence">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    bumpTo: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
}>, import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"claimClaimableBalance">;
    source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    balanceId: import("@trezor/schema-utils").TString;
}>]>;
export type StellarTransaction = Static<typeof StellarTransaction>;
export declare const StellarTransaction: import("@trezor/schema-utils").TObject<{
    source: import("@trezor/schema-utils").TString;
    fee: import("@trezor/schema-utils").TNumber;
    sequence: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    timebounds: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        minTime: import("@trezor/schema-utils").TNumber;
        maxTime: import("@trezor/schema-utils").TNumber;
    }>>;
    memo: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TEnum<typeof PROTO.StellarMemoType>;
        id: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
        text: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        hash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils/lib/custom-types/buffer").TBuffer]>>;
    }>>;
    operations: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TLiteral<"createAccount">;
        source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        destination: import("@trezor/schema-utils").TString;
        startingBalance: import("@trezor/schema-utils").TString;
    }>, import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TLiteral<"payment">;
        source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        destination: import("@trezor/schema-utils").TString;
        asset: import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
            code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>;
        amount: import("@trezor/schema-utils").TString;
    }>, import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TLiteral<"pathPaymentStrictReceive">;
        source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        sendAsset: import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
            code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>;
        sendMax: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
        destination: import("@trezor/schema-utils").TString;
        destAsset: import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
            code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>;
        destAmount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
        path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
            code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>>>;
    }>, import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TLiteral<"pathPaymentStrictSend">;
        source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        sendAsset: import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
            code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>;
        sendAmount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
        destination: import("@trezor/schema-utils").TString;
        destAsset: import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
            code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>;
        destMin: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
        path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
            code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>>>;
    }>, import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TLiteral<"createPassiveSellOffer">;
        source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        buying: import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
            code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>;
        selling: import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
            code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>;
        amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
        price: import("@trezor/schema-utils").TObject<{
            n: import("@trezor/schema-utils").TNumber;
            d: import("@trezor/schema-utils").TNumber;
        }>;
    }>, import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TLiteral<"manageSellOffer">;
        source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        buying: import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
            code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>;
        selling: import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
            code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>;
        amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
        offerId: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
        price: import("@trezor/schema-utils").TObject<{
            n: import("@trezor/schema-utils").TNumber;
            d: import("@trezor/schema-utils").TNumber;
        }>;
    }>, import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TLiteral<"manageBuyOffer">;
        source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        buying: import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
            code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>;
        selling: import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
            code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>;
        amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
        offerId: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
        price: import("@trezor/schema-utils").TObject<{
            n: import("@trezor/schema-utils").TNumber;
            d: import("@trezor/schema-utils").TNumber;
        }>;
    }>, import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TLiteral<"setOptions">;
        source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        signer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TEnum<typeof PROTO.StellarSignerType>;
            key: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils/lib/custom-types/buffer").TBuffer]>;
            weight: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
        }>>;
        inflationDest: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        clearFlags: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
        setFlags: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
        masterWeight: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
        lowThreshold: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
        medThreshold: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
        highThreshold: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
        homeDomain: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>, import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TLiteral<"changeTrust">;
        source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        line: import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
            code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>;
        limit: import("@trezor/schema-utils").TString;
    }>, import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TLiteral<"allowTrust">;
        source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        trustor: import("@trezor/schema-utils").TString;
        assetCode: import("@trezor/schema-utils").TString;
        assetType: import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>;
        authorize: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TBoolean, import("@trezor/schema-utils").TUndefined]>>;
    }>, import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TLiteral<"accountMerge">;
        source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        destination: import("@trezor/schema-utils").TString;
    }>, import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TLiteral<"inflation">;
        source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>, import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TLiteral<"manageData">;
        source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        name: import("@trezor/schema-utils").TString;
        value: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils/lib/custom-types/buffer").TBuffer]>>;
    }>, import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TLiteral<"bumpSequence">;
        source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        bumpTo: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    }>, import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TLiteral<"claimClaimableBalance">;
        source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        balanceId: import("@trezor/schema-utils").TString;
    }>]>>;
}>;
export type StellarSignTransaction = Static<typeof StellarSignTransaction>;
export declare const StellarSignTransaction: import("@trezor/schema-utils").TObject<{
    path: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
    networkPassphrase: import("@trezor/schema-utils").TString;
    transaction: import("@trezor/schema-utils").TObject<{
        source: import("@trezor/schema-utils").TString;
        fee: import("@trezor/schema-utils").TNumber;
        sequence: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
        timebounds: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            minTime: import("@trezor/schema-utils").TNumber;
            maxTime: import("@trezor/schema-utils").TNumber;
        }>>;
        memo: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TEnum<typeof PROTO.StellarMemoType>;
            id: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
            text: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            hash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils/lib/custom-types/buffer").TBuffer]>>;
        }>>;
        operations: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TLiteral<"createAccount">;
            source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            destination: import("@trezor/schema-utils").TString;
            startingBalance: import("@trezor/schema-utils").TString;
        }>, import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TLiteral<"payment">;
            source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            destination: import("@trezor/schema-utils").TString;
            asset: import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
                code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>;
            amount: import("@trezor/schema-utils").TString;
        }>, import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TLiteral<"pathPaymentStrictReceive">;
            source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            sendAsset: import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
                code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>;
            sendMax: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
            destination: import("@trezor/schema-utils").TString;
            destAsset: import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
                code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>;
            destAmount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
            path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
                code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>>>;
        }>, import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TLiteral<"pathPaymentStrictSend">;
            source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            sendAsset: import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
                code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>;
            sendAmount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
            destination: import("@trezor/schema-utils").TString;
            destAsset: import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
                code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>;
            destMin: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
            path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
                code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>>>;
        }>, import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TLiteral<"createPassiveSellOffer">;
            source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            buying: import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
                code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>;
            selling: import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
                code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>;
            amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
            price: import("@trezor/schema-utils").TObject<{
                n: import("@trezor/schema-utils").TNumber;
                d: import("@trezor/schema-utils").TNumber;
            }>;
        }>, import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TLiteral<"manageSellOffer">;
            source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            buying: import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
                code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>;
            selling: import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
                code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>;
            amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
            offerId: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
            price: import("@trezor/schema-utils").TObject<{
                n: import("@trezor/schema-utils").TNumber;
                d: import("@trezor/schema-utils").TNumber;
            }>;
        }>, import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TLiteral<"manageBuyOffer">;
            source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            buying: import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
                code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>;
            selling: import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
                code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>;
            amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
            offerId: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
            price: import("@trezor/schema-utils").TObject<{
                n: import("@trezor/schema-utils").TNumber;
                d: import("@trezor/schema-utils").TNumber;
            }>;
        }>, import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TLiteral<"setOptions">;
            source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            signer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TEnum<typeof PROTO.StellarSignerType>;
                key: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils/lib/custom-types/buffer").TBuffer]>;
                weight: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
            }>>;
            inflationDest: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            clearFlags: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
            setFlags: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
            masterWeight: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
            lowThreshold: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
            medThreshold: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
            highThreshold: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
            homeDomain: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>, import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TLiteral<"changeTrust">;
            source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            line: import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>, import("@trezor/schema-utils/lib/custom-types/keyof-enum").TKeyOfEnum<typeof PROTO.StellarAssetType>]>;
                code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>;
            limit: import("@trezor/schema-utils").TString;
        }>, import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TLiteral<"allowTrust">;
            source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            trustor: import("@trezor/schema-utils").TString;
            assetCode: import("@trezor/schema-utils").TString;
            assetType: import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>;
            authorize: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TBoolean, import("@trezor/schema-utils").TUndefined]>>;
        }>, import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TLiteral<"accountMerge">;
            source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            destination: import("@trezor/schema-utils").TString;
        }>, import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TLiteral<"inflation">;
            source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>, import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TLiteral<"manageData">;
            source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            name: import("@trezor/schema-utils").TString;
            value: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils/lib/custom-types/buffer").TBuffer]>>;
        }>, import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TLiteral<"bumpSequence">;
            source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            bumpTo: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
        }>, import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TLiteral<"claimClaimableBalance">;
            source: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            balanceId: import("@trezor/schema-utils").TString;
        }>]>>;
    }>;
}>;
export type StellarSignedTx = Static<typeof StellarSignedTx>;
export declare const StellarSignedTx: import("@trezor/schema-utils").TObject<{
    publicKey: import("@trezor/schema-utils").TString;
    signature: import("@trezor/schema-utils").TString;
}>;
export type StellarOperationMessage = Static<typeof StellarOperationMessage>;
export declare const StellarOperationMessage: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"StellarCreateAccountOp">;
}>, import("@trezor/schema-utils").TObject<{
    source_account: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    new_account: import("@trezor/schema-utils").TString;
    starting_balance: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"StellarPaymentOp">;
}>, import("@trezor/schema-utils").TObject<{
    source_account: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    destination_account: import("@trezor/schema-utils").TString;
    asset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TLiteral<0>, import("@trezor/schema-utils").TLiteral<1>, import("@trezor/schema-utils").TLiteral<2>, import("@trezor/schema-utils").TLiteral<"NATIVE">, import("@trezor/schema-utils").TLiteral<"ALPHANUM4">, import("@trezor/schema-utils").TLiteral<"ALPHANUM12">]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"StellarPathPaymentStrictReceiveOp">;
}>, import("@trezor/schema-utils").TObject<{
    source_account: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    send_asset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TLiteral<0>, import("@trezor/schema-utils").TLiteral<1>, import("@trezor/schema-utils").TLiteral<2>, import("@trezor/schema-utils").TLiteral<"NATIVE">, import("@trezor/schema-utils").TLiteral<"ALPHANUM4">, import("@trezor/schema-utils").TLiteral<"ALPHANUM12">]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    send_max: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    destination_account: import("@trezor/schema-utils").TString;
    destination_asset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TLiteral<0>, import("@trezor/schema-utils").TLiteral<1>, import("@trezor/schema-utils").TLiteral<2>, import("@trezor/schema-utils").TLiteral<"NATIVE">, import("@trezor/schema-utils").TLiteral<"ALPHANUM4">, import("@trezor/schema-utils").TLiteral<"ALPHANUM12">]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    destination_amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    paths: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TLiteral<0>, import("@trezor/schema-utils").TLiteral<1>, import("@trezor/schema-utils").TLiteral<2>, import("@trezor/schema-utils").TLiteral<"NATIVE">, import("@trezor/schema-utils").TLiteral<"ALPHANUM4">, import("@trezor/schema-utils").TLiteral<"ALPHANUM12">]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>>;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"StellarPathPaymentStrictSendOp">;
}>, import("@trezor/schema-utils").TObject<{
    source_account: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    send_asset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TLiteral<0>, import("@trezor/schema-utils").TLiteral<1>, import("@trezor/schema-utils").TLiteral<2>, import("@trezor/schema-utils").TLiteral<"NATIVE">, import("@trezor/schema-utils").TLiteral<"ALPHANUM4">, import("@trezor/schema-utils").TLiteral<"ALPHANUM12">]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    send_amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    destination_account: import("@trezor/schema-utils").TString;
    destination_asset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TLiteral<0>, import("@trezor/schema-utils").TLiteral<1>, import("@trezor/schema-utils").TLiteral<2>, import("@trezor/schema-utils").TLiteral<"NATIVE">, import("@trezor/schema-utils").TLiteral<"ALPHANUM4">, import("@trezor/schema-utils").TLiteral<"ALPHANUM12">]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    destination_min: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    paths: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TLiteral<0>, import("@trezor/schema-utils").TLiteral<1>, import("@trezor/schema-utils").TLiteral<2>, import("@trezor/schema-utils").TLiteral<"NATIVE">, import("@trezor/schema-utils").TLiteral<"ALPHANUM4">, import("@trezor/schema-utils").TLiteral<"ALPHANUM12">]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>>;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"StellarManageSellOfferOp">;
}>, import("@trezor/schema-utils").TObject<{
    source_account: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    selling_asset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TLiteral<0>, import("@trezor/schema-utils").TLiteral<1>, import("@trezor/schema-utils").TLiteral<2>, import("@trezor/schema-utils").TLiteral<"NATIVE">, import("@trezor/schema-utils").TLiteral<"ALPHANUM4">, import("@trezor/schema-utils").TLiteral<"ALPHANUM12">]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    buying_asset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TLiteral<0>, import("@trezor/schema-utils").TLiteral<1>, import("@trezor/schema-utils").TLiteral<2>, import("@trezor/schema-utils").TLiteral<"NATIVE">, import("@trezor/schema-utils").TLiteral<"ALPHANUM4">, import("@trezor/schema-utils").TLiteral<"ALPHANUM12">]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    price_n: import("@trezor/schema-utils").TNumber;
    price_d: import("@trezor/schema-utils").TNumber;
    offer_id: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"StellarManageBuyOfferOp">;
}>, import("@trezor/schema-utils").TObject<{
    source_account: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    selling_asset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TLiteral<0>, import("@trezor/schema-utils").TLiteral<1>, import("@trezor/schema-utils").TLiteral<2>, import("@trezor/schema-utils").TLiteral<"NATIVE">, import("@trezor/schema-utils").TLiteral<"ALPHANUM4">, import("@trezor/schema-utils").TLiteral<"ALPHANUM12">]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    buying_asset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TLiteral<0>, import("@trezor/schema-utils").TLiteral<1>, import("@trezor/schema-utils").TLiteral<2>, import("@trezor/schema-utils").TLiteral<"NATIVE">, import("@trezor/schema-utils").TLiteral<"ALPHANUM4">, import("@trezor/schema-utils").TLiteral<"ALPHANUM12">]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    price_n: import("@trezor/schema-utils").TNumber;
    price_d: import("@trezor/schema-utils").TNumber;
    offer_id: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"StellarCreatePassiveSellOfferOp">;
}>, import("@trezor/schema-utils").TObject<{
    source_account: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    selling_asset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TLiteral<0>, import("@trezor/schema-utils").TLiteral<1>, import("@trezor/schema-utils").TLiteral<2>, import("@trezor/schema-utils").TLiteral<"NATIVE">, import("@trezor/schema-utils").TLiteral<"ALPHANUM4">, import("@trezor/schema-utils").TLiteral<"ALPHANUM12">]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    buying_asset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TLiteral<0>, import("@trezor/schema-utils").TLiteral<1>, import("@trezor/schema-utils").TLiteral<2>, import("@trezor/schema-utils").TLiteral<"NATIVE">, import("@trezor/schema-utils").TLiteral<"ALPHANUM4">, import("@trezor/schema-utils").TLiteral<"ALPHANUM12">]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    price_n: import("@trezor/schema-utils").TNumber;
    price_d: import("@trezor/schema-utils").TNumber;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"StellarSetOptionsOp">;
}>, import("@trezor/schema-utils").TObject<{
    source_account: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    inflation_destination_account: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    clear_flags: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
    set_flags: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
    master_weight: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    low_threshold: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    medium_threshold: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    high_threshold: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    home_domain: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    signer_type: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TEnum<typeof PROTO.StellarSignerType>>;
    signer_key: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils/lib/custom-types/buffer").TBuffer, import("@trezor/schema-utils").TString]>>;
    signer_weight: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"StellarChangeTrustOp">;
}>, import("@trezor/schema-utils").TObject<{
    source_account: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    asset: import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TLiteral<0>, import("@trezor/schema-utils").TLiteral<1>, import("@trezor/schema-utils").TLiteral<2>, import("@trezor/schema-utils").TLiteral<"NATIVE">, import("@trezor/schema-utils").TLiteral<"ALPHANUM4">, import("@trezor/schema-utils").TLiteral<"ALPHANUM12">]>;
        code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        issuer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    limit: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"StellarAllowTrustOp">;
}>, import("@trezor/schema-utils").TObject<{
    source_account: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    trusted_account: import("@trezor/schema-utils").TString;
    asset_type: import("@trezor/schema-utils").TEnum<typeof PROTO.StellarAssetType>;
    asset_code: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    is_authorized: import("@trezor/schema-utils").TBoolean;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"StellarAccountMergeOp">;
}>, import("@trezor/schema-utils").TObject<{
    source_account: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    destination_account: import("@trezor/schema-utils").TString;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"StellarManageDataOp">;
}>, import("@trezor/schema-utils").TObject<{
    source_account: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    key: import("@trezor/schema-utils").TString;
    value: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils/lib/custom-types/buffer").TBuffer, import("@trezor/schema-utils").TString]>>;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"StellarBumpSequenceOp">;
}>, import("@trezor/schema-utils").TObject<{
    source_account: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    bump_to: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TLiteral<"StellarClaimClaimableBalanceOp">;
}>, import("@trezor/schema-utils").TObject<{
    source_account: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    balance_id: import("@trezor/schema-utils").TString;
}>]>]>;
//# sourceMappingURL=index.d.ts.map