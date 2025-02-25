import { type FetchAccountConfig } from '@solana/accounts';
import { type FixedSizeCodec, type FixedSizeDecoder, type FixedSizeEncoder } from '@solana/codecs';
import type { GetAccountInfoApi } from '@solana/rpc-api';
import type { Rpc } from '@solana/rpc-spec';
import { Lamports } from '@solana/rpc-types';
type FeeCalculator = Readonly<{
    lamportsPerSignature: Lamports;
}>;
type SysvarFeesSize = 8;
/**
 * The `Fees` sysvar.
 *
 * Current cluster fees.
 */
export type SysvarFees = Readonly<{
    feeCalculator: FeeCalculator;
}>;
export declare function getSysvarFeesEncoder(): FixedSizeEncoder<SysvarFees, SysvarFeesSize>;
export declare function getSysvarFeesDecoder(): FixedSizeDecoder<SysvarFees, SysvarFeesSize>;
export declare function getSysvarFeesCodec(): FixedSizeCodec<SysvarFees, SysvarFees, SysvarFeesSize>;
/**
 * Fetch the `Fees` sysvar.
 *
 * Current cluster fees.
 */
export declare function fetchSysvarFees(rpc: Rpc<GetAccountInfoApi>, config?: FetchAccountConfig): Promise<SysvarFees>;
export {};
//# sourceMappingURL=fees.d.ts.map