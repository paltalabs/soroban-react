import { Connector, WalletChain } from '@soroban-react/types'
import { createContext } from 'react'

import * as StellarSdk from '@stellar/stellar-sdk'
import * as SorobanClient from 'soroban-client'

export const defaultSorobanContext: SorobanContextType = {
  appName: undefined,
  chains: [],
  connectors: [],
  server: new SorobanClient.Server('https://soroban-rpc.stellar.org'),
  serverHorizon: new StellarSdk.Horizon.Server('https://horizon.stellar.org'),
  async connect() {},
  async disconnect() {},
}

export interface SorobanContextType {
  autoconnect?: boolean
  appName?: string
  chains: WalletChain[]
  connectors: Connector[]
  activeChain?: WalletChain
  address?: string
  activeConnector?: Connector
  server?: SorobanClient.Server
  serverHorizon?: StellarSdk.Horizon.Server
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  setActiveChain?: (chain: WalletChain) => void
}

export const SorobanContext = createContext<SorobanContextType | undefined>(
  undefined
)
