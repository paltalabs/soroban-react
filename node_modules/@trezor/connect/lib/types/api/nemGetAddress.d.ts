import { Static } from '@trezor/schema-utils';
import { Address, Params, BundledParams, Response } from '../params';
export type NEMGetAddress = Static<typeof NEMGetAddress>;
export declare const NEMGetAddress: import("@trezor/schema-utils").TObject<{
    path: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
    address: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    showOnTrezor: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    chunkify: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    useEventListener: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    network: import("@trezor/schema-utils").TNumber;
}>;
export declare function nemGetAddress(params: Params<NEMGetAddress>): Response<Address>;
export declare function nemGetAddress(params: BundledParams<NEMGetAddress>): Response<Address[]>;
//# sourceMappingURL=nemGetAddress.d.ts.map