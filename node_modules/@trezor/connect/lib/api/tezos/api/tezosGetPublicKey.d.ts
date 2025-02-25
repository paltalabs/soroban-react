import { AbstractMethod } from '../../../core/AbstractMethod';
import type { PROTO } from '../../../constants';
export default class TezosGetPublicKey extends AbstractMethod<'tezosGetPublicKey', PROTO.TezosGetPublicKey[]> {
    hasBundle?: boolean;
    init(): void;
    get info(): string;
    get confirmation(): {
        view: "export-address";
        label: string;
    };
    run(): Promise<{
        path: number[];
        publicKey: string;
        serializedPath: string;
    } | {
        path: number[];
        publicKey: string;
        serializedPath: string;
    }[]>;
}
//# sourceMappingURL=tezosGetPublicKey.d.ts.map