import { Static } from '@trezor/schema-utils';
import type { Params, Response } from '../params';
export type PushTransaction = Static<typeof PushTransaction>;
export declare const PushTransaction: import("@trezor/schema-utils").TObject<{
    tx: import("@trezor/schema-utils").TString;
    coin: import("@trezor/schema-utils").TString;
    identity: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
}>;
export interface PushedTransaction {
    txid: string;
}
export declare function pushTransaction(params: Params<PushTransaction>): Response<PushedTransaction>;
//# sourceMappingURL=pushTransaction.d.ts.map