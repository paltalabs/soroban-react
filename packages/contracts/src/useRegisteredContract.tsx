import { useSorobanReact } from '@soroban-react/core'
import {type ContractDeploymentInfo} from '@soroban-react/types'
import { contractInvoke,type InvokeArgs } from './contractInvoke'
import {TxResponse} from '.'
import { useCallback, useEffect, useState } from 'react';
import * as StellarSdk from '@stellar/stellar-sdk'

const getDeployment = (deployments: ContractDeploymentInfo[], contractId: string, networkPassphrase: string) => {
    let deployment = deployments.find((deployment) => {
      return (
        deployment.contractId.toLowerCase() === contractId.toLowerCase() &&
        deployment.networkPassphrase.toLowerCase() === (networkPassphrase || '').toLowerCase()
      )
    })
    if (!deployment) {
        throw new Error("Deployment not found")
    }
    else {
        return deployment
    }
}

export type WrappedContractInvokeArgs = {
  // NO NEED contractAddress: string
  method: string
  args?: StellarSdk.xdr.ScVal[] | undefined
  signAndSend?: boolean
  fee?: number
  skipAddingFootprint?: boolean
  secretKey?: string
  // NO NEED MAYBE sorobanContext: SorobanContextType
  // If useSorobanReact called inside of wrapped function
  reconnectAfterTx?: boolean
}

export type WrappedContract = {
  deploymentInfo: ContractDeploymentInfo,
  invoke: (args: WrappedContractInvokeArgs) => Promise<TxResponse | StellarSdk.xdr.ScVal>
}

export const useWrappedContract = (
    deploymentInfo: ContractDeploymentInfo
  ) => {
    const sorobanContext = useSorobanReact()
    const [wrappedContract, setwWrappedContract] = useState<WrappedContract | undefined>()
  
    const wrappedInvokeFunction = useCallback(async (args: WrappedContractInvokeArgs) => {
        const contractInvokeArgs: InvokeArgs ={
            ...args,
            sorobanContext,
            contractAddress: deploymentInfo.contractAddress
        }
        return contractInvoke(contractInvokeArgs)
    }, [sorobanContext, deploymentInfo])


    const createWrappedContract = () => {
      const newWrappedContract: WrappedContract = {
        deploymentInfo,
        invoke: wrappedInvokeFunction
      }
      setwWrappedContract(newWrappedContract)
    }
    useEffect(() => {
        createWrappedContract()
    }, [deploymentInfo, wrappedInvokeFunction])
  
    return wrappedContract
  }

/**
 * React Hook that returns a `WrappedContract` object configured with
 * the active context with the given deployment contract id which
 * is looked up from the deployments registry.
 */
export const useRegisteredContract = (contractId: string) => {
  const { deployments, activeChain } = useSorobanReact()

  let networkPassphrase = activeChain?.networkPassphrase || ''

  const deploymentInfo = getDeployment(deployments || [], contractId, networkPassphrase)

  return useWrappedContract(deploymentInfo)
}