import { FreighterApiError } from "@shared/api/types";
export declare const requestAccess: () => Promise<{
    address: string;
} & {
    error?: FreighterApiError;
}>;
