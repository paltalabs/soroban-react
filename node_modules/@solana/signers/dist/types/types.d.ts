import { Address } from '@solana/addresses';
import { SignatureBytes } from '@solana/keys';
import { Slot } from '@solana/rpc-types';
export type SignatureDictionary = Readonly<Record<Address, SignatureBytes>>;
export type BaseSignerConfig = Readonly<{
    abortSignal?: AbortSignal;
}>;
export interface BaseTransactionSignerConfig extends BaseSignerConfig {
    minContextSlot?: Slot;
}
//# sourceMappingURL=types.d.ts.map