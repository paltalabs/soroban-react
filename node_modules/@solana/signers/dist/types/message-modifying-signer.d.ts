import { Address } from '@solana/addresses';
import { SignableMessage } from './signable-message';
import { BaseSignerConfig } from './types';
export type MessageModifyingSignerConfig = BaseSignerConfig;
/** Defines a signer capable of signing messages. */
export type MessageModifyingSigner<TAddress extends string = string> = Readonly<{
    address: Address<TAddress>;
    modifyAndSignMessages(messages: readonly SignableMessage[], config?: MessageModifyingSignerConfig): Promise<readonly SignableMessage[]>;
}>;
/** Checks whether the provided value implements the {@link MessageModifyingSigner} interface. */
export declare function isMessageModifyingSigner<TAddress extends string>(value: {
    [key: string]: unknown;
    address: Address<TAddress>;
}): value is MessageModifyingSigner<TAddress>;
/** Asserts that the provided value implements the {@link MessageModifyingSigner} interface. */
export declare function assertIsMessageModifyingSigner<TAddress extends string>(value: {
    [key: string]: unknown;
    address: Address<TAddress>;
}): asserts value is MessageModifyingSigner<TAddress>;
//# sourceMappingURL=message-modifying-signer.d.ts.map