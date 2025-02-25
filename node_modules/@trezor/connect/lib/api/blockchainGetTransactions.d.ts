import { AbstractMethod } from '../core/AbstractMethod';
import type { CoinInfo } from '../types';
type Params = {
    txs: string[];
    coinInfo: CoinInfo;
    identity?: string;
};
export default class BlockchainGetTransactions extends AbstractMethod<'blockchainGetTransactions', Params> {
    init(): void;
    run(): Promise<import("@trezor/blockchain-link-types/lib/common").Transaction[]>;
}
export {};
//# sourceMappingURL=blockchainGetTransactions.d.ts.map