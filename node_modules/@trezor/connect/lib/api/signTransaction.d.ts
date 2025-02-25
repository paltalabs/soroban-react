import { AbstractMethod } from '../core/AbstractMethod';
import { PROTO } from '../constants';
import type { BitcoinNetworkInfo, AccountAddresses } from '../types';
import type { RefTransaction, TransactionOptions } from '../types/api/bitcoin';
type Params = {
    inputs: PROTO.TxInputType[];
    outputs: PROTO.TxOutputType[];
    paymentRequests: PROTO.TxAckPaymentRequest[];
    coinjoinRequest?: PROTO.CoinJoinRequest;
    refTxs?: RefTransaction[];
    addresses?: AccountAddresses;
    options: TransactionOptions;
    coinInfo: BitcoinNetworkInfo;
    identity?: string;
    push: boolean;
    unlockPath?: PROTO.UnlockPath;
};
export default class SignTransaction extends AbstractMethod<'signTransaction', Params> {
    init(): void;
    get info(): string;
    private fetchAddresses;
    private fetchRefTxs;
    run(): Promise<import("../types").SignedTransaction>;
}
export {};
//# sourceMappingURL=signTransaction.d.ts.map