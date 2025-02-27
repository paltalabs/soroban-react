import { SorobanContextType } from '..'

import * as StellarSdk from '@stellar/stellar-sdk'
import { rpc } from '@stellar/stellar-sdk'

import { contractTransaction } from './contractTransaction'
import { signAndSendTransaction } from './transaction'
import { TxResponse } from './types'

let xdr = StellarSdk.xdr

/**
 * Arguments for invoking a smart contract method call.
 */
export type InvokeArgs = {
  contractAddress: string
  method: string
  args?: StellarSdk.xdr.ScVal[] | undefined
  signAndSend?: boolean
  fee?: number
  skipAddingFootprint?: boolean
  secretKey?: string
  sorobanContext: SorobanContextType
  reconnectAfterTx?: boolean
  timeoutSeconds?: number
}

// Dummy source account for simulation. The public key for this is all 0-bytes.
const defaultAddress =
  'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF'

/**
 * Invokes a smart contract method.
 * @param {InvokeArgs} args - Arguments for invoking the smart contract.
 * @returns {Promise<TxResponse | StellarSdk.xdr.ScVal>} - A promise resolving to the transaction response or the result of the simulation.
 * @throws {Error} - If there are errors during the contract invocation process.
 */
export async function contractInvoke({
  contractAddress,
  method,
  args = [],
  signAndSend = false,
  fee = 100,
  skipAddingFootprint,
  secretKey,
  sorobanContext,
  reconnectAfterTx = true,
  timeoutSeconds = 20,
}: InvokeArgs): Promise<TxResponse | StellarSdk.xdr.ScVal> {
  console.log("🚀 ~ contractInvoke() contractAddress:", contractAddress)
  const { sorobanServer, address, activeNetwork } = sorobanContext
  console.log("🚀 ~ contractInvoke() sorobanServer:", sorobanServer)
  console.log("🚀 ~ contractInvoke() activeNetwork:", activeNetwork)
  console.log("🚀 ~ contractInvoke() address:", address)
  
  

  if (!activeNetwork) {

    throw new Error('No active Chain')
  }
  if (!sorobanServer) {

    throw new Error('No connected to a Server..')
  }

  const networkPassphrase = activeNetwork;
  let source = null

  if (signAndSend) {
    if (secretKey) {
        source = await sorobanServer.getAccount(
          StellarSdk.Keypair.fromSecret(secretKey).publicKey()
        )
      } else {
          if (!address) throw new Error('No address')
            console.log("🚀 ~ contractInvoke() !address:", !address)
            try {
                source = await sorobanServer.getAccount(address)
            } catch (e) {
              console.log('Error getting account', e)
              throw new Error('Error getting account')
            }
            console.log("🚀 ~ contractInvoke() !address:", !address)

      }
    } else {
    source = new StellarSdk.Account(defaultAddress, '0')
  }

  

  //Builds the transaction
  let txn = contractTransaction({
    source,
    networkPassphrase,
    contractAddress,
    method,
    args,
  })

  const simulated: rpc.Api.SimulateTransactionResponse =
    await sorobanServer?.simulateTransaction(txn)

  if (rpc.Api.isSimulationError(simulated)) {
    throw new Error(simulated.error)
  } else if (!simulated.result) {
    throw new Error(`invalid simulation: no result in ${simulated}`)
  }

  if (!signAndSend && simulated) {
    return simulated.result.retval
  } else {
    // If signAndSend
    const res = await signAndSendTransaction({
      txn,
      skipAddingFootprint,
      secretKey,
      sorobanContext,
      timeoutSeconds,
    })

    if (reconnectAfterTx) {
      sorobanContext.connect()
    }

    return res
  }
}
