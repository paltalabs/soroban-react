import { AbstractMethod } from '../core/AbstractMethod';
import { type CoinInfo } from '../types';
import { GetAccountDescriptorParams, GetAccountDescriptorResponse } from '../types/api/getAccountDescriptor';
type Request = GetAccountDescriptorParams & {
    address_n: number[];
    coinInfo: CoinInfo;
};
export default class GetAccountDescriptor extends AbstractMethod<'getAccountDescriptor', Request[]> {
    disposed: boolean;
    hasBundle?: boolean;
    init(): void;
    get info(): string;
    get confirmation(): {
        view: "export-account-info";
        label: string;
    };
    checkFirmwareRange(): undefined;
    run(): Promise<GetAccountDescriptorResponse | (GetAccountDescriptorResponse | null)[]>;
    dispose(): void;
}
export {};
//# sourceMappingURL=getAccountDescriptor.d.ts.map