import { getPublicKey, isConnected, signTransaction } from '@lobstrco/signer-extension-api';
import { Connector, NetworkDetails } from '@soroban-react/types';

/**
 * Returns a connector object for the Lobstr wallet.
 * @returns {Connector} - The connector object.
 */
export function lobstr(): Connector {
  const isAvailable = async (): Promise<boolean> => {
    return isConnected();
  }

  const getLobstrPublicKey = async (): Promise<string> => {
    if (!(await isConnected())) {
      throw new Error(`Lobstr is not connected`);
    }
    return getPublicKey();
  }

  return {
    id: 'lobstr',
    name: 'Lobstr',
    iconUrl: async () => 'https://stellar.creit.tech/wallet-icons/lobstr.svg',
    iconBackground: '#fff',
    // TODO: Check this
    installed: true,
    downloadUrls: {
      browserExtension:
        'https://lobstr.co/',
    },
    isConnected(): boolean {
      // should be Promise<boolean> to use isConnected() from lobstr api
      return true;
    },
    getNetworkDetails(): Promise<NetworkDetails> {
      let blankNetwork = {
          network: "",
          networkUrl: "",
          networkPassphrase: "",
        }
      return Promise.resolve(blankNetwork);
    },
    getPublicKey(): Promise<string> {    
      return getLobstrPublicKey();
    },
    signTransaction(
      xdr: string,
      opts?: {
        network?: string
        networkPassphrase?: string
        accountToSign?: string
      }
    ): Promise<string> {
      
      if (!(isAvailable())) {
        throw new Error(`Lobstr is not connected`);
      }
  
      if (opts?.network !== 'mainnet') {
        console.warn(`Lobstr doesn't allow specifying the network that should be used, we skip the value`);
      }
  
      return signTransaction(xdr);
    },
  }

}
