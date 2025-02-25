import { AbstractMethod } from '../core/AbstractMethod';
export default class WipeDevice extends AbstractMethod<'wipeDevice'> {
    init(): void;
    get confirmation(): {
        view: "device-management";
        customConfirmButton: {
            className: string;
            label: string;
        };
        label: string;
    };
    get info(): string;
    run(): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=wipeDevice.d.ts.map