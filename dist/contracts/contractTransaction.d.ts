import * as StellarSdk from '@stellar/stellar-sdk';
/**
 * Properties for building a transaction to invoke a smart contract method call.
 */
export interface contractTransactionProps {
    networkPassphrase: string;
    source: StellarSdk.Account;
    contractAddress: string;
    method: string;
    args?: StellarSdk.xdr.ScVal[];
}
/**
 * Constructs a transaction to invoke a smart contract method call.
 * @param {ContractTransactionProps} props - Properties for building the transaction.
 * @returns {StellarSdk.Transaction} - The constructed transaction.
 */
export declare function contractTransaction({ networkPassphrase, source, contractAddress, method, args, }: contractTransactionProps): StellarSdk.Transaction;
