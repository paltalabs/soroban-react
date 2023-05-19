import React, {createContext} from "react";
import SorobanClient from "soroban-client";
import { Connector, WalletChain } from "@soroban-react/types";

export const defaultSorobanContext: SorobanContextType = {
  appName: undefined,
  chains: [],
  connectors: [],
  server: new SorobanClient.Server("https://soroban-rpc.stellar.org"),
  async connect() {},
  async disconnect() {},
};

export interface SorobanContextType {
  autoconnect?: boolean;
  appName?: string;
  chains: WalletChain[];
  connectors: Connector[];
  activeChain?: WalletChain;
  address?: string;
  activeConnector?: Connector;
  server?: typeof SorobanClient.Server;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export const SorobanContext = createContext<SorobanContextType | undefined>(undefined)
