/* eslint-disable sort-keys-fix/sort-keys-fix */
import { NetworkDetails, Connector } from '@soroban-react/types'

import { xBullWalletConnect } from '@creit-tech/xbull-wallet-connect'

/**
 * Interface representing parameters for signing with xBullWalletConnect.
 */
interface ISignParams {
  xdr: string
  network?: string
  publicKey?: string
}

/**
 * Returns a connector object for the XBull wallet.
 * @returns {Connector} - The connector object.
 */
export function xbull(): Connector {
  // We create a dummy bridge for the server side rendering
  let bridge = {
    sign: (params: ISignParams) => {
      return Promise.resolve('')
    },
    connect: () => {
      return Promise.resolve('')
    },
    closeConnections: () => {},
  }

  // The actual bridge will be here and rendered only client side
  if (typeof window !== 'undefined') {
    bridge = new xBullWalletConnect()
    console.log('########### Creating new wallet connect')
  }

  return {
    id: 'xbull',
    name: 'XBull',
    iconUrl: 'https://stellar.creit.tech/wallet-icons/xbull.svg',
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
      let blankNetwork = {
        network: '',
        networkUrl: '',
        networkPassphrase: '',
      }
      return Promise.resolve(blankNetwork) // TODO REMOVE FREIGHTER
    },
    getPublicKey(): Promise<string> {
      console.log('XBULL TRYING TO CONNCT')
      // const bridge = new xBullWalletConnect();
      let publicKeyPromise = bridge.connect()
      console.log('Bridge is', bridge)
      // bridge.closeConnections()
      return publicKeyPromise
    },
    signTransaction(
      xdr: string,
      opts?: {
        network?: string
        networkPassphrase?: string
        accountToSign?: string
      }
    ): Promise<string> {
      let signedTxPromise
      // We have to check if both parameters are there according to the doc of xbullwalletconnect
      if (opts?.network && opts?.accountToSign) {
        // network value is the network passphrase for xBull
        signedTxPromise = bridge.sign({
          xdr,
          publicKey: opts?.accountToSign,
          network: opts.networkPassphrase,
        })
      } else {
        signedTxPromise = bridge.sign({ xdr })
      }
      // bridge.closeConnections()
      return signedTxPromise
    },
  }
}
