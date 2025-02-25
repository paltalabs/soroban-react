import { Network } from '@trezor/utxo-lib';
import { ElectrumAPI, BlockHeader, Version } from '@trezor/blockchain-link-types/lib/electrum';
import { JsonRpcClientOptions } from './json-rpc';
import { BatchingJsonRpcClient } from './batching';
import type { ISocket } from '../sockets/interface';
type ElectrumClientOptions = JsonRpcClientOptions & {
    client: {
        name: string;
        protocolVersion: string | [string, string];
    };
    url: string;
    coin: string;
};
export declare class ElectrumClient extends BatchingJsonRpcClient implements ElectrumAPI {
    private options?;
    private network?;
    private version?;
    protected lastBlock?: BlockHeader;
    private timeLastCall;
    connect(socket: ISocket, options: ElectrumClientOptions): Promise<void>;
    getInfo(): {
        url: string;
        version: Version;
        block: BlockHeader;
        coin: string;
        network: Network;
    } | undefined;
    private onBlock;
    request(method: string, ...params: any[]): Promise<any>;
    private keepAliveHandle?;
    private keepAlive;
    onClose(): void;
}
export {};
//# sourceMappingURL=electrum.d.ts.map