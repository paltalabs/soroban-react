import { AbstractMethod } from '../core/AbstractMethod';
import type { CoinInfo } from '../types';
type Params = {
    coinInfo: CoinInfo;
};
export default class BlockchainSetCustomBackend extends AbstractMethod<'blockchainSetCustomBackend', Params> {
    init(): void;
    get info(): string;
    run(): Promise<boolean>;
}
export {};
//# sourceMappingURL=blockchainSetCustomBackend.d.ts.map