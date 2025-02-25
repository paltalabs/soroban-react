import { AbstractMethod } from '../../../core/AbstractMethod';
import type { BinancePreparedTransaction } from '../../../types/api/binance';
type Params = {
    path: number[];
    transaction: BinancePreparedTransaction;
    chunkify?: boolean;
};
export default class BinanceSignTransaction extends AbstractMethod<'binanceSignTransaction', Params> {
    init(): void;
    get info(): string;
    run(): Promise<{
        signature: string;
        public_key: string;
    }>;
}
export {};
//# sourceMappingURL=binanceSignTransaction.d.ts.map