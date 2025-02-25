import { DeviceList } from '../device/DeviceList';
import { CoreEventMessage } from '../events';
import { CommonParams, DeviceUniquePath } from '../types';
import type { Log } from '../utils/debug';
import type { Device } from '../device/Device';
type PostMessage = (message: CoreEventMessage) => void;
export type Params = {
    language?: string;
    baseUrl?: string;
    btcOnly?: boolean;
    binary?: ArrayBuffer;
} & CommonParams;
type Context = {
    deviceList: DeviceList;
    postMessage: PostMessage;
    initDevice: (path?: DeviceUniquePath) => Promise<Device>;
    log: Log;
    abortSignal: AbortSignal;
};
export declare const onCallFirmwareUpdate: ({ params, context: { deviceList, postMessage, initDevice, log, abortSignal }, }: {
    params: Params;
    context: Context;
}) => Promise<{
    check: "other-error";
    checkError: any;
} | {
    check: string;
    checkError?: undefined;
}>;
export {};
//# sourceMappingURL=onCallFirmwareUpdate.d.ts.map