import { PROTO } from '../../../constants';
import { AbstractMethod } from '../../../core/AbstractMethod';
interface Params extends PROTO.CardanoGetPublicKey {
    suppressBackupWarning?: boolean;
}
export default class CardanoGetPublicKey extends AbstractMethod<'cardanoGetPublicKey', Params[]> {
    hasBundle?: boolean;
    init(): void;
    get info(): string;
    get confirmation(): {
        view: "export-xpub";
        label: string;
    };
    run(): Promise<import("../../../types").CardanoPublicKey | import("../../../types").CardanoPublicKey[]>;
}
export {};
//# sourceMappingURL=cardanoGetPublicKey.d.ts.map