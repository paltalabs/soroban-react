---
title: contracts/src/contractInvoke
---
[soroban-react](../README.md) / contracts/src/contractInvoke

# Module: contracts/src/contractInvoke

## Table of contents

### Type Aliases

- [InvokeArgs](contracts_src_contractInvoke.md#invokeargs)

### Functions

- [contractInvoke](contracts_src_contractInvoke.md#contractinvoke)

## Type Aliases

### InvokeArgs

Ƭ **InvokeArgs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `args?` | `SorobanClient.xdr.ScVal`[] |
| `contractAddress` | `string` |
| `fee?` | `number` |
| `method` | `string` |
| `secretKey?` | `string` |
| `signAndSend?` | `boolean` |
| `skipAddingFootprint?` | `boolean` |
| `sorobanContext` | `SorobanContextType` |

#### Defined in

[contracts/src/contractInvoke.tsx:12](https://github.com/paltalabs/soroban-react/blob/7608217/packages/contracts/src/contractInvoke.tsx#L12)

## Functions

### contractInvoke

▸ **contractInvoke**(`«destructured»`): `Promise`<[`TxResponse`](contracts_src_types.md#txresponse) \| `SorobanClient.xdr.ScVal`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`InvokeArgs`](contracts_src_contractInvoke.md#invokeargs) |

#### Returns

`Promise`<[`TxResponse`](contracts_src_types.md#txresponse) \| `SorobanClient.xdr.ScVal`\>

#### Defined in

[contracts/src/contractInvoke.tsx:27](https://github.com/paltalabs/soroban-react/blob/7608217/packages/contracts/src/contractInvoke.tsx#L27)
