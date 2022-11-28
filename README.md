# @soroban-react

@soroban-react is a simple, powerful framework for building modern Soroban dApps using React.

Library created based on https://github.com/stellar/soroban-example-dapp/tree/main/wallet written by https://github.com/paulbellamy.





## Packages

|Package|Version|
|--|--|
|[`@soroban-react/core`](packages/core)                | [![npm version](https://img.shields.io/npm/v/@soroban-react/core/latest.svg)](https://www.npmjs.com/package/@soroban-react/core/v/latest)|
|[`@soroban-react/types`](packages/types)                     | [![npm version](https://img.shields.io/npm/v/@soroban-react/types/latest.svg)](https://www.npmjs.com/package/@soroban-react/types/v/latest)|
|[`@soroban-react/freighter`](packages/core)                     | [![npm version](https://img.shields.io/npm/v/@soroban-react/freighter/latest.svg)](https://www.npmjs.com/package/@soroban-react/freighter/v/latest)|

## Usage

```
yarn add @soroban-react/core
yarn add @soroban-react/types
yarn add @soroban-react/freighter
```


## Introduction

`@soroban-react` is a simple, powerful framework for building modern Soroban dApps using React. Its marquee features are:

- Full support for [Freighter](https://github.com/stellar/freighter)

- A dev-friendly context containing the current account and chain, and more, available globally throughout your dApp via a [React Context](https://reactjs.org/docs/context.html).

- The ability to write custom, fully featured _Connectors_ that manage every aspect of your dApp's connectivity with the Soroban blockchain and user accounts.

## Quickstart

To jump straight into code, check out the CodeSandbox demo! (ToDo)

# Usage
### 1. Install the packages
```
yarn add @soroban-react/core
yarn add @soroban-react/types
yarn add soroban-client
```
### 2. Set your allowed chains for your Dapp
```
import * as SorobanClient from "soroban-client";
import type {ChainMetadata, ChainName} from '@soroban-react/types';

export const allowedChains: Record<ChainName, ChainMetadata> = {
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
  standalone: {
    id: "standalone",
    name: "Standalone",
    networkPassphrase: "Standalone Network ; February 2017",
  },
};
```

### 3. Set your allowed connectors (wallets) for your Dapp
```
import {ConnectorList } from '@soroban-react/types';
import { freighter } from '@soroban-react/freighter';
import { allowedChains as chains } from './allowedChains';

const appName = "My dApp"
export const allowedConnectors: ConnectorList = [
    {
      groupName: 'My Group Name',
      connectors: [freighter({ appName, chains })],
    },
  ];
```
### 4. Create a @soroban-react provider component
```
import React from 'react'
import {SorobanReactProvider} from '@soroban-react/core';
import { allowedChains} from '../soroban/allowedChains';
import { allowedConnectors } from '../soroban/allowedConnectors';
 
  export default function MySorobanReactProvider({children}:{children: React.ReactNode}) {
    return (
      <SorobanReactProvider
        chains={allowedChains}
        connectors={allowedConnectors}>
          {children}
      </SorobanReactProvider>
    )
  } 
```

### 5. Place your @soroban-react provider at the root of your dApp

```
import MySorobanReactProvider from './components/MySorobanReactProvider';

```
Be sure to place the rest of your dapp as children

```
<MySorobanReactProvider>
      <App/>
    </MySorobanReactProvider>
```

### 6. Use useSorobanReact() at any point inside your dapp
```
import { useSorobanReact } from "@soroban-react/core";

```

```
const { address
        activeChain,
        server,
        } = useSorobanReact()
```


## Implementations

Projects using `@soroban-react` include:

- [Soroban Example Dapp fork](https://github.com/esteblock/soroban-example-dapp/tree/%40soroban-react)

Open a PR to add your project to the list! If you're interested in contributing
