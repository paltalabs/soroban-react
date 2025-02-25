export declare const addCustomErrorDeserializer: (name: string, deserializer: (obj: any) => any) => void;
export interface LedgerErrorConstructor<F extends {
    [key: string]: unknown;
}> extends ErrorConstructor {
    new (message?: string, fields?: F, options?: any): Error;
    (message?: string, fields?: F, options?: any): Error;
    readonly prototype: Error;
}
export declare const createCustomErrorClass: <F extends {
    [key: string]: unknown;
}, T extends LedgerErrorConstructor<F> = LedgerErrorConstructor<F>>(name: string) => T;
export declare const deserializeError: (object: any) => Error | undefined;
export declare const serializeError: (value: undefined | To | string | (() => unknown)) => undefined | To | string;
interface To {
    name?: string;
    message?: string;
    stack?: string;
}
export {};
//# sourceMappingURL=helpers.d.ts.map