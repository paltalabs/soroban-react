import { SorobanContextType } from '@soroban-react/core'
import { SorobanRpc } from "soroban-client";

import React from 'react'
import { contractTransaction } from './contractTransaction'
import * as SorobanClient from 'soroban-client'
import { defaultAddress } from './defaultAddress'

let xdr = SorobanClient.xdr 

export type ContractValueType = {
  loading?: true
  result?: SorobanClient.xdr.ScVal
  error?: string | unknown
}

export interface useContractValueProps {
  contractAddress: string
  method: string
  args?: SorobanClient.xdr.ScVal[] | undefined
  source?: SorobanClient.Account
  sorobanContext: SorobanContextType
}

// useContractValue is a hook that fetches the value of a contract method. It
// might be better named `useSimulateTransaction`, but not sure which is more clear...
// TODO: Allow user to specify the wallet of the submitter, fees, etc... Maybe
// a separate (lower-level) hook for `useSimulateTransaction` would be cleaner?
export function useContractValue({
  contractAddress,
  method,
  args,
  source,
  sorobanContext,
}: useContractValueProps): ContractValueType {
  const { activeChain, address, server } = sorobanContext

  const [value, setValue] = React.useState<ContractValueType>({ loading: true })
  const [xdrParams, setXdrParams] = React.useState<any>(
    args ? args.map(p => p.toXDR().toString('base64')) : undefined 
  )

  React.useEffect(() => {
    source = source ?? new SorobanClient.Account(address ?? defaultAddress, '0')
    if (!activeChain) {
      setValue({ error: 'No active chain' })
      return
    }
    if (!server) {
      setValue({ error: 'Not connected to server' })
      return
    }

    ;(async () => {
      setValue({ loading: true })
      try {
        let result = await fetchContractValue({
          server: server,
          networkPassphrase: activeChain.networkPassphrase,
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
  }, [contractAddress, method, xdrParams, activeChain, server, args])
  return value
}

export interface fetchContractValueProps {
  server: SorobanClient.Server
  networkPassphrase: string
  contractAddress: string
  method: string
  args?: SorobanClient.xdr.ScVal[] | undefined
  source: SorobanClient.Account
}

async function fetchContractValue({
  server,
  networkPassphrase,
  contractAddress,
  method,
  args,
  source,
}: fetchContractValueProps): Promise<SorobanClient.xdr.ScVal> {

  //Builds the transaction.
  let txn = contractTransaction({
    source,
    networkPassphrase,
    contractAddress,
    method,
    args,
  });
  
  let a = Math.random()
  
  const simulated: SorobanRpc.SimulateTransactionResponse = await server?.simulateTransaction(txn);
  if (SorobanRpc.isSimulationError(simulated)) {
    throw new Error(simulated.error);
  } else if (!simulated.result) {
    throw new Error(`invalid simulation: no result in ${simulated}`);
  }

  return simulated.result.retval;
}
