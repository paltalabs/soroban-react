import { BaseTransactionMessage, ITransactionMessageWithFeePayer } from '@solana/transaction-messages';
import { TransactionSigner } from './transaction-signer';
export interface ITransactionMessageWithFeePayerSigner<TAddress extends string = string, TSigner extends TransactionSigner<TAddress> = TransactionSigner<TAddress>> {
    readonly feePayer: TSigner;
}
export declare function setTransactionMessageFeePayerSigner<TFeePayerAddress extends string, TTransactionMessage extends BaseTransactionMessage & Partial<ITransactionMessageWithFeePayer | ITransactionMessageWithFeePayerSigner>>(feePayer: TransactionSigner<TFeePayerAddress>, transactionMessage: TTransactionMessage): ITransactionMessageWithFeePayerSigner<TFeePayerAddress> & Omit<TTransactionMessage, 'feePayer'>;
//# sourceMappingURL=fee-payer-signer.d.ts.map