import React from 'react'
import { SorobanContextType } from '@soroban-react/core'
import * as SorobanClient from 'soroban-client'
import type {Tx, TxResponse, Simulation} from './types'
import { sendTx } from './sendTx'

export type TransactionStatus = 'idle' | 'error' | 'loading' | 'success'

export interface contractTransactionProps {
  networkPassphrase: string
  source: SorobanClient.Account
  contractId: string
  method: string
  params?: SorobanClient.xdr.ScVal[]
}

export function contractTransaction({
  networkPassphrase,
  source,
  contractId,
  method,
  params,
}: contractTransactionProps): SorobanClient.Transaction {
  let myParams: SorobanClient.xdr.ScVal[] = params || []
  const contract = new SorobanClient.Contract(contractId)
  return new SorobanClient.TransactionBuilder(source, {
    // TODO: Figure out the fee
    fee: '100',
    networkPassphrase,
  })
    .addOperation(contract.call(method, ...myParams))
    .setTimeout(SorobanClient.TimeoutInfinite)
    .build()
}

export interface SendTransactionResult<E = Error> {
  data?: SorobanClient.xdr.ScVal
  error?: E
  isError: boolean
  isIdle: boolean
  isLoading: boolean
  isSuccess: boolean
  sendTransaction: (
    txn?: Transaction,
    opts?: SendTransactionOptions
  ) => Promise<(TxResponse & { xdr: string }) | Simulation>
  reset: () => void
  status: TransactionStatus
}

type Transaction = SorobanClient.Transaction | SorobanClient.FeeBumpTransaction

export interface SendTransactionOptions {
  timeout?: number
  skipAddingFootprint?: boolean
  secretKey?: string
  sorobanContext?: SorobanContextType
}

// useSendTransaction is a hook that returns a function that can be used to
// send a transaction. Upon sending, it will poll server.getTransactionStatus,
// until the transaction succeeds/fails, and return the result.
export function useSendTransaction<E = Error>(
  defaultTxn?: Transaction,
  defaultOptions?: SendTransactionOptions
): SendTransactionResult<E> {
  const [status, setState] = React.useState<TransactionStatus>('idle')

  // TODO: as the sorobanContext is passed each time sendTransaction is called
  // we don't need anymore a useCallback hook. Convert useSendTransaction to a
  const sendTransaction = React.useCallback(
    async function (
      passedTxn?: Transaction,
      passedOptions?: SendTransactionOptions
    ): Promise<(TxResponse & { xdr: string }) | Simulation> {
      
      let sorobanContext: SorobanContextType | undefined

      if (passedOptions?.sorobanContext) {
        sorobanContext = passedOptions?.sorobanContext
      }
      let txn = passedTxn ?? defaultTxn
      
      if (!(passedOptions?.secretKey || sorobanContext?.activeConnector)) {
        throw new Error(
          'No secret key or active wallet. Provide at least one of those'
        )
      }

      if (
        !txn ||
        !sorobanContext?.activeConnector ||
        !sorobanContext?.activeChain
      ) {
        throw new Error('No transaction or wallet or chain')
      }

      if (!sorobanContext.server) throw new Error('Not connected to server')

      let activeChain = sorobanContext?.activeChain
      let activeConnector = sorobanContext?.activeConnector
      let server = sorobanContext?.server

      const { timeout, skipAddingFootprint } = {
        timeout: 60000,
        skipAddingFootprint: false,
        ...defaultOptions,
        ...passedOptions,
      }
      const networkPassphrase = activeChain.networkPassphrase

      setState('loading')

      // preflight and add the footprint
      if (!skipAddingFootprint) {
        txn = await server.prepareTransaction(txn, networkPassphrase)
        if (!txn) {
          throw new Error('No transaction after adding footprint')
        }
      }
      
      let signed = ''
      if (passedOptions?.secretKey) {
        // User as set a secretKey, txn will be signed using the secretKey
        const keypair = SorobanClient.Keypair.fromSecret(
          passedOptions.secretKey
        )
        txn.sign(keypair)
        signed = txn.toXDR()
      } else {
        // User has not set a secretKey, txn will be signed using the Connector (wallet) provided in the sorobanContext
        signed = await activeConnector.signTransaction(txn.toXDR(), {
          networkPassphrase,
        })
      }

      const transactionToSubmit = SorobanClient.TransactionBuilder.fromXDR(
        signed,
        networkPassphrase
      )

      let tx = transactionToSubmit as Tx
      let secondsToWait = 10;

      const raw = await sendTx({tx,secondsToWait, server});
      return {
        ...raw,
        xdr: raw.resultXdr!,
      };
    },
    [defaultTxn]
  )

  return {
    isIdle: status == 'idle',
    isError: status == 'error',
    isLoading: status == 'loading',
    isSuccess: status == 'success',
    sendTransaction,
    reset: () => {},
    status,
  }
}
