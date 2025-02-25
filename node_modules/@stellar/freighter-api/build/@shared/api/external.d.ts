import { FreighterApiError } from "./types";
export declare const requestAccess: () => Promise<{
    publicKey: string;
    error?: FreighterApiError;
}>;
export declare const requestPublicKey: () => Promise<{
    publicKey: string;
    error?: FreighterApiError;
}>;
export declare const submitToken: (args: {
    contractId: string;
    networkPassphrase?: string;
}) => Promise<{
    contractId?: string;
    error?: FreighterApiError;
}>;
export declare const submitTransaction: (transactionXdr: string, opts?: string | {
    accountToSign?: string;
    networkPassphrase?: string;
}, accountToSign?: string) => Promise<{
    signedTransaction: string;
    signerAddress: string;
    error?: FreighterApiError;
}>;
export declare const submitMessage: (blob: string, version: string, opts?: {
    address?: string;
    networkPassphrase?: string;
}) => Promise<{
    signedMessage: Buffer | null;
    signerAddress: string;
    error?: FreighterApiError;
}>;
export declare const submitAuthEntry: (entryXdr: string, opts?: {
    address?: string;
    networkPassphrase?: string;
}) => Promise<{
    signedAuthEntry: Buffer | null;
    signerAddress: string;
    error?: FreighterApiError;
}>;
export declare const requestNetwork: () => Promise<{
    network: string;
    networkPassphrase: string;
    error?: FreighterApiError;
}>;
export declare const requestNetworkDetails: () => Promise<{
    network: string;
    networkUrl: string;
    networkPassphrase: string;
    sorobanRpcUrl?: string;
    error?: FreighterApiError;
}>;
export declare const requestConnectionStatus: () => Promise<{
    isConnected: boolean;
}>;
export declare const requestAllowedStatus: () => Promise<{
    isAllowed: boolean;
    error?: FreighterApiError;
}>;
export declare const setAllowedStatus: () => Promise<{
    isAllowed: boolean;
    error?: FreighterApiError;
}>;
