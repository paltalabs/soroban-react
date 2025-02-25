import { Address } from '@solana/addresses';
import { MessageModifyingSigner } from './message-modifying-signer';
import { MessagePartialSigner } from './message-partial-signer';
/** Defines a signer capable of signing messages. */
export type MessageSigner<TAddress extends string = string> = MessageModifyingSigner<TAddress> | MessagePartialSigner<TAddress>;
/** Checks whether the provided value implements the {@link MessageSigner} interface. */
export declare function isMessageSigner<TAddress extends string>(value: {
    [key: string]: unknown;
    address: Address<TAddress>;
}): value is MessageSigner<TAddress>;
/** Asserts that the provided value implements the {@link MessageSigner} interface. */
export declare function assertIsMessageSigner<TAddress extends string>(value: {
    [key: string]: unknown;
    address: Address<TAddress>;
}): asserts value is MessageSigner<TAddress>;
//# sourceMappingURL=message-signer.d.ts.map