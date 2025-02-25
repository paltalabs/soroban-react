"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const index_1 = require("./parsebox/index");
const Types = require("../type/index");
// ------------------------------------------------------------------
// Tokens
// ------------------------------------------------------------------
const Newline = '\n';
const LBracket = '[';
const RBracket = ']';
const LParen = '(';
const RParen = ')';
const LBrace = '{';
const RBrace = '}';
const LAngle = '<';
const RAngle = '>';
const Question = '?';
const Colon = ':';
const Comma = ',';
const SemiColon = ';';
const SingleQuote = "'";
const DoubleQuote = '"';
const Tilde = '`';
// ------------------------------------------------------------------
// DestructureRight
// ------------------------------------------------------------------
// prettier-ignore
function DestructureRight(values) {
    return (values.length > 0)
        ? [values.slice(0, values.length - 1), values[values.length - 1]]
        : [values, undefined];
}
// ------------------------------------------------------------------
// Reference
// ------------------------------------------------------------------
// prettier-ignore
const Reference = index_1.Runtime.Ident((value, context) => {
    return value in context ? context[value] : Types.Ref(value);
});
// ------------------------------------------------------------------
// Literal
// ------------------------------------------------------------------
// prettier-ignore
const Literal = index_1.Runtime.Union([
    index_1.Runtime.Union([index_1.Runtime.Const('true'), index_1.Runtime.Const('false')], value => Types.Literal(value === 'true')),
    index_1.Runtime.Number(value => Types.Literal(parseFloat(value))),
    index_1.Runtime.String([SingleQuote, DoubleQuote, Tilde], value => Types.Literal(value))
]);
// ------------------------------------------------------------------
// Keyword
// ------------------------------------------------------------------
// prettier-ignore
const Keyword = index_1.Runtime.Union([
    index_1.Runtime.Const('any', index_1.Runtime.As(Types.Any())),
    index_1.Runtime.Const('bigint', index_1.Runtime.As(Types.BigInt())),
    index_1.Runtime.Const('boolean', index_1.Runtime.As(Types.Boolean())),
    index_1.Runtime.Const('integer', index_1.Runtime.As(Types.Integer())),
    index_1.Runtime.Const('never', index_1.Runtime.As(Types.Never())),
    index_1.Runtime.Const('null', index_1.Runtime.As(Types.Null())),
    index_1.Runtime.Const('number', index_1.Runtime.As(Types.Number())),
    index_1.Runtime.Const('string', index_1.Runtime.As(Types.String())),
    index_1.Runtime.Const('symbol', index_1.Runtime.As(Types.Symbol())),
    index_1.Runtime.Const('undefined', index_1.Runtime.As(Types.Undefined())),
    index_1.Runtime.Const('unknown', index_1.Runtime.As(Types.Unknown())),
    index_1.Runtime.Const('void', index_1.Runtime.As(Types.Void())),
]);
// ------------------------------------------------------------------
// KeyOf
// ------------------------------------------------------------------
// prettier-ignore
const KeyOfMapping = (values) => (values.length > 0);
// prettier-ignore
const KeyOf = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Const('keyof')]), index_1.Runtime.Tuple([])
], KeyOfMapping);
// ------------------------------------------------------------------
// IndexArray
// ------------------------------------------------------------------
// prettier-ignore
const IndexArrayMapping = (values) => (values.length === 4 ? [[values[1]], ...values[3]] :
    values.length === 3 ? [[], ...values[2]] :
        []);
// prettier-ignore
const IndexArray = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Const(LBracket), index_1.Runtime.Ref('Type'), index_1.Runtime.Const(RBracket), index_1.Runtime.Ref('IndexArray')]),
    index_1.Runtime.Tuple([index_1.Runtime.Const(LBracket), index_1.Runtime.Const(RBracket), index_1.Runtime.Ref('IndexArray')]),
    index_1.Runtime.Tuple([])
], value => IndexArrayMapping(value));
// ------------------------------------------------------------------
// Extends
// ------------------------------------------------------------------
// prettier-ignore
const ExtendsMapping = (values) => {
    return values.length === 6
        ? [values[1], values[3], values[5]]
        : [];
};
// prettier-ignore
const Extends = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Const('extends'), index_1.Runtime.Ref('Type'), index_1.Runtime.Const(Question), index_1.Runtime.Ref('Type'), index_1.Runtime.Const(Colon), index_1.Runtime.Ref('Type')]),
    index_1.Runtime.Tuple([])
], ExtendsMapping);
// ------------------------------------------------------------------
// Base
// ------------------------------------------------------------------
// prettier-ignore
const BaseMapping = (values) => {
    return values.length === 3 ? values[1] : values[0];
};
// prettier-ignore
const Base = index_1.Runtime.Union([
    index_1.Runtime.Tuple([
        index_1.Runtime.Const(LParen),
        index_1.Runtime.Ref('Type'),
        index_1.Runtime.Const(RParen)
    ]),
    index_1.Runtime.Tuple([index_1.Runtime.Union([
            index_1.Runtime.Ref('Literal'),
            index_1.Runtime.Ref('Keyword'),
            index_1.Runtime.Ref('Object'),
            index_1.Runtime.Ref('Tuple'),
            index_1.Runtime.Ref('Constructor'),
            index_1.Runtime.Ref('Function'),
            index_1.Runtime.Ref('Mapped'),
            index_1.Runtime.Ref('AsyncIterator'),
            index_1.Runtime.Ref('Iterator'),
            index_1.Runtime.Ref('ConstructorParameters'),
            index_1.Runtime.Ref('FunctionParameters'),
            index_1.Runtime.Ref('InstanceType'),
            index_1.Runtime.Ref('ReturnType'),
            index_1.Runtime.Ref('Awaited'),
            index_1.Runtime.Ref('Array'),
            index_1.Runtime.Ref('Record'),
            index_1.Runtime.Ref('Promise'),
            index_1.Runtime.Ref('Partial'),
            index_1.Runtime.Ref('Required'),
            index_1.Runtime.Ref('Pick'),
            index_1.Runtime.Ref('Omit'),
            index_1.Runtime.Ref('Exclude'),
            index_1.Runtime.Ref('Extract'),
            index_1.Runtime.Ref('Uppercase'),
            index_1.Runtime.Ref('Lowercase'),
            index_1.Runtime.Ref('Capitalize'),
            index_1.Runtime.Ref('Uncapitalize'),
            index_1.Runtime.Ref('Date'),
            index_1.Runtime.Ref('Uint8Array'),
            index_1.Runtime.Ref('Reference')
        ])])
], BaseMapping);
// ------------------------------------------------------------------
// Factor
// ------------------------------------------------------------------
// prettier-ignore
const FactorExtends = (Type, Extends) => {
    return Extends.length === 3
        ? Types.Extends(Type, Extends[0], Extends[1], Extends[2])
        : Type;
};
// prettier-ignore
const FactorIndexArray = (Type, IndexArray) => {
    const [Left, Right] = DestructureRight(IndexArray);
    return (!Types.ValueGuard.IsUndefined(Right) ? (Right.length === 1 ? Types.Index(FactorIndexArray(Type, Left), Right[0]) :
        Right.length === 0 ? Types.Array(FactorIndexArray(Type, Left)) :
            Types.Never()) : Type);
};
// prettier-ignore
const FactorMapping = (KeyOf, Type, IndexArray, Extends) => {
    return KeyOf
        ? FactorExtends(Types.KeyOf(FactorIndexArray(Type, IndexArray)), Extends)
        : FactorExtends(FactorIndexArray(Type, IndexArray), Extends);
};
// prettier-ignore
const Factor = index_1.Runtime.Tuple([
    index_1.Runtime.Ref('KeyOf'),
    index_1.Runtime.Ref('Base'),
    index_1.Runtime.Ref('IndexArray'),
    index_1.Runtime.Ref('Extends')
], values => FactorMapping(...values));
// ------------------------------------------------------------------
// Expr
// ------------------------------------------------------------------
// prettier-ignore
function ExprBinaryMapping(Left, Rest) {
    return (Rest.length === 3 ? (() => {
        const [Operator, Right, Next] = Rest;
        const Schema = ExprBinaryMapping(Right, Next);
        if (Operator === '&') {
            return Types.TypeGuard.IsIntersect(Schema)
                ? Types.Intersect([Left, ...Schema.allOf])
                : Types.Intersect([Left, Schema]);
        }
        if (Operator === '|') {
            return Types.TypeGuard.IsUnion(Schema)
                ? Types.Union([Left, ...Schema.anyOf])
                : Types.Union([Left, Schema]);
        }
        throw 1;
    })() : Left);
}
// prettier-ignore
const ExprTermTail = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Const('&'), index_1.Runtime.Ref('Factor'), index_1.Runtime.Ref('ExprTermTail')]),
    index_1.Runtime.Tuple([])
]);
// prettier-ignore
const ExprTerm = index_1.Runtime.Tuple([
    index_1.Runtime.Ref('Factor'), index_1.Runtime.Ref('ExprTermTail')
], value => ExprBinaryMapping(...value));
// prettier-ignore
const ExprTail = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Const('|'), index_1.Runtime.Ref('ExprTerm'), index_1.Runtime.Ref('ExprTail')]),
    index_1.Runtime.Tuple([])
]);
// prettier-ignore
const Expr = index_1.Runtime.Tuple([
    index_1.Runtime.Ref('ExprTerm'), index_1.Runtime.Ref('ExprTail')
], value => ExprBinaryMapping(...value));
// ------------------------------------------------------------------
// Type
// ------------------------------------------------------------------
const Type = index_1.Runtime.Ref('Expr');
// ------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------
// prettier-ignore
const PropertyKey = index_1.Runtime.Union([index_1.Runtime.Ident(), index_1.Runtime.String([SingleQuote, DoubleQuote])]);
// prettier-ignore
const PropertyReadonly = index_1.Runtime.Union([index_1.Runtime.Tuple([index_1.Runtime.Const('readonly')]), index_1.Runtime.Tuple([])], value => value.length > 0);
// prettier-ignore
const PropertyOptional = index_1.Runtime.Union([index_1.Runtime.Tuple([index_1.Runtime.Const(Question)]), index_1.Runtime.Tuple([])], value => value.length > 0);
// prettier-ignore
const PropertyMapping = (Readonly, Key, Optional, _, Type) => ({
    [Key]: (Readonly && Optional ? Types.ReadonlyOptional(Type) :
        Readonly && !Optional ? Types.Readonly(Type) :
            !Readonly && Optional ? Types.Optional(Type) :
                Type)
});
// prettier-ignore
const Property = index_1.Runtime.Tuple([
    index_1.Runtime.Ref('PropertyReadonly'),
    index_1.Runtime.Ref('PropertyKey'),
    index_1.Runtime.Ref('PropertyOptional'),
    index_1.Runtime.Const(Colon),
    index_1.Runtime.Ref('Type'),
], value => PropertyMapping(...value));
// prettier-ignore
const PropertyDelimiter = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Const(Comma), index_1.Runtime.Const(Newline)]),
    index_1.Runtime.Tuple([index_1.Runtime.Const(SemiColon), index_1.Runtime.Const(Newline)]),
    index_1.Runtime.Tuple([index_1.Runtime.Const(Comma)]),
    index_1.Runtime.Tuple([index_1.Runtime.Const(SemiColon)]),
    index_1.Runtime.Tuple([index_1.Runtime.Const(Newline)]),
]);
// prettier-ignore
const Properties = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Property'), index_1.Runtime.Ref('PropertyDelimiter'), index_1.Runtime.Ref('Properties')]),
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Property'), index_1.Runtime.Ref('PropertyDelimiter')]),
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Property')]),
    index_1.Runtime.Tuple([])
], values => (values.length === 3 ? [values[0], ...values[2]] :
    values.length === 2 ? [values[0]] :
        values.length === 1 ? [values[0]] :
            []));
// ------------------------------------------------------------------
// Object
// ------------------------------------------------------------------
// prettier-ignore
const ObjectMapping = (values) => Types.Object(values.reduce((properties, record) => {
    return { ...properties, ...record };
}, {}));
// prettier-ignore
const _Object = index_1.Runtime.Tuple([
    index_1.Runtime.Const(LBrace),
    index_1.Runtime.Ref('Properties'),
    index_1.Runtime.Const(RBrace)
], values => ObjectMapping(values[1]));
// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
// prettier-ignore
const Elements = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Type'), index_1.Runtime.Const(Comma), index_1.Runtime.Ref('Elements')]),
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Type'), index_1.Runtime.Const(Comma)]),
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Type')]),
    index_1.Runtime.Tuple([]),
], value => (value.length === 3 ? [value[0], ...value[2]] :
    value.length === 2 ? [value[0]] :
        value.length === 1 ? [value[0]] :
            []));
// prettier-ignore
const Tuple = index_1.Runtime.Tuple([
    index_1.Runtime.Const(LBracket),
    index_1.Runtime.Ref('Elements'),
    index_1.Runtime.Const(RBracket)
], value => Types.Tuple(value[1]));
// ------------------------------------------------------------------
// Parameters
// ------------------------------------------------------------------
// prettier-ignore
const Parameter = index_1.Runtime.Tuple([
    index_1.Runtime.Ident(), index_1.Runtime.Const(Colon), index_1.Runtime.Ref('Type')
], value => value[2]);
// prettier-ignore
const Parameters = index_1.Runtime.Union([
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Parameter'), index_1.Runtime.Const(Comma), index_1.Runtime.Ref('Parameters')]),
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Parameter'), index_1.Runtime.Const(Comma)]),
    index_1.Runtime.Tuple([index_1.Runtime.Ref('Parameter')]),
    index_1.Runtime.Tuple([]),
], value => (value.length === 3 ? [value[0], ...value[2]] :
    value.length === 2 ? [value[0]] :
        value.length === 1 ? [value[0]] :
            []));
// ------------------------------------------------------------------
// Constructor
// ------------------------------------------------------------------
// prettier-ignore
const Constructor = index_1.Runtime.Tuple([
    index_1.Runtime.Const('new'),
    index_1.Runtime.Const(LParen),
    index_1.Runtime.Ref('Parameters'),
    index_1.Runtime.Const(RParen),
    index_1.Runtime.Const('=>'),
    index_1.Runtime.Ref('Type')
], value => Types.Constructor(value[2], value[5]));
// ------------------------------------------------------------------
// Function
// ------------------------------------------------------------------
// prettier-ignore
const Function = index_1.Runtime.Tuple([
    index_1.Runtime.Const(LParen),
    index_1.Runtime.Ref('Parameters'),
    index_1.Runtime.Const(RParen),
    index_1.Runtime.Const('=>'),
    index_1.Runtime.Ref('Type')
], value => Types.Function(value[1], value[4]));
// ------------------------------------------------------------------
// Mapped (requires deferred types)
// ------------------------------------------------------------------
// prettier-ignore
const MappedMapping = (values) => {
    return Types.Literal('Mapped types not supported');
};
// prettier-ignore
const Mapped = index_1.Runtime.Tuple([
    index_1.Runtime.Const(LBrace), index_1.Runtime.Const(LBracket), index_1.Runtime.Ident(), index_1.Runtime.Const('in'), index_1.Runtime.Ref('Type'), index_1.Runtime.Const(RBracket), index_1.Runtime.Const(Colon), index_1.Runtime.Ref('Type'), index_1.Runtime.Const(RBrace)
], MappedMapping);
// ------------------------------------------------------------------
// AsyncIterator
// ------------------------------------------------------------------
// prettier-ignore
const AsyncIterator = index_1.Runtime.Tuple([
    index_1.Runtime.Const('AsyncIterator'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.AsyncIterator(value[2]));
// ------------------------------------------------------------------
// Iterator
// ------------------------------------------------------------------
// prettier-ignore
const Iterator = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Iterator'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.Iterator(value[2]));
// ------------------------------------------------------------------
// ConstructorParameters
// ------------------------------------------------------------------
// prettier-ignore
const ConstructorParameters = index_1.Runtime.Tuple([
    index_1.Runtime.Const('ConstructorParameters'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.ConstructorParameters(value[2]));
// ------------------------------------------------------------------
// Parameters
// ------------------------------------------------------------------
// prettier-ignore
const FunctionParameters = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Parameters'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.Parameters(value[2]));
// ------------------------------------------------------------------
// InstanceType
// ------------------------------------------------------------------
// prettier-ignore
const InstanceType = index_1.Runtime.Tuple([
    index_1.Runtime.Const('InstanceType'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.InstanceType(value[2]));
// ------------------------------------------------------------------
// ReturnType
// ------------------------------------------------------------------
// prettier-ignore
const ReturnType = index_1.Runtime.Tuple([
    index_1.Runtime.Const('ReturnType'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.ReturnType(value[2]));
// ------------------------------------------------------------------
// Awaited
// ------------------------------------------------------------------
// prettier-ignore
const Awaited = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Awaited'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.Awaited(value[2]));
// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
// prettier-ignore
const Array = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Array'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.Array(value[2]));
// ------------------------------------------------------------------
// Record
// ------------------------------------------------------------------
// prettier-ignore
const Record = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Record'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(Comma),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.Record(value[2], value[4]));
// ------------------------------------------------------------------
// Promise
// ------------------------------------------------------------------
// prettier-ignore
const Promise = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Promise'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.Promise(value[2]));
// ------------------------------------------------------------------
// Partial
// ------------------------------------------------------------------
// prettier-ignore
const Partial = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Partial'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.Partial(value[2]));
// ------------------------------------------------------------------
// Required
// ------------------------------------------------------------------
// prettier-ignore
const Required = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Required'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.Required(value[2]));
// ------------------------------------------------------------------
// Pick
// ------------------------------------------------------------------
// prettier-ignore
const Pick = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Pick'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(Comma),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.Pick(value[2], value[4]));
// ------------------------------------------------------------------
// Omit
// ------------------------------------------------------------------
// prettier-ignore
const Omit = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Omit'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(Comma),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.Omit(value[2], value[4]));
// ------------------------------------------------------------------
// Exclude
// ------------------------------------------------------------------
// prettier-ignore
const Exclude = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Exclude'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(Comma),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.Exclude(value[2], value[4]));
// ------------------------------------------------------------------
// Extract
// ------------------------------------------------------------------
// prettier-ignore
const Extract = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Extract'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(Comma),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.Extract(value[2], value[4]));
// ------------------------------------------------------------------
// Uppercase
// ------------------------------------------------------------------
// prettier-ignore
const Uppercase = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Uppercase'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.Uppercase(value[2]));
// ------------------------------------------------------------------
// Lowercase
// ------------------------------------------------------------------
// prettier-ignore
const Lowercase = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Lowercase'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.Lowercase(value[2]));
// ------------------------------------------------------------------
// Capitalize
// ------------------------------------------------------------------
// prettier-ignore
const Capitalize = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Capitalize'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.Capitalize(value[2]));
// ------------------------------------------------------------------
// Uncapitalize
// ------------------------------------------------------------------
// prettier-ignore
const Uncapitalize = index_1.Runtime.Tuple([
    index_1.Runtime.Const('Uncapitalize'),
    index_1.Runtime.Const(LAngle),
    index_1.Runtime.Ref('Type'),
    index_1.Runtime.Const(RAngle),
], value => Types.Uncapitalize(value[2]));
// ------------------------------------------------------------------
// Date
// ------------------------------------------------------------------
const Date = index_1.Runtime.Const('Date', index_1.Runtime.As(Types.Date()));
// ------------------------------------------------------------------
// Uint8Array
// ------------------------------------------------------------------
const Uint8Array = index_1.Runtime.Const('Uint8Array', index_1.Runtime.As(Types.Uint8Array()));
// ------------------------------------------------------------------
// Module
// ------------------------------------------------------------------
// prettier-ignore
exports.Module = new index_1.Runtime.Module({
    Literal,
    Keyword,
    KeyOf,
    IndexArray,
    Extends,
    Base,
    Factor,
    ExprTermTail,
    ExprTerm,
    ExprTail,
    Expr,
    Type,
    PropertyKey,
    PropertyReadonly,
    PropertyOptional,
    Property,
    PropertyDelimiter,
    Properties,
    Object: _Object,
    Elements,
    Tuple,
    Parameter,
    Function,
    Parameters,
    Constructor,
    Mapped,
    AsyncIterator,
    Iterator,
    Awaited,
    Array,
    Record,
    Promise,
    ConstructorParameters,
    FunctionParameters,
    InstanceType,
    ReturnType,
    Partial,
    Required,
    Pick,
    Omit,
    Exclude,
    Extract,
    Uppercase,
    Lowercase,
    Capitalize,
    Uncapitalize,
    Date,
    Uint8Array,
    Reference
});
