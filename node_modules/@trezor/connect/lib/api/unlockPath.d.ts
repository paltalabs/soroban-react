import { AbstractMethod } from '../core/AbstractMethod';
import { PROTO } from '../constants';
export default class UnlockPath extends AbstractMethod<'unlockPath', PROTO.UnlockPath> {
    init(): void;
    run(): Promise<{
        address_n: number[];
        mac: string | undefined;
    }>;
}
//# sourceMappingURL=unlockPath.d.ts.map