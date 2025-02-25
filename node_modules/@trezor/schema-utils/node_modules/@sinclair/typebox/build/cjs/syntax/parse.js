"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Parse = Parse;
exports.ParseOnly = ParseOnly;
const type_1 = require("../type/create/type");
const runtime_1 = require("./runtime");
/** `[Experimental]` Parses a TypeBox type from TypeScript syntax. */
function Parse(...args) {
    return ParseOnly.apply(null, args);
}
/** `[Experimental]` Parses a TypeBox TSchema from TypeScript syntax. This function does not infer the type. */
function ParseOnly(...args) {
    const withContext = typeof args[0] === 'string' ? false : true;
    const [context, code, options] = withContext ? [args[0], args[1], args[2] || {}] : [{}, args[0], args[1] || {}];
    const type = runtime_1.Module.Parse('Type', code, context)[0];
    return (type !== undefined ? (0, type_1.CreateType)(type, options) : undefined);
}
