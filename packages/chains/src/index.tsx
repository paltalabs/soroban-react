import * as SorobanClient from "soroban-client";
import type {ChainMetadata} from '@soroban-react/types';

// Sourced from https://github.com/tmm/wagmi/blob/main/packages/core/src/constants/chains.ts
// This is just so we can clearly see which of wagmi's first-class chains we provide metadata for
export type ChainName =
  | 'futurenet'
  | 'public'
  | 'testnet'
  | 'sandbox'
  | 'localnet';

export const chains: Record<ChainName, ChainMetadata> = {
  public: {
    id: "public",
    name: "Public",
    networkPassphrase: SorobanClient.Networks.PUBLIC,
  },
  testnet: {
    id: "testnet",
    name: "Testnet",
    networkPassphrase: SorobanClient.Networks.TESTNET,
  },
  futurenet: {
    id: "futurenet",
    name: "Futurenet",
    networkPassphrase: SorobanClient.Networks.FUTURENET,
  },
  sandbox: {
    id: "sandbox",
    name: "Sandbox",
    networkPassphrase: SorobanClient.Networks.SANDBOX,
  },
  localnet: {
    id: "localnet",
    name: "Localnet",
    networkPassphrase: "Standalone Network ; February 2017",
  },
};
