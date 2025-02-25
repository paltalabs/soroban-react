import { FirmwareRelease } from '../../types';
interface GetBinaryProps {
    baseUrl: string;
    btcOnly?: boolean;
    release: FirmwareRelease;
}
export declare const getBinary: ({ baseUrl, btcOnly, release }: GetBinaryProps) => Promise<ArrayBuffer | Buffer>;
export declare const getBinaryOptional: (props: GetBinaryProps) => Promise<ArrayBuffer | null>;
export {};
//# sourceMappingURL=getBinary.d.ts.map