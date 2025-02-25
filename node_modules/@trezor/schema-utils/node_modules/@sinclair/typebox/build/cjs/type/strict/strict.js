"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Strict = Strict;
/**
 * @deprecated `[Json]` Omits compositing symbols from this schema. It is recommended
 * to use the JSON parse/stringify to remove compositing symbols if needed. This
 * is how Strict works internally.
 *
 * ```typescript
 * JSON.parse(JSON.stringify(Type.String()))
 * ```
 */
function Strict(schema) {
    return JSON.parse(JSON.stringify(schema));
}
