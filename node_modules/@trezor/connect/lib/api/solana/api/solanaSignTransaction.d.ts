import { PROTO } from '../../../constants';
import { AbstractMethod } from '../../../core/AbstractMethod';
export default class SolanaSignTransaction extends AbstractMethod<'solanaSignTransaction', PROTO.SolanaSignTx> {
    init(): void;
    get info(): string;
    run(): Promise<{
        signature: string;
    }>;
}
//# sourceMappingURL=solanaSignTransaction.d.ts.map