"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.IsTuple = IsTuple;
exports.IsUnion = IsUnion;
exports.IsConst = IsConst;
exports.IsIdent = IsIdent;
exports.IsNumber = IsNumber;
exports.IsRef = IsRef;
exports.IsString = IsString;
exports.IsParser = IsParser;
// ------------------------------------------------------------------
// Value Guard
// ------------------------------------------------------------------
// prettier-ignore
function HasPropertyKey(value, key) {
    return key in value;
}
// prettier-ignore
function IsObjectValue(value) {
    return typeof value === 'object' && value !== null;
}
// prettier-ignore
function IsArrayValue(value) {
    return globalThis.Array.isArray(value);
}
// ------------------------------------------------------------------
// Parser Guard
// ------------------------------------------------------------------
/** Returns true if the value is a Tuple Parser */
// prettier-ignore
function IsTuple(value) {
    return IsObjectValue(value) && HasPropertyKey(value, 'type') && value.type === 'Tuple' && HasPropertyKey(value, 'parsers') && IsArrayValue(value.parsers);
}
/** Returns true if the value is a Union Parser */
// prettier-ignore
function IsUnion(value) {
    return IsObjectValue(value) && HasPropertyKey(value, 'type') && value.type === 'Union' && HasPropertyKey(value, 'parsers') && IsArrayValue(value.parsers);
}
/** Returns true if the value is a Const Parser */
// prettier-ignore
function IsConst(value) {
    return IsObjectValue(value) && HasPropertyKey(value, 'type') && value.type === 'Const' && HasPropertyKey(value, 'value') && typeof value.value === 'string';
}
/** Returns true if the value is a Ident Parser */
// prettier-ignore
function IsIdent(value) {
    return IsObjectValue(value) && HasPropertyKey(value, 'type') && value.type === 'Ident';
}
/** Returns true if the value is a Number Parser */
// prettier-ignore
function IsNumber(value) {
    return IsObjectValue(value) && HasPropertyKey(value, 'type') && value.type === 'Number';
}
/** Returns true if the value is a Ref Parser */
// prettier-ignore
function IsRef(value) {
    return IsObjectValue(value) && HasPropertyKey(value, 'type') && value.type === 'Ref' && HasPropertyKey(value, 'ref') && typeof value.ref === 'string';
}
/** Returns true if the value is a String Parser */
// prettier-ignore
function IsString(value) {
    return IsObjectValue(value) && HasPropertyKey(value, 'type') && value.type === 'String' && HasPropertyKey(value, 'options') && IsArrayValue(value.options);
}
/** Returns true if the value is a Parser */
// prettier-ignore
function IsParser(value) {
    return (IsTuple(value) ||
        IsUnion(value) ||
        IsConst(value) ||
        IsIdent(value) ||
        IsNumber(value) ||
        IsRef(value) ||
        IsString(value));
}
