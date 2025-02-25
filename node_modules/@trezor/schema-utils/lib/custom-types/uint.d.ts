import { Kind, TSchema, JavaScriptTypeBuilder } from '@sinclair/typebox';
export interface TUintOptions {
    allowNegative?: boolean;
}
export interface TUint extends TUintOptions, TSchema {
    [Kind]: 'Uint';
    static: string | number;
    type: 'Uint';
}
export declare class UintBuilder extends JavaScriptTypeBuilder {
    Uint(options?: TUintOptions): TUint;
}
//# sourceMappingURL=uint.d.ts.map