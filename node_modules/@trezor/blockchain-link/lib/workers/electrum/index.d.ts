import { Message } from '@trezor/blockchain-link-types/lib/messages';
import { BaseWorker } from '../baseWorker';
import type { ElectrumClient } from './client/electrum';
declare class ElectrumWorker extends BaseWorker<ElectrumClient> {
    private blockListener;
    private txListener;
    constructor();
    protected isConnected(api: ElectrumClient | undefined): api is ElectrumClient;
    tryConnect(url: string): Promise<ElectrumClient>;
    disconnect(): void;
    cleanup(): void;
    messageHandler(event: {
        data: Message;
    }): Promise<true | undefined>;
}
export default function Electrum(): ElectrumWorker;
export {};
//# sourceMappingURL=index.d.ts.map