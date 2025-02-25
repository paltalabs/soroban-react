/// <reference types="node" />
/// <reference types="node" />
import EventEmitter from "events";
import type { DeviceModel } from "@ledgerhq/devices";
import { TransportError, StatusCodes, getAltStatusMessage, TransportStatusError } from "@ledgerhq/errors";
import { LocalTracer, TraceContext, LogType } from "@ledgerhq/logs";
export { TransportError, TransportStatusError, StatusCodes, getAltStatusMessage };
/**
 */
export type Subscription = {
    unsubscribe: () => void;
};
/**
 */
export type Device = any;
export type DescriptorEventType = "add" | "remove";
/**
 * A "descriptor" is a parameter that is specific to the implementation, and can be an ID, file path, or URL.
 * type: add or remove event
 * descriptor: a parameter that can be passed to open(descriptor)
 * deviceModel: device info on the model (is it a nano s, nano x, ...)
 * device: transport specific device info
 */
export interface DescriptorEvent<Descriptor> {
    type: DescriptorEventType;
    descriptor: Descriptor;
    deviceModel?: DeviceModel | null | undefined;
    device?: Device;
}
/**
 * Observer generic type, following the Observer pattern
 */
export type Observer<EventType, EventError = unknown> = Readonly<{
    next: (event: EventType) => unknown;
    error: (e: EventError) => unknown;
    complete: () => unknown;
}>;
/**
 * The Transport class defines a generic interface for communicating with a Ledger hardware wallet.
 * There are different kind of transports based on the technology (channels like U2F, HID, Bluetooth, Webusb) and environment (Node, Web,...).
 * It is an abstract class that needs to be implemented.
 */
export default class Transport {
    exchangeTimeout: number;
    unresponsiveTimeout: number;
    deviceModel: DeviceModel | null | undefined;
    tracer: LocalTracer;
    constructor({ context, logType }?: {
        context?: TraceContext;
        logType?: LogType;
    });
    /**
     * Check if the transport is supported on the current platform/browser.
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating support.
     */
    static readonly isSupported: () => Promise<boolean>;
    /**
     * List all available descriptors for the transport.
     * For a better granularity, checkout `listen()`.
     *
     * @returns {Promise<Array<any>>} A promise that resolves with an array of descriptors.
     * @example
     * TransportFoo.list().then(descriptors => ...)
     */
    static readonly list: () => Promise<Array<any>>;
    /**
     * Listen for device events for the transport. The method takes an observer of DescriptorEvent and returns a Subscription.
     * A DescriptorEvent is an object containing a "descriptor" and a "type" field. The "type" field can be "add" or "remove", and the "descriptor" field can be passed to the "open" method.
     * The "listen" method will first emit all currently connected devices and then will emit events as they occur, such as when a USB device is plugged in or a Bluetooth device becomes discoverable.
     * @param {Observer<DescriptorEvent<any>>} observer - An object with "next", "error", and "complete" functions, following the observer pattern.
     * @returns {Subscription} A Subscription object on which you can call ".unsubscribe()" to stop listening to descriptors.
     * @example
    const sub = TransportFoo.listen({
    next: e => {
      if (e.type==="add") {
        sub.unsubscribe();
        const transport = await TransportFoo.open(e.descriptor);
        ...
      }
    },
    error: error => {},
    complete: () => {}
    })
     */
    static readonly listen: (observer: Observer<DescriptorEvent<any>>) => Subscription;
    /**
     * Attempt to create a Transport instance with a specific descriptor.
     * @param {any} descriptor - The descriptor to open the transport with.
     * @param {number} timeout - An optional timeout for the transport connection.
     * @param {TraceContext} context Optional tracing/log context
     * @returns {Promise<Transport>} A promise that resolves with a Transport instance.
     * @example
    TransportFoo.open(descriptor).then(transport => ...)
     */
    static readonly open: (descriptor?: any, timeoutMs?: number, context?: TraceContext) => Promise<Transport>;
    /**
     * Send data to the device using a low level API.
     * It's recommended to use the "send" method for a higher level API.
     * @param {Buffer} apdu - The data to send.
     * @param {Object} options - Contains optional options for the exchange function
     *  - abortTimeoutMs: stop the exchange after a given timeout. Another timeout exists
     *    to detect unresponsive device (see `unresponsiveTimeout`). This timeout aborts the exchange.
     * @returns {Promise<Buffer>} A promise that resolves with the response data from the device.
     */
    exchange(_apdu: Buffer, { abortTimeoutMs: _abortTimeoutMs }?: {
        abortTimeoutMs?: number;
    }): Promise<Buffer>;
    /**
     * Send apdus in batch to the device using a low level API.
     * The default implementation is to call exchange for each apdu.
     * @param {Array<Buffer>} apdus - array of apdus to send.
     * @param {Observer<Buffer>} observer - an observer that will receive the response of each apdu.
     * @returns {Subscription} A Subscription object on which you can call ".unsubscribe()" to stop sending apdus.
     */
    exchangeBulk(apdus: Buffer[], observer: Observer<Buffer>): Subscription;
    /**
     * Set the "scramble key" for the next data exchanges with the device.
     * Each app can have a different scramble key and it is set internally during instantiation.
     * @param {string} key - The scramble key to set.
     * deprecated This method is no longer needed for modern transports and should be migrated away from.
     * no @ before deprecated as it breaks documentationjs on version 14.0.2
     * https://github.com/documentationjs/documentation/issues/1596
     */
    setScrambleKey(_key: string): void;
    /**
     * Close the connection with the device.
     *
     * Note: for certain transports (hw-transport-node-hid-singleton for ex), once the promise resolved,
     * the transport instance is actually still cached, and the device is disconnected only after a defined timeout.
     * But for the consumer of the Transport, this does not matter and it can consider the transport to be closed.
     *
     * @returns {Promise<void>} A promise that resolves when the transport is closed.
     */
    close(): Promise<void>;
    _events: EventEmitter<[never]>;
    /**
     * Listen for an event on the transport instance.
     * Transport implementations may have specific events. Common events include:
     * "disconnect" : triggered when the transport is disconnected.
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: Array<any>) => any} cb - The callback function to be invoked when the event occurs.
     */
    on(eventName: string, cb: (...args: Array<any>) => any): void;
    /**
     * Stop listening to an event on an instance of transport.
     */
    off(eventName: string, cb: (...args: Array<any>) => any): void;
    emit(event: string, ...args: any): void;
    /**
     * Enable or not logs of the binary exchange
     */
    setDebugMode(): void;
    /**
     * Set a timeout (in milliseconds) for the exchange call. Only some transport might implement it. (e.g. U2F)
     */
    setExchangeTimeout(exchangeTimeout: number): void;
    /**
     * Define the delay before emitting "unresponsive" on an exchange that does not respond
     */
    setExchangeUnresponsiveTimeout(unresponsiveTimeout: number): void;
    /**
     * Send data to the device using the higher level API.
     *
     * @param {number} cla - The instruction class for the command.
     * @param {number} ins - The instruction code for the command.
     * @param {number} p1 - The first parameter for the instruction.
     * @param {number} p2 - The second parameter for the instruction.
     * @param {Buffer} data - The data to be sent. Defaults to an empty buffer.
     * @param {Array<number>} statusList - A list of acceptable status codes for the response. Defaults to [StatusCodes.OK].
     * @param {Object} options - Contains optional options for the exchange function
     *  - abortTimeoutMs: stop the send after a given timeout. Another timeout exists
     *    to detect unresponsive device (see `unresponsiveTimeout`). This timeout aborts the exchange.
     * @returns {Promise<Buffer>} A promise that resolves with the response data from the device.
     */
    send: (cla: number, ins: number, p1: number, p2: number, data?: Buffer, statusList?: Array<number>, { abortTimeoutMs }?: {
        abortTimeoutMs?: number | undefined;
    }) => Promise<Buffer>;
    /**
     * create() allows to open the first descriptor available or
     * throw if there is none or if timeout is reached.
     * This is a light helper, alternative to using listen() and open() (that you may need for any more advanced usecase)
     * @example
    TransportFoo.create().then(transport => ...)
     */
    static create(openTimeout?: number, listenTimeout?: number): Promise<Transport>;
    exchangeBusyPromise: Promise<void> | null | undefined;
    /**
     * Wrapper to make an exchange "atomic" (blocking any other exchange)
     *
     * It also handles "unresponsiveness" by emitting "unresponsive" and "responsive" events.
     *
     * @param f The exchange job, using the transport to run
     * @returns a Promise resolving with the output of the given job
     */
    exchangeAtomicImpl<Output>(f: () => Promise<Output>): Promise<Output>;
    decorateAppAPIMethods(self: Record<string, any>, methods: Array<string>, scrambleKey: string): void;
    _appAPIlock: string | null;
    decorateAppAPIMethod<R, A extends any[]>(methodName: string, f: (...args: A) => Promise<R>, ctx: any, scrambleKey: string): (...args: A) => Promise<R>;
    /**
     * Sets the context used by the logging/tracing mechanism
     *
     * Useful when re-using (cached) the same Transport instance,
     * but with a new tracing context.
     *
     * @param context A TraceContext, that can undefined to reset the context
     */
    setTraceContext(context?: TraceContext): void;
    /**
     * Updates the context used by the logging/tracing mechanism
     *
     * The update only overrides the key-value that are already defined in the current context.
     *
     * @param contextToAdd A TraceContext that will be added to the current context
     */
    updateTraceContext(contextToAdd: TraceContext): void;
    /**
     * Gets the tracing context of the transport instance
     */
    getTraceContext(): TraceContext | undefined;
    static ErrorMessage_ListenTimeout: string;
    static ErrorMessage_NoDeviceFound: string;
}
//# sourceMappingURL=Transport.d.ts.map