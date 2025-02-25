import { TSchema } from '../../type/schema/index';
import { StaticDecode } from '../../type/static/index';
/** Parses a value or throws an `AssertError` if invalid. */
export declare function Parse<T extends TSchema, R = StaticDecode<T>>(schema: T, references: TSchema[], value: unknown): R;
/** Parses a value or throws an `AssertError` if invalid. */
export declare function Parse<T extends TSchema, R = StaticDecode<T>>(schema: T, value: unknown): R;
