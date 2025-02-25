import { Payload, AbstractMethod } from '../core/AbstractMethod';
import type { CoinInfo } from '../types';
type Params = {
    coinInfo: CoinInfo;
    identity?: string;
    currencies: Payload<'blockchainGetCurrentFiatRates'>['currencies'];
    token: Payload<'blockchainGetCurrentFiatRates'>['token'];
};
export default class BlockchainGetCurrentFiatRates extends AbstractMethod<'blockchainGetCurrentFiatRates', Params> {
    init(): void;
    run(): Promise<{
        ts: number;
        rates: import("@trezor/blockchain-link-types/lib/common").FiatRatesBySymbol;
    }>;
}
export {};
//# sourceMappingURL=blockchainGetCurrentFiatRates.d.ts.map