import { BigNumber } from '@trezor/utils/lib/bigNumber';
import type { ComposeOutput, TransactionInputOutputSortingStrategy } from '@trezor/utxo-lib';
import { AbstractMethod } from '../core/AbstractMethod';
import { Discovery } from './common/Discovery';
import { TransactionComposer } from './bitcoin';
import type { BitcoinNetworkInfo, DiscoveryAccount, AccountUtxo } from '../types';
import type { SignedTransaction, PrecomposeParams, ComposeResult, PrecomposedResult } from '../types/api/composeTransaction';
type Params = {
    outputs: ComposeOutput[];
    coinInfo: BitcoinNetworkInfo;
    identity?: string;
    push: boolean;
    account?: PrecomposeParams['account'];
    feeLevels?: PrecomposeParams['feeLevels'];
    baseFee?: PrecomposeParams['baseFee'];
    floorBaseFee?: PrecomposeParams['floorBaseFee'];
    sequence?: PrecomposeParams['sequence'];
    total: BigNumber;
    sortingStrategy: PrecomposeParams['sortingStrategy'];
} & ({
    skipPermutation?: PrecomposeParams['skipPermutation'];
    sortingStrategy?: undefined;
} | {
    skipPermutation?: undefined;
    sortingStrategy?: TransactionInputOutputSortingStrategy;
});
export default class ComposeTransaction extends AbstractMethod<'composeTransaction', Params> {
    discovery?: Discovery;
    init(): void;
    get info(): string;
    private getBlockchain;
    precompose(account: PrecomposeParams['account'], feeLevels: PrecomposeParams['feeLevels']): Promise<PrecomposedResult[]>;
    run(): Promise<SignedTransaction | PrecomposedResult[]>;
    selectAccount(): Promise<{
        account: DiscoveryAccount;
        utxo: AccountUtxo[];
    }>;
    selectFee(account: DiscoveryAccount, utxos: AccountUtxo[]): Promise<SignedTransaction | "change-account">;
    _selectFeeUiResponse(composer: TransactionComposer): Promise<SignedTransaction | 'change-account'>;
    _sign(tx: ComposeResult): Promise<import("../types").SignedTransaction>;
    dispose(): void;
}
export {};
//# sourceMappingURL=composeTransaction.d.ts.map