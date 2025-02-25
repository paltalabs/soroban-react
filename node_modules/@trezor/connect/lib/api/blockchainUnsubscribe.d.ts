import { Payload, AbstractMethod } from '../core/AbstractMethod';
import type { CoinInfo } from '../types';
type Params = {
    accounts: Payload<'blockchainUnsubscribe'>['accounts'];
    coinInfo: CoinInfo;
    identity?: string;
    blocks: boolean;
};
export default class BlockchainUnsubscribe extends AbstractMethod<'blockchainUnsubscribe', Params> {
    init(): void;
    run(): Promise<{
        subscribed: boolean;
    }>;
}
export {};
//# sourceMappingURL=blockchainUnsubscribe.d.ts.map