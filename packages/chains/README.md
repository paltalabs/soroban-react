# @soroban-react/chains

This package will charge the follwing chains:

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


Library created based on https://github.com/stellar/soroban-example-dapp/tree/main/wallet written by https://github.com/paulbellamy