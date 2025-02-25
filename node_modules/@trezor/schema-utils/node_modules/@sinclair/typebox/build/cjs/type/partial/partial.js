"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Partial = Partial;
const type_1 = require("../create/type");
const index_1 = require("../optional/index");
const index_2 = require("../object/index");
const index_3 = require("../intersect/index");
const index_4 = require("../union/index");
const index_5 = require("../discard/index");
const index_6 = require("../symbols/index");
const partial_from_mapped_result_1 = require("./partial-from-mapped-result");
// ------------------------------------------------------------------
// TypeGuard
// ------------------------------------------------------------------
const kind_1 = require("../guard/kind");
// prettier-ignore
function FromRest(T) {
    return T.map(L => PartialResolve(L));
}
// prettier-ignore
function FromProperties(T) {
    const Acc = {};
    for (const K of globalThis.Object.getOwnPropertyNames(T))
        Acc[K] = (0, index_1.Optional)(T[K]);
    return Acc;
}
// prettier-ignore
function FromObject(T) {
    const options = (0, index_5.Discard)(T, [index_6.TransformKind, '$id', 'required', 'properties']);
    const properties = FromProperties(T['properties']);
    return (0, index_2.Object)(properties, options);
}
// ------------------------------------------------------------------
// PartialResolve
// ------------------------------------------------------------------
// prettier-ignore
function PartialResolve(T) {
    return ((0, kind_1.IsIntersect)(T) ? (0, index_3.Intersect)(FromRest(T.allOf)) :
        (0, kind_1.IsUnion)(T) ? (0, index_4.Union)(FromRest(T.anyOf)) :
            (0, kind_1.IsObject)(T) ? FromObject(T) :
                (0, index_2.Object)({}));
}
/** `[Json]` Constructs a type where all properties are optional */
function Partial(T, options) {
    if ((0, kind_1.IsMappedResult)(T)) {
        return (0, partial_from_mapped_result_1.PartialFromMappedResult)(T, options);
    }
    else {
        // special: mapping types require overridable options
        return (0, type_1.CreateType)({ ...PartialResolve(T), ...options });
    }
}
