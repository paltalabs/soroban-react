import { Static } from '@trezor/schema-utils';
import { PROTO } from '../../constants';
export type Path = number[];
export declare const Path: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>;
export type CollateralInputWithPath = {
    collateralInput: PROTO.CardanoTxCollateralInput;
    path?: Path;
};
export type InputWithPath = Static<typeof InputWithPath>;
export declare const InputWithPath: import("@trezor/schema-utils").TObject<{
    input: import("@trezor/schema-utils").TObject<{
        prev_hash: import("@trezor/schema-utils").TString;
        prev_index: import("@trezor/schema-utils").TNumber;
    }>;
    path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>>;
}>;
export type InputWithPathParam = Static<typeof InputWithPath>;
export declare const InputWithPathParam: import("@trezor/schema-utils").TObject<{
    prev_hash: import("@trezor/schema-utils").TString;
    prev_index: import("@trezor/schema-utils").TNumber;
    path: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>>;
}>;
export declare const transformInput: (input: unknown) => InputWithPath;
export declare const transformCollateralInput: (collateralInput: unknown) => CollateralInputWithPath;
export declare const transformReferenceInput: (referenceInput: unknown) => PROTO.CardanoTxReferenceInput;
//# sourceMappingURL=cardanoInputs.d.ts.map