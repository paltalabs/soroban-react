import { SorobanContextType } from '..'
import React from 'react'

import { rpc } from '@stellar/stellar-sdk'
import * as StellarSdk from '@stellar/stellar-sdk'

import { contractTransaction } from './contractTransaction'
import { defaultAddress } from './defaultAddress'

let xdr = StellarSdk.xdr

export type ContractValueType = {
  loading?: true
  result?: StellarSdk.xdr.ScVal
  error?: string | unknown
}

export interface useContractValueProps {
  contractAddress: string
  method: string
  args?: StellarSdk.xdr.ScVal[] | undefined
  source?: StellarSdk.Account
  sorobanContext: SorobanContextType
}

// useContractValue is a hook that fetches the value of a contract method. It
// might be better named `useSimulateTransaction`, but not sure which is more clear...
// TODO: Allow user to specify the wallet of the submitter, fees, etc... Maybe
// a separate (lower-level) hook for `useSimulateTransaction` would be cleaner?
/**
 * A React hook that fetches the value of a contract method.
 * @param {useContractValueProps} options - The options object.
 * @returns {ContractValueType} An object containing the result, loading state, or error.
 */
export function useContractValue({
  contractAddress,
  method,
  args,
  source,
  sorobanContext,
}: useContractValueProps): ContractValueType {
  const { activeNetwork, address, sorobanServer } = sorobanContext

  const [value, setValue] = React.useState<ContractValueType>({ loading: true })
  const [xdrParams, setXdrParams] = React.useState<any>(
    args ? args.map(p => p.toXDR().toString('base64')) : undefined
  )

  React.useEffect(() => {
    source = source ?? new StellarSdk.Account(address ?? defaultAddress, '0')
    if (!activeNetwork) {
      setValue({ error: 'No active chain' })
      return
    }
    if (!sorobanServer) {
      setValue({ error: 'Not connected to sorobanServer' })
      return
    }

    ;(async () => {
      setValue({ loading: true })
      try {
        let result = await fetchContractValue({
          sorobanServer: sorobanServer,
          networkPassphrase: activeNetwork,
          contractAddress: contractAddress,
          method: method,
          args: args,
          source: source,
        })
        setValue({ result })
      } catch (error) {
        if (typeof error == 'string') {
          setValue({ error })
          return
        }
        if ('message' in (error as any)) {
          setValue({ error: (error as any).message })
          return
        }
        setValue({ error })
      }
    })()
    // Have this re-fetch if the contractId/method/args change. Total hack with
    // xdr-base64 to enforce real equality instead of object equality
    // shenanigans.
  }, [contractAddress, method, xdrParams, activeNetwork, sorobanServer, args])
  return value
}

export interface fetchContractValueProps {
  sorobanServer: rpc.Server
  networkPassphrase: string
  contractAddress: string
  method: string
  args?: StellarSdk.xdr.ScVal[] | undefined
  source: StellarSdk.Account
}

/**
 * Fetches the value of a contract method by simulating a transaction on the Soroban network.
 * @param {fetchContractValueProps} options - The options object containing sorobanServer, network passphrase, contract address, method, arguments, and source account.
 * @returns {Promise<StellarSdk.xdr.ScVal>} A promise that resolves with the value of the contract method.
 * @throws {Error} If the simulation encounters an error or if no result is returned.
 */
async function fetchContractValue({
  sorobanServer,
  networkPassphrase,
  contractAddress,
  method,
  args,
  source,
}: fetchContractValueProps): Promise<StellarSdk.xdr.ScVal> {
  //Builds the transaction.
  let txn = contractTransaction({
    source,
    networkPassphrase,
    contractAddress,
    method,
    args,
  })

  let a = Math.random()

  const simulated: rpc.Api.SimulateTransactionResponse =
    await sorobanServer?.simulateTransaction(txn)
  if (rpc.Api.isSimulationError(simulated)) {
    throw new Error(simulated.error)
  } else if (!simulated.result) {
    throw new Error(`invalid simulation: no result in ${simulated}`)
  }

  return simulated.result.retval
}
