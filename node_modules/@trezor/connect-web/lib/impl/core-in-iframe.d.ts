import EventEmitter from 'events';
import { UiResponseEvent, CallMethodPayload } from '@trezor/connect/lib/events';
import type { ConnectSettings, ConnectSettingsWeb, DeviceIdentity, Manifest } from '@trezor/connect/lib/types';
import { ConnectFactoryDependencies } from '@trezor/connect/lib/factory';
import { InitFullSettings } from '@trezor/connect/lib/types/api/init';
export declare class CoreInIframe implements ConnectFactoryDependencies<ConnectSettingsWeb> {
    eventEmitter: EventEmitter<[never]>;
    protected _settings: ConnectSettings;
    private _log;
    private _popupManager?;
    private _messagePromises;
    private readonly boundHandleMessage;
    private readonly boundDispose;
    constructor();
    private initPopupManager;
    manifest(data: Manifest): void;
    dispose(): Promise<undefined>;
    cancel(error?: string): void;
    private handleMessage;
    init(settings: InitFullSettings<ConnectSettingsWeb>): Promise<void>;
    call(params: CallMethodPayload): Promise<import("@trezor/connect/lib/types").Unsuccessful | {
        id: number;
        success: boolean;
        payload: any;
        device?: DeviceIdentity;
    }>;
    uiResponse(response: UiResponseEvent): void;
    renderWebUSBButton(className?: string): void;
    requestLogin(params: any): Promise<import("@trezor/connect/lib/types").Unsuccessful | {
        id: number;
        success: boolean;
        payload: any;
        device?: DeviceIdentity;
    }>;
    disableWebUSB(): void;
    requestWebUSBDevice(): Promise<void>;
}
export declare const TrezorConnect: Omit<import("@trezor/connect/lib/types").TrezorConnect, "init"> & {
    init: import("@trezor/connect/lib/types/api/init").InitType<ConnectSettingsWeb>;
} & {
    renderWebUSBButton: (className?: string) => void;
    disableWebUSB: () => void;
    requestWebUSBDevice: () => Promise<void>;
};
//# sourceMappingURL=core-in-iframe.d.ts.map