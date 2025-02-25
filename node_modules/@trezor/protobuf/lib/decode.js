"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = void 0;
exports.messageToJSON = messageToJSON;
const tslib_1 = require("tslib");
const utils_1 = require("./utils");
const transform = (field, value) => {
    if ((0, utils_1.isPrimitiveField)(field.type)) {
        if (field.optional && typeof value === 'undefined') {
            return null;
        }
        if (field.type === 'bytes') {
            return Buffer.from(value).toString('hex');
        }
        if (field.long) {
            if (Number.isSafeInteger(value.toNumber())) {
                return value.toNumber();
            }
            return value.toString();
        }
        return value;
    }
    if ('valuesById' in field.resolvedType) {
        return field.resolvedType.valuesById[value];
    }
    if (field.resolvedType.fields) {
        return messageToJSON(value, field.resolvedType.fields);
    }
    throw new Error(`transport: decode: case not handled: ${field}`);
};
function messageToJSON(MessageParam, fields) {
    if (!MessageParam) {
        return {};
    }
    const message = tslib_1.__rest(MessageParam, []);
    const res = {};
    Object.keys(fields).forEach(key => {
        const field = fields[key];
        const value = message[key];
        if (field.repeated) {
            res[key] = value.map((v) => transform(field, v));
        }
        else {
            res[key] = transform(field, value);
        }
    });
    return res;
}
const decode = (MessageParam, data) => {
    const decoded = MessageParam.decode(new Uint8Array(data));
    return messageToJSON(decoded, decoded.$type.fields);
};
exports.decode = decode;
//# sourceMappingURL=decode.js.map