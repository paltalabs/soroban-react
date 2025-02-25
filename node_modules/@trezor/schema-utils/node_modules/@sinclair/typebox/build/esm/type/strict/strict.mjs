/**
 * @deprecated `[Json]` Omits compositing symbols from this schema. It is recommended
 * to use the JSON parse/stringify to remove compositing symbols if needed. This
 * is how Strict works internally.
 *
 * ```typescript
 * JSON.parse(JSON.stringify(Type.String()))
 * ```
 */
export function Strict(schema) {
    return JSON.parse(JSON.stringify(schema));
}
