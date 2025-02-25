import type { CoinInfo, BitcoinNetworkInfo } from '../types';
type Bip44Options = {
    purpose?: number;
    coinType?: number;
};
export declare const getAccountAddressN: (coinInfo: CoinInfo, accountIndex: number, bip44?: Bip44Options) => number[];
export declare const getAccountLabel: (path: number[], coinInfo: CoinInfo) => string;
export declare const getPublicKeyLabel: (path: number[], coinInfo?: BitcoinNetworkInfo) => string;
export declare const isUtxoBased: (coinInfo: CoinInfo) => boolean;
export {};
//# sourceMappingURL=accountUtils.d.ts.map