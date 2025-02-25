import { TLSSocket } from 'tls';
import { SocketBase } from './base';
import type { SocketListener } from './interface';
export declare class TlsSocket extends SocketBase {
    protected openSocket(listener: SocketListener): Promise<TLSSocket>;
}
//# sourceMappingURL=tls.d.ts.map