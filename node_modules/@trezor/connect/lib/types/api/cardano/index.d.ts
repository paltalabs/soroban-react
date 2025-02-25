import { Static } from '@trezor/schema-utils';
import { PROTO } from '../../../constants';
import { PublicKey } from '../../params';
export type CardanoCertificatePointer = Static<typeof CardanoCertificatePointer>;
export declare const CardanoCertificatePointer: import("@trezor/schema-utils").TObject<{
    blockIndex: import("@trezor/schema-utils").TNumber;
    txIndex: import("@trezor/schema-utils").TNumber;
    certificateIndex: import("@trezor/schema-utils").TNumber;
}>;
export type CardanoAddressParameters = Static<typeof CardanoAddressParameters>;
export declare const CardanoAddressParameters: import("@trezor/schema-utils").TObject<{
    addressType: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoAddressType>;
    path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
    stakingPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
    stakingKeyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    certificatePointer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        blockIndex: import("@trezor/schema-utils").TNumber;
        txIndex: import("@trezor/schema-utils").TNumber;
        certificateIndex: import("@trezor/schema-utils").TNumber;
    }>>;
    paymentScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    stakingScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>;
export type CardanoGetAddress = Static<typeof CardanoGetAddress>;
export declare const CardanoGetAddress: import("@trezor/schema-utils").TObject<{
    addressParameters: import("@trezor/schema-utils").TObject<{
        addressType: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoAddressType>;
        path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        stakingPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        stakingKeyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        certificatePointer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            blockIndex: import("@trezor/schema-utils").TNumber;
            txIndex: import("@trezor/schema-utils").TNumber;
            certificateIndex: import("@trezor/schema-utils").TNumber;
        }>>;
        paymentScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        stakingScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
    protocolMagic: import("@trezor/schema-utils").TNumber;
    networkId: import("@trezor/schema-utils").TNumber;
    address: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    showOnTrezor: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    derivationType: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoDerivationType>>;
    chunkify: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
}>;
export interface CardanoAddress {
    addressParameters: CardanoAddressParameters;
    protocolMagic: number;
    networkId: number;
    serializedPath: string;
    serializedStakingPath: string;
    address: string;
}
export type CardanoNativeScript = Static<typeof CardanoNativeScript>;
export declare const CardanoNativeScript: import("@trezor/schema-utils").TRecursive<import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoNativeScriptType>;
    scripts: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TThis>>;
    keyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    keyPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
    requiredSignaturesCount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
    invalidBefore: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    invalidHereafter: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>>;
export type CardanoGetNativeScriptHash = Static<typeof CardanoGetNativeScriptHash>;
export declare const CardanoGetNativeScriptHash: import("@trezor/schema-utils").TObject<{
    script: import("@trezor/schema-utils").TRecursive<import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoNativeScriptType>;
        scripts: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TThis>>;
        keyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        keyPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        requiredSignaturesCount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
        invalidBefore: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        invalidHereafter: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>;
    displayFormat: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoNativeScriptHashDisplayFormat>;
    derivationType: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoDerivationType>>;
}>;
export type CardanoNativeScriptHash = Static<typeof CardanoNativeScriptHash>;
export declare const CardanoNativeScriptHash: import("@trezor/schema-utils").TObject<{
    scriptHash: import("@trezor/schema-utils").TString;
}>;
export type CardanoGetPublicKey = Static<typeof CardanoGetPublicKey>;
export declare const CardanoGetPublicKey: import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    path: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
    showOnTrezor: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    suppressBackupWarning: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    chunkify: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
}>, import("@trezor/schema-utils").TObject<{
    derivationType: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoDerivationType>>;
}>]>;
export interface CardanoPublicKey extends PublicKey {
    node: PROTO.HDNodeType;
}
export type CardanoInput = Static<typeof CardanoInput>;
export declare const CardanoInput: import("@trezor/schema-utils").TObject<{
    path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
    prev_hash: import("@trezor/schema-utils").TString;
    prev_index: import("@trezor/schema-utils").TNumber;
}>;
export type CardanoToken = Static<typeof CardanoToken>;
export declare const CardanoToken: import("@trezor/schema-utils").TObject<{
    assetNameBytes: import("@trezor/schema-utils").TString;
    amount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    mintAmount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>;
export type CardanoAssetGroup = Static<typeof CardanoAssetGroup>;
export declare const CardanoAssetGroup: import("@trezor/schema-utils").TObject<{
    policyId: import("@trezor/schema-utils").TString;
    tokenAmounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        assetNameBytes: import("@trezor/schema-utils").TString;
        amount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        mintAmount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>;
}>;
export type CardanoOutput = Static<typeof CardanoOutput>;
export declare const CardanoOutput: import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TObject<{
    addressParameters: import("@trezor/schema-utils").TObject<{
        addressType: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoAddressType>;
        path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        stakingPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        stakingKeyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        certificatePointer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            blockIndex: import("@trezor/schema-utils").TNumber;
            txIndex: import("@trezor/schema-utils").TNumber;
            certificateIndex: import("@trezor/schema-utils").TNumber;
        }>>;
        paymentScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        stakingScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>;
}>, import("@trezor/schema-utils").TObject<{
    address: import("@trezor/schema-utils").TString;
}>]>, import("@trezor/schema-utils").TObject<{
    amount: import("@trezor/schema-utils").TString;
    tokenBundle: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        policyId: import("@trezor/schema-utils").TString;
        tokenAmounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            assetNameBytes: import("@trezor/schema-utils").TString;
            amount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            mintAmount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>>;
    }>>>;
    datumHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    format: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoTxOutputSerializationFormat>>;
    inlineDatum: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    referenceScript: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>]>;
export type CardanoPoolOwner = Static<typeof CardanoPoolOwner>;
export declare const CardanoPoolOwner: import("@trezor/schema-utils").TObject<{
    stakingKeyPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
    stakingKeyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>;
export type CardanoPoolRelay = Static<typeof CardanoPoolRelay>;
export declare const CardanoPoolRelay: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoPoolRelayType>;
    ipv4Address: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    ipv6Address: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    port: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
    hostName: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>;
export type CardanoPoolMetadata = Static<typeof CardanoPoolMetadata>;
export declare const CardanoPoolMetadata: import("@trezor/schema-utils").TObject<{
    url: import("@trezor/schema-utils").TString;
    hash: import("@trezor/schema-utils").TString;
}>;
export type CardanoPoolMargin = Static<typeof CardanoPoolMargin>;
export declare const CardanoPoolMargin: import("@trezor/schema-utils").TObject<{
    numerator: import("@trezor/schema-utils").TString;
    denominator: import("@trezor/schema-utils").TString;
}>;
export type CardanoPoolParameters = Static<typeof CardanoPoolParameters>;
export declare const CardanoPoolParameters: import("@trezor/schema-utils").TObject<{
    poolId: import("@trezor/schema-utils").TString;
    vrfKeyHash: import("@trezor/schema-utils").TString;
    pledge: import("@trezor/schema-utils").TString;
    cost: import("@trezor/schema-utils").TString;
    margin: import("@trezor/schema-utils").TObject<{
        numerator: import("@trezor/schema-utils").TString;
        denominator: import("@trezor/schema-utils").TString;
    }>;
    rewardAccount: import("@trezor/schema-utils").TString;
    owners: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        stakingKeyPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        stakingKeyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>;
    relays: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoPoolRelayType>;
        ipv4Address: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        ipv6Address: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        port: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
        hostName: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>;
    metadata: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        url: import("@trezor/schema-utils").TString;
        hash: import("@trezor/schema-utils").TString;
    }>>;
}>;
export type CardanoDRep = Static<typeof CardanoDRep>;
export declare const CardanoDRep: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoDRepType>;
    keyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    scriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>;
export type CardanoCertificate = Static<typeof CardanoCertificate>;
export declare const CardanoCertificate: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoCertificateType>;
    path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
    pool: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    poolParameters: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        poolId: import("@trezor/schema-utils").TString;
        vrfKeyHash: import("@trezor/schema-utils").TString;
        pledge: import("@trezor/schema-utils").TString;
        cost: import("@trezor/schema-utils").TString;
        margin: import("@trezor/schema-utils").TObject<{
            numerator: import("@trezor/schema-utils").TString;
            denominator: import("@trezor/schema-utils").TString;
        }>;
        rewardAccount: import("@trezor/schema-utils").TString;
        owners: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            stakingKeyPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
            stakingKeyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>>;
        relays: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoPoolRelayType>;
            ipv4Address: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            ipv6Address: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            port: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
            hostName: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>>;
        metadata: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            url: import("@trezor/schema-utils").TString;
            hash: import("@trezor/schema-utils").TString;
        }>>;
    }>>;
    scriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    keyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    deposit: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    dRep: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoDRepType>;
        keyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        scriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>;
}>;
export type CardanoWithdrawal = Static<typeof CardanoWithdrawal>;
export declare const CardanoWithdrawal: import("@trezor/schema-utils").TObject<{
    path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
    amount: import("@trezor/schema-utils").TString;
    scriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    keyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>;
export type CardanoMint = Static<typeof CardanoMint>;
export declare const CardanoMint: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
    policyId: import("@trezor/schema-utils").TString;
    tokenAmounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        assetNameBytes: import("@trezor/schema-utils").TString;
        amount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        mintAmount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>;
}>>;
export type CardanoCollateralInput = Static<typeof CardanoCollateralInput>;
export declare const CardanoCollateralInput: import("@trezor/schema-utils").TObject<{
    path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
    prev_hash: import("@trezor/schema-utils").TString;
    prev_index: import("@trezor/schema-utils").TNumber;
}>;
export type CardanoRequiredSigner = Static<typeof CardanoRequiredSigner>;
export declare const CardanoRequiredSigner: import("@trezor/schema-utils").TObject<{
    keyPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
    keyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>;
export type CardanoReferenceInput = Static<typeof CardanoReferenceInput>;
export declare const CardanoReferenceInput: import("@trezor/schema-utils").TObject<{
    prev_hash: import("@trezor/schema-utils").TString;
    prev_index: import("@trezor/schema-utils").TNumber;
}>;
export type CardanoCVoteRegistrationDelegation = Static<typeof CardanoCVoteRegistrationDelegation>;
export declare const CardanoCVoteRegistrationDelegation: import("@trezor/schema-utils").TObject<{
    votePublicKey: import("@trezor/schema-utils").TString;
    weight: import("@trezor/schema-utils").TNumber;
}>;
export type CardanoCVoteRegistrationParameters = Static<typeof CardanoCVoteRegistrationParameters>;
export declare const CardanoCVoteRegistrationParameters: import("@trezor/schema-utils").TObject<{
    votePublicKey: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    stakingPath: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
    paymentAddressParameters: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        addressType: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoAddressType>;
        path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        stakingPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        stakingKeyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        certificatePointer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            blockIndex: import("@trezor/schema-utils").TNumber;
            txIndex: import("@trezor/schema-utils").TNumber;
            certificateIndex: import("@trezor/schema-utils").TNumber;
        }>>;
        paymentScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        stakingScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>;
    nonce: import("@trezor/schema-utils").TString;
    format: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoCVoteRegistrationFormat>>;
    delegations: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        votePublicKey: import("@trezor/schema-utils").TString;
        weight: import("@trezor/schema-utils").TNumber;
    }>>>;
    votingPurpose: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
    paymentAddress: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>;
export type CardanoAuxiliaryData = Static<typeof CardanoAuxiliaryData>;
export declare const CardanoAuxiliaryData: import("@trezor/schema-utils").TObject<{
    hash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    cVoteRegistrationParameters: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        votePublicKey: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        stakingPath: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
        paymentAddressParameters: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            addressType: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoAddressType>;
            path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
            stakingPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
            stakingKeyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            certificatePointer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
                blockIndex: import("@trezor/schema-utils").TNumber;
                txIndex: import("@trezor/schema-utils").TNumber;
                certificateIndex: import("@trezor/schema-utils").TNumber;
            }>>;
            paymentScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            stakingScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>>;
        nonce: import("@trezor/schema-utils").TString;
        format: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoCVoteRegistrationFormat>>;
        delegations: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            votePublicKey: import("@trezor/schema-utils").TString;
            weight: import("@trezor/schema-utils").TNumber;
        }>>>;
        votingPurpose: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
        paymentAddress: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>;
}>;
export type CardanoSignTransaction = Static<typeof CardanoSignTransaction>;
export declare const CardanoSignTransaction: import("@trezor/schema-utils").TObject<{
    inputs: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        prev_hash: import("@trezor/schema-utils").TString;
        prev_index: import("@trezor/schema-utils").TNumber;
    }>>;
    outputs: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TObject<{
        addressParameters: import("@trezor/schema-utils").TObject<{
            addressType: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoAddressType>;
            path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
            stakingPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
            stakingKeyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            certificatePointer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
                blockIndex: import("@trezor/schema-utils").TNumber;
                txIndex: import("@trezor/schema-utils").TNumber;
                certificateIndex: import("@trezor/schema-utils").TNumber;
            }>>;
            paymentScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            stakingScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>;
    }>, import("@trezor/schema-utils").TObject<{
        address: import("@trezor/schema-utils").TString;
    }>]>, import("@trezor/schema-utils").TObject<{
        amount: import("@trezor/schema-utils").TString;
        tokenBundle: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            policyId: import("@trezor/schema-utils").TString;
            tokenAmounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                assetNameBytes: import("@trezor/schema-utils").TString;
                amount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                mintAmount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>>;
        }>>>;
        datumHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        format: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoTxOutputSerializationFormat>>;
        inlineDatum: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        referenceScript: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>]>>;
    fee: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    ttl: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    certificates: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoCertificateType>;
        path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        pool: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        poolParameters: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            poolId: import("@trezor/schema-utils").TString;
            vrfKeyHash: import("@trezor/schema-utils").TString;
            pledge: import("@trezor/schema-utils").TString;
            cost: import("@trezor/schema-utils").TString;
            margin: import("@trezor/schema-utils").TObject<{
                numerator: import("@trezor/schema-utils").TString;
                denominator: import("@trezor/schema-utils").TString;
            }>;
            rewardAccount: import("@trezor/schema-utils").TString;
            owners: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                stakingKeyPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
                stakingKeyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>>;
            relays: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoPoolRelayType>;
                ipv4Address: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                ipv6Address: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                port: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
                hostName: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>>;
            metadata: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
                url: import("@trezor/schema-utils").TString;
                hash: import("@trezor/schema-utils").TString;
            }>>;
        }>>;
        scriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        keyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        deposit: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        dRep: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoDRepType>;
            keyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            scriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>>;
    }>>>;
    withdrawals: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        amount: import("@trezor/schema-utils").TString;
        scriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        keyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>>;
    validityIntervalStart: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    auxiliaryData: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        hash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        cVoteRegistrationParameters: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            votePublicKey: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            stakingPath: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
            paymentAddressParameters: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
                addressType: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoAddressType>;
                path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
                stakingPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
                stakingKeyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                certificatePointer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
                    blockIndex: import("@trezor/schema-utils").TNumber;
                    txIndex: import("@trezor/schema-utils").TNumber;
                    certificateIndex: import("@trezor/schema-utils").TNumber;
                }>>;
                paymentScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                stakingScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>>;
            nonce: import("@trezor/schema-utils").TString;
            format: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoCVoteRegistrationFormat>>;
            delegations: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                votePublicKey: import("@trezor/schema-utils").TString;
                weight: import("@trezor/schema-utils").TNumber;
            }>>>;
            votingPurpose: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
            paymentAddress: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>>;
    }>>;
    mint: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        policyId: import("@trezor/schema-utils").TString;
        tokenAmounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            assetNameBytes: import("@trezor/schema-utils").TString;
            amount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            mintAmount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>>;
    }>>>;
    scriptDataHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    collateralInputs: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        prev_hash: import("@trezor/schema-utils").TString;
        prev_index: import("@trezor/schema-utils").TNumber;
    }>>>;
    requiredSigners: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        keyPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        keyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>>;
    collateralReturn: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TObject<{
        addressParameters: import("@trezor/schema-utils").TObject<{
            addressType: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoAddressType>;
            path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
            stakingPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
            stakingKeyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            certificatePointer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
                blockIndex: import("@trezor/schema-utils").TNumber;
                txIndex: import("@trezor/schema-utils").TNumber;
                certificateIndex: import("@trezor/schema-utils").TNumber;
            }>>;
            paymentScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            stakingScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>;
    }>, import("@trezor/schema-utils").TObject<{
        address: import("@trezor/schema-utils").TString;
    }>]>, import("@trezor/schema-utils").TObject<{
        amount: import("@trezor/schema-utils").TString;
        tokenBundle: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            policyId: import("@trezor/schema-utils").TString;
            tokenAmounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                assetNameBytes: import("@trezor/schema-utils").TString;
                amount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                mintAmount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>>;
        }>>>;
        datumHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        format: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoTxOutputSerializationFormat>>;
        inlineDatum: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        referenceScript: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>]>>;
    totalCollateral: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    referenceInputs: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        prev_hash: import("@trezor/schema-utils").TString;
        prev_index: import("@trezor/schema-utils").TNumber;
    }>>>;
    additionalWitnessRequests: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>>;
    protocolMagic: import("@trezor/schema-utils").TNumber;
    networkId: import("@trezor/schema-utils").TNumber;
    signingMode: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoTxSigningMode>;
    derivationType: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoDerivationType>>;
    includeNetworkId: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    chunkify: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    tagCborSets: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
}>;
export type CardanoSignTransactionExtended = Static<typeof CardanoSignTransactionExtended>;
export declare const CardanoSignTransactionExtended: import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    inputs: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        prev_hash: import("@trezor/schema-utils").TString;
        prev_index: import("@trezor/schema-utils").TNumber;
    }>>;
    outputs: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TObject<{
        addressParameters: import("@trezor/schema-utils").TObject<{
            addressType: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoAddressType>;
            path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
            stakingPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
            stakingKeyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            certificatePointer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
                blockIndex: import("@trezor/schema-utils").TNumber;
                txIndex: import("@trezor/schema-utils").TNumber;
                certificateIndex: import("@trezor/schema-utils").TNumber;
            }>>;
            paymentScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            stakingScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>;
    }>, import("@trezor/schema-utils").TObject<{
        address: import("@trezor/schema-utils").TString;
    }>]>, import("@trezor/schema-utils").TObject<{
        amount: import("@trezor/schema-utils").TString;
        tokenBundle: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            policyId: import("@trezor/schema-utils").TString;
            tokenAmounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                assetNameBytes: import("@trezor/schema-utils").TString;
                amount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                mintAmount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>>;
        }>>>;
        datumHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        format: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoTxOutputSerializationFormat>>;
        inlineDatum: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        referenceScript: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>]>>;
    fee: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    ttl: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    certificates: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoCertificateType>;
        path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        pool: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        poolParameters: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            poolId: import("@trezor/schema-utils").TString;
            vrfKeyHash: import("@trezor/schema-utils").TString;
            pledge: import("@trezor/schema-utils").TString;
            cost: import("@trezor/schema-utils").TString;
            margin: import("@trezor/schema-utils").TObject<{
                numerator: import("@trezor/schema-utils").TString;
                denominator: import("@trezor/schema-utils").TString;
            }>;
            rewardAccount: import("@trezor/schema-utils").TString;
            owners: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                stakingKeyPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
                stakingKeyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>>;
            relays: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoPoolRelayType>;
                ipv4Address: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                ipv6Address: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                port: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
                hostName: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>>;
            metadata: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
                url: import("@trezor/schema-utils").TString;
                hash: import("@trezor/schema-utils").TString;
            }>>;
        }>>;
        scriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        keyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        deposit: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        dRep: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoDRepType>;
            keyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            scriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>>;
    }>>>;
    withdrawals: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        amount: import("@trezor/schema-utils").TString;
        scriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        keyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>>;
    validityIntervalStart: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    auxiliaryData: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        hash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        cVoteRegistrationParameters: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            votePublicKey: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            stakingPath: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
            paymentAddressParameters: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
                addressType: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoAddressType>;
                path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
                stakingPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
                stakingKeyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                certificatePointer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
                    blockIndex: import("@trezor/schema-utils").TNumber;
                    txIndex: import("@trezor/schema-utils").TNumber;
                    certificateIndex: import("@trezor/schema-utils").TNumber;
                }>>;
                paymentScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                stakingScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>>;
            nonce: import("@trezor/schema-utils").TString;
            format: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoCVoteRegistrationFormat>>;
            delegations: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                votePublicKey: import("@trezor/schema-utils").TString;
                weight: import("@trezor/schema-utils").TNumber;
            }>>>;
            votingPurpose: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
            paymentAddress: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>>;
    }>>;
    mint: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        policyId: import("@trezor/schema-utils").TString;
        tokenAmounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            assetNameBytes: import("@trezor/schema-utils").TString;
            amount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            mintAmount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>>;
    }>>>;
    scriptDataHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    collateralInputs: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        prev_hash: import("@trezor/schema-utils").TString;
        prev_index: import("@trezor/schema-utils").TNumber;
    }>>>;
    requiredSigners: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        keyPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
        keyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>>;
    collateralReturn: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TObject<{
        addressParameters: import("@trezor/schema-utils").TObject<{
            addressType: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoAddressType>;
            path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
            stakingPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
            stakingKeyHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            certificatePointer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
                blockIndex: import("@trezor/schema-utils").TNumber;
                txIndex: import("@trezor/schema-utils").TNumber;
                certificateIndex: import("@trezor/schema-utils").TNumber;
            }>>;
            paymentScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            stakingScriptHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>;
    }>, import("@trezor/schema-utils").TObject<{
        address: import("@trezor/schema-utils").TString;
    }>]>, import("@trezor/schema-utils").TObject<{
        amount: import("@trezor/schema-utils").TString;
        tokenBundle: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            policyId: import("@trezor/schema-utils").TString;
            tokenAmounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                assetNameBytes: import("@trezor/schema-utils").TString;
                amount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                mintAmount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            }>>;
        }>>>;
        datumHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        format: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoTxOutputSerializationFormat>>;
        inlineDatum: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        referenceScript: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>]>>;
    totalCollateral: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    referenceInputs: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        prev_hash: import("@trezor/schema-utils").TString;
        prev_index: import("@trezor/schema-utils").TNumber;
    }>>>;
    additionalWitnessRequests: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>>;
    protocolMagic: import("@trezor/schema-utils").TNumber;
    networkId: import("@trezor/schema-utils").TNumber;
    signingMode: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoTxSigningMode>;
    derivationType: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoDerivationType>>;
    includeNetworkId: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    chunkify: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    tagCborSets: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
}>, import("@trezor/schema-utils").TObject<{
    unsignedTx: import("@trezor/schema-utils").TObject<{
        body: import("@trezor/schema-utils").TString;
        hash: import("@trezor/schema-utils").TString;
    }>;
    testnet: import("@trezor/schema-utils").TBoolean;
}>]>;
export type CardanoSignedTxWitness = Static<typeof CardanoSignedTxWitness>;
export declare const CardanoSignedTxWitness: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoTxWitnessType>;
    pubKey: import("@trezor/schema-utils").TString;
    signature: import("@trezor/schema-utils").TString;
    chainCode: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>;
export type CardanoAuxiliaryDataSupplement = Static<typeof CardanoAuxiliaryDataSupplement>;
export declare const CardanoAuxiliaryDataSupplement: import("@trezor/schema-utils").TObject<{
    type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoTxAuxiliaryDataSupplementType>;
    auxiliaryDataHash: import("@trezor/schema-utils").TString;
    cVoteRegistrationSignature: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>;
export type CardanoSignedTxData = Static<typeof CardanoSignedTxData>;
export declare const CardanoSignedTxData: import("@trezor/schema-utils").TObject<{
    hash: import("@trezor/schema-utils").TString;
    witnesses: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoTxWitnessType>;
        pubKey: import("@trezor/schema-utils").TString;
        signature: import("@trezor/schema-utils").TString;
        chainCode: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>;
    auxiliaryDataSupplement: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TEnum<typeof PROTO.CardanoTxAuxiliaryDataSupplementType>;
        auxiliaryDataHash: import("@trezor/schema-utils").TString;
        cVoteRegistrationSignature: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>;
}>;
//# sourceMappingURL=index.d.ts.map