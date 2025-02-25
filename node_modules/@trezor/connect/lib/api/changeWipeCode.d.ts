import { AbstractMethod } from '../core/AbstractMethod';
import type { PROTO } from '../constants';
export default class ChangeWipeCode extends AbstractMethod<'changeWipeCode', PROTO.ChangeWipeCode> {
    init(): void;
    run(): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=changeWipeCode.d.ts.map