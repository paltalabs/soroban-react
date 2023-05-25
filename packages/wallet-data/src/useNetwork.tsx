import React from 'react';
import { WalletChainByName } from "./provideWalletChains";
import { SorobanContextType } from "@soroban-react/core";
import { WalletChain } from "@soroban-react/types";
import * as SorobanClient from "soroban-client";

export type NetworkConfig = {
   activeChain?: WalletChain; 
   server?: SorobanClient.Server; 
   chains: Array<WalletChain>;
}

export function useNetwork(sorobanContext: SorobanContextType): NetworkConfig {
  const { activeChain, server} = sorobanContext
  return {
    activeChain,
    server,
    chains: Object.values(WalletChainByName),
  };
};
