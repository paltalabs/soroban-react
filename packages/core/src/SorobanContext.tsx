import React, {createContext} from "react";
import * as SorobanClient from "soroban-client";
import { Connector, WalletChain } from "@soroban-react/types";

export const defaultSorobanContext: SorobanContextType = {
  appName: undefined,
  chains: [],
  connectors: [],
  server: undefined,
  async connect() {},
  async disconnect() {},
};

export interface SorobanContextType {
  autoconnect?: boolean;
  appName?: string;
  chains: WalletChain[];
  connectors: Connector[];
  activeChain?: WalletChain;
  activeConnector?: Connector;
  address?: string;
  server?: SorobanClient.Server;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export const SorobanContext = createContext<SorobanContextType | undefined>(undefined)
