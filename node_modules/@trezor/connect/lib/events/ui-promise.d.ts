import type { Deferred } from '@trezor/utils';
import type { DEVICE } from './device';
import type { Device } from '../device/Device';
import type { UiResponseEvent } from './ui-response';
export type UiPromiseResponse = UiResponseEvent | {
    type: typeof DEVICE.DISCONNECT;
    payload?: undefined;
};
export type UiPromise<T extends UiPromiseResponse['type']> = Deferred<Extract<UiPromiseResponse, {
    type: T;
}>, T> & {
    device?: Device;
};
type UiPromiseMap = {
    [T in UiPromiseResponse['type']]: UiPromise<T>;
};
export type AnyUiPromise = UiPromiseMap[UiPromiseResponse['type']];
export type UiPromiseCreator = <T extends UiPromiseResponse['type']>(type: T, device?: Device) => UiPromise<T>;
export {};
//# sourceMappingURL=ui-promise.d.ts.map