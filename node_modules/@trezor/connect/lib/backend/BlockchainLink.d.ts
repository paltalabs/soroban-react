import type { BlockchainOptions as Options } from './Blockchain';
import type { CoinInfo } from '../types';
export { Blockchain } from './Blockchain';
export declare const findBackend: (coin: string, identity?: string) => import("./Blockchain").Blockchain | null;
export declare const setCustomBackend: (coinInfo: CoinInfo, blockchainLink: CoinInfo["blockchainLink"]) => void;
export declare const isBackendSupported: (coinInfo: CoinInfo) => void;
export declare const initBlockchain: (coinInfo: CoinInfo, postMessage: Options["postMessage"], identity?: string) => Promise<import("./Blockchain").Blockchain>;
export declare const reconnectAllBackends: (coinInfo?: CoinInfo) => Promise<import("./Blockchain").Blockchain[]>;
export declare const dispose: () => void;
//# sourceMappingURL=BlockchainLink.d.ts.map