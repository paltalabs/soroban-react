import * as SorobanClient from "soroban-client";
import type {WalletChain} from '@soroban-react/types';

export const public_chain : WalletChain = 
  {
    id: "public",
    name: "Public",
    networkPassphrase: SorobanClient.Networks.PUBLIC,
  }

export const futurenet : WalletChain = 
  {
    id: "public",
    name: "Futurenet",
    networkPassphrase: SorobanClient.Networks.FUTURENET,
  }

export const testnet : WalletChain = 
{
  id: "public",
  name: "Testnet",
  networkPassphrase: SorobanClient.Networks.TESTNET,
}

export const sandbox : WalletChain = 
{
  id: "public",
  name: "Sandbox",
  networkPassphrase: SorobanClient.Networks.SANDBOX,
}

export const standalone : WalletChain = 
{
  id: "public",
  name: "Standalone",
  networkPassphrase: "Standalone Network ; February 2017",
}
