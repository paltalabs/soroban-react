import { AbstractMethod } from '../core/AbstractMethod';
export default class GetDeviceState extends AbstractMethod<'getDeviceState'> {
    init(): void;
    run(): Promise<{
        state: `${string}@${string}:${number}`;
        _state: import("..").DeviceState;
    }>;
}
//# sourceMappingURL=getDeviceState.d.ts.map