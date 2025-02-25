"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArrayType = parseArrayType;
exports.encodeData = encodeData;
exports.getFieldType = getFieldType;
const bigNumber_1 = require("@trezor/utils/lib/bigNumber");
const constants_1 = require("../../constants");
const formatUtils_1 = require("../../utils/formatUtils");
const paramTypeArray = new RegExp(/^(.*)\[([0-9]*)\]$/);
const paramTypeBytes = new RegExp(/^bytes([0-9]*)$/);
const paramTypeNumber = new RegExp(/^(u?int)([0-9]*)$/);
function parseArrayType(arrayTypeName) {
    const arrayMatch = paramTypeArray.exec(arrayTypeName);
    if (arrayMatch === null) {
        throw constants_1.ERRORS.TypedError('Runtime', `typename ${arrayTypeName} could not be parsed as an EIP-712 array`);
    }
    const [_, entryTypeName, arraySize] = arrayMatch;
    return {
        entryTypeName,
        arraySize: parseInt(arraySize, 10) || null,
    };
}
function twosComplement(number, bytes) {
    if (bytes < 1 || bytes > 32) {
        throw constants_1.ERRORS.TypedError('Runtime', 'Int byte size must be between 1 and 32 (8 and 256 bits)');
    }
    const minValue = new bigNumber_1.BigNumber(2).exponentiatedBy(bytes * 8 - 1).negated();
    const maxValue = minValue.negated().minus(1);
    const bigNumber = new bigNumber_1.BigNumber(number);
    if (bigNumber.isGreaterThan(maxValue) || bigNumber.isLessThan(minValue)) {
        throw constants_1.ERRORS.TypedError('Runtime', `Overflow when trying to convert number ${number} into ${bytes} bytes`);
    }
    if (bigNumber.isPositive()) {
        return bigNumber;
    }
    return bigNumber.minus(minValue).minus(minValue);
}
function intToHex(number, bytes, signed) {
    let bigNumber = new bigNumber_1.BigNumber(number);
    if (signed) {
        bigNumber = twosComplement(bigNumber, bytes);
    }
    if (bigNumber.isNegative()) {
        throw constants_1.ERRORS.TypedError('Runtime', `Cannot convert negative number to unsigned interger: ${number}`);
    }
    const hex = bigNumber.toString(16);
    const hexChars = bytes * 2;
    if (hex.length > hexChars) {
        throw constants_1.ERRORS.TypedError('Runtime', `Overflow when trying to convert number ${number} into ${bytes} bytes`);
    }
    return hex.padStart(bytes * 2, '0');
}
function encodeData(typeName, data) {
    if (paramTypeBytes.test(typeName) || typeName === 'address') {
        return (0, formatUtils_1.messageToHex)(data);
    }
    if (typeName === 'string') {
        return Buffer.from(data, 'utf-8').toString('hex');
    }
    const numberMatch = paramTypeNumber.exec(typeName);
    if (numberMatch) {
        const [_, intType, bits] = numberMatch;
        const bytes = Math.ceil(parseInt(bits, 10) / 8);
        return intToHex(data, bytes, intType === 'int');
    }
    if (typeName === 'bool') {
        return data ? '01' : '00';
    }
    throw constants_1.ERRORS.TypedError('Runtime', `Unsupported data type for direct field encoding: ${typeName}`);
}
const paramTypesMap = {
    string: constants_1.PROTO.EthereumDataType.STRING,
    bool: constants_1.PROTO.EthereumDataType.BOOL,
    address: constants_1.PROTO.EthereumDataType.ADDRESS,
};
function getFieldType(typeName, types) {
    const arrayMatch = paramTypeArray.exec(typeName);
    if (arrayMatch) {
        const [_, arrayItemTypeName, arraySize] = arrayMatch;
        const entryType = getFieldType(arrayItemTypeName, types);
        return {
            data_type: constants_1.PROTO.EthereumDataType.ARRAY,
            size: parseInt(arraySize, 10) || undefined,
            entry_type: entryType,
        };
    }
    const numberMatch = paramTypeNumber.exec(typeName);
    if (numberMatch) {
        const [_, type, bits] = numberMatch;
        return {
            data_type: type === 'uint' ? constants_1.PROTO.EthereumDataType.UINT : constants_1.PROTO.EthereumDataType.INT,
            size: Math.floor(parseInt(bits, 10) / 8),
        };
    }
    const bytesMatch = paramTypeBytes.exec(typeName);
    if (bytesMatch) {
        const [_, size] = bytesMatch;
        return {
            data_type: constants_1.PROTO.EthereumDataType.BYTES,
            size: parseInt(size, 10) || undefined,
        };
    }
    const fixedSizeTypeMatch = paramTypesMap[typeName];
    if (fixedSizeTypeMatch) {
        return {
            data_type: fixedSizeTypeMatch,
        };
    }
    if (typeName in types) {
        return {
            data_type: constants_1.PROTO.EthereumDataType.STRUCT,
            size: types[typeName].length,
            struct_name: typeName,
        };
    }
    throw constants_1.ERRORS.TypedError('Runtime', `No type definition specified: ${typeName}`);
}
//# sourceMappingURL=ethereumSignTypedData.js.map