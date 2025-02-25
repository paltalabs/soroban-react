import { AbstractMethod } from '../core/AbstractMethod';
import type { CoinInfo } from '../types';
type Params = {
    tx: string;
    coinInfo: CoinInfo;
    identity?: string;
};
export default class PushTransaction extends AbstractMethod<'pushTransaction', Params> {
    init(): void;
    run(): Promise<{
        txid: string;
    }>;
}
export {};
//# sourceMappingURL=pushTransaction.d.ts.map