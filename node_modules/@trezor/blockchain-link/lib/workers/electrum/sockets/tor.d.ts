import type { SocksProxyAgent } from 'socks-proxy-agent';
import { SocketBase, SocketConfig } from './base';
import type { SocketListener } from './interface';
type TorSocketConfig = SocketConfig & {
    proxyAgent: SocksProxyAgent;
};
export declare class TorSocket extends SocketBase {
    private proxyAgent;
    constructor({ proxyAgent, ...rest }: TorSocketConfig);
    protected openSocket(listener: SocketListener): Promise<import("net").Socket>;
}
export {};
//# sourceMappingURL=tor.d.ts.map