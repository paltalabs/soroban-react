import { Static } from './parsebox/index.mjs';
import { TSchema, SchemaOptions } from '../type/schema/index.mjs';
import { StaticDecode } from '../type/static/index.mjs';
import { Type } from './static.mjs';
/** `[Experimental]` Infers a TypeBox type from TypeScript syntax. */
export type StaticParseAsSchema<Context extends Record<PropertyKey, TSchema>, Code extends string> = Static.Parse<Type, Code, Context>[0];
/** `[Experimental]` Infers a TypeScript type from TypeScript syntax. */
export type StaticParseAsType<Context extends Record<PropertyKey, TSchema>, Code extends string> = StaticParseAsSchema<Context, Code> extends infer Type extends TSchema ? StaticDecode<Type> : undefined;
/** `[Experimental]` Parses a TypeBox type from TypeScript syntax. */
export declare function Parse<Context extends Record<PropertyKey, TSchema>, Code extends string>(context: Context, code: Code, options?: SchemaOptions): StaticParseAsSchema<Context, Code>;
/** `[Experimental]` Parses a TypeBox type from TypeScript syntax. */
export declare function Parse<Code extends string>(code: Code, options?: SchemaOptions): StaticParseAsSchema<{}, Code>;
/** `[Experimental]` Parses a TypeBox TSchema from TypeScript syntax. This function does not infer the type. */
export declare function ParseOnly<Context extends Record<PropertyKey, TSchema>, Code extends string>(context: Context, code: Code, options?: SchemaOptions): TSchema | undefined;
/** `[Experimental]` Parses a TypeBox TSchema from TypeScript syntax */
export declare function ParseOnly<Code extends string>(code: Code, options?: SchemaOptions): TSchema | undefined;
