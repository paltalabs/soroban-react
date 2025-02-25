import { AbstractMethod } from '../../../core/AbstractMethod';
import { PROTO } from '../../../constants';
type Params = PROTO.CardanoGetAddress & {
    address?: string;
};
export default class CardanoGetAddress extends AbstractMethod<'cardanoGetAddress', Params[]> {
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
    } | undefined;
    _call({ address_parameters, protocol_magic, network_id, derivation_type, show_display, chunkify, }: Params): Promise<{
        address: string;
    }>;
    run(): Promise<import("../../../types").CardanoAddress | import("../../../types").CardanoAddress[]>;
}
export {};
//# sourceMappingURL=cardanoGetAddress.d.ts.map