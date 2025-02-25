import { Buffer } from "buffer";
import { FreighterApiError } from "@shared/api/types";
type SignMessageV3Response = {
    signedMessage: Buffer | null;
    signerAddress: string;
} & {
    error?: FreighterApiError;
};
type SignMessageV4Response = {
    signedMessage: string;
    signerAddress: string;
} & {
    error?: FreighterApiError;
};
export declare const signMessage: (message: string, opts?: {
    networkPassphrase?: string;
    address?: string;
}) => Promise<SignMessageV3Response | SignMessageV4Response>;
export {};
