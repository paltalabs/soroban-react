import { PROTO } from '../../../constants';
import { AbstractMethod } from '../../../core/AbstractMethod';
export default class SolanaGetPublicKey extends AbstractMethod<'solanaGetPublicKey', PROTO.SolanaGetPublicKey[]> {
    hasBundle?: boolean;
    init(): void;
    get info(): string;
    get confirmation(): {
        view: "export-xpub";
        label: string;
    };
    run(): Promise<({
        path: number[];
        publicKey: string;
        serializedPath: string;
    } & {
        publicKey: string;
    }) | ({
        path: number[];
        publicKey: string;
        serializedPath: string;
    } & {
        publicKey: string;
    })[]>;
}
//# sourceMappingURL=solanaGetPublicKey.d.ts.map