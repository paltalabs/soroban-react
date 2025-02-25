import { Blockchain } from '../../backend/BlockchainLink';
import type { CoinInfo, FeeLevel } from '../../types';
type Blocks = Array<string | undefined>;
export declare class FeeLevels {
    coinInfo: CoinInfo;
    levels: FeeLevel[];
    longTermFeeRate?: string;
    blocks: Blocks;
    constructor(coinInfo: CoinInfo);
    loadMisc(blockchain: Blockchain): Promise<{
        feeLimit?: string | undefined;
        feePerTx?: string | undefined;
        label: "normal" | "custom" | "high" | "economy" | "low";
        feePerUnit: string;
        blocks: number;
    }[]>;
    load(blockchain: Blockchain): Promise<{
        feeLimit?: string | undefined;
        feePerTx?: string | undefined;
        label: "normal" | "custom" | "high" | "economy" | "low";
        feePerUnit: string;
        blocks: number;
    }[]>;
    updateCustomFee(feePerUnit: string): void;
}
export {};
//# sourceMappingURL=Fees.d.ts.map