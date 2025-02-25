import { Static } from '@trezor/schema-utils';
import { Params, Response } from '../params';
import type { PROTO } from '../../constants';
export type UnlockPathParams = Static<typeof UnlockPathParams>;
export declare const UnlockPathParams: import("@trezor/schema-utils").TObject<{
    path: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
    mac: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>;
export declare function unlockPath(params: Params<UnlockPathParams>): Response<PROTO.UnlockPath>;
//# sourceMappingURL=unlockPath.d.ts.map