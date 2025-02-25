import { AssetGroupWithTokens } from './cardanoTokenBundle';
import { PROTO } from '../../constants';
export type OutputWithData = {
    output: PROTO.CardanoTxOutput;
    tokenBundle?: AssetGroupWithTokens[];
    inlineDatum?: string;
    referenceScript?: string;
};
export declare const OutputValidation: import("@trezor/schema-utils").TObject<{
    address: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    amount: import("@trezor/schema-utils/lib/custom-types/uint").TUint;
    tokenBundle: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        policyId: import("@trezor/schema-utils").TString;
        tokenAmounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            assetNameBytes: import("@trezor/schema-utils").TString;
            amount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            mintAmount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        }>>;
    }>>>;
    datumHash: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    format: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
    inlineDatum: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    referenceScript: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    addressParameters: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
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
}>;
export declare const transformOutput: (output: unknown) => OutputWithData;
export declare const sendOutput: (typedCall: any, outputWithData: OutputWithData) => Promise<void>;
//# sourceMappingURL=cardanoOutputs.d.ts.map