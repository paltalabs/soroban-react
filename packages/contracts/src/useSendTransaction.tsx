import { SorobanContextType } from '@soroban-react/core'
import React from 'react'

import * as StellarSdk from '@stellar/stellar-sdk'

import { signAndSendTransaction } from './transaction'
import type { Transaction, Tx, TxResponse, Simulation } from './types'

export type TransactionStatus = 'idle' | 'error' | 'loading' | 'success'

export interface SendTransactionResult<E = Error> {
  data?: StellarSdk.xdr.ScVal
  error?: E
  isError: boolean
  isIdle: boolean
  isLoading: boolean
  isSuccess: boolean
  /**
   * Sends a transaction and returns the result.
   * @param txn The transaction to send.
   * @param opts Additional options for sending the transaction.
   * @returns A promise that resolves to the transaction response or simulation result.
   */
  sendTransaction: (
    txn?: Transaction,
    opts?: SendTransactionOptions
  ) => Promise<(TxResponse & { xdr: string }) | Simulation>
  reset: () => void
  status: TransactionStatus
}

export interface SendTransactionOptions {
  timeout?: number
  skipAddingFootprint?: boolean
  secretKey?: string
  sorobanContext?: SorobanContextType
}

/**
 * React hook for retrieving a function that can be used to send a transaction. Upon sending, it will poll sorobanServer.getTransactionStatus, until the transaction succeeds/fails, and return the result.
 * @param defaultTxn The default transaction to use.
 * @param defaultOptions The default options for sending the transaction.
 * @returns A sendTransaction function
 */
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
    ): Promise<any> {
      // Promise<(TxResponse & { xdr: string }) | Simulation> {

      let sorobanContext: SorobanContextType | undefined

      if (passedOptions?.sorobanContext) {
        sorobanContext = passedOptions?.sorobanContext
      }
      let txn = passedTxn ?? defaultTxn

      if (!(passedOptions?.secretKey || sorobanContext?.kit)) {
        throw new Error(
          'No secret key or active wallet. Provide at least one of those'
        )
      }

      if (
        !txn ||
        !sorobanContext?.kit ||
        !sorobanContext?.activeNetwork
      ) {
        throw new Error('No transaction or wallet or chain')
      }

      if (!sorobanContext.sorobanServer) throw new Error('Not connected to sorobanServer')

      let activeNetwork = sorobanContext?.activeNetwork
      let activeConnector = sorobanContext?.kit
      let sorobanServer = sorobanContext?.sorobanServer

      const { timeout, skipAddingFootprint } = {
        timeout: 60000,
        skipAddingFootprint: false,
        ...defaultOptions,
        ...passedOptions,
      }
      
      setState('loading')

      return await signAndSendTransaction({
        txn,
        secretKey: passedOptions?.secretKey,
        skipAddingFootprint,
        sorobanContext,
      })
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
