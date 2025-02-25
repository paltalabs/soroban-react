import { WalletNetwork, ModuleInterface, StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";
import { rpc, Horizon } from '@stellar/stellar-sdk';
export { WalletNetwork } from "@creit.tech/stellar-wallets-kit";
export interface NetworkDetails {
    network: WalletNetwork;
    horizonRpcUrl: string;
    sorobanRpcUrl: string;
}
export type Connector = {
    id: string;
    name: string;
    shortName?: string;
    iconUrl: string | (() => Promise<string>);
    iconBackground: string;
    installed?: boolean;
    downloadUrls?: {
        android?: string;
        ios?: string;
        browserExtension?: string;
        qrCode?: string;
    };
    isConnected: () => Promise<boolean>;
    getNetworkDetails: () => Promise<NetworkDetails>;
    getPublicKey: () => Promise<string>;
    signTransaction: (xdr: string, opts?: {
        network?: string;
        networkPassphrase?: string;
        accountToSign?: string;
    }) => Promise<string>;
};
export type ContractDeploymentInfo = {
    contractId: string;
    networkPassphrase: string;
    contractAddress: string;
};
/**
 * Interface for the Soroban context.
 */
export interface SorobanContextType {
    address?: string;
    autoconnect?: boolean;
    appName?: string;
    allowedNetworkDetails: NetworkDetails[];
    modules?: ModuleInterface[];
    selectedModuleId?: string;
    activeNetwork?: WalletNetwork;
    sorobanServer: rpc.Server;
    horizonServer: Horizon.Server;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    setActiveNetwork: (network: WalletNetwork) => void;
    setActiveWalletAndConnect: (wallet: string) => void;
    deployments?: ContractDeploymentInfo[];
    kit?: StellarWalletsKit;
}
