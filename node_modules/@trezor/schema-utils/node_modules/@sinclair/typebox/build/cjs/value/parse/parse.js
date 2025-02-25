"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Parse = Parse;
const index_1 = require("../transform/index");
const assert_1 = require("../assert/assert");
const default_1 = require("../default/default");
const convert_1 = require("../convert/convert");
const clean_1 = require("../clean/clean");
const index_2 = require("../clone/index");
// prettier-ignore
const ParseReducer = [
    (_schema, _references, value) => (0, index_2.Clone)(value),
    (schema, references, value) => (0, default_1.Default)(schema, references, value),
    (schema, references, value) => (0, clean_1.Clean)(schema, references, value),
    (schema, references, value) => (0, convert_1.Convert)(schema, references, value),
    (schema, references, value) => { (0, assert_1.Assert)(schema, references, value); return value; },
    (schema, references, value) => ((0, index_1.HasTransform)(schema, references) ? (0, index_1.TransformDecode)(schema, references, value) : value),
];
// ------------------------------------------------------------------
// ParseValue
// ------------------------------------------------------------------
function ParseValue(schema, references, value) {
    return ParseReducer.reduce((value, reducer) => reducer(schema, references, value), value);
}
/** Parses a value or throws an `AssertError` if invalid. */
function Parse(...args) {
    return args.length === 3 ? ParseValue(args[0], args[1], args[2]) : ParseValue(args[0], [], args[1]);
}
