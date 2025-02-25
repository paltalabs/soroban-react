import { PROTO } from '../../../constants';
import { AbstractMethod } from '../../../core/AbstractMethod';
type Params = PROTO.SolanaGetAddress & {
    address?: string;
};
export default class SolanaGetAddress extends AbstractMethod<'solanaGetAddress', Params[]> {
    hasBundle?: boolean;
    progress: number;
    init(): void;
    get info(): "Export Solana address" | "Export multiple Solana addresses";
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
//# sourceMappingURL=solanaGetAddress.d.ts.map