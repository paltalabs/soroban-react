export type TraceContext = Record<string, unknown>;
export type LogData = any;
export type LogType = string;
/**
 * A Log object
 */
export interface Log {
    /**
     * A namespaced identifier of the log (not a level like "debug", "error" but more like "apdu", "hw", etc...)
     */
    type: LogType;
    message?: string;
    /**
     * Data associated to the log event
     */
    data?: LogData;
    /**
     * Context data, coming for example from the caller's parent, to enable a simple tracing system
     */
    context?: TraceContext;
    /**
     * Unique id among all logs
     */
    id: string;
    date: Date;
}
export type Unsubscribe = () => void;
export type Subscriber = (arg0: Log) => void;
/**
 * Logs something
 *
 * @param type a namespaced identifier of the log (it is not a level like "debug", "error" but more like "apdu-in", "apdu-out", etc...)
 * @param message a clear message of the log associated to the type
 */
export declare const log: (type: LogType, message?: string, data?: LogData) => void;
/**
 * A simple tracer function, only expanding the existing log function
 *
 * Its goal is to capture more context than a log function.
 * This is simple for now, but can be improved later.
 *
 * @param context Anything representing the context where the log occurred
 */
export declare const trace: ({ type, message, data, context, }: {
    type: LogType;
    message?: string | undefined;
    data?: LogData;
    context?: TraceContext | undefined;
}) => void;
/**
 * A simple tracer class, that can be used to avoid repetition when using the `trace` function
 *
 * Its goal is to capture more context than a log function.
 * This is simple for now, but can be improved later.
 *
 * @param type A given type (not level) for the current local tracer ("hw", "withDevice", etc.)
 * @param context Anything representing the context where the log occurred
 */
export declare class LocalTracer {
    private type;
    private context?;
    constructor(type: LogType, context?: TraceContext | undefined);
    trace(message: string, data?: TraceContext): void;
    getContext(): TraceContext | undefined;
    setContext(context?: TraceContext): void;
    updateContext(contextToAdd: TraceContext): void;
    getType(): LogType;
    setType(type: LogType): void;
    /**
     * Create a new instance of the LocalTracer with an updated `type`
     *
     * It does not mutate the calling instance, but returns a new LocalTracer,
     * following a simple builder pattern.
     */
    withType(type: LogType): LocalTracer;
    /**
     * Create a new instance of the LocalTracer with a new `context`
     *
     * It does not mutate the calling instance, but returns a new LocalTracer,
     * following a simple builder pattern.
     *
     * @param context A TraceContext, that can undefined to reset the context
     */
    withContext(context?: TraceContext): LocalTracer;
    /**
     * Create a new instance of the LocalTracer with an updated `context`,
     * on which an additional context is merged with the existing one.
     *
     * It does not mutate the calling instance, but returns a new LocalTracer,
     * following a simple builder pattern.
     */
    withUpdatedContext(contextToAdd: TraceContext): LocalTracer;
}
/**
 * Adds a subscribers to the emitted logs.
 *
 * @param cb that is called for each future log() with the Log object
 * @return a function that can be called to unsubscribe the listener
 */
export declare const listen: (cb: Subscriber) => Unsubscribe;
declare global {
    interface Window {
        __ledgerLogsListen: any;
    }
}
//# sourceMappingURL=index.d.ts.map