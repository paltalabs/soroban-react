import type { CoinInfo, FirmwareRange } from '../../types';
type ParamType = 'string' | 'number' | 'array' | 'array-buffer' | 'boolean' | 'uint' | 'object';
type Param = {
    name: string;
    type?: ParamType | ParamType[];
    required?: boolean;
    allowEmpty?: boolean;
    allowNegative?: boolean;
};
export declare function validateParams<P extends Record<string, any>>(params: P, schema: Param[]): P;
export declare const validateCoinPath: (path: number[], coinInfo?: CoinInfo) => void;
export declare const getFirmwareRange: (method: string, coinInfo: CoinInfo | null | undefined, currentRange: FirmwareRange) => FirmwareRange;
export {};
//# sourceMappingURL=paramsValidator.d.ts.map