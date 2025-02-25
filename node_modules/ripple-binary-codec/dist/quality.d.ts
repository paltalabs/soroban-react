import { Decimal } from 'decimal.js';
import { Buffer } from 'buffer/';
/**
 * class for encoding and decoding quality
 */
declare class quality {
    /**
     * Encode quality amount
     *
     * @param arg string representation of an amount
     * @returns Serialized quality
     */
    static encode(quality: string): Buffer;
    /**
     * Decode quality amount
     *
     * @param arg hex-string denoting serialized quality
     * @returns deserialized quality
     */
    static decode(quality: string): Decimal;
}
export { quality };
