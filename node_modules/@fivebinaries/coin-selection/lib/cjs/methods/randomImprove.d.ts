import { CoinSelectionParams, CoinSelectionResult, Options } from '../types/types';
export declare const randomImprove: (params: Pick<CoinSelectionParams, 'utxos' | 'outputs' | 'changeAddress' | 'ttl'>, options?: Options) => CoinSelectionResult;
