import { SorobanContextType } from '@soroban-react/core'
import { WalletChain } from '@soroban-react/types'
import React from 'react'

import * as SorobanClient from 'soroban-client'

import { WalletChainByName } from './provideWalletChains'

export type NetworkConfig = {
  activeChain?: WalletChain
  server?: SorobanClient.Server
  chains: Array<WalletChain>
}

export function useNetwork(sorobanContext: SorobanContextType): NetworkConfig {
  const { activeChain, server } = sorobanContext
  return {
    activeChain,
    server,
    chains: Object.values(WalletChainByName),
  }
}
