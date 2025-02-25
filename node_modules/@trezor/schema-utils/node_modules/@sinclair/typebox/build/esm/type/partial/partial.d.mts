import type { TSchema, SchemaOptions } from '../schema/index.mjs';
import type { Evaluate, Ensure } from '../helpers/index.mjs';
import type { TMappedResult } from '../mapped/index.mjs';
import { type TReadonlyOptional } from '../readonly-optional/index.mjs';
import { type TOptional } from '../optional/index.mjs';
import { type TReadonly } from '../readonly/index.mjs';
import { type TRecursive } from '../recursive/index.mjs';
import { type TObject, type TProperties } from '../object/index.mjs';
import { type TIntersect } from '../intersect/index.mjs';
import { type TUnion } from '../union/index.mjs';
import { type TPartialFromMappedResult } from './partial-from-mapped-result.mjs';
type TFromRest<T extends TSchema[], Acc extends TSchema[] = []> = (T extends [infer L extends TSchema, ...infer R extends TSchema[]] ? TFromRest<R, [...Acc, TPartial<L>]> : Acc);
type TFromProperties<T extends TProperties> = Evaluate<{
    [K in keyof T]: T[K] extends (TReadonlyOptional<infer S>) ? TReadonlyOptional<S> : T[K] extends (TReadonly<infer S>) ? TReadonlyOptional<S> : T[K] extends (TOptional<infer S>) ? TOptional<S> : TOptional<T[K]>;
}>;
type TFromObject<T extends TObject, Properties extends TProperties = T['properties']> = Ensure<TObject<(TFromProperties<Properties>)>>;
export type TPartial<T extends TSchema> = (T extends TRecursive<infer S extends TSchema> ? TRecursive<TPartial<S>> : T extends TIntersect<infer S extends TSchema[]> ? TIntersect<TFromRest<S>> : T extends TUnion<infer S extends TSchema[]> ? TUnion<TFromRest<S>> : T extends TObject<infer S extends TProperties> ? TFromObject<TObject<S>> : TObject<{}>);
/** `[Json]` Constructs a type where all properties are optional */
export declare function Partial<T extends TMappedResult>(T: T, options?: SchemaOptions): TPartialFromMappedResult<T>;
/** `[Json]` Constructs a type where all properties are optional */
export declare function Partial<T extends TSchema>(T: T, options?: SchemaOptions): TPartial<T>;
export {};
