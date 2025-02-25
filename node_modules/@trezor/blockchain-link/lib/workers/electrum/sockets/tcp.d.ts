import { Socket as TCPSocket } from 'net';
import { SocketBase } from './base';
import type { SocketListener } from './interface';
export declare class TcpSocket extends SocketBase {
    protected openSocket(listener: SocketListener): Promise<TCPSocket>;
}
//# sourceMappingURL=tcp.d.ts.map