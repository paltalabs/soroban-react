export type IModuleProperties = Record<PropertyKey, IParser>;
/** Infers the Output Parameter for a Parser */
export type StaticParser<Parser extends IParser> = Parser extends IParser<infer Output extends unknown> ? Output : unknown;
export type IMapping<Input extends unknown = any, Output extends unknown = unknown> = (input: Input, context: any) => Output;
/** Maps input to output. This is the default Mapping */
export declare const Identity: (value: unknown) => unknown;
/** Maps the output as the given parameter T */
export declare const As: <T>(mapping: T) => ((value: unknown) => T);
export interface IParser<Output extends unknown = unknown> {
    type: string;
    mapping: IMapping<any, Output>;
}
export type TupleParameter<Parsers extends IParser[], Result extends unknown[] = []> = Parsers extends [infer L extends IParser, ...infer R extends IParser[]] ? TupleParameter<R, [...Result, StaticParser<L>]> : Result;
export interface ITuple<Output extends unknown = unknown> extends IParser<Output> {
    type: 'Tuple';
    parsers: IParser[];
}
/** Creates a Tuple parser */
export declare function Tuple<Parsers extends IParser[], Mapping extends IMapping = IMapping<TupleParameter<Parsers>>>(parsers: [...Parsers], mapping: Mapping): ITuple<ReturnType<Mapping>>;
/** Creates a Tuple parser */
export declare function Tuple<Parsers extends IParser[]>(parsers: [...Parsers]): ITuple<TupleParameter<Parsers>>;
export type UnionParameter<Parsers extends IParser[], Result extends unknown = never> = Parsers extends [infer L extends IParser, ...infer R extends IParser[]] ? UnionParameter<R, Result | StaticParser<L>> : Result;
export interface IUnion<Output extends unknown = unknown> extends IParser<Output> {
    type: 'Union';
    parsers: IParser[];
}
/** Creates a Union parser */
export declare function Union<Parsers extends IParser[], Mapping extends IMapping = IMapping<UnionParameter<Parsers>>>(parsers: [...Parsers], mapping: Mapping): IUnion<ReturnType<Mapping>>;
/** Creates a Union parser */
export declare function Union<Parsers extends IParser[]>(parsers: [...Parsers]): IUnion<UnionParameter<Parsers>>;
export interface IConst<Output extends unknown = unknown> extends IParser<Output> {
    type: 'Const';
    value: string;
}
/** Creates a Const parser */
export declare function Const<Value extends string, Mapping extends IMapping<Value>>(value: Value, mapping: Mapping): IConst<ReturnType<Mapping>>;
/** Creates a Const parser */
export declare function Const<Value extends string>(value: Value): IConst<Value>;
export interface IRef<Output extends unknown = unknown> extends IParser<Output> {
    type: 'Ref';
    ref: string;
}
/** Creates a Ref parser */
export declare function Ref<Type extends unknown, Mapping extends IMapping<Type>>(ref: string, mapping: Mapping): IRef<ReturnType<Mapping>>;
/** Creates a Ref parser */
export declare function Ref<Type extends unknown>(ref: string): IRef<Type>;
export interface IString<Output extends unknown = unknown> extends IParser<Output> {
    type: 'String';
    options: string[];
}
/** Creates a String Parser. Options are an array of permissable quote characters */
export declare function String<Mapping extends IMapping<string>>(options: string[], mapping: Mapping): IString<ReturnType<Mapping>>;
/** Creates a String Parser. Options are an array of permissable quote characters */
export declare function String(options: string[]): IString<string>;
export interface IIdent<Output extends unknown = unknown> extends IParser<Output> {
    type: 'Ident';
}
/** Creates an Ident parser */
export declare function Ident<Mapping extends IMapping<string>>(mapping: Mapping): IIdent<ReturnType<Mapping>>;
/** Creates an Ident parser */
export declare function Ident(): IIdent<string>;
export interface INumber<Output extends unknown = unknown> extends IParser<Output> {
    type: 'Number';
}
/** Creates a Number parser */
export declare function Number<Mapping extends IMapping<string>>(mapping: Mapping): INumber<ReturnType<Mapping>>;
/** Creates a Number parser */
export declare function Number(): INumber<string>;
