import EventEmitter from 'events';
export declare class ProxyEventEmitter implements EventEmitter {
    private eventEmitters;
    constructor(eventEmitters: EventEmitter[]);
    emit(eventName: string | symbol, ...args: any[]): boolean;
    on(eventName: string | symbol, listener: (...args: any[]) => void): this;
    off(eventName: string | symbol, listener: (...args: any[]) => void): this;
    once(eventName: string | symbol, listener: (...args: any[]) => void): this;
    addListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
    prependListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
    prependOnceListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
    removeAllListeners(event?: string | symbol | undefined): this;
    removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
    setMaxListeners(n: number): this;
    eventNames(): (string | symbol)[];
    getMaxListeners(): number;
    listenerCount(eventName: string | symbol, listener?: FunctionConstructor | undefined): number;
    rawListeners(eventName: string | symbol): Function[];
    listeners(eventName: string | symbol): Function[];
}
//# sourceMappingURL=proxy-event-emitter.d.ts.map