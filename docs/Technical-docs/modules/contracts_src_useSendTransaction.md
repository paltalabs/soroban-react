[soroban-react](../README.md) / contracts/src/useSendTransaction

# Module: contracts/src/useSendTransaction

## Table of contents

### Interfaces

- [SendTransactionOptions](../interfaces/contracts_src_useSendTransaction.SendTransactionOptions.md)
- [SendTransactionResult](../interfaces/contracts_src_useSendTransaction.SendTransactionResult.md)
- [contractTransactionProps](../interfaces/contracts_src_useSendTransaction.contractTransactionProps.md)

### Type Aliases

- [TransactionStatus](contracts_src_useSendTransaction.md#transactionstatus)

### Functions

- [contractTransaction](contracts_src_useSendTransaction.md#contracttransaction)
- [useSendTransaction](contracts_src_useSendTransaction.md#usesendtransaction)

## Type Aliases

### TransactionStatus

Ƭ **TransactionStatus**: ``"idle"`` \| ``"error"`` \| ``"loading"`` \| ``"success"``

#### Defined in

[contracts/src/useSendTransaction.tsx:6](https://github.com/esteblock/soroban-react/blob/612058a/packages/contracts/src/useSendTransaction.tsx#L6)

## Functions

### contractTransaction

▸ **contractTransaction**(`«destructured»`): `SorobanClient.Transaction`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`contractTransactionProps`](../interfaces/contracts_src_useSendTransaction.contractTransactionProps.md) |

#### Returns

`SorobanClient.Transaction`

#### Defined in

[contracts/src/useSendTransaction.tsx:16](https://github.com/esteblock/soroban-react/blob/612058a/packages/contracts/src/useSendTransaction.tsx#L16)

___

### useSendTransaction

▸ **useSendTransaction**<`E`\>(`defaultTxn?`, `defaultOptions?`): [`SendTransactionResult`](../interfaces/contracts_src_useSendTransaction.SendTransactionResult.md)<`E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | `Error` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `defaultTxn?` | `Transaction` |
| `defaultOptions?` | [`SendTransactionOptions`](../interfaces/contracts_src_useSendTransaction.SendTransactionOptions.md) |

#### Returns

[`SendTransactionResult`](../interfaces/contracts_src_useSendTransaction.SendTransactionResult.md)<`E`\>

#### Defined in

[contracts/src/useSendTransaction.tsx:62](https://github.com/esteblock/soroban-react/blob/612058a/packages/contracts/src/useSendTransaction.tsx#L62)
