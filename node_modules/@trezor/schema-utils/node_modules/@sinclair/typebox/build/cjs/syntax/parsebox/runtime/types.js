"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.As = exports.Identity = void 0;
exports.Tuple = Tuple;
exports.Union = Union;
exports.Const = Const;
exports.Ref = Ref;
exports.String = String;
exports.Ident = Ident;
exports.Number = Number;
/** Maps input to output. This is the default Mapping */
const Identity = (value) => value;
exports.Identity = Identity;
/** Maps the output as the given parameter T */
const As = (mapping) => (_) => mapping;
exports.As = As;
function Tuple(...args) {
    const [parsers, mapping] = args.length === 2 ? [args[0], args[1]] : [args[0], exports.Identity];
    return { type: 'Tuple', parsers, mapping };
}
function Union(...args) {
    const [parsers, mapping] = args.length === 2 ? [args[0], args[1]] : [args[0], exports.Identity];
    return { type: 'Union', parsers, mapping };
}
function Const(...args) {
    const [value, mapping] = args.length === 2 ? [args[0], args[1]] : [args[0], exports.Identity];
    return { type: 'Const', value, mapping };
}
function Ref(...args) {
    const [ref, mapping] = args.length === 2 ? [args[0], args[1]] : [args[0], exports.Identity];
    return { type: 'Ref', ref, mapping };
}
function String(...params) {
    const [options, mapping] = params.length === 2 ? [params[0], params[1]] : [params[0], exports.Identity];
    return { type: 'String', options, mapping };
}
function Ident(...params) {
    const mapping = params.length === 1 ? params[0] : exports.Identity;
    return { type: 'Ident', mapping };
}
function Number(...params) {
    const mapping = params.length === 1 ? params[0] : exports.Identity;
    return { type: 'Number', mapping };
}
