import { AbstractMethod } from '../core/AbstractMethod';
import { CoinInfo } from '../types';
type Params = {
    coinInfo: CoinInfo;
    identity?: string;
};
export default class BlockchainDisconnect extends AbstractMethod<'blockchainDisconnect', Params> {
    init(): void;
    get info(): string;
    run(): Promise<{
        disconnected: boolean;
    }>;
}
export {};
//# sourceMappingURL=blockchainDisconnect.d.ts.map