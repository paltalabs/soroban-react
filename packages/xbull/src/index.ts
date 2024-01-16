/* eslint-disable sort-keys-fix/sort-keys-fix */
import { xBullWalletConnect } from '@creit-tech/xbull-wallet-connect'
import { NetworkDetails, Connector } from '@soroban-react/types'

import freighterApi from '@stellar/freighter-api'


export function xbull(): Connector {

  // TODO LOOK INTO THIS PROBLEMATIC SERVER SIDE RENDERING SO THAT WE SOLVE THIS PROBLEM
  if (typeof window !== 'undefined') {
    const bridge = new xBullWalletConnect();

    return {
      id: 'xbull',
      name: 'XBull',
      iconUrl: async () => '',
      // iconUrl: async () => (await import('./freighter.svg')).default,
      iconBackground: '#fff',
      // TODO: Check this
      installed: true,
      downloadUrls: {
        browserExtension:
          'https://chromewebstore.google.com/detail/xbull-wallet/omajpeaffjgmlpmhbfdjepdejoemifpe',
      },
      isConnected(): boolean {
        // return !!freighterApi?.isConnected()
        return true
      },
      getNetworkDetails(): Promise<NetworkDetails> {
        return freighterApi.getNetworkDetails() // TODO REMOVE FREIGHTER
      },
      getPublicKey(): Promise<string> {
        return bridge.connect()
      },
      signTransaction(
        xdr: string,
        opts?: {
          network?: string
          networkPassphrase?: string
          accountToSign?: string
        }
      ): Promise<string> {
        return bridge.sign({xdr, publicKey: opts?.accountToSign, network: opts?.network})
      },
    }
  }

  return {
    id: 'xbull',
      name: 'XBull',
      iconUrl: async () => '',
      // iconUrl: async () => (await import('./freighter.svg')).default,
      iconBackground: '#fff',
      // TODO: Check this
      installed: true,
      downloadUrls: {
        browserExtension:
          'https://chromewebstore.google.com/detail/xbull-wallet/omajpeaffjgmlpmhbfdjepdejoemifpe',
      },
      isConnected(): boolean {
        // return !!freighterApi?.isConnected()
        return true
      },
      getNetworkDetails(): Promise<NetworkDetails> {
        return freighterApi.getNetworkDetails() // TODO REMOVE FREIGHTER 
      },
      getPublicKey(): Promise<string> {
        return freighterApi.getPublicKey() // TODO REMOVE FREIGHTER
      },
      signTransaction(
        xdr: string,
        opts?: {
          network?: string
          networkPassphrase?: string
          accountToSign?: string
        }
      ): Promise<string> {
        return freighterApi.signTransaction(xdr, opts)  // TODO REMOVE FREIGHTER
      },
  }

}
