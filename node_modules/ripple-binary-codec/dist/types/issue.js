"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Issue = void 0;
const binary_parser_1 = require("../serdes/binary-parser");
const account_id_1 = require("./account-id");
const currency_1 = require("./currency");
const serialized_type_1 = require("./serialized-type");
const buffer_1 = require("buffer/");
/**
 * Type guard for AmountObject
 */
function isIssueObject(arg) {
    const keys = Object.keys(arg).sort();
    if (keys.length === 1) {
        return keys[0] === 'currency';
    }
    return keys.length === 2 && keys[0] === 'currency' && keys[1] === 'issuer';
}
/**
 * Class for serializing/Deserializing Amounts
 */
class Issue extends serialized_type_1.SerializedType {
    constructor(bytes) {
        super(bytes !== null && bytes !== void 0 ? bytes : Issue.ZERO_ISSUED_CURRENCY.bytes);
    }
    /**
     * Construct an amount from an IOU or string amount
     *
     * @param value An Amount, object representing an IOU, or a string
     *     representing an integer amount
     * @returns An Amount object
     */
    static from(value) {
        if (value instanceof Issue) {
            return value;
        }
        if (isIssueObject(value)) {
            const currency = currency_1.Currency.from(value.currency).toBytes();
            if (value.issuer == null) {
                return new Issue(currency);
            }
            const issuer = account_id_1.AccountID.from(value.issuer).toBytes();
            return new Issue(buffer_1.Buffer.concat([currency, issuer]));
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
        const currency = parser.read(20);
        if (new currency_1.Currency(currency).toJSON() === 'XRP') {
            return new Issue(currency);
        }
        const currencyAndIssuer = [currency, parser.read(20)];
        return new Issue(buffer_1.Buffer.concat(currencyAndIssuer));
    }
    /**
     * Get the JSON representation of this Amount
     *
     * @returns the JSON interpretation of this.bytes
     */
    toJSON() {
        const parser = new binary_parser_1.BinaryParser(this.toString());
        const currency = currency_1.Currency.fromParser(parser);
        if (currency.toJSON() === 'XRP') {
            return { currency: currency.toJSON() };
        }
        const issuer = account_id_1.AccountID.fromParser(parser);
        return {
            currency: currency.toJSON(),
            issuer: issuer.toJSON(),
        };
    }
}
exports.Issue = Issue;
Issue.ZERO_ISSUED_CURRENCY = new Issue(buffer_1.Buffer.alloc(20));
//# sourceMappingURL=issue.js.map