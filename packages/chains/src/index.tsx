
import type { WalletChain } from '@soroban-react/types'

import * as SorobanClient from 'soroban-client'

/**
 * A `WalletChain` object representing the public blockchain network.
 * @property {string} id - The unique identifier for the blockchain network.
 * @property {string} name - The name of the blockchain network.
 * @property {string} networkPassphrase - The network passphrase for the blockchain network.
 */

export const public_chain: WalletChain = {
  id: 'public',
  name: 'Public',
  networkPassphrase: SorobanClient.Networks.PUBLIC,
}

/**
 * A `WalletChain` object representing the Futurenet blockchain network.
 */

export const futurenet: WalletChain = {
  id: 'public',
  name: 'Futurenet',
  networkPassphrase: "Test SDF Future Network ; October 2022",
}

/**
 * A `WalletChain` object representing the Testnet blockchain network.
 */

export const testnet: WalletChain = {
  id: 'public',
  name: 'Testnet',
  networkPassphrase: SorobanClient.Networks.TESTNET,
}

/**
 * A `WalletChain` object representing the Sandbox blockchain network.
 */

export const sandbox: WalletChain = {
  id: 'public',
  name: 'Sandbox',
  networkPassphrase: "Local Sandbox Stellar Network ; September 2022",
}

/**
 * A `WalletChain` object representing the Standalone blockchain network.
 */

export const standalone: WalletChain = {
  id: 'public',
  name: 'Standalone',
  networkPassphrase: 'Standalone Network ; February 2017',
}
