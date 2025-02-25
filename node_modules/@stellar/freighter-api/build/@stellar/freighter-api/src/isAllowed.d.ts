import { FreighterApiError } from "@shared/api/types";
export declare const isAllowed: () => Promise<{
    isAllowed: boolean;
} & {
    error?: FreighterApiError;
}>;
