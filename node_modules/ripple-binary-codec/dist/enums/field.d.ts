import { Bytes } from './bytes';
import { SerializedType } from '../types/serialized-type';
import { Buffer } from 'buffer/';
/**
 * Encoding information for a rippled field, often used in transactions.
 * See the enums [README.md](https://github.com/XRPLF/xrpl.js/tree/main/packages/ripple-binary-codec/src/enums) for more details on what each means.
 */
export interface FieldInfo {
    nth: number;
    isVLEncoded: boolean;
    isSerialized: boolean;
    isSigningField: boolean;
    type: string;
}
export interface FieldInstance {
    readonly nth: number;
    readonly isVariableLengthEncoded: boolean;
    readonly isSerialized: boolean;
    readonly isSigningField: boolean;
    readonly type: Bytes;
    readonly ordinal: number;
    readonly name: string;
    readonly header: Buffer;
    readonly associatedType: typeof SerializedType;
}
export declare class FieldLookup {
    constructor(fields: Array<[string, FieldInfo]>, types: Record<string, number>);
    fromString(value: string): FieldInstance;
}
