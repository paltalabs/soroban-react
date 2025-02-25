import { DeviceState } from '../types';
import { Device } from './Device';
export interface IStateStorage {
    saveState(device: Device, state: DeviceState): void;
    loadState(device: Device): DeviceState | undefined;
}
export declare class WebextensionStateStorage implements IStateStorage {
    origin: string;
    constructor(origin: string);
    loadState(device: Device): {
        sessionId: string;
    } | undefined;
    saveState(device: Device, state: DeviceState): void;
}
//# sourceMappingURL=StateStorage.d.ts.map