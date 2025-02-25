import { Static } from '@trezor/schema-utils';
import { Params, BundledParams, Response } from '../params';
export type CipherKeyValue = Static<typeof CipherKeyValue>;
export declare const CipherKeyValue: import("@trezor/schema-utils").TObject<{
    path: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
    key: import("@trezor/schema-utils").TString;
    value: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils/lib/custom-types/buffer").TBuffer]>;
    encrypt: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    askOnEncrypt: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    askOnDecrypt: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    iv: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils/lib/custom-types/buffer").TBuffer]>>;
}>;
export interface CipheredValue {
    value: string;
}
export declare function cipherKeyValue(params: Params<CipherKeyValue>): Response<CipheredValue>;
export declare function cipherKeyValue(params: BundledParams<CipherKeyValue>): Response<CipheredValue[]>;
//# sourceMappingURL=cipherKeyValue.d.ts.map