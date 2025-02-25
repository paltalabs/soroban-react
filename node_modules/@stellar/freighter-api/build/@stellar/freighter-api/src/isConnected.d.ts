import { FreighterApiError } from "@shared/api/types";
export declare const isConnected: () => Promise<{
    isConnected: boolean;
} & {
    error?: FreighterApiError;
}>;
