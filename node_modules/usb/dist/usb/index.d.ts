import { ExtendedDevice } from './device';
import * as usb from './bindings';
interface EventListeners<T> {
    newListener: keyof T;
    removeListener: keyof T;
}
interface DeviceIds {
    idVendor: number;
    idProduct: number;
}
declare module './bindings' {
    interface Device extends ExtendedDevice {
    }
    interface DeviceEvents extends EventListeners<DeviceEvents> {
        attach: Device;
        detach: Device;
        attachIds: DeviceIds;
        detachIds: DeviceIds;
    }
    function addListener<K extends keyof DeviceEvents>(event: K, listener: (arg: DeviceEvents[K]) => void): void;
    function removeListener<K extends keyof DeviceEvents>(event: K, listener: (arg: DeviceEvents[K]) => void): void;
    function on<K extends keyof DeviceEvents>(event: K, listener: (arg: DeviceEvents[K]) => void): void;
    function off<K extends keyof DeviceEvents>(event: K, listener: (arg: DeviceEvents[K]) => void): void;
    function once<K extends keyof DeviceEvents>(event: K, listener: (arg: DeviceEvents[K]) => void): void;
    function listeners<K extends keyof DeviceEvents>(event: K): ((arg: DeviceEvents[K]) => void)[];
    function rawListeners<K extends keyof DeviceEvents>(event: K): ((arg: DeviceEvents[K]) => void)[];
    function removeAllListeners<K extends keyof DeviceEvents>(event?: K): void;
    function emit<K extends keyof DeviceEvents>(event: K, arg: DeviceEvents[K]): boolean;
    function listenerCount<K extends keyof DeviceEvents>(event: K): number;
}
export = usb;
