/**
 * This module provides the configuration for the various blockchains
 * that are supported by the app, including public, test networks
 * and custom (sandbox and standalone). Each blockchain is defined
 * as a WalletChain object containing details such as name and phrase
 * of network password.
 * 
 * @module WalletChains
 * 
 * 
 * The soroban-client module is a Javascript library for communicating with a server
 * Soroban RPC. It is used to build Stellar applications in both Node.js and
 * in the browser. Provides a network layer API for soroban-rpc methods,
 * facilities to build and sign transactions, to communicate with an instance
 * from soroban-rpc, and to send transactions or check the status of the network.
 * 
 * @requires soroban-client
 */


import * as SorobanClient from "soroban-client";
import type {WalletChain} from '@soroban-react/types';

/**
 * A `WalletChain` object representing the public blockchain network.
 * @typedef {object} WalletChain
 * @property {string} id - The unique identifier for the blockchain network.
 * @property {string} name - The name of the blockchain network.
 * @property {string} networkPassphrase - The network passphrase for the blockchain network.
 */


export const public_chain : WalletChain = 
  {
    id: "public",
    name: "Public",
    networkPassphrase: SorobanClient.Networks.PUBLIC,
  }


/**
 * A `WalletChain` object representing the Futurenet blockchain network.
 */

export const futurenet : WalletChain = 
  {
    id: "public",
    name: "Futurenet",
    networkPassphrase: SorobanClient.Networks.FUTURENET,
  }

/**
 * A `WalletChain` object representing the Testnet blockchain network.
 */

export const testnet : WalletChain = 
{
  id: "public",
  name: "Testnet",
  networkPassphrase: SorobanClient.Networks.TESTNET,
}

/**
 * A `WalletChain` object representing the Sandbox blockchain network.
 */

export const sandbox : WalletChain = 
{
  id: "public",
  name: "Sandbox",
  networkPassphrase: SorobanClient.Networks.SANDBOX,
}

/**
 * A `WalletChain` object representing the Standalone blockchain network.
 */

export const standalone : WalletChain = 
{
  id: "public",
  name: "Standalone",
  networkPassphrase: "Standalone Network ; February 2017",
}
