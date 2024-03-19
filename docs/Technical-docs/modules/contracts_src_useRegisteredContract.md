---
title: contracts/src/useRegisteredContract
---
[soroban-react](../README.md) / contracts/src/useRegisteredContract

# Module: contracts/src/useRegisteredContract

## Table of contents

### Type Aliases

- [WrappedContract](contracts_src_useRegisteredContract.md#wrappedcontract)
- [WrappedContractInvokeArgs](contracts_src_useRegisteredContract.md#wrappedcontractinvokeargs)

### Functions

- [useRegisteredContract](contracts_src_useRegisteredContract.md#useregisteredcontract)
- [useWrappedContract](contracts_src_useRegisteredContract.md#usewrappedcontract)

## Type Aliases

### WrappedContract

Ƭ **WrappedContract**: `Object`

Represents a wrapped contract object with deployment information and an custom invoke function.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `deploymentInfo` | `ContractDeploymentInfo` |
| `invoke` | (`args`: [`WrappedContractInvokeArgs`](contracts_src_useRegisteredContract.md#wrappedcontractinvokeargs)) => `Promise`\<[`TxResponse`](contracts_src_types.md#txresponse) \| `StellarSdk.xdr.ScVal`\> |

#### Defined in

[contracts/src/useRegisteredContract.tsx:49](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/contracts/src/useRegisteredContract.tsx#L49)

___

### WrappedContractInvokeArgs

Ƭ **WrappedContractInvokeArgs**: `Object`

Represents the arguments for invoking methods on a wrapped contract. It needs less argument than invoking a contract that is not wrapped.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `args?` | `StellarSdk.xdr.ScVal`[] |
| `fee?` | `number` |
| `method` | `string` |
| `reconnectAfterTx?` | `boolean` |
| `secretKey?` | `string` |
| `signAndSend?` | `boolean` |
| `skipAddingFootprint?` | `boolean` |

#### Defined in

[contracts/src/useRegisteredContract.tsx:35](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/contracts/src/useRegisteredContract.tsx#L35)

## Functions

### useRegisteredContract

▸ **useRegisteredContract**(`contractId`): `undefined` \| [`WrappedContract`](contracts_src_useRegisteredContract.md#wrappedcontract)

React hook that returns a `WrappedContract` object for the given contract ID,
looked up from the deployments registry for the active chain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `string` | The ID of the contract. |

#### Returns

`undefined` \| [`WrappedContract`](contracts_src_useRegisteredContract.md#wrappedcontract)

The `WrappedContract` object.

#### Defined in

[contracts/src/useRegisteredContract.tsx:96](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/contracts/src/useRegisteredContract.tsx#L96)

___

### useWrappedContract

▸ **useWrappedContract**(`deploymentInfo`): `undefined` \| [`WrappedContract`](contracts_src_useRegisteredContract.md#wrappedcontract)

React hook that returns a `WrappedContract` object configured with
the provided deployment information.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deploymentInfo` | `ContractDeploymentInfo` | The deployment information for the contract. |

#### Returns

`undefined` \| [`WrappedContract`](contracts_src_useRegisteredContract.md#wrappedcontract)

The `WrappedContract` object.

#### Defined in

[contracts/src/useRegisteredContract.tsx:60](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/contracts/src/useRegisteredContract.tsx#L60)
