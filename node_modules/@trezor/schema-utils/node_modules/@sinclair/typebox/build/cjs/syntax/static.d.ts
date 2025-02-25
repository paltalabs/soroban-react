import { Static } from './parsebox/index';
import * as Types from '../type/index';
type Newline = '\n';
type LBracket = '[';
type RBracket = ']';
type LParen = '(';
type RParen = ')';
type LBrace = '{';
type RBrace = '}';
type LAngle = '<';
type RAngle = '>';
type Question = '?';
type Colon = ':';
type Comma = ',';
type SemiColon = ';';
type SingleQuote = "'";
type DoubleQuote = '"';
type Tilde = '`';
interface DelimitTailMapping<_ = unknown> extends Static.IMapping {
    output: (this['input'] extends [_, infer A, _, infer B, _, infer C, _, infer D, _, infer E, _, infer F, _, infer G, _, infer H, _, infer I, _, infer Rest extends unknown[]] ? [A, B, C, D, E, F, G, H, I, ...Rest] : this['input'] extends [_, infer A, _, infer B, _, infer C, _, infer D, _, infer E, _, infer F, _, infer G, _, infer H, _, infer Rest extends unknown[]] ? [A, B, C, D, E, F, G, H, ...Rest] : this['input'] extends [_, infer A, _, infer B, _, infer C, _, infer D, _, infer E, _, infer F, _, infer G, _, infer Rest extends unknown[]] ? [A, B, C, D, E, F, G, ...Rest] : this['input'] extends [_, infer A, _, infer B, _, infer C, _, infer D, _, infer E, _, infer F, _, infer Rest extends unknown[]] ? [A, B, C, D, E, F, ...Rest] : this['input'] extends [_, infer A, _, infer B, _, infer C, _, infer D, _, infer E, _, infer Rest extends unknown[]] ? [A, B, C, D, E, ...Rest] : this['input'] extends [_, infer A, _, infer B, _, infer C, _, infer D, _, infer Rest extends unknown[]] ? [A, B, C, D, ...Rest] : this['input'] extends [_, infer A, _, infer B, _, infer C, _, infer Rest extends unknown[]] ? [A, B, C, ...Rest] : this['input'] extends [_, infer A, _, infer B, _, infer Rest extends unknown[]] ? [A, B, ...Rest] : this['input'] extends [_, infer A, _, infer Rest extends unknown[]] ? [A, ...Rest] : this['input'] extends [_, infer Rest extends unknown[]] ? [...Rest] : this['input'] extends [_] ? [] : [
    ]);
}
type DelimitTail<T extends Static.IParser, _ extends Static.IParser> = Static.Union<[
    Static.Tuple<[_, T, _, T, _, T, _, T, _, T, _, T, _, T, _, T, _, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, T, _, T, _, T, _, T, _, T, _, T, _, T, _, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, T, _, T, _, T, _, T, _, T, _, T, _, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, T, _, T, _, T, _, T, _, T, _, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, T, _, T, _, T, _, T, _, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, T, _, T, _, T, _, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, T, _, T, _, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, T, _, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, T, _, Delimit<T, _>]>,
    Static.Tuple<[_, Delimit<T, _>]>,
    Static.Tuple<[_]>,
    Static.Tuple<[]>
], DelimitTailMapping>;
interface DelimitMapping extends Static.IMapping {
    output: (this['input'] extends [infer Element extends unknown, infer Rest extends unknown[]] ? [Element, ...Rest] : []);
}
type Delimit<Parser extends Static.IParser, Delimiter extends Static.IParser> = (Static.Union<[
    Static.Tuple<[Parser, DelimitTail<Parser, Delimiter>]>,
    Static.Tuple<[]>
], DelimitMapping>);
interface ReferenceMapping extends Static.IMapping {
    output: this['input'] extends [infer Key extends string] ? Key extends keyof this['context'] ? this['context'][Key] : Types.TRef<Types.TUnknown> : never;
}
type Reference = Static.Tuple<[Static.Ident], ReferenceMapping>;
interface LiteralBooleanMapping extends Static.IMapping {
    output: this['input'] extends `${infer S extends boolean}` ? Types.TLiteral<S> : never;
}
interface LiteralNumberMapping extends Static.IMapping {
    output: this['input'] extends `${infer S extends number}` ? Types.TLiteral<S> : never;
}
interface LiteralStringMapping extends Static.IMapping {
    output: this['input'] extends `${infer S extends string}` ? Types.TLiteral<S> : never;
}
type Literal = Static.Union<[
    Static.Union<[Static.Const<'true'>, Static.Const<'false'>], LiteralBooleanMapping>,
    Static.Number<LiteralNumberMapping>,
    Static.String<[DoubleQuote, SingleQuote, Tilde], LiteralStringMapping>
]>;
type Keyword = Static.Union<[
    Static.Const<'any', Static.As<Types.TAny>>,
    Static.Const<'bigint', Static.As<Types.TBigInt>>,
    Static.Const<'boolean', Static.As<Types.TBoolean>>,
    Static.Const<'integer', Static.As<Types.TInteger>>,
    Static.Const<'never', Static.As<Types.TNever>>,
    Static.Const<'null', Static.As<Types.TNull>>,
    Static.Const<'number', Static.As<Types.TNumber>>,
    Static.Const<'string', Static.As<Types.TString>>,
    Static.Const<'symbol', Static.As<Types.TSymbol>>,
    Static.Const<'undefined', Static.As<Types.TUndefined>>,
    Static.Const<'unknown', Static.As<Types.TUnknown>>,
    Static.Const<'void', Static.As<Types.TVoid>>
]>;
interface KeyOfMapping extends Static.IMapping {
    output: this['input'] extends [] ? false : true;
}
type KeyOf = Static.Union<[
    Static.Tuple<[Static.Const<'keyof'>]>,
    Static.Tuple<[]>
], KeyOfMapping>;
interface IndexArrayMapping extends Static.IMapping {
    output: (this['input'] extends [LBracket, infer Type extends Types.TSchema, RBracket, infer Rest extends unknown[]] ? [[Type], ...Rest] : this['input'] extends [LBracket, RBracket, infer Rest extends unknown[]] ? [[], ...Rest] : [
    ]);
}
type IndexArray = Static.Union<[
    Static.Tuple<[Static.Const<LBracket>, Type, Static.Const<RBracket>, IndexArray]>,
    Static.Tuple<[Static.Const<LBracket>, Static.Const<RBracket>, IndexArray]>,
    Static.Tuple<[]>
], IndexArrayMapping>;
interface ExtendsMapping extends Static.IMapping {
    output: this['input'] extends ['extends', infer Type extends Types.TSchema, Question, infer True extends Types.TSchema, Colon, infer False extends Types.TSchema] ? [Type, True, False] : [];
}
type Extends = Static.Union<[
    Static.Tuple<[Static.Const<'extends'>, Type, Static.Const<Question>, Type, Static.Const<Colon>, Type]>,
    Static.Tuple<[]>
], ExtendsMapping>;
interface BaseMapping extends Static.IMapping {
    output: (this['input'] extends [LParen, infer Type extends Types.TSchema, RParen] ? Type : this['input'] extends [infer Type extends Types.TSchema] ? Type : never);
}
type Base = Static.Union<[
    Static.Tuple<[
        Static.Const<LParen>,
        Type,
        Static.Const<RParen>
    ]>,
    Static.Tuple<[
        Static.Union<[
            Literal,
            Keyword,
            Object,
            Tuple,
            Function,
            Constructor,
            Mapped,
            AsyncIterator,
            Iterator,
            ConstructorParameters,
            FunctionParameters,
            InstanceType,
            ReturnType,
            Awaited,
            Array,
            Record,
            Promise,
            Partial,
            Required,
            Pick,
            Omit,
            Exclude,
            Extract,
            Lowercase,
            Uppercase,
            Capitalize,
            Uncapitalize,
            Date,
            Uint8Array,
            Reference
        ]>
    ]>
], BaseMapping>;
type FactorExtends<Type extends Types.TSchema, Extends extends unknown[]> = (Extends extends [infer Right extends Types.TSchema, infer True extends Types.TSchema, infer False extends Types.TSchema] ? Types.TExtends<Type, Right, True, False> : Type);
type FactorIndexArray<Type extends Types.TSchema, IndexArray extends unknown[]> = (IndexArray extends [...infer Left extends unknown[], infer Right extends Types.TSchema[]] ? (Right extends [infer Indexer extends Types.TSchema] ? Types.TIndex<FactorIndexArray<Type, Left>, Types.TIndexPropertyKeys<Indexer>> : Right extends [] ? Types.TArray<FactorIndexArray<Type, Left>> : Types.TNever) : Type);
interface FactorMapping extends Static.IMapping {
    output: this['input'] extends [infer KeyOf extends boolean, infer Type extends Types.TSchema, infer IndexArray extends unknown[], infer Extends extends unknown[]] ? KeyOf extends true ? FactorExtends<Types.TKeyOf<FactorIndexArray<Type, IndexArray>>, Extends> : FactorExtends<FactorIndexArray<Type, IndexArray>, Extends> : never;
}
type Factor = Static.Tuple<[
    KeyOf,
    Base,
    IndexArray,
    Extends
], FactorMapping>;
type ExprBinaryReduce<Left extends Types.TSchema, Rest extends unknown[]> = (Rest extends [infer Operator extends unknown, infer Right extends Types.TSchema, infer Next extends unknown[]] ? (ExprBinaryReduce<Right, Next> extends infer Schema extends Types.TSchema ? (Operator extends '&' ? (Schema extends Types.TIntersect<infer Types extends Types.TSchema[]> ? Types.TIntersect<[Left, ...Types]> : Types.TIntersect<[Left, Schema]>) : Operator extends '|' ? (Schema extends Types.TUnion<infer Types extends Types.TSchema[]> ? Types.TUnion<[Left, ...Types]> : Types.TUnion<[Left, Schema]>) : never) : never) : Left);
interface ExprBinaryMapping extends Static.IMapping {
    output: (this['input'] extends [infer Left extends Types.TSchema, infer Rest extends unknown[]] ? ExprBinaryReduce<Left, Rest> : []);
}
type ExprTermTail = Static.Union<[
    Static.Tuple<[Static.Const<'&'>, Factor, ExprTermTail]>,
    Static.Tuple<[]>
]>;
type ExprTerm = Static.Tuple<[
    Factor,
    ExprTermTail
], ExprBinaryMapping>;
type ExprTail = Static.Union<[
    Static.Tuple<[Static.Const<'|'>, ExprTerm, ExprTail]>,
    Static.Tuple<[]>
]>;
type Expr = Static.Tuple<[
    ExprTerm,
    ExprTail
], ExprBinaryMapping>;
export type Type = Expr;
interface PropertyKeyStringMapping extends Static.IMapping {
    output: this['input'];
}
type PropertyKeyString = Static.String<[SingleQuote, DoubleQuote], PropertyKeyStringMapping>;
type PropertyKey = Static.Union<[Static.Ident, PropertyKeyString]>;
interface PropertyReadonlyMapping extends Static.IMapping {
    output: this['input'] extends ['readonly'] ? true : false;
}
type PropertyReadonly = Static.Union<[Static.Tuple<[Static.Const<'readonly'>]>, Static.Tuple<[]>], PropertyReadonlyMapping>;
interface PropertyOptionalMapping extends Static.IMapping {
    output: this['input'] extends [Question] ? true : false;
}
type PropertyOptional = Static.Union<[Static.Tuple<[Static.Const<Question>]>, Static.Tuple<[]>], PropertyOptionalMapping>;
interface PropertyMapping extends Static.IMapping {
    output: this['input'] extends [infer Readonly extends boolean, infer Key extends string, infer Optional extends boolean, string, infer Type extends Types.TSchema] ? {
        [_ in Key]: ([
            Readonly,
            Optional
        ] extends [true, true] ? Types.TReadonlyOptional<Type> : [
            Readonly,
            Optional
        ] extends [true, false] ? Types.TReadonly<Type> : [
            Readonly,
            Optional
        ] extends [false, true] ? Types.TOptional<Type> : Type);
    } : never;
}
type Property = Static.Tuple<[PropertyReadonly, PropertyKey, PropertyOptional, Static.Const<Colon>, Type], PropertyMapping>;
type PropertiesEvaluate<T> = {
    [K in keyof T]: T[K];
} & {};
type PropertyDelimiter = Static.Union<[
    Static.Tuple<[Static.Const<Comma>, Static.Const<Newline>]>,
    Static.Tuple<[Static.Const<SemiColon>, Static.Const<Newline>]>,
    Static.Tuple<[Static.Const<Comma>]>,
    Static.Tuple<[Static.Const<SemiColon>]>,
    Static.Tuple<[Static.Const<Newline>]>
]>;
type PropertiesReduce<PropertiesArray extends Types.TProperties[], Result extends Types.TProperties = {}> = (PropertiesArray extends [infer Left extends Types.TProperties, ...infer Right extends Types.TProperties[]] ? PropertiesReduce<Right, PropertiesEvaluate<Result & Left>> : Result);
interface PropertiesMapping extends Static.IMapping {
    output: this['input'] extends Types.TProperties[] ? PropertiesReduce<this['input']> : never;
}
type Properties = Static.Union<[Delimit<Property, PropertyDelimiter>], PropertiesMapping>;
interface ObjectMapping extends Static.IMapping {
    output: this['input'] extends [unknown, infer Properties extends Types.TProperties, unknown] ? Types.TObject<Properties> : never;
}
type Object = Static.Tuple<[
    Static.Const<LBrace>,
    Properties,
    Static.Const<RBrace>
], ObjectMapping>;
type Elements = Delimit<Type, Static.Const<Comma>>;
interface TupleMapping extends Static.IMapping {
    output: this['input'] extends [unknown, infer Elements extends Types.TSchema[], unknown] ? Types.TTuple<Elements> : never;
}
type Tuple = Static.Tuple<[
    Static.Const<LBracket>,
    Elements,
    Static.Const<RBracket>
], TupleMapping>;
interface ParameterMapping extends Static.IMapping {
    output: this['input'] extends [string, Colon, infer Type extends Types.TSchema] ? Type : never;
}
type Parameter = Static.Tuple<[
    Static.Ident,
    Static.Const<Colon>,
    Type
], ParameterMapping>;
type Parameters = Delimit<Parameter, Static.Const<Comma>>;
interface FunctionMapping extends Static.IMapping {
    output: this['input'] extends [LParen, infer Parameters extends Types.TSchema[], RParen, '=>', infer ReturnType extends Types.TSchema] ? Types.TFunction<Parameters, ReturnType> : never;
}
type Function = Static.Tuple<[
    Static.Const<LParen>,
    Parameters,
    Static.Const<RParen>,
    Static.Const<'=>'>,
    Type
], FunctionMapping>;
interface ConstructorMapping extends Static.IMapping {
    output: this['input'] extends ['new', LParen, infer Parameters extends Types.TSchema[], RParen, '=>', infer InstanceType extends Types.TSchema] ? Types.TConstructor<Parameters, InstanceType> : never;
}
type Constructor = Static.Tuple<[
    Static.Const<'new'>,
    Static.Const<LParen>,
    Parameters,
    Static.Const<RParen>,
    Static.Const<'=>'>,
    Type
], ConstructorMapping>;
interface MappedMapping extends Static.IMapping {
    output: this['input'] extends [LBrace, LBracket, infer Key extends string, 'in', infer Right extends Types.TSchema, RBracket, Colon, infer Type extends Types.TSchema, RBrace] ? Types.TLiteral<'Mapped types not supported'> : this['input'];
}
type Mapped = Static.Tuple<[
    Static.Const<LBrace>,
    Static.Const<LBracket>,
    Static.Ident,
    Static.Const<'in'>,
    Type,
    Static.Const<RBracket>,
    Static.Const<Colon>,
    Type,
    Static.Const<RBrace>
], MappedMapping>;
interface ArrayMapping extends Static.IMapping {
    output: this['input'] extends ['Array', LAngle, infer Type extends Types.TSchema, RAngle] ? Types.TArray<Type> : never;
}
type Array = Static.Tuple<[
    Static.Const<'Array'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], ArrayMapping>;
interface AsyncIteratorMapping extends Static.IMapping {
    output: this['input'] extends ['AsyncIterator', LAngle, infer Type extends Types.TSchema, RAngle] ? Types.TAsyncIterator<Type> : never;
}
type AsyncIterator = Static.Tuple<[
    Static.Const<'AsyncIterator'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], AsyncIteratorMapping>;
interface IteratorMapping extends Static.IMapping {
    output: this['input'] extends ['Iterator', LAngle, infer Type extends Types.TSchema, RAngle] ? Types.TIterator<Type> : never;
}
type Iterator = Static.Tuple<[
    Static.Const<'Iterator'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], IteratorMapping>;
interface ConstructorParametersMapping extends Static.IMapping {
    output: this['input'] extends ['ConstructorParameters', LAngle, infer Type extends Types.TConstructor, RAngle] ? Types.TConstructorParameters<Type> : never;
}
type ConstructorParameters = Static.Tuple<[
    Static.Const<'ConstructorParameters'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], ConstructorParametersMapping>;
interface FunctionParametersMapping extends Static.IMapping {
    output: this['input'] extends ['Parameters', LAngle, infer Type extends Types.TFunction, RAngle] ? Types.TParameters<Type> : never;
}
type FunctionParameters = Static.Tuple<[
    Static.Const<'Parameters'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], FunctionParametersMapping>;
interface InstanceTypeMapping extends Static.IMapping {
    output: this['input'] extends ['InstanceType', LAngle, infer Type extends Types.TConstructor, RAngle] ? Types.TInstanceType<Type> : never;
}
type InstanceType = Static.Tuple<[
    Static.Const<'InstanceType'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], InstanceTypeMapping>;
interface ReturnTypeMapping extends Static.IMapping {
    output: this['input'] extends ['ReturnType', LAngle, infer Type extends Types.TFunction, RAngle] ? Types.TReturnType<Type> : never;
}
type ReturnType = Static.Tuple<[
    Static.Const<'ReturnType'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], ReturnTypeMapping>;
interface AwaitedMapping extends Static.IMapping {
    output: this['input'] extends ['Awaited', LAngle, infer Type extends Types.TSchema, RAngle] ? Types.TAwaited<Type> : never;
}
type Awaited = Static.Tuple<[
    Static.Const<'Awaited'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], AwaitedMapping>;
interface PromiseMapping extends Static.IMapping {
    output: this['input'] extends ['Promise', LAngle, infer Type extends Types.TSchema, RAngle] ? Types.TPromise<Type> : never;
}
type Promise = Static.Tuple<[
    Static.Const<'Promise'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], PromiseMapping>;
interface RecordMapping extends Static.IMapping {
    output: this['input'] extends ['Record', LAngle, infer Key extends Types.TSchema, Comma, infer Type extends Types.TSchema, RAngle] ? Types.TRecord<Key, Type> : never;
}
type Record = Static.Tuple<[
    Static.Const<'Record'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<Comma>,
    Type,
    Static.Const<RAngle>
], RecordMapping>;
interface PartialMapping extends Static.IMapping {
    output: this['input'] extends ['Partial', LAngle, infer Type extends Types.TSchema, RAngle] ? Types.TPartial<Type> : never;
}
type Partial = Static.Tuple<[
    Static.Const<'Partial'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], PartialMapping>;
interface RequiredMapping extends Static.IMapping {
    output: this['input'] extends ['Required', LAngle, infer Type extends Types.TSchema, RAngle] ? Types.TPartial<Type> : never;
}
type Required = Static.Tuple<[
    Static.Const<'Required'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], RequiredMapping>;
interface PickMapping extends Static.IMapping {
    output: this['input'] extends ['Pick', LAngle, infer Type extends Types.TSchema, Comma, infer PropertyKey extends Types.TSchema, RAngle] ? Types.TPick<Type, Types.TIndexPropertyKeys<PropertyKey>> : never;
}
type Pick = Static.Tuple<[
    Static.Const<'Pick'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<Comma>,
    Type,
    Static.Const<RAngle>
], PickMapping>;
interface OmitMapping extends Static.IMapping {
    output: this['input'] extends ['Omit', LAngle, infer Type extends Types.TSchema, Comma, infer PropertyKey extends Types.TSchema, RAngle] ? Types.TOmit<Type, Types.TIndexPropertyKeys<PropertyKey>> : never;
}
type Omit = Static.Tuple<[
    Static.Const<'Omit'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<Comma>,
    Type,
    Static.Const<RAngle>
], OmitMapping>;
interface ExcludeMapping extends Static.IMapping {
    output: this['input'] extends ['Exclude', LAngle, infer Type extends Types.TSchema, Comma, infer PropertyKey extends Types.TSchema, RAngle] ? Types.TExclude<Type, PropertyKey> : never;
}
type Exclude = Static.Tuple<[
    Static.Const<'Exclude'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<Comma>,
    Type,
    Static.Const<RAngle>
], ExcludeMapping>;
interface ExtractMapping extends Static.IMapping {
    output: this['input'] extends ['Extract', LAngle, infer Type extends Types.TSchema, Comma, infer PropertyKey extends Types.TSchema, RAngle] ? Types.TExtract<Type, PropertyKey> : never;
}
type Extract = Static.Tuple<[
    Static.Const<'Extract'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<Comma>,
    Type,
    Static.Const<RAngle>
], ExtractMapping>;
interface UppercaseMapping extends Static.IMapping {
    output: this['input'] extends ['Uppercase', LAngle, infer Type extends Types.TSchema, RAngle] ? Types.TUppercase<Type> : never;
}
type Uppercase = Static.Tuple<[
    Static.Const<'Uppercase'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], UppercaseMapping>;
interface LowercaseMapping extends Static.IMapping {
    output: this['input'] extends ['Lowercase', LAngle, infer Type extends Types.TSchema, RAngle] ? Types.TLowercase<Type> : never;
}
type Lowercase = Static.Tuple<[
    Static.Const<'Lowercase'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], LowercaseMapping>;
interface CapitalizeMapping extends Static.IMapping {
    output: this['input'] extends ['Capitalize', LAngle, infer Type extends Types.TSchema, RAngle] ? Types.TCapitalize<Type> : never;
}
type Capitalize = Static.Tuple<[
    Static.Const<'Capitalize'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], CapitalizeMapping>;
interface UncapitalizeMapping extends Static.IMapping {
    output: this['input'] extends ['Uncapitalize', LAngle, infer Type extends Types.TSchema, RAngle] ? Types.TUncapitalize<Type> : never;
}
type Uncapitalize = Static.Tuple<[
    Static.Const<'Uncapitalize'>,
    Static.Const<LAngle>,
    Type,
    Static.Const<RAngle>
], UncapitalizeMapping>;
type Date = Static.Const<'Date', Static.As<Types.TDate>>;
type Uint8Array = Static.Const<'Uint8Array', Static.As<Types.TUint8Array>>;
export {};
