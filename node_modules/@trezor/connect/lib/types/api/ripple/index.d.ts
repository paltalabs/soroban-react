import { Static } from '@trezor/schema-utils';
export type RipplePayment = Static<typeof RipplePayment>;
export declare const RipplePayment: import("@trezor/schema-utils").TObject<{
    amount: import("@trezor/schema-utils").TString;
    destination: import("@trezor/schema-utils").TString;
    destinationTag: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
}>;
export type RippleTransaction = Static<typeof RippleTransaction>;
export declare const RippleTransaction: import("@trezor/schema-utils").TObject<{
    fee: import("@trezor/schema-utils").TString;
    flags: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
    sequence: import("@trezor/schema-utils").TNumber;
    maxLedgerVersion: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
    payment: import("@trezor/schema-utils").TObject<{
        amount: import("@trezor/schema-utils").TString;
        destination: import("@trezor/schema-utils").TString;
        destinationTag: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
    }>;
}>;
export type RippleSignTransaction = Static<typeof RippleSignTransaction>;
export declare const RippleSignTransaction: import("@trezor/schema-utils").TObject<{
    path: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
    transaction: import("@trezor/schema-utils").TObject<{
        fee: import("@trezor/schema-utils").TString;
        flags: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
        sequence: import("@trezor/schema-utils").TNumber;
        maxLedgerVersion: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
        payment: import("@trezor/schema-utils").TObject<{
            amount: import("@trezor/schema-utils").TString;
            destination: import("@trezor/schema-utils").TString;
            destinationTag: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
        }>;
    }>;
    chunkify: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
}>;
export type RippleSignedTx = Static<typeof RippleSignedTx>;
export declare const RippleSignedTx: import("@trezor/schema-utils").TObject<{
    serializedTx: import("@trezor/schema-utils").TString;
    signature: import("@trezor/schema-utils").TString;
}>;
//# sourceMappingURL=index.d.ts.map