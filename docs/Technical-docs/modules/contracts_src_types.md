---
title: contracts/src/types
---
[soroban-react](../README.md) / contracts/src/types

# Module: contracts/src/types

## Table of contents

### Type Aliases

- [Simulation](contracts_src_types.md#simulation)
- [Transaction](contracts_src_types.md#transaction)
- [Tx](contracts_src_types.md#tx)
- [TxResponse](contracts_src_types.md#txresponse)

## Type Aliases

### Simulation

Ƭ **Simulation**: `SorobanRpc.SimulateTransactionResponse`

#### Defined in

[contracts/src/types.tsx:17](https://github.com/paltalabs/soroban-react/blob/7608217/packages/contracts/src/types.tsx#L17)

___

### Transaction

Ƭ **Transaction**: `SorobanClient.Transaction` \| `SorobanClient.FeeBumpTransaction`

#### Defined in

[contracts/src/types.tsx:10](https://github.com/paltalabs/soroban-react/blob/7608217/packages/contracts/src/types.tsx#L10)

___

### Tx

Ƭ **Tx**: `SorobanClientTransaction`<`Memo`<`MemoType`\>, `Operation`[]\>

#### Defined in

[contracts/src/types.tsx:13](https://github.com/paltalabs/soroban-react/blob/7608217/packages/contracts/src/types.tsx#L13)

___

### TxResponse

Ƭ **TxResponse**: `SorobanRpc.GetTransactionResponse` & { `txHash`: `string`  }

#### Defined in

[contracts/src/types.tsx:14](https://github.com/paltalabs/soroban-react/blob/7608217/packages/contracts/src/types.tsx#L14)
