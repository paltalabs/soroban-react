import { NETWORKS } from "@shared/constants/stellar";
export declare enum SorobanTokenInterface {
    transfer = "transfer",
    mint = "mint"
}
export type ArgsForTokenInvocation = {
    from: string;
    to: string;
    amount: bigint | number;
};
export type TokenInvocationArgs = ArgsForTokenInvocation & {
    fnName: SorobanTokenInterface;
    contractId: string;
};
export interface SorobanToken {
    transfer: (from: string, to: string, amount: number) => void;
    mint: (to: string, amount: number) => void;
    name: string;
    balance: number;
    symbol: string;
    decimals: number;
}
export type AssetsListKey = NETWORKS.PUBLIC | NETWORKS.TESTNET;
export type AssetsLists = {
    [K in AssetsListKey]: AssetsListItem[];
};
export interface AssetsListItem {
    url: string;
    isEnabled: boolean;
}
export declare const DEFAULT_ASSETS_LISTS: AssetsLists;
