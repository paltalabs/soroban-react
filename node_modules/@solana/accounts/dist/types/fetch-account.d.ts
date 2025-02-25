import type { Address } from '@solana/addresses';
import type { Rpc } from '@solana/rpc-spec';
import type { Commitment, Slot } from '@solana/rpc-types';
import type { MaybeAccount, MaybeEncodedAccount } from './maybe-account';
import type { GetAccountInfoApi, GetMultipleAccountsApi } from './rpc-api';
/** Optional configuration for fetching a singular account. */
export type FetchAccountConfig = {
    abortSignal?: AbortSignal;
    commitment?: Commitment;
    minContextSlot?: Slot;
};
/** Fetch a base64-encoded account that may or may not exist using an RPC client. */
export declare function fetchEncodedAccount<TAddress extends string = string>(rpc: Rpc<GetAccountInfoApi>, address: Address<TAddress>, config?: FetchAccountConfig): Promise<MaybeEncodedAccount<TAddress>>;
/** Fetch a json-parsed account that may or may not exist using an RPC client. */
export declare function fetchJsonParsedAccount<TData extends object, TAddress extends string = string>(rpc: Rpc<GetAccountInfoApi>, address: Address<TAddress>, config?: FetchAccountConfig): Promise<MaybeAccount<TData, TAddress> | MaybeEncodedAccount<TAddress>>;
/** Optional configuration for fetching multiple accounts. */
export type FetchAccountsConfig = {
    abortSignal?: AbortSignal;
    commitment?: Commitment;
    minContextSlot?: Slot;
};
/** Fetch multiple base64-encoded accounts that may or may not exist using an RPC client. */
export declare function fetchEncodedAccounts<TAddresses extends string[] = string[], TWrappedAddresses extends {
    [P in keyof TAddresses]: Address<TAddresses[P]>;
} = {
    [P in keyof TAddresses]: Address<TAddresses[P]>;
}>(rpc: Rpc<GetMultipleAccountsApi>, addresses: TWrappedAddresses, config?: FetchAccountsConfig): Promise<{ [P in keyof TAddresses]: MaybeEncodedAccount<TAddresses[P]>; }>;
/** Fetch multiple json-parsed accounts that may or may not exist using an RPC client. */
export declare function fetchJsonParsedAccounts<TData extends object[], TAddresses extends string[] = string[], TWrappedAddresses extends {
    [P in keyof TAddresses]: Address<TAddresses[P]>;
} = {
    [P in keyof TAddresses]: Address<TAddresses[P]>;
}>(rpc: Rpc<GetMultipleAccountsApi>, addresses: TWrappedAddresses, config?: FetchAccountsConfig): Promise<{ [P in keyof TAddresses]: {
    readonly address: Address<TAddresses[P]>;
    readonly exists: false;
} | (import("./account").BaseAccount & {
    readonly address: Address<TAddresses[P]>;
    readonly data: TData[P & keyof TData];
} & {
    readonly exists: true;
}) | (import("./account").BaseAccount & {
    readonly address: Address<TAddresses[P]>;
    readonly data: Uint8Array;
} & {
    readonly exists: true;
}); } & { [P_1 in keyof TData]: {
    readonly address: Address<TAddresses[P_1 & keyof TAddresses]>;
    readonly exists: false;
} | (import("./account").BaseAccount & {
    readonly address: Address<TAddresses[P_1 & keyof TAddresses]>;
    readonly data: TData[P_1];
} & {
    readonly exists: true;
}) | (import("./account").BaseAccount & {
    readonly address: Address<TAddresses[P_1 & keyof TAddresses]>;
    readonly data: Uint8Array;
} & {
    readonly exists: true;
}); }>;
//# sourceMappingURL=fetch-account.d.ts.map