import { AbstractMethod } from '../../../core/AbstractMethod';
import type { PROTO } from '../../../constants';
export default class EosGetPublicKey extends AbstractMethod<'eosGetPublicKey', PROTO.EosGetPublicKey[]> {
    hasBundle?: boolean;
    init(): void;
    get info(): string;
    get confirmation(): {
        view: "export-address";
        label: string;
    };
    run(): Promise<{
        path: number[];
        serializedPath: string;
        wifPublicKey: string;
        rawPublicKey: string;
    } | {
        path: number[];
        serializedPath: string;
        wifPublicKey: string;
        rawPublicKey: string;
    }[]>;
}
//# sourceMappingURL=eosGetPublicKey.d.ts.map