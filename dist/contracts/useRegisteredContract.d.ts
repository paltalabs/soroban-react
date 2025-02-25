import { type ContractDeploymentInfo } from '../types';
import * as StellarSdk from '@stellar/stellar-sdk';
import { TxResponse } from './types';
/**
 * Represents the arguments for invoking methods on a wrapped contract. It needs less argument than invoking a contract that is not wrapped.
 */
export type WrappedContractInvokeArgs = {
    method: string;
    args?: StellarSdk.xdr.ScVal[] | undefined;
    signAndSend?: boolean;
    fee?: number;
    skipAddingFootprint?: boolean;
    secretKey?: string;
    reconnectAfterTx?: boolean;
};
/**
 * Represents a wrapped contract object with deployment information and an custom invoke function.
 */
export type WrappedContract = {
    deploymentInfo: ContractDeploymentInfo;
    invoke: (args: WrappedContractInvokeArgs) => Promise<TxResponse | StellarSdk.xdr.ScVal>;
};
/**
 * React hook that returns a `WrappedContract` object configured with
 * the provided deployment information.
 * @param deploymentInfo - The deployment information for the contract.
 * @returns The `WrappedContract` object.
 */
export declare const useWrappedContract: (deploymentInfo: ContractDeploymentInfo | undefined) => WrappedContract;
/**
 * React hook that returns a `WrappedContract` object for the given contract ID,
 * looked up from the deployments registry for the active chain.
 * @param contractId - The ID of the contract.
 * @returns The `WrappedContract` object.
 */
export declare const useRegisteredContract: (contractId: string) => WrappedContract;
