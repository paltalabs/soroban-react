import { Static } from '@trezor/schema-utils';
import type { Params, Response } from '../params';
export type FirmwareUpdate = Static<typeof FirmwareUpdate>;
export declare const FirmwareUpdate: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TObject<{
    binary: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TUndefined>;
    btcOnly: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    baseUrl: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    language: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>, import("@trezor/schema-utils").TObject<{
    binary: import("@trezor/schema-utils/lib/custom-types/array-buffer").TArrayBuffer;
}>]>;
export type FirmwareUpdateResponse = {
    check: 'mismatch' | 'valid' | 'omitted';
} | {
    check: 'other-error';
    checkError: string;
};
export declare function firmwareUpdate(params: Params<FirmwareUpdate>): Response<FirmwareUpdateResponse>;
//# sourceMappingURL=firmwareUpdate.d.ts.map