import React, { useRef } from 'react'
import {
  ContractDeploymentInfo, 
  NetworkDetails, 
  WalletNetwork, 
  SorobanContextType } from './types'

import * as StellarSdk from '@stellar/stellar-sdk'

import { SorobanContext } from '.'

import {
  StellarWalletsKit,
  allowAllModules,
  XBULL_ID,
  ModuleInterface,
  ISupportedWallet

} from '@creit.tech/stellar-wallets-kit';


/**
 * Props for the SorobanReactProvider component.
 */
export interface SorobanReactProviderProps {
  appName?: string
  allowedNetworkDetails: NetworkDetails[]
  activeNetwork:  WalletNetwork
  children: React.ReactNode
  connectors?: ModuleInterface[]
  deployments?: ContractDeploymentInfo[]
}

/**
 * Converts a Soroban RPC URL to a Soroban RPC sorobanServer object.
 * @param {string} sorobanRpcUrl - Soroban RPC URL.
 * @returns {StellarSdk.SorobanRpc.Server} - Soroban RPC sorobanServer object.
 */
export function fromURLToServer(
  sorobanRpcUrl: string
): StellarSdk.SorobanRpc.Server {
  return new StellarSdk.SorobanRpc.Server(sorobanRpcUrl, {
    allowHttp: sorobanRpcUrl.startsWith('http://'),
  })
}

/**
 * Converts a horizon network URL to a Horizon sorobanServer object.
 * @param {string} networkUrl - Network URL.
 * @returns {StellarSdk.Horizon.Server} - Horizon sorobanServer object.
 */
export function fromURLToHorizonServer(
  networkUrl: string
): StellarSdk.Horizon.Server {
  return new StellarSdk.Horizon.Server(networkUrl, {
    allowHttp: networkUrl.startsWith('http://'),
  })
}

/**
 * SorobanReactProvider component.
 * Provides context for Soroban React application.
 * @param {SorobanReactProviderProps} props - Props for the component.
 */
export function SorobanReactProvider({
  appName,
  allowedNetworkDetails,
  activeNetwork = WalletNetwork.TESTNET, // Non mandatory fields default to default Context fields value
  connectors,
  deployments = [],
  children,
}: SorobanReactProviderProps) {

  const kit: StellarWalletsKit = new StellarWalletsKit({
    network: activeNetwork,
    selectedWalletId: XBULL_ID,
    modules: connectors ? connectors : allowAllModules(),
  });

  const isConnectedRef = useRef(false)
  console.log('SorobanReactProvider is RELOADED')

  const activeNetworkDetails: NetworkDetails | undefined = allowedNetworkDetails.find((allowedNetworkDetails) => allowedNetworkDetails.network === activeNetwork);
  if (!activeNetworkDetails) {
    throw new Error(`Active network details not found for chain: ${activeNetwork}`);
  }

  const sorobanServer = fromURLToServer(activeNetworkDetails.sorobanRpcUrl);
  const horizonServer = fromURLToHorizonServer(activeNetworkDetails.horizonRpcUrl);

  const [mySorobanContext, setSorobanContext] =
    React.useState<SorobanContextType>({
      appName,
      allowedNetworkDetails,
      activeNetwork,
      deployments,
      connectors,
      connect: async () => {
        console.log('ENTERING CONNECT with context: ', mySorobanContext)
        try {
          await kit.openModal({
            onWalletSelected: async (option: ISupportedWallet) => {
              kit.setWallet(option.id);
              const { address } = await kit.getAddress();
              const { networkPassphrase } = await kit.getNetwork();
              console.log("🚀 ~ onWalletSelected: ~ address:", address)
              console.log("🚀 ~ onWalletSelected: ~ networkPassphrase:", networkPassphrase)
              
              const networkDetails = await kit.getNetwork();
              const activeNetwork = networkPassphrase as WalletNetwork;

              // maybe the wallet is connected to a network not supported for the app
              if (
                !allowedNetworkDetails.find(
                  (c: any) =>
                    c.network === activeNetwork
                )
              ) {
                const error = new Error(
                  'Your Wallet network is not supported in this app'
                )
                throw error
              }

              isConnectedRef.current = true

              setSorobanContext((c: any) => ({
                ...c,
                activeNetwork,
                address,
                sorobanServer,
                horizonServer,
                kit
              }))
              
            },
                  });
        }
        catch(e){
          console.log("Failled to connect wallet kit with error: ", e)
        }
      },
      disconnect: async () => {
        isConnectedRef.current = false
        let address: string | undefined = undefined
        setSorobanContext((c: any) => ({
          ...c,
          address,
        }))
      },

      setActiveNetwork: (network: WalletNetwork) => {
        const activeNetworkDetails: NetworkDetails | undefined = allowedNetworkDetails.find((allowedNetworkDetails) => allowedNetworkDetails.network === network);
        if (!activeNetworkDetails) {
          throw new Error(`Active network details not found for chain: ${activeNetwork}`);
        }

        const sorobanServer = fromURLToServer(activeNetworkDetails.sorobanRpcUrl);
        const horizonServer = fromURLToHorizonServer(activeNetworkDetails.horizonRpcUrl);

        setSorobanContext((c: any) => ({
          ...c,
          sorobanServer,
          horizonServer,
          activeNetwork,
        }))
      },

      setActiveWalletAndConnect: async (wallet: string) => {
        console.log('Changing wallet to ', wallet)
        kit.setWallet(wallet)
        let address = await kit.getAddress();
        isConnectedRef.current = true
        setSorobanContext((c: any) => ({
          ...c,
          address,
        }))
      },
    })

  // Handle changes of address in "realtime"
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    // If it turns out that requesting an update from Freighter is too taxing,
    // then this could be increased. Humans perceive 100ms response times as instantaneous
    // (source: https://www.pubnub.com/blog/how-fast-is-realtime-human-perception-and-technology/)
    // but you also have to consider the re-render time of components.
    const freighterCheckIntervalMs = 200

    async function checkForAddressChanges() {
      if (!mySorobanContext.kit) return

      // For now we can only do this with freighter. xBull doesn't handle the repeated call well.
      // else if (mySorobanContext.activeConnector.id !== 'freighter') {
      //   return
      // } else {
        let hasNoticedWalletUpdate = false

        try {
          // NOTICE: If the user logs out from or uninstalls the Freighter extension while they are connected
          // on this site, then a dialog will appear asking them to sign in again. We need a way to ask Freighter
          // if there is _any_ connected user, without actually asking them to sign in. Unfortunately, that is not
          // supported at this time; but it would be easy to submit a PR to the extension to add support for it.
          let { address } = await mySorobanContext.kit.getAddress()

          // TODO: If you want to know when the user has disconnected, then you can set a timeout for getPublicKey.
          // If it doesn't return in X milliseconds, you can be pretty confident that they aren't connected anymore.

          if (mySorobanContext.address !== address) {
            console.log(
              'SorobanReactProvider: address changed from:',
              mySorobanContext.address,
              ' to: ',
              address
            )
            hasNoticedWalletUpdate = true

            console.log('SorobanReactProvider: reconnecting')
            setSorobanContext((c: any) => ({
              ...c,
              address,
            }))
          }
        } catch (error) {
          // I would recommend keeping the try/catch so that any exceptions in this async function
          // will get handled. Otherwise React could complain. I believe that eventually it may cause huge
          // problems, but that might be a NodeJS specific approach to exceptions not handled in promises.

          console.error('SorobanReactProvider: error while getting address changes: ', error)
        } finally {
          if (!hasNoticedWalletUpdate)
            timeoutId = setTimeout(
              checkForAddressChanges,
              freighterCheckIntervalMs
            )
        }
    }

    checkForAddressChanges()

    return () => {
      if (timeoutId != null) clearTimeout(timeoutId)
    }
  }, [mySorobanContext])

  // Handle changes of network in "realtime" if getNetworkDetails exists
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null
    const freighterCheckIntervalMs = 200

    async function checkForNetworkChanges() {
      if (!mySorobanContext.kit) return
      // // Returns if not installed / not active / not connected (TODO: currently always isConnected=true)
      // if (
      //   !mySorobanContext.activeConnector ||
      //   !mySorobanContext.activeConnector.isConnected() ||
      //   !isConnectedRef.current ||
      //   !mySorobanContext.activeNetwork
      // )
      //   return
      // // For now we can only do this with freighter. xBull doesn't have the getNetworkDetails method exposed.
      // else if (mySorobanContext.activeConnector.id !== 'freighter') {
      //   return
      // } else {
        let hasNoticedWalletUpdate = false

        try {
          const {networkPassphrase } = await mySorobanContext.kit.getNetwork()
          const activeNetwork = networkPassphrase as WalletNetwork;
          // We check that we have a valid network details and not a blank one like the one xbull connector would return
          if (activeNetwork !== mySorobanContext.activeNetwork) {
            console.log(
              'SorobanReactProvider: network changed from:',
              mySorobanContext.activeNetwork,
              ' to: ',
              networkPassphrase
            )
            hasNoticedWalletUpdate = true
            
            mySorobanContext.setActiveNetwork(activeNetwork)

          }
        } catch (error) {
          console.error('SorobanReactProvider: error while getting network changes: ', error)
        } finally {
          if (!hasNoticedWalletUpdate)
            timeoutId = setTimeout(
              checkForNetworkChanges,
              freighterCheckIntervalMs
            )
        }
    }

    checkForNetworkChanges()

    return () => {
      if (timeoutId != null) clearTimeout(timeoutId)
    }
  }, [mySorobanContext])

  return (
    <SorobanContext.Provider value={mySorobanContext}>
      {children}
    </SorobanContext.Provider>
  )
}
