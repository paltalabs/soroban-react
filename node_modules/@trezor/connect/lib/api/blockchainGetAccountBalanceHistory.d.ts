import { Payload, AbstractMethod } from '../core/AbstractMethod';
import type { CoinInfo } from '../types';
type Params = {
    coinInfo: CoinInfo;
    identity?: string;
    request: Omit<Payload<'blockchainGetAccountBalanceHistory'>, 'method' | 'coin'>;
};
export default class BlockchainGetAccountBalanceHistory extends AbstractMethod<'blockchainGetAccountBalanceHistory', Params> {
    init(): void;
    run(): Promise<import("@trezor/blockchain-link-types/lib/common").AccountBalanceHistory[]>;
}
export {};
//# sourceMappingURL=blockchainGetAccountBalanceHistory.d.ts.map