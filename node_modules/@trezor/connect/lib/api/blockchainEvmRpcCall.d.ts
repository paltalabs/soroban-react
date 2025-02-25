import { AbstractMethod, Payload } from '../core/AbstractMethod';
import { CoinInfo } from '../types';
type Params = {
    coinInfo: CoinInfo;
    identity?: string;
    request: Omit<Payload<'blockchainEvmRpcCall'>, 'method' | 'coin'>;
};
export default class BlockchainEvmRpcCall extends AbstractMethod<'blockchainEvmRpcCall', Params> {
    init(): void;
    get info(): string;
    run(): Promise<{
        data: string;
    }>;
}
export {};
//# sourceMappingURL=blockchainEvmRpcCall.d.ts.map