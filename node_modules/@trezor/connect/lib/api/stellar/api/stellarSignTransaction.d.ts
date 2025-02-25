import { AbstractMethod } from '../../../core/AbstractMethod';
import { StellarTransaction } from '../../../types/api/stellar';
type Params = {
    path: number[];
    networkPassphrase: string;
    transaction: StellarTransaction;
};
declare const StellarSignTransactionFeatures: Readonly<{
    manageBuyOffer: string[];
    pathPaymentStrictSend: string[];
}>;
export default class StellarSignTransaction extends AbstractMethod<'stellarSignTransaction', Params> {
    init(): void;
    get info(): string;
    _isFeatureSupported(feature: keyof typeof StellarSignTransactionFeatures): boolean;
    _ensureFeatureIsSupported(feature: keyof typeof StellarSignTransactionFeatures): void;
    _ensureFirmwareSupportsParams(): void;
    run(): Promise<{
        publicKey: string;
        signature: string;
    }>;
}
export {};
//# sourceMappingURL=stellarSignTransaction.d.ts.map