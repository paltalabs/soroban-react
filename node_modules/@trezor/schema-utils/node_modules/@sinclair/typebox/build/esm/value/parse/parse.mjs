import { TransformDecode, HasTransform } from '../transform/index.mjs';
import { Assert } from '../assert/assert.mjs';
import { Default } from '../default/default.mjs';
import { Convert } from '../convert/convert.mjs';
import { Clean } from '../clean/clean.mjs';
import { Clone } from '../clone/index.mjs';
// prettier-ignore
const ParseReducer = [
    (_schema, _references, value) => Clone(value),
    (schema, references, value) => Default(schema, references, value),
    (schema, references, value) => Clean(schema, references, value),
    (schema, references, value) => Convert(schema, references, value),
    (schema, references, value) => { Assert(schema, references, value); return value; },
    (schema, references, value) => (HasTransform(schema, references) ? TransformDecode(schema, references, value) : value),
];
// ------------------------------------------------------------------
// ParseValue
// ------------------------------------------------------------------
function ParseValue(schema, references, value) {
    return ParseReducer.reduce((value, reducer) => reducer(schema, references, value), value);
}
/** Parses a value or throws an `AssertError` if invalid. */
export function Parse(...args) {
    return args.length === 3 ? ParseValue(args[0], args[1], args[2]) : ParseValue(args[0], [], args[1]);
}
