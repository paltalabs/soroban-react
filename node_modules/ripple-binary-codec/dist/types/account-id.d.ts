import { Hash160 } from './hash-160';
import { Buffer } from 'buffer/';
/**
 * Class defining how to encode and decode an AccountID
 */
declare class AccountID extends Hash160 {
    static readonly defaultAccountID: AccountID;
    constructor(bytes?: Buffer);
    /**
     * Defines how to construct an AccountID
     *
     * @param value either an existing AccountID, a hex-string, or a base58 r-Address
     * @returns an AccountID object
     */
    static from<T extends Hash160 | string>(value: T): AccountID;
    /**
     * Defines how to build an AccountID from a base58 r-Address
     *
     * @param value a base58 r-Address
     * @returns an AccountID object
     */
    static fromBase58(value: string): AccountID;
    /**
     * Overload of toJSON
     *
     * @returns the base58 string for this AccountID
     */
    toJSON(): string;
    /**
     * Defines how to encode AccountID into a base58 address
     *
     * @returns the base58 string defined by this.bytes
     */
    toBase58(): string;
}
export { AccountID };
