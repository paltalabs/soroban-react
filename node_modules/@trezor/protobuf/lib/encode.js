"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = void 0;
exports.patch = patch;
const light_1 = require("protobufjs/light");
const utils_1 = require("./utils");
const transform = (fieldType, value) => {
    if (fieldType === 'bytes') {
        if (typeof value === 'string' && !value)
            return value;
        return Buffer.from(value, 'hex');
    }
    if (typeof value === 'number' && !Number.isSafeInteger(value)) {
        throw new RangeError('field value is not within safe integer range');
    }
    return value;
};
function patch(Message, payload) {
    const patched = {};
    if (!Message.fields) {
        return patched;
    }
    Object.keys(Message.fields).forEach(key => {
        const field = Message.fields[key];
        const value = payload[key];
        if (typeof value === 'undefined') {
            return;
        }
        if ((0, utils_1.isPrimitiveField)(field.type)) {
            if (field.repeated) {
                patched[key] = value.map((v) => transform(field.type, v));
            }
            else {
                patched[key] = transform(field.type, value);
            }
            return;
        }
        if (field.repeated) {
            const fieldType = Message.lookupTypeOrEnum(field.type);
            if (fieldType instanceof light_1.Enum) {
                patched[key] = value;
            }
            else {
                patched[key] = value.map((v) => patch(fieldType, v));
            }
        }
        else if (typeof value === 'object' && value !== null) {
            const RefMessage = Message.lookupType(field.type);
            patched[key] = patch(RefMessage, value);
        }
        else if (typeof value === 'number') {
            const RefMessage = Message.lookupEnum(field.type);
            patched[key] = RefMessage.values[value];
        }
        else {
            patched[key] = value;
        }
    });
    return patched;
}
const encode = (Message, data) => {
    const payload = patch(Message, data);
    const message = Message.fromObject(payload);
    const bytes = Message.encode(message).finish();
    return Buffer.from(bytes);
};
exports.encode = encode;
//# sourceMappingURL=encode.js.map