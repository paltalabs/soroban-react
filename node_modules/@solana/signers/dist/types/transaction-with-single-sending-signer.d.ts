import { CompilableTransactionMessage } from '@solana/transaction-messages';
import { ITransactionMessageWithSigners } from './account-signer-meta';
/** Defines a transaction message with exactly one {@link TransactionSendingSigner}. */
export type ITransactionMessageWithSingleSendingSigner = ITransactionMessageWithSigners & {
    readonly __transactionWithSingleSendingSigner: unique symbol;
};
/** Checks whether the provided transaction has exactly one {@link TransactionSendingSigner}. */
export declare function isTransactionMessageWithSingleSendingSigner<TTransactionMessage extends CompilableTransactionMessage>(transaction: TTransactionMessage): transaction is ITransactionMessageWithSingleSendingSigner & TTransactionMessage;
/** Asserts that the provided transaction has exactly one {@link TransactionSendingSigner}. */
export declare function assertIsTransactionMessageWithSingleSendingSigner<TTransactionMessage extends CompilableTransactionMessage>(transaction: TTransactionMessage): asserts transaction is ITransactionMessageWithSingleSendingSigner & TTransactionMessage;
//# sourceMappingURL=transaction-with-single-sending-signer.d.ts.map