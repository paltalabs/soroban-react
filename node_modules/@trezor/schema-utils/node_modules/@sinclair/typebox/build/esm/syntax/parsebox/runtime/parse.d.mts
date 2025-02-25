import * as Types from './types.mjs';
/** Parses content using the given parser */
export declare function Parse<Parser extends Types.IParser>(parser: Parser, properties: Types.IModuleProperties, code: string, context: unknown): [] | [Types.StaticParser<Parser>, string];
/** Parses content using the given parser */
export declare function Parse<Parser extends Types.IParser>(parser: Parser, properties: Types.IModuleProperties, code: string): [] | [Types.StaticParser<Parser>, string];
/** Parses content using the given parser */
export declare function Parse<Parser extends Types.IParser>(parser: Parser, code: string, context: unknown): [] | [Types.StaticParser<Parser>, string];
/** Parses content using the given parser */
export declare function Parse<Parser extends Types.IParser>(parser: Parser, code: string): [] | [Types.StaticParser<Parser>, string];
