import { AbstractMethod } from '../core/AbstractMethod';
export default class SetProxy extends AbstractMethod<'setProxy'> {
    init(): void;
    run(): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=setProxy.d.ts.map