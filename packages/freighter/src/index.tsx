/* eslint-disable sort-keys-fix/sort-keys-fix */
import { NetworkDetails, Connector } from '@soroban-react/types'

import freighterApi from '@stellar/freighter-api'

/**
 * Returns a connector object for the Freighter wallet.
 * @returns {Connector} - The connector object.
 */
export function freighter(): Connector {
  return {
    id: 'freighter',
    name: 'Freighter',
    iconUrl: 'https://stellar.creit.tech/wallet-icons/freighter.svg',
    // iconUrl: async () => (await import('./freighter.svg')).default,
    iconBackground: '#fff',
    // TODO: Check this
    installed: true,
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/freighter/bcacfldlkkdogcmkkibnjlakofdplcbk?hl=en',
    },
    isConnected() {
      return freighterApi?.isConnected()
    },
    getNetworkDetails(): Promise<NetworkDetails> {
      return freighterApi.getNetworkDetails()
    },
    getPublicKey(): Promise<string> {
      return freighterApi.getPublicKey()
    },
    signTransaction(
      xdr: string,
      opts?: {
        network?: string
        networkPassphrase?: string
        accountToSign?: string
      }
    ): Promise<string> {
      return freighterApi.signTransaction(xdr, opts)
    },
  }
}
