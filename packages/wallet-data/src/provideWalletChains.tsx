import * as SorobanClient from "soroban-client";
import type {ChainMetadata} from '@soroban-react/types';
import type {ChainName} from '@soroban-react/chains';

// Sourced from https://github.com/tmm/wagmi/blob/main/packages/core/src/constants/chains.ts
// This is just so we can clearly see which of wagmi's first-class chains we provide metadata for

export const chainMetadataByName: Record<ChainName, ChainMetadata> = {
  public: {
    id: "public",
    name: "Public",
    networkPassphrase: SorobanClient.Networks.PUBLIC,
    iconBackground: '#e84141',
    // iconUrl: async () => (await import('./chainIcons/public.svg')).default,
  },
  testnet: {
    id: "testnet",
    name: "Testnet",
    networkPassphrase: SorobanClient.Networks.TESTNET,
    iconBackground: '#484c50',
    // iconUrl: async () => (await import('./chainIcons/testnet.svg')).default,
  },
  futurenet: {
    id: "futurenet",
    name: "Futurenet",
    networkPassphrase: SorobanClient.Networks.FUTURENET,
    iconBackground: '#96bedc',
    // iconUrl: async () => (await import('./chainIcons/futurenet.svg')).default,
  },
  sandbox: {
    id: "sandbox",
    name: "Sandbox",
    networkPassphrase: SorobanClient.Networks.SANDBOX,
    iconBackground: '#dac695',
    // iconUrl: async () => (await import('./chainIcons/futurenet.svg')).default,
  },
  localnet: {
    id: "localnet",
    name: "Localnet",
    networkPassphrase: "Standalone Network ; February 2017",
    iconBackground: '#dac695',
    // iconUrl: async () => (await import('./chainIcons/futurenet.svg')).default,
  },
};
