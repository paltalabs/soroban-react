import { FreighterApiError } from "@shared/api/types";
interface CallbackParams {
    address: string;
    network: string;
    networkPassphrase: string;
    error?: FreighterApiError;
}
export declare class WatchWalletChanges {
    timeout: number;
    currentAddress: string;
    currentNetwork: string;
    currentNetworkPassphrase: string;
    isRunning: boolean;
    constructor(timeout?: number);
    watch(cb: (params: CallbackParams) => void): {
        error?: FreighterApiError;
    };
    fetchInfo: (cb: (params: CallbackParams) => void) => Promise<void>;
    stop(): void;
}
export {};
