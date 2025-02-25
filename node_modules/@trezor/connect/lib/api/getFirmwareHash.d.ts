import { AbstractMethod } from '../core/AbstractMethod';
import { PROTO } from '../constants';
export default class GetFirmwareHash extends AbstractMethod<'getFirmwareHash', PROTO.GetFirmwareHash> {
    init(): void;
    run(): Promise<{
        hash: string;
    }>;
}
//# sourceMappingURL=getFirmwareHash.d.ts.map