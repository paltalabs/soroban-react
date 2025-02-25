import { Static } from '@trezor/schema-utils';
import { PROTO } from '../../constants';
import { Params, BundledParams, Response } from '../params';
export type GetOwnershipProof = Static<typeof GetOwnershipProof>;
export declare const GetOwnershipProof: import("@trezor/schema-utils").TObject<{
    path: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
    coin: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    multisig: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        pubkeys: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            node: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TObject<{
                depth: import("@trezor/schema-utils").TNumber;
                fingerprint: import("@trezor/schema-utils").TNumber;
                child_num: import("@trezor/schema-utils").TNumber;
                chain_code: import("@trezor/schema-utils").TString;
                private_key: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                public_key: import("@trezor/schema-utils").TString;
            }>, import("@trezor/schema-utils").TString]>;
            address_n: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>;
        }>>;
        signatures: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TString>;
        m: import("@trezor/schema-utils").TNumber;
        nodes: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            depth: import("@trezor/schema-utils").TNumber;
            fingerprint: import("@trezor/schema-utils").TNumber;
            child_num: import("@trezor/schema-utils").TNumber;
            chain_code: import("@trezor/schema-utils").TString;
            private_key: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            public_key: import("@trezor/schema-utils").TString;
        }>>>;
        address_n: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>>;
    }>>;
    scriptType: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TLiteral<"SPENDADDRESS">, import("@trezor/schema-utils").TLiteral<"SPENDMULTISIG">, import("@trezor/schema-utils").TLiteral<"SPENDWITNESS">, import("@trezor/schema-utils").TLiteral<"SPENDP2SHWITNESS">, import("@trezor/schema-utils").TLiteral<"SPENDTAPROOT">]>>;
    userConfirmation: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    ownershipIds: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TString>>;
    commitmentData: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    preauthorized: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
}>;
export interface OwnershipProof extends PROTO.OwnershipProof {
    path: number[];
    serializedPath: string;
}
export declare function getOwnershipProof(params: Params<GetOwnershipProof>): Response<OwnershipProof>;
export declare function getOwnershipProof(params: BundledParams<GetOwnershipProof>): Response<OwnershipProof[]>;
//# sourceMappingURL=getOwnershipProof.d.ts.map