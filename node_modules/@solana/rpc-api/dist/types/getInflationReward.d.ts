import type { Address } from '@solana/addresses';
import type { Commitment, Lamports, Slot } from '@solana/rpc-types';
type GetInflationRewardApiConfig = Readonly<{
    commitment?: Commitment;
    epoch?: bigint;
    minContextSlot?: Slot;
}>;
type InflationReward = Readonly<{
    amount: Lamports;
    commission: number;
    effectiveSlot: Slot;
    epoch: bigint;
    postBalance: Lamports;
}>;
type GetInflationRewardApiResponse = readonly (InflationReward | null)[];
export type GetInflationRewardApi = {
    /**
     * Returns the current block height of the node
     */
    getInflationReward(addresses: Address[], config?: GetInflationRewardApiConfig): GetInflationRewardApiResponse;
};
export {};
//# sourceMappingURL=getInflationReward.d.ts.map