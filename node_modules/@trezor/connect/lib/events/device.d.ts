import type { PROTO } from '../constants';
import type { Device } from '../types/device';
import type { MessageFactoryFn } from '../types/utils';
export declare const DEVICE_EVENT = "DEVICE_EVENT";
export declare const DEVICE: {
    readonly CONNECT: "device-connect";
    readonly CONNECT_UNACQUIRED: "device-connect_unacquired";
    readonly DISCONNECT: "device-disconnect";
    readonly CHANGED: "device-changed";
    readonly BUTTON: "button";
    readonly PIN: "pin";
    readonly PASSPHRASE: "passphrase";
    readonly PASSPHRASE_ON_DEVICE: "passphrase_on_device";
    readonly WORD: "word";
};
export interface DeviceButtonRequestPayload extends Omit<PROTO.ButtonRequest, 'code'> {
    code?: PROTO.ButtonRequest['code'] | 'ButtonRequest_FirmwareUpdate';
}
export interface DeviceButtonRequest {
    type: typeof DEVICE.BUTTON;
    payload: DeviceButtonRequestPayload & {
        device: Device;
    };
}
export type DeviceEvent = {
    type: typeof DEVICE.CONNECT | typeof DEVICE.CONNECT_UNACQUIRED | typeof DEVICE.CHANGED | typeof DEVICE.DISCONNECT;
    payload: Device;
} | DeviceButtonRequest;
export type DeviceEventMessage = DeviceEvent & {
    event: typeof DEVICE_EVENT;
};
export type DeviceEventListenerFn = (type: typeof DEVICE_EVENT, cb: (event: DeviceEventMessage) => void) => void;
export declare const createDeviceMessage: MessageFactoryFn<typeof DEVICE_EVENT, DeviceEvent>;
//# sourceMappingURL=device.d.ts.map