import { FreighterApiError } from "@shared/api/types";
export declare const setAllowed: () => Promise<{
    isAllowed: boolean;
} & {
    error?: FreighterApiError;
}>;
