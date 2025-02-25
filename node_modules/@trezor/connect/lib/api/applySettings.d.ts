import { AbstractMethod } from '../core/AbstractMethod';
import { PROTO } from '../constants';
export default class ApplySettings extends AbstractMethod<'applySettings', PROTO.ApplySettings> {
    init(): void;
    get confirmation(): {
        view: "device-management";
        customConfirmButton: {
            className: string;
            label: string;
        };
        label: string;
    };
    run(): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=applySettings.d.ts.map