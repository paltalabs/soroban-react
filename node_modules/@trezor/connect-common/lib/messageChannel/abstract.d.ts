import { Deferred, TypedEmitter } from '@trezor/utils';
type Log = {
    log: (...args: any[]) => void;
    error: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    debug: (...args: any[]) => void;
};
export interface AbstractMessageChannelConstructorParams {
    sendFn: (message: any) => void;
    channel: {
        here: string;
        peer: string;
    };
    logger?: Log;
    lazyHandshake?: boolean;
    legacyMode?: boolean;
}
export type Message<IncomingMessages extends {
    type: string;
}> = IncomingMessages & {
    channel: AbstractMessageChannelConstructorParams['channel'];
    id: number;
    success: boolean;
    payload: Extract<IncomingMessages, {
        type: IncomingMessages['type'];
    }> | undefined;
};
export declare abstract class AbstractMessageChannel<IncomingMessages extends {
    type: string;
}> extends TypedEmitter<{
    message: Message<IncomingMessages>;
}> {
    protected messagePromises: Record<number, Deferred<any>>;
    protected messagesQueue: any[];
    protected messageID: number;
    isConnected: boolean;
    abstract connect(): void;
    abstract disconnect(): void;
    private readonly handshakeMaxRetries;
    private readonly handshakeRetryInterval;
    private handshakeFinished;
    protected lazyHandshake?: boolean;
    protected legacyMode?: boolean;
    protected logger?: Log;
    sendFn: AbstractMessageChannelConstructorParams['sendFn'];
    channel: AbstractMessageChannelConstructorParams['channel'];
    constructor({ sendFn, channel, logger, lazyHandshake, legacyMode, }: AbstractMessageChannelConstructorParams);
    init(): Promise<void>;
    protected handshakeWithPeer(): Promise<void>;
    protected onMessage(_message: Message<IncomingMessages>): void;
    postMessage(message: any, { usePromise, useQueue }?: {
        usePromise?: boolean | undefined;
        useQueue?: boolean | undefined;
    }): Promise<any> | undefined;
    resolveMessagePromises(resolvePayload: Record<string, any>): void;
    clear(): void;
}
export {};
//# sourceMappingURL=abstract.d.ts.map