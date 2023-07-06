---
title: SendTransactionResult<E>
---
[soroban-react](../README.md) / [contracts/src/useSendTransaction](../modules/contracts_src_useSendTransaction.md) / SendTransactionResult

# Interface: SendTransactionResult<E\>

[contracts/src/useSendTransaction](../modules/contracts_src_useSendTransaction.md).SendTransactionResult

## Type parameters

| Name | Type |
| :------ | :------ |
| `E` | `Error` |

## Table of contents

### Properties

- [data](contracts_src_useSendTransaction.SendTransactionResult.md#data)
- [error](contracts_src_useSendTransaction.SendTransactionResult.md#error)
- [isError](contracts_src_useSendTransaction.SendTransactionResult.md#iserror)
- [isIdle](contracts_src_useSendTransaction.SendTransactionResult.md#isidle)
- [isLoading](contracts_src_useSendTransaction.SendTransactionResult.md#isloading)
- [isSuccess](contracts_src_useSendTransaction.SendTransactionResult.md#issuccess)
- [reset](contracts_src_useSendTransaction.SendTransactionResult.md#reset)
- [sendTransaction](contracts_src_useSendTransaction.SendTransactionResult.md#sendtransaction)
- [status](contracts_src_useSendTransaction.SendTransactionResult.md#status)

## Properties

### data

• `Optional` **data**: `ScVal`

#### Defined in

[contracts/src/useSendTransaction.tsx:36](https://github.com/mauroepce/soroban-react/blob/546de55/packages/contracts/src/useSendTransaction.tsx#L36)

___

### error

• `Optional` **error**: `E`

#### Defined in

[contracts/src/useSendTransaction.tsx:37](https://github.com/mauroepce/soroban-react/blob/546de55/packages/contracts/src/useSendTransaction.tsx#L37)

___

### isError

• **isError**: `boolean`

#### Defined in

[contracts/src/useSendTransaction.tsx:38](https://github.com/mauroepce/soroban-react/blob/546de55/packages/contracts/src/useSendTransaction.tsx#L38)

___

### isIdle

• **isIdle**: `boolean`

#### Defined in

[contracts/src/useSendTransaction.tsx:39](https://github.com/mauroepce/soroban-react/blob/546de55/packages/contracts/src/useSendTransaction.tsx#L39)

___

### isLoading

• **isLoading**: `boolean`

#### Defined in

[contracts/src/useSendTransaction.tsx:40](https://github.com/mauroepce/soroban-react/blob/546de55/packages/contracts/src/useSendTransaction.tsx#L40)

___

### isSuccess

• **isSuccess**: `boolean`

#### Defined in

[contracts/src/useSendTransaction.tsx:41](https://github.com/mauroepce/soroban-react/blob/546de55/packages/contracts/src/useSendTransaction.tsx#L41)

___

### reset

• **reset**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[contracts/src/useSendTransaction.tsx:46](https://github.com/mauroepce/soroban-react/blob/546de55/packages/contracts/src/useSendTransaction.tsx#L46)

___

### sendTransaction

• **sendTransaction**: (`txn?`: `Transaction`, `opts?`: [`SendTransactionOptions`](contracts_src_useSendTransaction.SendTransactionOptions.md)) => `Promise`<`ScVal`[]\>

#### Type declaration

▸ (`txn?`, `opts?`): `Promise`<`ScVal`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `txn?` | `Transaction` |
| `opts?` | [`SendTransactionOptions`](contracts_src_useSendTransaction.SendTransactionOptions.md) |

##### Returns

`Promise`<`ScVal`[]\>

#### Defined in

[contracts/src/useSendTransaction.tsx:42](https://github.com/mauroepce/soroban-react/blob/546de55/packages/contracts/src/useSendTransaction.tsx#L42)

___

### status

• **status**: [`TransactionStatus`](../modules/contracts_src_useSendTransaction.md#transactionstatus)

#### Defined in

[contracts/src/useSendTransaction.tsx:47](https://github.com/mauroepce/soroban-react/blob/546de55/packages/contracts/src/useSendTransaction.tsx#L47)
