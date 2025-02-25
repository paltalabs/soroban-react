import React from 'react';
import { ContractDeploymentInfo, NetworkDetails, WalletNetwork } from './types';
import * as StellarSdk from '@stellar/stellar-sdk';
import { ModuleInterface } from '@creit.tech/stellar-wallets-kit';
/**
 * Props for the SorobanReactProvider component.
 */
export interface SorobanReactProviderProps {
    appName?: string;
    allowedNetworkDetails: NetworkDetails[];
    activeNetwork: WalletNetwork;
    children: React.ReactNode;
    modules?: ModuleInterface[];
    deployments?: ContractDeploymentInfo[];
}
/**
 * Converts a Soroban RPC URL to a Soroban RPC Server object.
 * @param {string} sorobanRpcUrl - Soroban RPC URL.
 * @returns {StellarSdk.rpc.Server} - Soroban RPC Server object.
 */
export declare function fromURLToServer(sorobanRpcUrl: string): StellarSdk.rpc.Server;
/**
 * Converts a horizon network URL to a Horizon sorobanServer object.
 * @param {string} networkUrl - Network URL.
 * @returns {StellarSdk.Horizon.Server} - Horizon sorobanServer object.
 */
export declare function fromURLToHorizonServer(networkUrl: string): StellarSdk.Horizon.Server;
/**
 * SorobanReactProvider component.
 * Provides context for Soroban React application.
 * @param {SorobanReactProviderProps} props - Props for the component.
 */
export declare function SorobanReactProvider({ appName, allowedNetworkDetails, activeNetwork, // Non mandatory fields default to default Context fields value
modules, deployments, children, }: SorobanReactProviderProps): import("react/jsx-runtime").JSX.Element;
