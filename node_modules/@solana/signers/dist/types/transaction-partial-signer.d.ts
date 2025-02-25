import { Address } from '@solana/addresses';
import { Transaction } from '@solana/transactions';
import { BaseTransactionSignerConfig, SignatureDictionary } from './types';
export type TransactionPartialSignerConfig = BaseTransactionSignerConfig;
/** Defines a signer capable of signing transactions. */
export type TransactionPartialSigner<TAddress extends string = string> = Readonly<{
    address: Address<TAddress>;
    signTransactions(transactions: readonly Transaction[], config?: TransactionPartialSignerConfig): Promise<readonly SignatureDictionary[]>;
}>;
/** Checks whether the provided value implements the {@link TransactionPartialSigner} interface. */
export declare function isTransactionPartialSigner<TAddress extends string>(value: {
    [key: string]: unknown;
    address: Address<TAddress>;
}): value is TransactionPartialSigner<TAddress>;
/** Asserts that the provided value implements the {@link TransactionPartialSigner} interface. */
export declare function assertIsTransactionPartialSigner<TAddress extends string>(value: {
    [key: string]: unknown;
    address: Address<TAddress>;
}): asserts value is TransactionPartialSigner<TAddress>;
//# sourceMappingURL=transaction-partial-signer.d.ts.map