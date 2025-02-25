import type { ElectrumAPI } from '@trezor/blockchain-link-types/lib/electrum';
import type { Subscribe, Unsubscribe } from '@trezor/blockchain-link-types/lib/messages';
import type { BaseWorker } from '../../baseWorker';
type Payload<T extends {
    type: string;
    payload: any;
}> = Extract<T['payload'], {
    type: 'addresses' | 'accounts';
}>;
export declare const txListener: (worker: BaseWorker<ElectrumAPI>) => {
    subscribe: (data: Payload<Subscribe>) => Promise<{
        subscribed: boolean;
    }>;
    unsubscribe: (data: Payload<Unsubscribe>) => Promise<{
        subscribed: boolean;
    }>;
};
export {};
//# sourceMappingURL=txListener.d.ts.map