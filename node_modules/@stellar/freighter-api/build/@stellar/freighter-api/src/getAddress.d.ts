import { FreighterApiError } from "@shared/api/types";
export declare const getAddress: () => Promise<{
    address: string;
} & {
    error?: FreighterApiError;
}>;
