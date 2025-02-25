import { Address } from '@solana/addresses';
import { MessagePartialSigner } from './message-partial-signer';
import { TransactionPartialSigner } from './transaction-partial-signer';
/** Defines a no-operation signer that pretends to partially sign messages and transactions. */
export type NoopSigner<TAddress extends string = string> = MessagePartialSigner<TAddress> & TransactionPartialSigner<TAddress>;
/** Creates a NoopSigner from the provided Address. */
export declare function createNoopSigner(address: Address): NoopSigner;
//# sourceMappingURL=noop-signer.d.ts.map