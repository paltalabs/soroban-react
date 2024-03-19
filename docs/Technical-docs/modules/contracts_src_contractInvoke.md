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

Arguments for invoking a smart contract method call.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `args?` | `StellarSdk.xdr.ScVal`[] |
| `contractAddress` | `string` |
| `fee?` | `number` |
| `method` | `string` |
| `reconnectAfterTx?` | `boolean` |
| `secretKey?` | `string` |
| `signAndSend?` | `boolean` |
| `skipAddingFootprint?` | `boolean` |
| `sorobanContext` | `SorobanContextType` |

#### Defined in

[contracts/src/contractInvoke.tsx:15](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/contracts/src/contractInvoke.tsx#L15)

## Functions

### contractInvoke

▸ **contractInvoke**(`args`): `Promise`\<[`TxResponse`](contracts_src_types.md#txresponse) \| `StellarSdk.xdr.ScVal`\>

Invokes a smart contract method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | [`InvokeArgs`](contracts_src_contractInvoke.md#invokeargs) | Arguments for invoking the smart contract. |

#### Returns

`Promise`\<[`TxResponse`](contracts_src_types.md#txresponse) \| `StellarSdk.xdr.ScVal`\>

- A promise resolving to the transaction response or the result of the simulation.

**`Throws`**

- If there are errors during the contract invocation process.

#### Defined in

[contracts/src/contractInvoke.tsx:37](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/contracts/src/contractInvoke.tsx#L37)
