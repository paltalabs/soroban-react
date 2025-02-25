import { Static } from '@trezor/schema-utils';
import { PROTO } from '../../constants';
import { Params, BundledParams, Response } from '../params';
export type GetOwnershipId = Static<typeof GetOwnershipId>;
export declare const GetOwnershipId: import("@trezor/schema-utils").TObject<{
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
}>;
export interface OwnershipId extends PROTO.OwnershipId {
    path: number[];
    serializedPath: string;
}
export declare function getOwnershipId(params: Params<GetOwnershipId>): Response<OwnershipId>;
export declare function getOwnershipId(params: BundledParams<GetOwnershipId>): Response<OwnershipId[]>;
//# sourceMappingURL=getOwnershipId.d.ts.map