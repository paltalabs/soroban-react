import { SorobanContextType } from '@soroban-react/core'
import { WalletChain } from '@soroban-react/types'
import React from 'react'

import * as StellarSdk from '@stellar/stellar-sdk'

import { WalletChainByName } from './provideWalletChains'

export type NetworkConfig = {
  activeNetwork?: WalletChain
  sorobanServer?: StellarSdk.SorobanRpc.Server
  chains: Array<WalletChain>
}

export function useNetwork(sorobanContext: SorobanContextType): NetworkConfig {
  const { activeNetwork, sorobanServer } = sorobanContext
  return {
    activeNetwork,
    sorobanServer,
    chains: Object.values(WalletChainByName),
  }
}
