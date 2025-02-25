// src/Guards/Guards.bs.js
function _is(value, type_) {
  return typeof value === type_;
}
function is() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _is(data, args[0]);
    };
  }
  return _is(arguments[0], arguments[1]);
}
function isString(value) {
  return typeof value === "string";
}
function isNumber(value) {
  if (typeof value === "number") {
    return !Number.isNaN(value);
  } else {
    return false;
  }
}
function isBoolean(value) {
  return typeof value === "boolean";
}
var isPromise = (value) => value instanceof Promise;
function isArray(value) {
  return Array.isArray(value);
}
function isObject(value) {
  if (!!value && !Array.isArray(value)) {
    return typeof value === "object";
  } else {
    return false;
  }
}
function isFunction(value) {
  return typeof value === "function";
}
var isError = (value) => value instanceof Error;
var isDate = (value) => value instanceof Date;
function isNullable(value) {
  return value == null;
}
function isNotNullable(value) {
  return !(value == null);
}
var isNull = (value) => value === null;
var isUndefined = (value) => value === void 0;
function _isNot(value, predicateFn) {
  return !predicateFn(value);
}
function isNot() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _isNot(data, args[0]);
    };
  }
  return _isNot(arguments[0], arguments[1]);
}
export {
  is,
  isArray,
  isBoolean,
  isDate,
  isError,
  isFunction,
  isNot,
  isNotNullable,
  isNull,
  isNullable,
  isNumber,
  isObject,
  isPromise,
  isString,
  isUndefined
};
