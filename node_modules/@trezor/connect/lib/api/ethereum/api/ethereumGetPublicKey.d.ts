import { AbstractMethod } from '../../../core/AbstractMethod';
import type { PROTO } from '../../../constants';
import type { EthereumNetworkInfo } from '../../../types';
type Params = PROTO.EthereumGetPublicKey & {
    network?: EthereumNetworkInfo;
};
export default class EthereumGetPublicKey extends AbstractMethod<'ethereumGetPublicKey', Params[]> {
    hasBundle?: boolean;
    init(): void;
    get info(): string;
    get confirmation(): {
        view: "export-xpub";
        label: string;
    };
    run(): Promise<{
        xpubSegwit?: string | undefined;
        descriptorChecksum?: string | undefined;
        path: number[];
        publicKey: string;
        serializedPath: string;
        depth: number;
        fingerprint: number;
        chainCode: string;
        childNum: number;
        xpub: string;
    } | {
        xpubSegwit?: string | undefined;
        descriptorChecksum?: string | undefined;
        path: number[];
        publicKey: string;
        serializedPath: string;
        depth: number;
        fingerprint: number;
        chainCode: string;
        childNum: number;
        xpub: string;
    }[]>;
}
export {};
//# sourceMappingURL=ethereumGetPublicKey.d.ts.map