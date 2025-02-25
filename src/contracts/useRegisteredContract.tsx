import { useSorobanReact } from '..'
import { type ContractDeploymentInfo } from '../types'
import { useCallback, useEffect, useState } from 'react'

import * as StellarSdk from '@stellar/stellar-sdk'

import { TxResponse } from './types'
import { contractInvoke, type InvokeArgs } from './contractInvoke'

/**
 * Returns the deployment information for the given contract ID and network passphrase.
 * @param deployments - The array of contract deployment information.
 * @param contractId - The ID of the contract.
 * @param networkPassphrase - The network passphrase.
 * @returns The deployment information for the contract.
 * @throws If the deployment is not found.
 */
const getDeployment = (
  deployments: ContractDeploymentInfo[],
  contractId: string,
  networkPassphrase: string
) => {
  let deployment = deployments.find(deployment => {
    return (
      deployment.contractId.toLowerCase() === contractId.toLowerCase() &&
      deployment.networkPassphrase.toLowerCase() ===
        (networkPassphrase || '').toLowerCase()
    )
  })

  return deployment
}

/**
 * Represents the arguments for invoking methods on a wrapped contract. It needs less argument than invoking a contract that is not wrapped.
 */
export type WrappedContractInvokeArgs = {
  method: string
  args?: StellarSdk.xdr.ScVal[] | undefined
  signAndSend?: boolean
  fee?: number
  skipAddingFootprint?: boolean
  secretKey?: string
  reconnectAfterTx?: boolean
}

/**
 * Represents a wrapped contract object with deployment information and an custom invoke function.
 */
export type WrappedContract = {
  deploymentInfo: ContractDeploymentInfo
  invoke: (
    args: WrappedContractInvokeArgs
  ) => Promise<TxResponse | StellarSdk.xdr.ScVal>
}

/**
 * React hook that returns a `WrappedContract` object configured with
 * the provided deployment information.
 * @param deploymentInfo - The deployment information for the contract.
 * @returns The `WrappedContract` object.
 */
export const useWrappedContract = (
  deploymentInfo: ContractDeploymentInfo | undefined
) => {
  const sorobanContext = useSorobanReact()
  const [wrappedContract, setwWrappedContract] = useState<
    WrappedContract | undefined
  >(undefined)

  const wrappedInvokeFunction = useCallback(
    async (args: WrappedContractInvokeArgs) => {
      const contractInvokeArgs: InvokeArgs = {
        ...args,
        sorobanContext,
        contractAddress: deploymentInfo?.contractAddress!,
      }
      return contractInvoke(contractInvokeArgs)
    },
    [sorobanContext, deploymentInfo]
  )

  useEffect(() => {
    if (!deploymentInfo) {
      setwWrappedContract(undefined)
      return
    }

    const newWrappedContract: WrappedContract = {
      deploymentInfo,
      invoke: wrappedInvokeFunction,
    }
    setwWrappedContract(newWrappedContract)
  }, [deploymentInfo, wrappedInvokeFunction])

  return wrappedContract
}

/**
 * React hook that returns a `WrappedContract` object for the given contract ID,
 * looked up from the deployments registry for the active chain.
 * @param contractId - The ID of the contract.
 * @returns The `WrappedContract` object.
 */
export const useRegisteredContract = (contractId: string) => {
  const { deployments, activeNetwork } = useSorobanReact()

  let networkPassphrase = activeNetwork || ''

  const deploymentInfo = getDeployment(
    deployments || [],
    contractId,
    networkPassphrase
  )

  return useWrappedContract(deploymentInfo)
}
