import { Address } from '@solana/addresses';
import { SignatureBytes } from '@solana/keys';
import { Transaction } from '@solana/transactions';
import { BaseTransactionSignerConfig } from './types';
export type TransactionSendingSignerConfig = BaseTransactionSignerConfig;
/** Defines a signer capable of signing and sending transactions simultaneously. */
export type TransactionSendingSigner<TAddress extends string = string> = Readonly<{
    address: Address<TAddress>;
    signAndSendTransactions(transactions: readonly Transaction[], config?: TransactionSendingSignerConfig): Promise<readonly SignatureBytes[]>;
}>;
/** Checks whether the provided value implements the {@link TransactionSendingSigner} interface. */
export declare function isTransactionSendingSigner<TAddress extends string>(value: {
    [key: string]: unknown;
    address: Address<TAddress>;
}): value is TransactionSendingSigner<TAddress>;
/** Asserts that the provided value implements the {@link TransactionSendingSigner} interface. */
export declare function assertIsTransactionSendingSigner<TAddress extends string>(value: {
    [key: string]: unknown;
    address: Address<TAddress>;
}): asserts value is TransactionSendingSigner<TAddress>;
//# sourceMappingURL=transaction-sending-signer.d.ts.map