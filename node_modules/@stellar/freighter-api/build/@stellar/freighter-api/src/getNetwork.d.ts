import { FreighterApiError } from "@shared/api/types";
export declare const getNetwork: () => Promise<{
    network: string;
    networkPassphrase: string;
} & {
    error?: FreighterApiError;
}>;
