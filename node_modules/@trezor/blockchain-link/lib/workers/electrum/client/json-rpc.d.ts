import type { ISocket } from '../sockets/interface';
type Callback = (error: any, result?: any) => void;
type CallbackMessageQueue = Record<number, Callback>;
export type JsonRpcClientOptions = {
    debug?: boolean;
};
export declare class JsonRpcClient {
    private id;
    private buffer;
    private emitter;
    protected callbacks: CallbackMessageQueue;
    protected socket?: ISocket;
    protected debug: boolean;
    connect(socket: ISocket, options?: JsonRpcClientOptions): Promise<void>;
    isConnected(): boolean;
    close(): void;
    request(method: string, ...params: any[]): Promise<any>;
    on(event: string, listener: (...args: any[]) => void): void;
    off(event: string, listener: (...args: any[]) => void): void;
    protected send(message: string): void;
    protected response(response: any): void;
    protected onMessage(body: string): void;
    onConnect(): void;
    onReceive(chunk: string): void;
    onEnd(e: unknown): void;
    onError(error: unknown): void;
    onClose(): void;
    protected log(...data: any[]): void;
}
export {};
//# sourceMappingURL=json-rpc.d.ts.map