import * as Types from './types.mjs';
export declare class Module<Properties extends Types.IModuleProperties = Types.IModuleProperties> {
    private readonly properties;
    constructor(properties: Properties);
    /** Parses using one of the parsers defined on this instance */
    Parse<Key extends keyof Properties>(key: Key, code: string, context: unknown): [] | [Types.StaticParser<Properties[Key]>, string];
    /** Parses using one of the parsers defined on this instance */
    Parse<Key extends keyof Properties>(key: Key, code: string): [] | [Types.StaticParser<Properties[Key]>, string];
}
