import { AbstractMethod } from '../core/AbstractMethod';
import type { CoinInfo } from '../types';
type Params = {
    coinInfo: CoinInfo;
    identity?: string;
};
export default class BlockchainGetInfo extends AbstractMethod<'blockchainGetInfo', Params> {
    init(): void;
    run(): Promise<import("@trezor/blockchain-link-types").ServerInfo>;
}
export {};
//# sourceMappingURL=blockchainGetInfo.d.ts.map