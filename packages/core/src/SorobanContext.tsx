import { Connector, WalletChain, ContractDeploymentInfo } from '@soroban-react/types'
import { createContext } from 'react'

import * as StellarSdk from '@stellar/stellar-sdk'
import { SorobanRpc } from '@stellar/stellar-sdk'

/**
 * Default Soroban context object.
 */
export const defaultSorobanContext: SorobanContextType = {
  appName: undefined,
  chains: [],
  connectors: [],
  server: new SorobanRpc.Server('https://soroban-testnet.stellar.org/'),
  serverHorizon: new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org'),
  async connect() {},
  async disconnect() {},
}

/**
 * Interface for the Soroban context.
 */
export interface SorobanContextType {
  // Indicates whether autoconnect is enabled
  autoconnect?: boolean
  // Name of the Soroban application
  appName?: string
  // List of chains
  chains: WalletChain[]
  // List of connectors
  connectors: Connector[]
  // Active chain
  activeChain?: WalletChain
  // Connected wallet address
  address?: string
  // Active connector
  activeConnector?: Connector
  // Soroban RPC server
  server?: SorobanRpc.Server
  // Stellar Horizon server
  serverHorizon?: StellarSdk.Horizon.Server
  // Function to connect to a wallet
  connect: () => Promise<void>
  // Function to disconnect from a wallet
  disconnect: () => Promise<void>
  // Function to set the active chain
  setActiveChain?: (chain: WalletChain) => void
  // Function to set the active connector and connect
  setActiveConnectorAndConnect?: (connector: Connector) => void
  // List of contract deployments
  deployments?: ContractDeploymentInfo[]
}


export const SorobanContext = createContext<SorobanContextType | undefined>(
  undefined
)
