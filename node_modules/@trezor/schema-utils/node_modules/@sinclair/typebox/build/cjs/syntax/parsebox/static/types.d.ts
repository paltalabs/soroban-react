export interface IMapping {
    context: unknown;
    input: unknown;
    output: unknown;
}
/** Maps input to output. This is the default Mapping */
export interface Identity extends IMapping {
    output: this['input'];
}
/** Maps the output as the given parameter T */
export interface As<T> extends IMapping {
    output: T;
}
/** Base type Parser implemented by all other parsers */
export interface IParser<Mapping extends IMapping = Identity> {
    type: string;
    mapping: Mapping;
}
/** Creates a Tuple Parser */
export interface Tuple<Parsers extends IParser[] = [], Mapping extends IMapping = Identity> extends IParser<Mapping> {
    type: 'Tuple';
    parsers: [...Parsers];
}
/** Creates a Union Parser */
export interface Union<Parsers extends IParser[] = [], Mapping extends IMapping = Identity> extends IParser<Mapping> {
    type: 'Union';
    parsers: [...Parsers];
}
/** Creates a Const Parser */
export interface Const<Value extends string = string, Mapping extends IMapping = Identity> extends IParser<Mapping> {
    type: 'Const';
    value: Value;
}
/** Creates a String Parser. Options are an array of permissable quote characters */
export interface String<Options extends string[], Mapping extends IMapping = Identity> extends IParser<Mapping> {
    type: 'String';
    quote: Options;
}
/** Creates an Ident Parser. */
export interface Ident<Mapping extends IMapping = Identity> extends IParser<Mapping> {
    type: 'Ident';
}
/** Creates a Number Parser. */
export interface Number<Mapping extends IMapping = Identity> extends IParser<Mapping> {
    type: 'Number';
}
