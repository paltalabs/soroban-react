---
title: contracts/src/setTrustline
---
[soroban-react](../README.md) / contracts/src/setTrustline

# Module: contracts/src/setTrustline

## Table of contents

### Functions

- [setTrustline](contracts_src_setTrustline.md#settrustline)

## Functions

### setTrustline

▸ **setTrustline**(`options`): `Promise`\<`undefined` \| `SubmitTransactionResponse`\>

Sets a trustline for a token on the Stellar network.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | The options object. |
| `options.sorobanContext` | `SorobanContextType` | The Soroban context. |
| `options.tokenAdmin` | `string` | The public key of the token's administrator. |
| `options.tokenSymbol` | `string` | The symbol of the token. |

#### Returns

`Promise`\<`undefined` \| `SubmitTransactionResponse`\>

A promise that resolves with the transaction response.

**`Throws`**

Throws an error if there is no active chain, no server connected, or if network passphrase is missing.

#### Defined in

[contracts/src/setTrustline.tsx:15](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/contracts/src/setTrustline.tsx#L15)
