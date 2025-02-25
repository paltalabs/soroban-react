"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Parse = Parse;
const Guard = require("./guard");
const Token = require("./token");
// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
// prettier-ignore
function ParseTuple(parsers, properties, code, context) {
    const buffer = [];
    let rest = code;
    for (const parser of parsers) {
        const result = ParseParser(parser, properties, rest, context);
        if (result.length === 0)
            return [];
        buffer.push(result[0]);
        rest = result[1];
    }
    return [buffer, rest];
}
// ------------------------------------------------------------------
// Union
// ------------------------------------------------------------------
// prettier-ignore
function ParseUnion(parsers, properties, code, context) {
    for (const parser of parsers) {
        const result = ParseParser(parser, properties, code, context);
        if (result.length === 0)
            continue;
        return result;
    }
    return [];
}
// ------------------------------------------------------------------
// Const
// ------------------------------------------------------------------
// prettier-ignore
function ParseConst(value, code, context) {
    return Token.Const(value, code);
}
// ------------------------------------------------------------------
// Ref
// ------------------------------------------------------------------
// prettier-ignore
function ParseRef(ref, properties, code, context) {
    const parser = properties[ref];
    if (!Guard.IsParser(parser))
        throw Error(`Cannot dereference parser '${ref}'`);
    return ParseParser(parser, properties, code, context);
}
// ------------------------------------------------------------------
// String
// ------------------------------------------------------------------
// prettier-ignore
function ParseString(options, code, _context) {
    return Token.String(options, code);
}
// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
// prettier-ignore
function ParseNumber(code, _context) {
    return Token.Number(code);
}
// ------------------------------------------------------------------
// Ident
// ------------------------------------------------------------------
// prettier-ignore
function ParseIdent(code, _context) {
    return Token.Ident(code);
}
// ------------------------------------------------------------------
// Parser
// ------------------------------------------------------------------
// prettier-ignore
function ParseParser(parser, properties, code, context) {
    const result = (Guard.IsTuple(parser) ? ParseTuple(parser.parsers, properties, code, context) :
        Guard.IsUnion(parser) ? ParseUnion(parser.parsers, properties, code, context) :
            Guard.IsConst(parser) ? ParseConst(parser.value, code, context) :
                Guard.IsRef(parser) ? ParseRef(parser.ref, properties, code, context) :
                    Guard.IsString(parser) ? ParseString(parser.options, code, context) :
                        Guard.IsIdent(parser) ? ParseIdent(code, context) :
                            Guard.IsNumber(parser) ? ParseNumber(code, context) :
                                []);
    return (result.length === 2
        ? [parser.mapping(result[0], context), result[1]]
        : result);
}
/** Parses content using the given parser */
// prettier-ignore
function Parse(...args) {
    const withProperties = typeof args[1] === 'string' ? false : true;
    const [parser, properties, code, context] = withProperties
        ? [args[0], args[1], args[2], args[3]]
        : [args[0], {}, args[1], args[2]];
    return ParseParser(parser, properties, code, context);
}
