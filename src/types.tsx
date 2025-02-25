import { WalletNetwork, ModuleInterface, StellarWalletsKit } from "@creit.tech/stellar-wallets-kit"
import { rpc, Horizon } from '@stellar/stellar-sdk'

export  { WalletNetwork } from "@creit.tech/stellar-wallets-kit"

export interface NetworkDetails {
  network: WalletNetwork
  horizonRpcUrl: string
  sorobanRpcUrl: string
}

export type Connector = {
  id: string
  name: string
  shortName?: string
  iconUrl: string | (() => Promise<string>)
  iconBackground: string
  installed?: boolean
  downloadUrls?: {
    android?: string
    ios?: string
    browserExtension?: string
    qrCode?: string
  }
  isConnected: () => Promise<boolean>
  getNetworkDetails: () => Promise<NetworkDetails>
  getPublicKey: () => Promise<string>
  signTransaction: (
    xdr: string,
    opts?: {
      network?: string
      networkPassphrase?: string
      accountToSign?: string
    }
  ) => Promise<string>
}


// Type for top level contract registry
export type ContractDeploymentInfo = {
  contractId: string
  networkPassphrase: string
  contractAddress: string
}


/**
 * Interface for the Soroban context.
 */
export interface SorobanContextType {
  address?: string
  // Indicates whether autoconnect is enabled
  autoconnect?: boolean
  // Name of the Soroban application
  appName?: string
  // List of chains
  allowedNetworkDetails: NetworkDetails[]
  // List of modules
  modules?: ModuleInterface[]
  // Selected module
  selectedModuleId?: string
  // Active chain
  activeNetwork?: WalletNetwork
  // Soroban RPC server
  sorobanServer: rpc.Server
  // Stellar Horizon server
  horizonServer: Horizon.Server
  // Function to connect to a wallet
  connect: () => Promise<void>
  // Function to disconnect from a wallet
  disconnect: () => Promise<void>
  // Function to set the active chain
  setActiveNetwork: (network: WalletNetwork) => void
  // Function to set the active connector and connect
  setActiveWalletAndConnect: (wallet: string) => void
  // List of contract deployments
  deployments?: ContractDeploymentInfo[]
  kit?: StellarWalletsKit
}

