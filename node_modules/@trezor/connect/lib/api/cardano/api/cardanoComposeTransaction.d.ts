import { AbstractMethod } from '../../../core/AbstractMethod';
import type { CardanoComposeTransactionParams, PrecomposedTransactionCardano } from '../../../types/api/cardanoComposeTransaction';
export default class CardanoComposeTransaction extends AbstractMethod<'cardanoComposeTransaction', CardanoComposeTransactionParams> {
    init(): void;
    get info(): string;
    run(): Promise<PrecomposedTransactionCardano[]>;
}
//# sourceMappingURL=cardanoComposeTransaction.d.ts.map