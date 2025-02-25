import { PROTO } from '../../../constants';
import { AbstractMethod } from '../../../core/AbstractMethod';
import { CardanoNativeScript } from '../../../types/api/cardano';
export default class CardanoGetNativeScriptHash extends AbstractMethod<'cardanoGetNativeScriptHash', PROTO.CardanoGetNativeScriptHash> {
    init(): void;
    get info(): string;
    validateScript(script: CardanoNativeScript): void;
    scriptToProto(script: CardanoNativeScript): PROTO.CardanoNativeScript;
    run(): Promise<{
        scriptHash: string;
    }>;
}
//# sourceMappingURL=cardanoGetNativeScriptHash.d.ts.map