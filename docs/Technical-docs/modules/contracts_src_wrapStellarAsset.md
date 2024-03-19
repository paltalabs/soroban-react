---
title: contracts/src/wrapStellarAsset
---
[soroban-react](../README.md) / contracts/src/wrapStellarAsset

# Module: contracts/src/wrapStellarAsset

## Table of contents

### Functions

- [wrapStellarAsset](contracts_src_wrapStellarAsset.md#wrapstellarasset)

## Functions

### wrapStellarAsset

▸ **wrapStellarAsset**(`«destructured»`): `Promise`\<`undefined` \| [`TxResponse`](contracts_src_types.md#txresponse)\>

Creates a Stellar asset contract by wrapping a Stellar asset.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `code` | `string` |
| › `issuer` | `string` |
| › `sorobanContext` | `SorobanContextType` |

#### Returns

`Promise`\<`undefined` \| [`TxResponse`](contracts_src_types.md#txresponse)\>

A promise that resolves to the result of the transaction.

**`Throws`**

An error if there is no active chain, not connected to a server, or no network passphrase.

#### Defined in

[contracts/src/wrapStellarAsset.tsx:15](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/contracts/src/wrapStellarAsset.tsx#L15)
