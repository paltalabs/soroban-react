---
title: contracts/src/useSendTransaction
---
[soroban-react](../README.md) / contracts/src/useSendTransaction

# Module: contracts/src/useSendTransaction

## Table of contents

### Interfaces

- [SendTransactionOptions](../interfaces/contracts_src_useSendTransaction.SendTransactionOptions.md)
- [SendTransactionResult](../interfaces/contracts_src_useSendTransaction.SendTransactionResult.md)

### Type Aliases

- [TransactionStatus](contracts_src_useSendTransaction.md#transactionstatus)

### Functions

- [useSendTransaction](contracts_src_useSendTransaction.md#usesendtransaction)

## Type Aliases

### TransactionStatus

Ƭ **TransactionStatus**: ``"idle"`` \| ``"error"`` \| ``"loading"`` \| ``"success"``

#### Defined in

[contracts/src/useSendTransaction.tsx:9](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/contracts/src/useSendTransaction.tsx#L9)

## Functions

### useSendTransaction

▸ **useSendTransaction**\<`E`\>(`defaultTxn?`, `defaultOptions?`): [`SendTransactionResult`](../interfaces/contracts_src_useSendTransaction.SendTransactionResult.md)\<`E`\>

React hook for retrieving a function that can be used to send a transaction. Upon sending, it will poll server.getTransactionStatus, until the transaction succeeds/fails, and return the result.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | `Error` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `defaultTxn?` | [`Transaction`](contracts_src_types.md#transaction) | The default transaction to use. |
| `defaultOptions?` | [`SendTransactionOptions`](../interfaces/contracts_src_useSendTransaction.SendTransactionOptions.md) | The default options for sending the transaction. |

#### Returns

[`SendTransactionResult`](../interfaces/contracts_src_useSendTransaction.SendTransactionResult.md)\<`E`\>

A sendTransaction function

#### Defined in

[contracts/src/useSendTransaction.tsx:45](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/contracts/src/useSendTransaction.tsx#L45)
