import { SorobanContextType } from '..';
import * as StellarSdk from '@stellar/stellar-sdk';
import type { Transaction, TxResponse, Simulation } from './types';
export type TransactionStatus = 'idle' | 'error' | 'loading' | 'success';
export interface SendTransactionResult<E = Error> {
    data?: StellarSdk.xdr.ScVal;
    error?: E;
    isError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    /**
     * Sends a transaction and returns the result.
     * @param txn The transaction to send.
     * @param opts Additional options for sending the transaction.
     * @returns A promise that resolves to the transaction response or simulation result.
     */
    sendTransaction: (txn?: Transaction, opts?: SendTransactionOptions) => Promise<(TxResponse & {
        xdr: string;
    }) | Simulation>;
    reset: () => void;
    status: TransactionStatus;
}
export interface SendTransactionOptions {
    timeout?: number;
    skipAddingFootprint?: boolean;
    secretKey?: string;
    sorobanContext?: SorobanContextType;
}
/**
 * React hook for retrieving a function that can be used to send a transaction. Upon sending, it will poll sorobanServer.getTransactionStatus, until the transaction succeeds/fails, and return the result.
 * @param defaultTxn The default transaction to use.
 * @param defaultOptions The default options for sending the transaction.
 * @returns A sendTransaction function
 */
export declare function useSendTransaction<E = Error>(defaultTxn?: Transaction, defaultOptions?: SendTransactionOptions): SendTransactionResult<E>;
