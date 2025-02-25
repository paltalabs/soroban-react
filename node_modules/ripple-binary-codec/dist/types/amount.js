"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Amount = void 0;
const decimal_js_1 = require("decimal.js");
const binary_parser_1 = require("../serdes/binary-parser");
const account_id_1 = require("./account-id");
const currency_1 = require("./currency");
const serialized_type_1 = require("./serialized-type");
const bigInt = require("big-integer");
const buffer_1 = require("buffer/");
/**
 * Constants for validating amounts
 */
const MIN_IOU_EXPONENT = -96;
const MAX_IOU_EXPONENT = 80;
const MAX_IOU_PRECISION = 16;
const MAX_DROPS = new decimal_js_1.Decimal('1e17');
const MIN_XRP = new decimal_js_1.Decimal('1e-6');
const mask = bigInt(0x00000000ffffffff);
/**
 * decimal.js configuration for Amount IOUs
 */
decimal_js_1.Decimal.config({
    toExpPos: MAX_IOU_EXPONENT + MAX_IOU_PRECISION,
    toExpNeg: MIN_IOU_EXPONENT - MAX_IOU_PRECISION,
});
/**
 * Type guard for AmountObject
 */
function isAmountObject(arg) {
    const keys = Object.keys(arg).sort();
    return (keys.length === 3 &&
        keys[0] === 'currency' &&
        keys[1] === 'issuer' &&
        keys[2] === 'value');
}
/**
 * Class for serializing/Deserializing Amounts
 */
class Amount extends serialized_type_1.SerializedType {
    constructor(bytes) {
        super(bytes !== null && bytes !== void 0 ? bytes : Amount.defaultAmount.bytes);
    }
    /**
     * Construct an amount from an IOU or string amount
     *
     * @param value An Amount, object representing an IOU, or a string
     *     representing an integer amount
     * @returns An Amount object
     */
    static from(value) {
        if (value instanceof Amount) {
            return value;
        }
        let amount = buffer_1.Buffer.alloc(8);
        if (typeof value === 'string') {
            Amount.assertXrpIsValid(value);
            const number = bigInt(value);
            const intBuf = [buffer_1.Buffer.alloc(4), buffer_1.Buffer.alloc(4)];
            intBuf[0].writeUInt32BE(Number(number.shiftRight(32)), 0);
            intBuf[1].writeUInt32BE(Number(number.and(mask)), 0);
            amount = buffer_1.Buffer.concat(intBuf);
            amount[0] |= 0x40;
            return new Amount(amount);
        }
        if (isAmountObject(value)) {
            const number = new decimal_js_1.Decimal(value.value);
            Amount.assertIouIsValid(number);
            if (number.isZero()) {
                amount[0] |= 0x80;
            }
            else {
                const integerNumberString = number
                    .times(`1e${-(number.e - 15)}`)
                    .abs()
                    .toString();
                const num = bigInt(integerNumberString);
                const intBuf = [buffer_1.Buffer.alloc(4), buffer_1.Buffer.alloc(4)];
                intBuf[0].writeUInt32BE(Number(num.shiftRight(32)), 0);
                intBuf[1].writeUInt32BE(Number(num.and(mask)), 0);
                amount = buffer_1.Buffer.concat(intBuf);
                amount[0] |= 0x80;
                if (number.gt(new decimal_js_1.Decimal(0))) {
                    amount[0] |= 0x40;
                }
                const exponent = number.e - 15;
                const exponentByte = 97 + exponent;
                amount[0] |= exponentByte >>> 2;
                amount[1] |= (exponentByte & 0x03) << 6;
            }
            const currency = currency_1.Currency.from(value.currency).toBytes();
            const issuer = account_id_1.AccountID.from(value.issuer).toBytes();
            return new Amount(buffer_1.Buffer.concat([amount, currency, issuer]));
        }
        throw new Error('Invalid type to construct an Amount');
    }
    /**
     * Read an amount from a BinaryParser
     *
     * @param parser BinaryParser to read the Amount from
     * @returns An Amount object
     */
    static fromParser(parser) {
        const isXRP = parser.peek() & 0x80;
        const numBytes = isXRP ? 48 : 8;
        return new Amount(parser.read(numBytes));
    }
    /**
     * Get the JSON representation of this Amount
     *
     * @returns the JSON interpretation of this.bytes
     */
    toJSON() {
        if (this.isNative()) {
            const bytes = this.bytes;
            const isPositive = bytes[0] & 0x40;
            const sign = isPositive ? '' : '-';
            bytes[0] &= 0x3f;
            const msb = bigInt(bytes.slice(0, 4).readUInt32BE(0));
            const lsb = bigInt(bytes.slice(4).readUInt32BE(0));
            const num = msb.shiftLeft(32).or(lsb);
            return `${sign}${num.toString()}`;
        }
        else {
            const parser = new binary_parser_1.BinaryParser(this.toString());
            const mantissa = parser.read(8);
            const currency = currency_1.Currency.fromParser(parser);
            const issuer = account_id_1.AccountID.fromParser(parser);
            const b1 = mantissa[0];
            const b2 = mantissa[1];
            const isPositive = b1 & 0x40;
            const sign = isPositive ? '' : '-';
            const exponent = ((b1 & 0x3f) << 2) + ((b2 & 0xff) >> 6) - 97;
            mantissa[0] = 0;
            mantissa[1] &= 0x3f;
            const value = new decimal_js_1.Decimal(`${sign}0x${mantissa.toString('hex')}`).times(`1e${exponent}`);
            Amount.assertIouIsValid(value);
            return {
                value: value.toString(),
                currency: currency.toJSON(),
                issuer: issuer.toJSON(),
            };
        }
    }
    /**
     * Validate XRP amount
     *
     * @param amount String representing XRP amount
     * @returns void, but will throw if invalid amount
     */
    static assertXrpIsValid(amount) {
        if (amount.indexOf('.') !== -1) {
            throw new Error(`${amount.toString()} is an illegal amount`);
        }
        const decimal = new decimal_js_1.Decimal(amount);
        if (!decimal.isZero()) {
            if (decimal.lt(MIN_XRP) || decimal.gt(MAX_DROPS)) {
                throw new Error(`${amount.toString()} is an illegal amount`);
            }
        }
    }
    /**
     * Validate IOU.value amount
     *
     * @param decimal Decimal.js object representing IOU.value
     * @returns void, but will throw if invalid amount
     */
    static assertIouIsValid(decimal) {
        if (!decimal.isZero()) {
            const p = decimal.precision();
            const e = decimal.e - 15;
            if (p > MAX_IOU_PRECISION ||
                e > MAX_IOU_EXPONENT ||
                e < MIN_IOU_EXPONENT) {
                throw new Error('Decimal precision out of range');
            }
            this.verifyNoDecimal(decimal);
        }
    }
    /**
     * Ensure that the value after being multiplied by the exponent does not
     * contain a decimal.
     *
     * @param decimal a Decimal object
     * @returns a string of the object without a decimal
     */
    static verifyNoDecimal(decimal) {
        const integerNumberString = decimal
            .times(`1e${-(decimal.e - 15)}`)
            .abs()
            .toString();
        if (integerNumberString.indexOf('.') !== -1) {
            throw new Error('Decimal place found in integerNumberString');
        }
    }
    /**
     * Test if this amount is in units of Native Currency(XRP)
     *
     * @returns true if Native (XRP)
     */
    isNative() {
        return (this.bytes[0] & 0x80) === 0;
    }
}
exports.Amount = Amount;
Amount.defaultAmount = new Amount(buffer_1.Buffer.from('4000000000000000', 'hex'));
//# sourceMappingURL=amount.js.map