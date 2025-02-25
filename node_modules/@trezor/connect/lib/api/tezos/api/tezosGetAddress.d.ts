import { AbstractMethod } from '../../../core/AbstractMethod';
import { PROTO } from '../../../constants';
type Params = PROTO.TezosGetAddress & {
    address?: string;
};
export default class TezosGetAddress extends AbstractMethod<'tezosGetAddress', Params[]> {
    hasBundle?: boolean;
    progress: number;
    init(): void;
    get info(): string;
    getButtonRequestData(code: string): {
        type: "address";
        serializedPath: string;
        address: string;
    } | undefined;
    get confirmation(): {
        view: "export-address";
        label: string;
    };
    _call({ address_n, show_display, chunkify }: Params): Promise<{
        address: string;
    }>;
    run(): Promise<import("../../../types").Address | import("../../../types").Address[]>;
}
export {};
//# sourceMappingURL=tezosGetAddress.d.ts.map