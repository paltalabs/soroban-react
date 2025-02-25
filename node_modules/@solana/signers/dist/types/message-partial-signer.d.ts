import { Address } from '@solana/addresses';
import { SignableMessage } from './signable-message';
import { BaseSignerConfig, SignatureDictionary } from './types';
export type MessagePartialSignerConfig = BaseSignerConfig;
/** Defines a signer capable of signing messages. */
export type MessagePartialSigner<TAddress extends string = string> = Readonly<{
    address: Address<TAddress>;
    signMessages(messages: readonly SignableMessage[], config?: MessagePartialSignerConfig): Promise<readonly SignatureDictionary[]>;
}>;
/** Checks whether the provided value implements the {@link MessagePartialSigner} interface. */
export declare function isMessagePartialSigner<TAddress extends string>(value: {
    [key: string]: unknown;
    address: Address<TAddress>;
}): value is MessagePartialSigner<TAddress>;
/** Asserts that the provided value implements the {@link MessagePartialSigner} interface. */
export declare function assertIsMessagePartialSigner<TAddress extends string>(value: {
    [key: string]: unknown;
    address: Address<TAddress>;
}): asserts value is MessagePartialSigner<TAddress>;
//# sourceMappingURL=message-partial-signer.d.ts.map