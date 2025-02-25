import { AccountRole, IAccountLookupMeta, IAccountMeta, IInstruction } from '@solana/instructions';
import { BaseTransactionMessage, ITransactionMessageWithFeePayer, TransactionVersion } from '@solana/transaction-messages';
import { ITransactionMessageWithFeePayerSigner } from './fee-payer-signer';
import { TransactionSigner } from './transaction-signer';
/** An extension of the IAccountMeta type that keeps track of its transaction signer. */
export interface IAccountSignerMeta<TAddress extends string = string, TSigner extends TransactionSigner<TAddress> = TransactionSigner<TAddress>> extends IAccountMeta<TAddress> {
    readonly role: AccountRole.READONLY_SIGNER | AccountRole.WRITABLE_SIGNER;
    readonly signer: TSigner;
}
type IAccountMetaWithSigner<TSigner extends TransactionSigner = TransactionSigner> = IAccountLookupMeta | IAccountMeta | IAccountSignerMeta<string, TSigner>;
/** A variation of the instruction type that allows IAccountSignerMeta in its account metas. */
export type IInstructionWithSigners<TSigner extends TransactionSigner = TransactionSigner, TAccounts extends readonly IAccountMetaWithSigner<TSigner>[] = readonly IAccountMetaWithSigner<TSigner>[]> = Pick<IInstruction<string, TAccounts>, 'accounts'>;
/** A variation of the transaction message type that allows IAccountSignerMeta in its account metas. */
export type ITransactionMessageWithSigners<TAddress extends string = string, TSigner extends TransactionSigner<TAddress> = TransactionSigner<TAddress>, TAccounts extends readonly IAccountMetaWithSigner<TSigner>[] = readonly IAccountMetaWithSigner<TSigner>[]> = Partial<ITransactionMessageWithFeePayer<TAddress> | ITransactionMessageWithFeePayerSigner<TAddress, TSigner>> & Pick<BaseTransactionMessage<TransactionVersion, IInstruction & IInstructionWithSigners<TSigner, TAccounts>>, 'instructions'>;
/** Extract all signers from an instruction that may contain IAccountSignerMeta accounts. */
export declare function getSignersFromInstruction<TSigner extends TransactionSigner = TransactionSigner>(instruction: IInstructionWithSigners<TSigner>): readonly TSigner[];
/** Extract all signers from a transaction message that may contain IAccountSignerMeta accounts. */
export declare function getSignersFromTransactionMessage<TAddress extends string = string, TSigner extends TransactionSigner<TAddress> = TransactionSigner<TAddress>, TTransactionMessage extends ITransactionMessageWithSigners<TAddress, TSigner> = ITransactionMessageWithSigners<TAddress, TSigner>>(transaction: TTransactionMessage): readonly TSigner[];
export {};
//# sourceMappingURL=account-signer-meta.d.ts.map