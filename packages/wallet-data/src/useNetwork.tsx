import React from 'react';
import { WalletChainByName } from "./provideWalletChains";
import { SorobanContextType } from "@soroban-react/core";
import { WalletChain } from "@soroban-react/types";
import { Server } from "soroban-client";

export type NetworkConfig = {
   activeChain?: WalletChain; 
   server?: Server; 
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
