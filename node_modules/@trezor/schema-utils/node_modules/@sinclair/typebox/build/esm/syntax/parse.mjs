import { CreateType } from '../type/create/type.mjs';
import { Module } from './runtime.mjs';
/** `[Experimental]` Parses a TypeBox type from TypeScript syntax. */
export function Parse(...args) {
    return ParseOnly.apply(null, args);
}
/** `[Experimental]` Parses a TypeBox TSchema from TypeScript syntax. This function does not infer the type. */
export function ParseOnly(...args) {
    const withContext = typeof args[0] === 'string' ? false : true;
    const [context, code, options] = withContext ? [args[0], args[1], args[2] || {}] : [{}, args[0], args[1] || {}];
    const type = Module.Parse('Type', code, context)[0];
    return (type !== undefined ? CreateType(type, options) : undefined);
}
