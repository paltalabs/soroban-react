import type * as MessageTypes from '@trezor/blockchain-link-types/lib/messages';
import { BlockfrostAPI } from './websocket';
import { BaseWorker } from '../baseWorker';
declare class BlockfrostWorker extends BaseWorker<BlockfrostAPI> {
    cleanup(): void;
    protected isConnected(api: BlockfrostAPI | undefined): api is BlockfrostAPI;
    tryConnect(url: string): Promise<BlockfrostAPI>;
    disconnect(): void;
    messageHandler(event: {
        data: MessageTypes.Message;
    }): Promise<true | undefined>;
}
export default function Blockfrost(): BlockfrostWorker;
export {};
//# sourceMappingURL=index.d.ts.map