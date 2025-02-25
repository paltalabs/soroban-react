import { AbstractTransport, AbstractTransportParams, AbstractTransportMethodParams } from './abstract';
import * as ERRORS from '../errors';
import { Descriptor, Session } from '../types';
type BridgeCommonErrors = typeof ERRORS.HTTP_ERROR | typeof ERRORS.WRONG_RESULT_TYPE | typeof ERRORS.UNEXPECTED_ERROR;
type BridgeConstructorParameters = AbstractTransportParams & {
    url?: string;
    latestVersion?: string;
};
export declare class BridgeTransport extends AbstractTransport {
    private latestVersion?;
    private useProtocolMessages;
    private url;
    name: "BridgeTransport";
    apiType: "usb";
    constructor(params: BridgeConstructorParameters);
    init({ signal }?: AbstractTransportMethodParams<'init'>): Promise<import("../types").Success<undefined> | {
        success: false;
        error: NonNullable<"Aborted by signal" | "Aborted by timeout">;
        message: string | undefined;
    } | {
        success: false;
        error: "unexpected error";
        message: string;
    } | import("../types").ErrorGeneric<BridgeCommonErrors>>;
    listen(): import("../types").Success<undefined> | {
        success: false;
        error: "already listening";
        message: string | undefined;
    };
    private listenLoop;
    enumerate({ signal }?: AbstractTransportMethodParams<'enumerate'>): Promise<{
        success: false;
        error: NonNullable<"Aborted by signal" | "Aborted by timeout">;
        message: string | undefined;
    } | {
        success: false;
        error: "unexpected error";
        message: string;
    } | import("../types").Success<Descriptor[]> | import("../types").ErrorGeneric<BridgeCommonErrors>>;
    acquire({ input, signal }: AbstractTransportMethodParams<'acquire'>): Promise<import("../types").Success<Session> | {
        success: false;
        error: NonNullable<"wrong previous session" | "device disconnected during action" | "Aborted by signal" | "Aborted by timeout">;
        message: string | undefined;
    } | {
        success: false;
        error: "unexpected error";
        message: string;
    } | import("../types").ErrorGeneric<"Unable to open device" | "device not found" | "wrong previous session" | BridgeCommonErrors>>;
    release({ path: _, session, onClose, signal, }: AbstractTransportMethodParams<'release'>): Promise<{
        success: false;
        error: NonNullable<"Aborted by signal" | "Aborted by timeout">;
        message: string | undefined;
    } | {
        success: false;
        error: "unexpected error";
        message: string;
    } | import("../types").Success<null> | import("../types").ErrorGeneric<"session not found" | BridgeCommonErrors>>;
    releaseDevice(): Promise<import("../types").Success<undefined>>;
    private getProtocol;
    private getRequestBody;
    call({ session, name, data, protocol: customProtocol, signal, }: AbstractTransportMethodParams<'call'>): Promise<import("../types").ErrorGeneric<"Unable to open device" | "A transfer error has occurred." | "device not found" | "device disconnected during action" | "unexpected error" | "Aborted by signal" | "Aborted by timeout"> | {
        success: false;
        error: NonNullable<"Aborted by signal" | "Aborted by timeout">;
        message: string | undefined;
    } | {
        success: false;
        error: "unexpected error";
        message: string;
    } | import("../types").ErrorGeneric<"device disconnected during action" | "other call in progress" | "Malformed protocol format" | BridgeCommonErrors> | import("../types").Success<{
        message: {
            [key: string]: any;
        };
        type: keyof import("@trezor/protobuf/lib/messages").MessageType;
    }>>;
    send({ session, name, data, protocol: customProtocol, signal, }: AbstractTransportMethodParams<'send'>): Promise<import("../types").Success<undefined> | {
        success: false;
        error: NonNullable<"Aborted by signal" | "Aborted by timeout">;
        message: string | undefined;
    } | {
        success: false;
        error: "unexpected error";
        message: string;
    } | import("../types").ErrorGeneric<"device disconnected during action" | "other call in progress" | "Malformed protocol format" | BridgeCommonErrors>>;
    receive({ session, protocol: customProtocol, signal, }: AbstractTransportMethodParams<'receive'>): Promise<import("../types").ErrorGeneric<"Unable to open device" | "A transfer error has occurred." | "device not found" | "device disconnected during action" | "unexpected error" | "Aborted by signal" | "Aborted by timeout"> | {
        success: false;
        error: NonNullable<"Aborted by signal" | "Aborted by timeout">;
        message: string | undefined;
    } | {
        success: false;
        error: "unexpected error";
        message: string;
    } | import("../types").ErrorGeneric<"device disconnected during action" | "other call in progress" | "Malformed protocol format" | BridgeCommonErrors> | import("../types").Success<{
        message: {
            [key: string]: any;
        };
        type: keyof import("@trezor/protobuf/lib/messages").MessageType;
    }>>;
    private post;
}
export {};
//# sourceMappingURL=bridge.d.ts.map