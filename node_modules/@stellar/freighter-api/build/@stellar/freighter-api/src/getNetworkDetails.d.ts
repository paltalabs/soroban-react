import { FreighterApiError } from "@shared/api/types";
export declare const getNetworkDetails: () => Promise<{
    network: string;
    networkUrl: string;
    networkPassphrase: string;
    sorobanRpcUrl?: string;
} & {
    error?: FreighterApiError;
}>;
