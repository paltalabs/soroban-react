"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldLookup = void 0;
const bytes_1 = require("./bytes");
const serialized_type_1 = require("../types/serialized-type");
const constants_1 = require("./constants");
const buffer_1 = require("buffer/");
/*
 * @brief: Serialize a field based on type_code and Field.nth
 */
function fieldHeader(type, nth) {
    const header = [];
    if (type < 16) {
        if (nth < 16) {
            header.push((type << 4) | nth);
        }
        else {
            header.push(type << 4, nth);
        }
    }
    else if (nth < 16) {
        header.push(nth, type);
    }
    else {
        header.push(0, type, nth);
    }
    return buffer_1.Buffer.from(header);
}
function buildField([name, info], typeOrdinal) {
    const field = fieldHeader(typeOrdinal, info.nth);
    return {
        name: name,
        nth: info.nth,
        isVariableLengthEncoded: info.isVLEncoded,
        isSerialized: info.isSerialized,
        isSigningField: info.isSigningField,
        ordinal: (typeOrdinal << 16) | info.nth,
        type: new bytes_1.Bytes(info.type, typeOrdinal, constants_1.TYPE_WIDTH),
        header: field,
        associatedType: serialized_type_1.SerializedType, // For later assignment in ./types/index.js or Definitions.updateAll(...)
    };
}
/*
 * @brief: The collection of all fields as defined in definitions.json
 */
class FieldLookup {
    constructor(fields, types) {
        fields.forEach(([name, field_info]) => {
            const typeOrdinal = types[field_info.type];
            this[name] = buildField([name, field_info], typeOrdinal);
            this[this[name].ordinal.toString()] = this[name];
        });
    }
    fromString(value) {
        return this[value];
    }
}
exports.FieldLookup = FieldLookup;
//# sourceMappingURL=field.js.map