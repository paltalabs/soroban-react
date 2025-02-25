import { SorobanContextType } from '..';
import * as StellarSdk from '@stellar/stellar-sdk';
import { TxResponse } from './types';
/**
 * Arguments for invoking a smart contract method call.
 */
export type InvokeArgs = {
    contractAddress: string;
    method: string;
    args?: StellarSdk.xdr.ScVal[] | undefined;
    signAndSend?: boolean;
    fee?: number;
    skipAddingFootprint?: boolean;
    secretKey?: string;
    sorobanContext: SorobanContextType;
    reconnectAfterTx?: boolean;
    timeoutSeconds?: number;
};
/**
 * Invokes a smart contract method.
 * @param {InvokeArgs} args - Arguments for invoking the smart contract.
 * @returns {Promise<TxResponse | StellarSdk.xdr.ScVal>} - A promise resolving to the transaction response or the result of the simulation.
 * @throws {Error} - If there are errors during the contract invocation process.
 */
export declare function contractInvoke({ contractAddress, method, args, signAndSend, fee, skipAddingFootprint, secretKey, sorobanContext, reconnectAfterTx, timeoutSeconds, }: InvokeArgs): Promise<TxResponse | StellarSdk.xdr.ScVal>;
