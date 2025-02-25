import { AbstractMethod } from '../core/AbstractMethod';
import { PROTO } from '../constants';
export default class VerifyMessage extends AbstractMethod<'verifyMessage', PROTO.VerifyMessage> {
    init(): void;
    get info(): string;
    run(): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=verifyMessage.d.ts.map