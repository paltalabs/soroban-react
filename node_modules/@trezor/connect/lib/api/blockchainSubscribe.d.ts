import { Payload, AbstractMethod } from '../core/AbstractMethod';
import type { CoinInfo } from '../types';
type Params = {
    accounts: Payload<'blockchainSubscribe'>['accounts'];
    blocks: boolean;
    coinInfo: CoinInfo;
    identity?: string;
};
export default class BlockchainSubscribe extends AbstractMethod<'blockchainSubscribe', Params> {
    init(): void;
    run(): Promise<{
        subscribed: boolean;
    }>;
}
export {};
//# sourceMappingURL=blockchainSubscribe.d.ts.map