"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepTransform = exports.messageToHex = exports.addHexPrefix = exports.stripHexPrefix = exports.hasHexPrefix = exports.btckb2satoshib = exports.formatTime = exports.formatAmount = void 0;
const bigNumber_1 = require("@trezor/utils/lib/bigNumber");
const formatAmount = (n, coinInfo) => `${new bigNumber_1.BigNumber(n).div(10 ** coinInfo.decimals).toString(10)} ${coinInfo.shortcut}`;
exports.formatAmount = formatAmount;
const formatTime = (n) => {
    if (!n || n <= 0)
        return 'No time estimate';
    const hours = Math.floor(n / 60);
    const minutes = n % 60;
    let res = '';
    if (hours !== 0) {
        res += `${hours} hour`;
        if (hours > 1) {
            res += 's';
        }
        res += ' ';
    }
    if (minutes !== 0) {
        res += `${minutes} minutes`;
    }
    return res;
};
exports.formatTime = formatTime;
const btckb2satoshib = (n) => new bigNumber_1.BigNumber(n).times(1e5).toFixed(0, bigNumber_1.BigNumber.ROUND_HALF_UP);
exports.btckb2satoshib = btckb2satoshib;
const hasHexPrefix = (str) => str.slice(0, 2).toLowerCase() === '0x';
exports.hasHexPrefix = hasHexPrefix;
const stripHexPrefix = (str) => ((0, exports.hasHexPrefix)(str) ? str.slice(2) : str);
exports.stripHexPrefix = stripHexPrefix;
const addHexPrefix = (str) => str !== undefined && !(0, exports.hasHexPrefix)(str) ? `0x${str}` : str;
exports.addHexPrefix = addHexPrefix;
const isHexString = (value, length) => {
    if (typeof value !== 'string' || !value.match(/^(0x|0X)?[0-9A-Fa-f]*$/)) {
        return false;
    }
    if (length && value.length !== 2 + 2 * length) {
        return false;
    }
    return true;
};
const messageToHex = (message) => {
    let buffer;
    if (isHexString(message)) {
        let clean = (0, exports.stripHexPrefix)(message);
        if (clean.length % 2 !== 0) {
            clean = `0${clean}`;
        }
        buffer = Buffer.from(clean, 'hex');
    }
    else {
        buffer = Buffer.from(message);
    }
    return buffer.toString('hex');
};
exports.messageToHex = messageToHex;
const deepTransform = (transform) => {
    const recursion = (value) => {
        if (typeof value === 'string') {
            return transform(value);
        }
        if (Array.isArray(value)) {
            return value.map(recursion);
        }
        if (value && typeof value === 'object') {
            return Object.entries(value).reduce((obj, [k, v]) => ({ ...obj, [k]: recursion(v) }), {});
        }
        return value;
    };
    return recursion;
};
exports.deepTransform = deepTransform;
//# sourceMappingURL=formatUtils.js.map