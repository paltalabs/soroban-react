import { ValueErrorType } from '@sinclair/typebox/errors';
export declare class InvalidParameter extends Error {
    field: string;
    type: ValueErrorType;
    constructor(reason: string, field: string, type: ValueErrorType, value?: any);
}
//# sourceMappingURL=errors.d.ts.map