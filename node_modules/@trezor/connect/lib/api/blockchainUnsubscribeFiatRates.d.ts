import { AbstractMethod } from '../core/AbstractMethod';
import type { CoinInfo } from '../types';
type Params = {
    coinInfo: CoinInfo;
    identity?: string;
};
export default class BlockchainUnsubscribeFiatRates extends AbstractMethod<'blockchainUnsubscribeFiatRates', Params> {
    init(): void;
    run(): Promise<{
        subscribed: boolean;
    }>;
}
export {};
//# sourceMappingURL=blockchainUnsubscribeFiatRates.d.ts.map