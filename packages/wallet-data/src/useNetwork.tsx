import React from 'react';
import { chainMetadataByName } from "./provideWalletChains";
import {SorobanContextType } from "@soroban-react/core";

export function useNetwork(sorobanContext: SorobanContextType) {
  const { activeChain, server } = sorobanContext
  return {
    activeChain,
    server,
    chains: Object.values(chainMetadataByName),
  };
};
