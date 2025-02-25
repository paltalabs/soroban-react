import { WebUSB } from './webusb';
import * as usb from './usb';
/**
 * Convenience method to get the first device with the specified VID and PID, or `undefined` if no such device is present.
 * @param vid
 * @param pid
 */
declare const findByIds: (vid: number, pid: number) => usb.Device | undefined;
/**
 * Convenience method to get the device with the specified serial number, or `undefined` if no such device is present.
 * @param serialNumber
 */
declare const findBySerialNumber: (serialNumber: string) => Promise<usb.Device | undefined>;
declare const webusb: WebUSB;
export { usb, findByIds, findBySerialNumber, webusb };
export { Device, Transfer, DeviceEvents, getDeviceList, useUsbDkBackend, LibUSBException } from './usb';
export * from './usb/capability';
export * from './usb/descriptors';
export * from './usb/endpoint';
export * from './usb/interface';
export * from './webusb';
export * from './webusb/webusb-device';
