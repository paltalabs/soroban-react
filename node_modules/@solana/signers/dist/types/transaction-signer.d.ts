import { Address } from '@solana/addresses';
import { TransactionModifyingSigner } from './transaction-modifying-signer';
import { TransactionPartialSigner } from './transaction-partial-signer';
import { TransactionSendingSigner } from './transaction-sending-signer';
/** Defines a signer capable of signing transactions. */
export type TransactionSigner<TAddress extends string = string> = TransactionModifyingSigner<TAddress> | TransactionPartialSigner<TAddress> | TransactionSendingSigner<TAddress>;
/** Checks whether the provided value implements the {@link TransactionSigner} interface. */
export declare function isTransactionSigner<TAddress extends string>(value: {
    [key: string]: unknown;
    address: Address<TAddress>;
}): value is TransactionSigner<TAddress>;
/** Asserts that the provided value implements the {@link TransactionSigner} interface. */
export declare function assertIsTransactionSigner<TAddress extends string>(value: {
    [key: string]: unknown;
    address: Address<TAddress>;
}): asserts value is TransactionSigner<TAddress>;
//# sourceMappingURL=transaction-signer.d.ts.map