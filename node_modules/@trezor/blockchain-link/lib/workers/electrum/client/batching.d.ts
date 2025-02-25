import { JsonRpcClient } from './json-rpc';
type Options = {
    timeoutMs?: number;
    maxQueueLength?: number;
};
export declare class BatchingJsonRpcClient extends JsonRpcClient {
    private queue;
    private batchTimer?;
    private timeoutMs;
    private maxQueueLength;
    protected batchingDisabled: boolean;
    constructor(options?: Options);
    protected send(message: string): void;
    protected onMessage(body: string): void;
}
export {};
//# sourceMappingURL=batching.d.ts.map