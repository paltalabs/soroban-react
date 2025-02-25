import { AbstractMethod } from '../core/AbstractMethod';
import { ChangeLanguage as ChangeLanguageSchema } from '../types/api/changeLanguage';
export default class ChangeLanguage extends AbstractMethod<'changeLanguage', ChangeLanguageSchema> {
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
//# sourceMappingURL=changeLanguage.d.ts.map