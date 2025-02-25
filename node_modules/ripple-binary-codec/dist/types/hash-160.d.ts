import { Hash } from './hash';
import { Buffer } from 'buffer/';
/**
 * Hash with a width of 160 bits
 */
declare class Hash160 extends Hash {
    static readonly width = 20;
    static readonly ZERO_160: Hash160;
    constructor(bytes?: Buffer);
}
export { Hash160 };
