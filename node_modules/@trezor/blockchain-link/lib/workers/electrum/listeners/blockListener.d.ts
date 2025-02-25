import type { ElectrumAPI } from '@trezor/blockchain-link-types/lib/electrum';
import type { BaseWorker } from '../../baseWorker';
export declare const blockListener: (worker: BaseWorker<ElectrumAPI>) => {
    subscribe: () => {
        subscribed: boolean;
    };
    unsubscribe: () => {
        subscribed: boolean;
    };
};
//# sourceMappingURL=blockListener.d.ts.map