import { ElectrumClient } from './electrum';
export declare class CachingElectrumClient extends ElectrumClient {
    private readonly cache;
    private readonly statuses;
    private cached;
    private total;
    private logTimer;
    constructor();
    private cacheRequest;
    private trySubscribe;
    request(method: string, ...params: any[]): Promise<any>;
    protected response(response: any): void;
    onClose(): void;
}
//# sourceMappingURL=caching.d.ts.map