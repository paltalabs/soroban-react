import { Hash160 } from './hash-160';
import { Buffer } from 'buffer/';
/**
 * Class defining how to encode and decode Currencies
 */
declare class Currency extends Hash160 {
    static readonly XRP: Currency;
    private readonly _iso;
    constructor(byteBuf: Buffer);
    /**
     * Return the ISO code of this currency
     *
     * @returns ISO code if it exists, else null
     */
    iso(): string | null;
    /**
     * Constructs a Currency object
     *
     * @param val Currency object or a string representation of a currency
     */
    static from<T extends Hash160 | string>(value: T): Currency;
    /**
     * Gets the JSON representation of a currency
     *
     * @returns JSON representation
     */
    toJSON(): string;
}
export { Currency };
