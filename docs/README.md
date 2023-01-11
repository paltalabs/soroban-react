# @soroban-react docs


### 1. Install the packages
Install those packages you'll use
```
yarn add @soroban-react/core
yarn add @soroban-react/types
yarn add @soroban-react/freighter
yarn add @soroban-react/connect-button
yarn add @soroban-react/wallet-data
yarn add soroban-client
```
### 2. Set your allowed chains for your Dapp
```
import * as SorobanClient from "soroban-client";
import type {ChainMetadata} from '@soroban-react/types';
import type {ChainName} from '@soroban-react/chains';

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
  localnet: {
    id: "localnet",
    name: "Localnet",
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

## Use @soroban-react/connect-button
Place at any part of your dApp the ConnectButton component, that will trigger the connect() method of your Connector. It does need the sorobanContext.
```
import { useSorobanReact } from "@soroban-react/core";
import { ConnectButton } from "@soroban-react/connect-button";

<ConnectButton
  label={Connect your Wallet}
  sorobanContext={useSorobanReact()}>

```

## Use @soroban-react/wallet-data
Place at any part of your dApp the WalletData component. If the Connector is not connected, will show the ConnectButton. If the Connector is connected, will show address and network.

```
import { useSorobanReact } from "@soroban-react/core";
import { WalletData } from "@soroban-react/wallet-data";

<WalletData
  sorobanContext={useSorobanReact()}>
```
