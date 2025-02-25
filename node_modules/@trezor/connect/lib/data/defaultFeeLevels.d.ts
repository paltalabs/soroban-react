import { FeeLevel, FeeInfo } from '../types';
interface CoinsJsonData {
    shortcut: string;
    blocktime_seconds: number;
    default_fee_b: Record<'High' | 'Normal' | 'Economy' | 'Low', number>;
    maxfee_kb: number;
    minfee_kb: number;
    dust_limit: number;
}
export type FeeInfoWithLevels = FeeInfo & {
    defaultFees: FeeLevel[];
};
export declare const getBitcoinFeeLevels: (coin: CoinsJsonData) => FeeInfoWithLevels;
export declare const getEthereumFeeLevels: () => FeeInfoWithLevels;
export declare const getMiscFeeLevels: (data: CoinsJsonData) => FeeInfoWithLevels;
export {};
//# sourceMappingURL=defaultFeeLevels.d.ts.map