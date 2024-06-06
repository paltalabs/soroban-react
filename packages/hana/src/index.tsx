import { NetworkDetails, Connector } from '@soroban-react/types'

interface SignTransactionProps {
  xdr: string
  accountToSign: string
  networkPassphrase: string
}

declare const window: Window & {
  hanaWallet?: {
    stellar?: {
      getPublicKey(): Promise<string>
      signTransaction({
        xdr,
        accountToSign,
        networkPassphrase,
      }: SignTransactionProps): Promise<string>
      getNetworkDetails(): Promise<NetworkDetails>
    }
  }
}

/**
 * Returns a connector object for the Hana wallet.
 * @returns {Connector} - The connector object.
 */
export function hana(): Connector {
  return {
    id: 'hana',
    name: 'Hana Wallet',
    iconUrl: async () => '',
    iconBackground: '#fff',
    // TODO: Check this
    installed: true,
    downloadUrls: {
      browserExtension:
        'https://chromewebstore.google.com/detail/hana-wallet/jfdlamikmbghhapbgfoogdffldioobgl',
    },
    isConnected(): boolean {
      return !!window.hanaWallet?.stellar
    },
    getNetworkDetails(): Promise<NetworkDetails> {
      if (!window.hanaWallet?.stellar) {
        throw new Error('Hana Wallet not connected')
      }

      return window.hanaWallet.stellar.getNetworkDetails()
    },
    getPublicKey(): Promise<string> {
      if (!window.hanaWallet?.stellar) {
        throw new Error('Hana Wallet not connected')
      }

      return window.hanaWallet.stellar.getPublicKey()
    },
    signTransaction(
      xdr: string,
      opts?: {
        network?: string
        networkPassphrase?: string
        accountToSign?: string
      }
    ): Promise<string> {
      if (!window.hanaWallet?.stellar) {
        throw new Error('Hana Wallet not connected')
      }

      return window.hanaWallet.stellar.signTransaction({
        xdr,
        accountToSign: opts?.accountToSign || '',
        networkPassphrase: opts?.networkPassphrase || '',
      })
    },
  }
}
