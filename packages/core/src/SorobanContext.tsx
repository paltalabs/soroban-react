import { Connector, WalletChain } from '@soroban-react/types'
import React, { createContext } from 'react'

import * as SorobanClient from 'soroban-client'

export const defaultSorobanContext: SorobanContextType = {
  appName: undefined,
  chains: [],
  connectors: [],
  server: new SorobanClient.Server('https://soroban-rpc.stellar.org'),
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
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

export const SorobanContext = createContext<SorobanContextType | undefined>(
  undefined
)
