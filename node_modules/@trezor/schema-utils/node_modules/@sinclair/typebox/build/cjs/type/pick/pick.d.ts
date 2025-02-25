import type { TSchema, SchemaOptions } from '../schema/index';
import type { TupleToUnion, Evaluate, Ensure } from '../helpers/index';
import { type TRecursive } from '../recursive/index';
import { type TIntersect } from '../intersect/index';
import { type TUnion } from '../union/index';
import { type TObject, type TProperties } from '../object/index';
import type { TMappedKey, TMappedResult } from '../mapped/index';
import { type TIndexPropertyKeys } from '../indexed/index';
import { type TPickFromMappedKey } from './pick-from-mapped-key';
import { type TPickFromMappedResult } from './pick-from-mapped-result';
type FromIntersect<T extends TSchema[], K extends PropertyKey[], Acc extends TSchema[] = []> = T extends [infer L extends TSchema, ...infer R extends TSchema[]] ? FromIntersect<R, K, [...Acc, TPick<L, K>]> : Acc;
declare function FromIntersect<T extends TSchema[], K extends PropertyKey[]>(T: T, K: K): FromIntersect<T, K>;
type FromUnion<T extends TSchema[], K extends PropertyKey[], Acc extends TSchema[] = []> = T extends [infer L extends TSchema, ...infer R extends TSchema[]] ? FromUnion<R, K, [...Acc, TPick<L, K>]> : Acc;
declare function FromUnion<T extends TSchema[], K extends PropertyKey[]>(T: T, K: K): FromUnion<T, K>;
type TFromProperties<T extends TProperties, K extends PropertyKey[], I extends PropertyKey = TupleToUnion<K>> = Evaluate<Pick<T, I & keyof T>>;
type TFromObject<T extends TObject, K extends PropertyKey[], Properties extends TProperties = T['properties']> = Ensure<TObject<(TFromProperties<Properties, K>)>>;
export type TPick<T extends TProperties, K extends PropertyKey[]> = T extends TRecursive<infer S extends TSchema> ? TRecursive<TPick<S, K>> : T extends TIntersect<infer S extends TSchema[]> ? TIntersect<FromIntersect<S, K>> : T extends TUnion<infer S extends TSchema[]> ? TUnion<FromUnion<S, K>> : T extends TObject<infer S extends TProperties> ? TFromObject<TObject<S>, K> : TObject<{}>;
/** `[Json]` Constructs a type whose keys are picked from the given type */
export declare function Pick<T extends TMappedResult, K extends PropertyKey[]>(T: T, K: [...K], options?: SchemaOptions): TPickFromMappedResult<T, K>;
/** `[Json]` Constructs a type whose keys are picked from the given type */
export declare function Pick<T extends TSchema, K extends TMappedKey>(T: T, K: K, options?: SchemaOptions): TPickFromMappedKey<T, K>;
/** `[Json]` Constructs a type whose keys are picked from the given type */
export declare function Pick<T extends TSchema, K extends TSchema, I extends PropertyKey[] = TIndexPropertyKeys<K>>(T: T, K: K, options?: SchemaOptions): TPick<T, I>;
/** `[Json]` Constructs a type whose keys are picked from the given type */
export declare function Pick<T extends TSchema, K extends PropertyKey[]>(T: T, K: readonly [...K], options?: SchemaOptions): TPick<T, K>;
export {};
