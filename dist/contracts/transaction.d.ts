import { SorobanContextType } from '..';
import * as StellarSdk from '@stellar/stellar-sdk';
import type { Tx, Transaction, TxResponse } from './types';
export type SignAndSendArgs = {
    txn: Transaction;
    secretKey?: string;
    skipAddingFootprint?: boolean;
    sorobanContext: SorobanContextType;
    timeoutSeconds?: number;
};
/**
 * Signs and sends a transaction to the Stellar network.
 * @param {Object} options - The options object.
 * @param {Transaction} options.txn - The transaction to sign and send.
 * @param {string} [options.secretKey] - The secret key for signing the transaction. Required if no active connector is provided in the Soroban context.
 * @param {boolean} [options.skipAddingFootprint=false] - Flag indicating whether to skip adding footprint to the transaction. Defaults to false.
 * @param {SorobanContextType} options.sorobanContext - The Soroban context containing sorobanServer and active connector information.
 * @returns {Promise<TxResponse>} A promise that resolves with the transaction response.
 * @throws {Error} Throws an error if no secret key or active connector is provided, or if there is no sorobanServer or network passphrase.
 */
export declare function signAndSendTransaction({ txn, secretKey, skipAddingFootprint, sorobanContext, timeoutSeconds, }: SignAndSendArgs): Promise<TxResponse>;
export declare function sendTx({ tx, secondsToWait, sorobanServer, }: {
    tx: Tx;
    secondsToWait: number;
    sorobanServer: StellarSdk.rpc.Server;
}): Promise<TxResponse>;
