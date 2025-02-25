import { FreighterApiError } from "@shared/api/types";
export declare const signTransaction: (transactionXdr: string, opts?: {
    networkPassphrase?: string;
    address?: string;
}) => Promise<{
    signedTxXdr: string;
    signerAddress: string;
} & {
    error?: FreighterApiError;
}>;
