import { TypedEmitter } from '@trezor/utils';
import type { AnyError, AsyncResultWithTypedError, Success, Logger, DescriptorApiLevel, PathInternal } from '../types';
import * as ERRORS from '../errors';
export interface AbstractApiConstructorParams {
    logger?: Logger;
}
export declare enum DEVICE_TYPE {
    TypeT1Hid = 0,
    TypeT1Webusb = 1,
    TypeT1WebusbBoot = 2,
    TypeT2 = 3,
    TypeT2Boot = 4,
    TypeEmulator = 5
}
type AccessLock = {
    read: boolean;
    write: boolean;
};
export declare abstract class AbstractApi extends TypedEmitter<{
    'transport-interface-change': DescriptorApiLevel[];
    'transport-interface-error': typeof ERRORS.DEVICE_NOT_FOUND | typeof ERRORS.DEVICE_UNREADABLE;
}> {
    protected logger?: Logger;
    protected listening: boolean;
    protected lock: Record<string, AccessLock>;
    constructor({ logger }: AbstractApiConstructorParams);
    abstract enumerate(signal?: AbortSignal): AsyncResultWithTypedError<DescriptorApiLevel[], typeof ERRORS.ABORTED_BY_TIMEOUT | typeof ERRORS.ABORTED_BY_SIGNAL | typeof ERRORS.UNEXPECTED_ERROR>;
    abstract listen(): void;
    abstract read(path: PathInternal, signal?: AbortSignal): AsyncResultWithTypedError<Buffer, typeof ERRORS.DEVICE_NOT_FOUND | typeof ERRORS.INTERFACE_UNABLE_TO_OPEN_DEVICE | typeof ERRORS.INTERFACE_DATA_TRANSFER | typeof ERRORS.DEVICE_DISCONNECTED_DURING_ACTION | typeof ERRORS.UNEXPECTED_ERROR | typeof ERRORS.ABORTED_BY_TIMEOUT | typeof ERRORS.ABORTED_BY_SIGNAL>;
    abstract write(path: PathInternal, buffers: Buffer, signal?: AbortSignal): AsyncResultWithTypedError<undefined, typeof ERRORS.DEVICE_NOT_FOUND | typeof ERRORS.INTERFACE_UNABLE_TO_OPEN_DEVICE | typeof ERRORS.INTERFACE_DATA_TRANSFER | typeof ERRORS.DEVICE_DISCONNECTED_DURING_ACTION | typeof ERRORS.ABORTED_BY_SIGNAL | typeof ERRORS.UNEXPECTED_ERROR>;
    abstract openDevice(path: PathInternal, first: boolean, signal?: AbortSignal): AsyncResultWithTypedError<undefined, typeof ERRORS.DEVICE_NOT_FOUND | typeof ERRORS.INTERFACE_UNABLE_TO_OPEN_DEVICE | typeof ERRORS.UNEXPECTED_ERROR | typeof ERRORS.ABORTED_BY_TIMEOUT | typeof ERRORS.ABORTED_BY_SIGNAL | typeof ERRORS.LIBUSB_ERROR_ACCESS>;
    abstract closeDevice(path: PathInternal): AsyncResultWithTypedError<undefined, typeof ERRORS.DEVICE_NOT_FOUND | typeof ERRORS.INTERFACE_UNABLE_TO_CLOSE_DEVICE | typeof ERRORS.UNEXPECTED_ERROR>;
    abstract dispose(): void;
    abstract chunkSize: number;
    protected success<T>(payload: T): Success<T>;
    protected error<E extends AnyError>(payload: {
        error: E;
        message?: string;
    }): {
        success: false;
        error: E;
        message: string | undefined;
    };
    protected unknownError<E extends AnyError = never>(err: Error, expectedErrors?: E[]): {
        success: false;
        error: E;
        message: string | undefined;
    } | {
        success: false;
        error: "unexpected error";
        message: string;
    };
    private synchronize;
    private requestAccess;
    runInIsolation: <T extends () => ReturnType<T>>({ lock, path }: {
        lock: AccessLock;
        path: string;
    }, fn: T) => Promise<{
        success: false;
        error: "other call in progress";
        message: string | undefined;
    } | (ReturnType<T> extends infer T_1 ? T_1 extends ReturnType<T> ? T_1 extends Promise<unknown> ? T_1 : Promise<T_1> : never : never) | {
        success: false;
        error: "unexpected error";
        message: string;
    }>;
}
export type AbstractApiAwaitedResult<K extends keyof AbstractApi> = AbstractApi[K] extends (...args: any[]) => any ? Awaited<ReturnType<AbstractApi[K]>> : never;
export {};
//# sourceMappingURL=abstract.d.ts.map