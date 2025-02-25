import { MessageSigner } from './message-signer';
import { TransactionSigner } from './transaction-signer';
/** Removes all duplicated signers from a provided array by comparing their addresses. */
export declare function deduplicateSigners<TSigner extends MessageSigner | TransactionSigner>(signers: readonly TSigner[]): readonly TSigner[];
//# sourceMappingURL=deduplicate-signers.d.ts.map