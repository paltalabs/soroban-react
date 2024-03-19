---
title: contracts/src/transaction
---
[soroban-react](../README.md) / contracts/src/transaction

# Module: contracts/src/transaction

## Table of contents

### Type Aliases

- [SignAndSendArgs](contracts_src_transaction.md#signandsendargs)

### Functions

- [sendTx](contracts_src_transaction.md#sendtx)
- [signAndSendTransaction](contracts_src_transaction.md#signandsendtransaction)

## Type Aliases

### SignAndSendArgs

Ƭ **SignAndSendArgs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `secretKey?` | `string` |
| `skipAddingFootprint?` | `boolean` |
| `sorobanContext` | `SorobanContextType` |
| `txn` | [`Transaction`](contracts_src_types.md#transaction) |

#### Defined in

[contracts/src/transaction.tsx:10](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/contracts/src/transaction.tsx#L10)

## Functions

### sendTx

▸ **sendTx**(`«destructured»`): `Promise`\<[`TxResponse`](contracts_src_types.md#txresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `secondsToWait` | `number` |
| › `server` | `Server` |
| › `tx` | [`Tx`](contracts_src_types.md#tx) |

#### Returns

`Promise`\<[`TxResponse`](contracts_src_types.md#txresponse)\>

#### Defined in

[contracts/src/transaction.tsx:102](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/contracts/src/transaction.tsx#L102)

___

### signAndSendTransaction

▸ **signAndSendTransaction**(`options`): `Promise`\<[`TxResponse`](contracts_src_types.md#txresponse)\>

Signs and sends a transaction to the Stellar network.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`SignAndSendArgs`](contracts_src_transaction.md#signandsendargs) | The options object. |

#### Returns

`Promise`\<[`TxResponse`](contracts_src_types.md#txresponse)\>

A promise that resolves with the transaction response.

**`Throws`**

Throws an error if no secret key or active connector is provided, or if there is no server or network passphrase.

#### Defined in

[contracts/src/transaction.tsx:27](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/contracts/src/transaction.tsx#L27)
