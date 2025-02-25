import { getAddress } from "./getAddress";
import { addToken } from "./addToken";
import { signTransaction } from "./signTransaction";
import { signMessage } from "./signMessage";
import { signAuthEntry } from "./signAuthEntry";
import { isConnected } from "./isConnected";
import { getNetwork } from "./getNetwork";
import { getNetworkDetails } from "./getNetworkDetails";
import { isAllowed } from "./isAllowed";
import { setAllowed } from "./setAllowed";
import { requestAccess } from "./requestAccess";
import { WatchWalletChanges } from "./watchWalletChanges";
export declare const isBrowser: boolean;
export { getAddress, addToken, signTransaction, signMessage, signAuthEntry, isConnected, getNetwork, getNetworkDetails, isAllowed, setAllowed, requestAccess, WatchWalletChanges, };
declare const _default: {
    getAddress: () => Promise<{
        address: string;
    } & {
        error?: import("@shared/api/types").FreighterApiError;
    }>;
    addToken: (args: {
        contractId: string;
        networkPassphrase?: string;
    }) => Promise<{
        contractId: string;
    } & {
        error?: import("@shared/api/types").FreighterApiError;
    }>;
    signTransaction: (transactionXdr: string, opts?: {
        networkPassphrase?: string;
        address?: string;
    }) => Promise<{
        signedTxXdr: string;
        signerAddress: string;
    } & {
        error?: import("@shared/api/types").FreighterApiError;
    }>;
    signMessage: (message: string, opts?: {
        networkPassphrase?: string;
        address?: string;
    }) => Promise<({
        signedMessage: Buffer | null;
        signerAddress: string;
    } & {
        error?: import("@shared/api/types").FreighterApiError;
    }) | ({
        signedMessage: string;
        signerAddress: string;
    } & {
        error?: import("@shared/api/types").FreighterApiError;
    })>;
    signAuthEntry: (entryXdr: string, opts?: {
        networkPassphrase?: string;
        address?: string;
    }) => Promise<{
        signedAuthEntry: Buffer | null;
        signerAddress: string;
    } & {
        error?: import("@shared/api/types").FreighterApiError;
    }>;
    isConnected: () => Promise<{
        isConnected: boolean;
    } & {
        error?: import("@shared/api/types").FreighterApiError;
    }>;
    getNetwork: () => Promise<{
        network: string;
        networkPassphrase: string;
    } & {
        error?: import("@shared/api/types").FreighterApiError;
    }>;
    getNetworkDetails: () => Promise<{
        network: string;
        networkUrl: string;
        networkPassphrase: string;
        sorobanRpcUrl?: string;
    } & {
        error?: import("@shared/api/types").FreighterApiError;
    }>;
    isAllowed: () => Promise<{
        isAllowed: boolean;
    } & {
        error?: import("@shared/api/types").FreighterApiError;
    }>;
    setAllowed: () => Promise<{
        isAllowed: boolean;
    } & {
        error?: import("@shared/api/types").FreighterApiError;
    }>;
    requestAccess: () => Promise<{
        address: string;
    } & {
        error?: import("@shared/api/types").FreighterApiError;
    }>;
    WatchWalletChanges: typeof WatchWalletChanges;
};
export default _default;
