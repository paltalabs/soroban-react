import { IInstruction } from '@solana/instructions';
import { BaseTransactionMessage } from '@solana/transaction-messages';
import { IInstructionWithSigners, ITransactionMessageWithSigners } from './account-signer-meta';
import { TransactionSigner } from './transaction-signer';
/** Attaches the provided signers to the account metas of an instruction when applicable. */
export declare function addSignersToInstruction<TInstruction extends IInstruction>(signers: TransactionSigner[], instruction: TInstruction | (IInstructionWithSigners & TInstruction)): IInstructionWithSigners & TInstruction;
/** Attaches the provided signers to the account metas of a transaction message when applicable. */
export declare function addSignersToTransactionMessage<TTransactionMessage extends BaseTransactionMessage>(signers: TransactionSigner[], transactionMessage: TTransactionMessage | (ITransactionMessageWithSigners & TTransactionMessage)): ITransactionMessageWithSigners & TTransactionMessage;
//# sourceMappingURL=add-signers.d.ts.map