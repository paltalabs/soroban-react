import type { TSchema } from '../schema/index';
export type TStrict<T extends TSchema> = T;
/**
 * @deprecated `[Json]` Omits compositing symbols from this schema. It is recommended
 * to use the JSON parse/stringify to remove compositing symbols if needed. This
 * is how Strict works internally.
 *
 * ```typescript
 * JSON.parse(JSON.stringify(Type.String()))
 * ```
 */
export declare function Strict<T extends TSchema>(schema: T): TStrict<T>;
