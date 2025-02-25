import { BytesList, BinaryParser } from '../binary';
import { Buffer } from 'buffer/';
export declare class Bytes {
    readonly name: string;
    readonly ordinal: number;
    readonly ordinalWidth: number;
    readonly bytes: Buffer;
    constructor(name: string, ordinal: number, ordinalWidth: number);
    toJSON(): string;
    toBytesSink(sink: BytesList): void;
    toBytes(): Uint8Array;
}
export declare class BytesLookup {
    readonly ordinalWidth: number;
    constructor(types: Record<string, number>, ordinalWidth: number);
    /**
     * Add a new name value pair to the BytesLookup.
     *
     * @param name - A human readable name for the field.
     * @param value - The numeric value for the field.
     * @throws if the name or value already exist in the lookup because it's unclear how to decode.
     */
    add(name: string, value: number): void;
    from(value: Bytes | string): Bytes;
    fromParser(parser: BinaryParser): Bytes;
}
