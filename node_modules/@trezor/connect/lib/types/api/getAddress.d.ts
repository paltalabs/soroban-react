import { Static } from '@trezor/schema-utils';
import { PROTO } from '../../constants';
import { Address as AddressShared, Params, BundledParams, Response } from '../params';
export type GetAddress = Static<typeof GetAddress>;
export declare const GetAddress: import("@trezor/schema-utils").TObject<{
    path: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
    address: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    showOnTrezor: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    chunkify: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    useEventListener: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    coin: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    scriptType: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TLiteral<"SPENDADDRESS">, import("@trezor/schema-utils").TLiteral<"SPENDMULTISIG">, import("@trezor/schema-utils").TLiteral<"SPENDWITNESS">, import("@trezor/schema-utils").TLiteral<"SPENDP2SHWITNESS">, import("@trezor/schema-utils").TLiteral<"SPENDTAPROOT">]>>;
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
    crossChain: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    unlockPath: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        address_n: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>;
        mac: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    }>>;
}>;
type Address = AddressShared & PROTO.Address;
export declare function getAddress(params: Params<GetAddress>): Response<Address>;
export declare function getAddress(params: BundledParams<GetAddress>): Response<Address[]>;
export {};
//# sourceMappingURL=getAddress.d.ts.map