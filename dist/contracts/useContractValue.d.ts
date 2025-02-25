import { SorobanContextType } from '..';
import { rpc } from '@stellar/stellar-sdk';
import * as StellarSdk from '@stellar/stellar-sdk';
export type ContractValueType = {
    loading?: true;
    result?: StellarSdk.xdr.ScVal;
    error?: string | unknown;
};
export interface useContractValueProps {
    contractAddress: string;
    method: string;
    args?: StellarSdk.xdr.ScVal[] | undefined;
    source?: StellarSdk.Account;
    sorobanContext: SorobanContextType;
}
/**
 * A React hook that fetches the value of a contract method.
 * @param {useContractValueProps} options - The options object.
 * @returns {ContractValueType} An object containing the result, loading state, or error.
 */
export declare function useContractValue({ contractAddress, method, args, source, sorobanContext, }: useContractValueProps): ContractValueType;
export interface fetchContractValueProps {
    sorobanServer: rpc.Server;
    networkPassphrase: string;
    contractAddress: string;
    method: string;
    args?: StellarSdk.xdr.ScVal[] | undefined;
    source: StellarSdk.Account;
}
