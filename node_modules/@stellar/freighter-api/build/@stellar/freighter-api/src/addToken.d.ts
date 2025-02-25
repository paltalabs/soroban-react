import { FreighterApiError } from "@shared/api/types";
export declare const addToken: (args: {
    contractId: string;
    networkPassphrase?: string;
}) => Promise<{
    contractId: string;
} & {
    error?: FreighterApiError;
}>;
