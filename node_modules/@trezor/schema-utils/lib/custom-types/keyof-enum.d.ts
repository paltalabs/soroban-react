import { JavaScriptTypeBuilder, TUnion, Hint, SchemaOptions, TLiteral, TEnum, TEnumKey, TEnumValue } from '@sinclair/typebox';
type UnionToIntersection<U> = (U extends unknown ? (arg: U) => 0 : never) extends (arg: infer I) => 0 ? I : never;
type LastInUnion<U> = UnionToIntersection<U extends unknown ? (x: U) => 0 : never> extends (x: infer L) => 0 ? L : never;
type DistributeLiterals<T extends string | number | symbol> = T extends T ? T extends string | number ? TLiteral<T> : never : never;
type UnionToTuple<U extends TLiteral, Last = LastInUnion<U>> = [U] extends [never] ? [] : [...UnionToTuple<Exclude<U, Last>>, Last];
type TLiteralGuard<T extends unknown[]> = {
    [K in keyof T]: T[K] extends TLiteral<string | number> ? T[K] : never;
};
export interface TKeyOfEnum<T extends Record<string, string | number>> extends TUnion<TLiteralGuard<UnionToTuple<DistributeLiterals<keyof T>>>> {
    [Hint]: 'KeyOfEnum';
}
export declare class KeyofEnumBuilder extends JavaScriptTypeBuilder {
    KeyOfEnum<T extends Record<string, string | number>>(schema: T, options?: SchemaOptions): TKeyOfEnum<T>;
    Enum<V extends TEnumValue, T extends Record<TEnumKey, V>>(schema: T, options?: SchemaOptions): TEnum<T>;
}
export {};
//# sourceMappingURL=keyof-enum.d.ts.map