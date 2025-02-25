import { Payload, AbstractMethod } from '../core/AbstractMethod';
import type { CoinInfo } from '../types';
type Params = {
    currency: Payload<'blockchainSubscribeFiatRates'>['currency'];
    coinInfo: CoinInfo;
    identity?: string;
};
export default class BlockchainSubscribeFiatRates extends AbstractMethod<'blockchainSubscribeFiatRates', Params> {
    init(): void;
    run(): Promise<{
        subscribed: boolean;
    }>;
}
export {};
//# sourceMappingURL=blockchainSubscribeFiatRates.d.ts.map