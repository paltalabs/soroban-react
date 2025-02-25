import { CoinSelectionParams, Options, PrecomposedTransaction } from './types/types';
export declare const coinSelection: (params: CoinSelectionParams, options?: Options) => PrecomposedTransaction;
export * as trezorUtils from './utils/trezor';
export * as types from './types/types';
export { CoinSelectionError } from './utils/errors';
