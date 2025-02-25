import { AbstractMethod } from '../core/AbstractMethod';
import { PROTO } from '../constants';
export default class ResetDevice extends AbstractMethod<'resetDevice', PROTO.ResetDevice> {
    init(): void;
    get info(): string;
    get confirmation(): {
        view: "device-management";
        label: string;
    };
    run(): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=resetDevice.d.ts.map