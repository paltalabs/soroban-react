---
title: types/src
---
[soroban-react](../README.md) / types/src

# Module: types/src

## Table of contents

### Interfaces

- [NetworkDetails](../interfaces/types_src.NetworkDetails.md)
- [WalletChain](../interfaces/types_src.WalletChain.md)

### Type Aliases

- [ChainMetadata](types_src.md#chainmetadata)
- [ChainName](types_src.md#chainname)
- [Connector](types_src.md#connector)
- [InstructionStepName](types_src.md#instructionstepname)

## Type Aliases

### ChainMetadata

Ƭ **ChainMetadata**: [`WalletChain`](../interfaces/types_src.WalletChain.md)

#### Defined in

[types/src/index.tsx:55](https://github.com/paltalabs/soroban-react/blob/7608217/packages/types/src/index.tsx#L55)

___

### ChainName

Ƭ **ChainName**: ``"futurenet"`` \| ``"public"`` \| ``"testnet"`` \| ``"sandbox"`` \| ``"standalone"``

#### Defined in

[types/src/index.tsx:48](https://github.com/paltalabs/soroban-react/blob/7608217/packages/types/src/index.tsx#L48)

___

### Connector

Ƭ **Connector**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `downloadUrls?` | { `android?`: `string` ; `browserExtension?`: `string` ; `ios?`: `string` ; `qrCode?`: `string`  } |
| `downloadUrls.android?` | `string` |
| `downloadUrls.browserExtension?` | `string` |
| `downloadUrls.ios?` | `string` |
| `downloadUrls.qrCode?` | `string` |
| `getNetworkDetails` | () => `Promise`<[`NetworkDetails`](../interfaces/types_src.NetworkDetails.md)\> |
| `getPublicKey` | () => `Promise`<`string`\> |
| `iconBackground` | `string` |
| `iconUrl` | `string` \| () => `Promise`<`string`\> |
| `id` | `string` |
| `installed?` | `boolean` |
| `isConnected` | () => `boolean` |
| `name` | `string` |
| `shortName?` | `string` |
| `signTransaction` | (`xdr`: `string`, `opts?`: { `accountToSign?`: `string` ; `network?`: `string` ; `networkPassphrase?`: `string`  }) => `Promise`<`string`\> |

#### Defined in

[types/src/index.tsx:10](https://github.com/paltalabs/soroban-react/blob/7608217/packages/types/src/index.tsx#L10)

___

### InstructionStepName

Ƭ **InstructionStepName**: ``"install"`` \| ``"create"`` \| ``"scan"``

#### Defined in

[types/src/index.tsx:1](https://github.com/paltalabs/soroban-react/blob/7608217/packages/types/src/index.tsx#L1)
