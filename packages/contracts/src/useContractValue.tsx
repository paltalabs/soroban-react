import { SorobanContextType } from '@soroban-react/core'
import React from 'react'

import * as SorobanClient from 'soroban-client'

let xdr = SorobanClient.xdr

// Dummy source account for simulation. The public key for this is all 0-bytes.
const defaultAddress =
  'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF'

export type ContractValueType = {
  loading?: true
  result?: SorobanClient.xdr.ScVal
  error?: string | unknown
}

export interface useContractValueProps {
  contractId: string
  method: string
  params?: SorobanClient.xdr.ScVal[] | undefined
  source?: SorobanClient.Account
  sorobanContext: SorobanContextType
}

// useContractValue is a hook that fetches the value of a contract method. It
// might be better named `useSimulateTransaction`, but not sure which is more clear...
// TODO: Allow user to specify the wallet of the submitter, fees, etc... Maybe
// a separate (lower-level) hook for `useSimulateTransaction` would be cleaner?
export function useContractValue({
  contractId,
  method,
  params,
  source,
  sorobanContext,
}: useContractValueProps): ContractValueType {
  const { activeChain, address, server } = sorobanContext

  const [value, setValue] = React.useState<ContractValueType>({ loading: true })
  const [xdrParams, setXdrParams] = React.useState<any>(
    params ? params.map(p => p.toXDR().toString('base64')) : undefined
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
          contractId: contractId,
          method: method,
          params: params,
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
    // Have this re-fetch if the contractId/method/params change. Total hack with
    // xdr-base64 to enforce real equality instead of object equality
    // shenanigans.
  }, [contractId, method, xdrParams, activeChain, server])
  return value
}

export interface fetchContractValueProps {
  server: SorobanClient.Server
  networkPassphrase: string
  contractId: string
  method: string
  params?: SorobanClient.xdr.ScVal[] | undefined
  source: SorobanClient.Account
}

async function fetchContractValue({
  server,
  networkPassphrase,
  contractId,
  method,
  params,
  source,
}: fetchContractValueProps): Promise<SorobanClient.xdr.ScVal> {
  const contract = new SorobanClient.Contract(contractId)

  let myParams: SorobanClient.xdr.ScVal[] = params || []

  // TODO: Optionally include the wallet of the submitter here, so the
  // simulation is more accurate
  const transaction = new SorobanClient.TransactionBuilder(source, {
    // fee doesn't matter, we're not submitting
    fee: '100',
    networkPassphrase,
  })
    .addOperation(contract.call(method, ...myParams))
    .setTimeout(SorobanClient.TimeoutInfinite)
    .build()

  const { results } = await server.simulateTransaction(transaction)
  if (!results || results.length !== 1) {
    throw new Error('Invalid response from simulateTransaction')
  }
  const result = results[0]
  return xdr.ScVal.fromXDR(result.xdr, 'base64')
}
