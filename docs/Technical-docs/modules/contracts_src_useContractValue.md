---
title: contracts/src/useContractValue
---
[soroban-react](../README.md) / contracts/src/useContractValue

# Module: contracts/src/useContractValue

## Table of contents

### Interfaces

- [fetchContractValueProps](../interfaces/contracts_src_useContractValue.fetchContractValueProps.md)
- [useContractValueProps](../interfaces/contracts_src_useContractValue.useContractValueProps.md)

### Type Aliases

- [ContractValueType](contracts_src_useContractValue.md#contractvaluetype)

### Functions

- [useContractValue](contracts_src_useContractValue.md#usecontractvalue)

## Type Aliases

### ContractValueType

Ƭ **ContractValueType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error?` | `string` \| `unknown` |
| `loading?` | ``true`` |
| `result?` | `StellarSdk.xdr.ScVal` |

#### Defined in

[contracts/src/useContractValue.tsx:12](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/contracts/src/useContractValue.tsx#L12)

## Functions

### useContractValue

▸ **useContractValue**(`options`): [`ContractValueType`](contracts_src_useContractValue.md#contractvaluetype)

A React hook that fetches the value of a contract method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`useContractValueProps`](../interfaces/contracts_src_useContractValue.useContractValueProps.md) | The options object. |

#### Returns

[`ContractValueType`](contracts_src_useContractValue.md#contractvaluetype)

An object containing the result, loading state, or error.

#### Defined in

[contracts/src/useContractValue.tsx:35](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/contracts/src/useContractValue.tsx#L35)
