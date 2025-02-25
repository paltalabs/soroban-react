import type { Socket as TCPSocket } from 'net';
import type { TLSSocket } from 'tls';
import type { SocksProxyAgent } from 'socks-proxy-agent';
import type { ISocket, SocketListener } from './interface';
type Socket = TCPSocket | TLSSocket;
export type SocketOptions = {
    timeout?: number;
    keepAlive?: boolean;
    proxyAgent?: SocksProxyAgent;
};
export type SocketConfig = SocketOptions & {
    host: string;
    port: number;
};
export declare abstract class SocketBase implements ISocket {
    private socket?;
    protected host: string;
    protected port: number;
    protected timeout: number;
    protected keepAlive: boolean;
    constructor({ host, port, timeout, keepAlive }: SocketConfig);
    connect(listener: SocketListener): Promise<void>;
    close(): void;
    send(data: string | Uint8Array): boolean | undefined;
    protected abstract openSocket(listener: SocketListener): Promise<Socket>;
    protected configureSocket(socket: Socket): void;
    protected bindSocket(socket: Socket, listener: SocketListener): void;
}
export {};
//# sourceMappingURL=base.d.ts.map