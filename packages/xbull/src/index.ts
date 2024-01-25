/* eslint-disable sort-keys-fix/sort-keys-fix */
import { xBullWalletConnect } from '@creit-tech/xbull-wallet-connect'
import { NetworkDetails, Connector } from '@soroban-react/types'

import freighterApi from '@stellar/freighter-api'
import { brotliDecompress } from 'zlib'


export function xbull(): Connector {

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
        console.log("XBULL TRYING TO CONNECT")
        const bridge = new xBullWalletConnect();
        let publicKeyPromise = bridge.connect()
        console.log("Bridge is", bridge)
        bridge.closeConnections()
        return publicKeyPromise;

      },
      signTransaction(
        xdr: string,
        opts?: {
          network?: string
          networkPassphrase?: string
          accountToSign?: string
        }
      ): Promise<string> {
        const bridge = new xBullWalletConnect();
        let signedTxPromise
        // We have to check if both parameters are there according to the doc of xbullwalletconnect
        if (opts?.network && opts?.accountToSign) {
          // network value is the network passphrase for xBull
          signedTxPromise = bridge.sign({xdr, publicKey: opts?.accountToSign, network: opts.networkPassphrase})
        }
        else {
          signedTxPromise = bridge.sign({xdr})
        }
        bridge.closeConnections()
        return signedTxPromise
      },
    }

}
