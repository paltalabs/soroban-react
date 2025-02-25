import * as Tokens from './token.mjs';
import * as Types from './types.mjs';
type TupleParser<Parsers extends Types.IParser[], Code extends string, Context extends unknown, Result extends unknown[] = []> = (Parsers extends [infer Left extends Types.IParser, ...infer Right extends Types.IParser[]] ? Parse<Left, Code, Context> extends [infer Value extends unknown, infer Rest extends string] ? TupleParser<Right, Rest, Context, [...Result, Value]> : [] : [Result, Code]);
type UnionParser<Parsers extends Types.IParser[], Code extends string, Context extends unknown> = (Parsers extends [infer Left extends Types.IParser, ...infer Right extends Types.IParser[]] ? Parse<Left, Code, Context> extends [infer Value extends unknown, infer Rest extends string] ? [Value, Rest] : UnionParser<Right, Code, Context> : []);
type ConstParser<Value extends string, Code extends string, _Context extends unknown> = (Tokens.Const<Value, Code> extends [infer Match extends Value, infer Rest extends string] ? [Match, Rest] : []);
type IdentParser<Code extends string, _Context extends unknown> = (Tokens.Ident<Code> extends [infer Match extends string, infer Rest extends string] ? [Match, Rest] : []);
type NumberParser<Code extends string, _Context extends unknown> = (Tokens.Number<Code> extends [infer Match extends string, infer Rest extends string] ? [Match, Rest] : []);
type StringParser<Options extends string[], Code extends string, _Context extends unknown> = (Tokens.String<Options, Code> extends [infer Match extends string, infer Rest extends string] ? [Match, Rest] : []);
type ParseCode<Type extends Types.IParser, Code extends string, Context extends unknown = unknown> = (Type extends Types.Union<infer S extends Types.IParser[]> ? UnionParser<S, Code, Context> : Type extends Types.Tuple<infer S extends Types.IParser[]> ? TupleParser<S, Code, Context> : Type extends Types.Const<infer S extends string> ? ConstParser<S, Code, Context> : Type extends Types.String<infer S extends string[]> ? StringParser<S, Code, Context> : Type extends Types.Ident ? IdentParser<Code, Context> : Type extends Types.Number ? NumberParser<Code, Context> : [
]);
type ParseMapping<Parser extends Types.IParser, Result extends unknown, Context extends unknown = unknown> = ((Parser['mapping'] & {
    input: Result;
    context: Context;
})['output']);
/** Parses code with the given parser */
export type Parse<Type extends Types.IParser, Code extends string, Context extends unknown = unknown> = (ParseCode<Type, Code, Context> extends [infer L extends unknown, infer R extends string] ? [ParseMapping<Type, L, Context>, R] : []);
export {};
