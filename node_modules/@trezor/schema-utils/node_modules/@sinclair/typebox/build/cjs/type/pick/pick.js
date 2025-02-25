"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Pick = Pick;
const type_1 = require("../create/type");
const discard_1 = require("../discard/discard");
const index_1 = require("../intersect/index");
const index_2 = require("../union/index");
const index_3 = require("../object/index");
const index_4 = require("../indexed/index");
const pick_from_mapped_key_1 = require("./pick-from-mapped-key");
const pick_from_mapped_result_1 = require("./pick-from-mapped-result");
const symbols_1 = require("../symbols/symbols");
// ------------------------------------------------------------------
// TypeGuard
// ------------------------------------------------------------------
const kind_1 = require("../guard/kind");
function FromIntersect(T, K) {
    return T.map((T) => PickResolve(T, K));
}
// prettier-ignore
function FromUnion(T, K) {
    return T.map((T) => PickResolve(T, K));
}
// prettier-ignore
function FromProperties(T, K) {
    const Acc = {};
    for (const K2 of K)
        if (K2 in T)
            Acc[K2] = T[K2];
    return Acc;
}
// prettier-ignore
function FromObject(T, K) {
    const options = (0, discard_1.Discard)(T, [symbols_1.TransformKind, '$id', 'required', 'properties']);
    const properties = FromProperties(T['properties'], K);
    return (0, index_3.Object)(properties, options);
}
// ------------------------------------------------------------------
// PickResolve
// ------------------------------------------------------------------
// prettier-ignore
function PickResolve(T, K) {
    return ((0, kind_1.IsIntersect)(T) ? (0, index_1.Intersect)(FromIntersect(T.allOf, K)) :
        (0, kind_1.IsUnion)(T) ? (0, index_2.Union)(FromUnion(T.anyOf, K)) :
            (0, kind_1.IsObject)(T) ? FromObject(T, K) :
                (0, index_3.Object)({}));
}
function Pick(T, K, options) {
    // mapped
    if ((0, kind_1.IsMappedKey)(K))
        return (0, pick_from_mapped_key_1.PickFromMappedKey)(T, K, options);
    if ((0, kind_1.IsMappedResult)(T))
        return (0, pick_from_mapped_result_1.PickFromMappedResult)(T, K, options);
    // non-mapped
    const I = (0, kind_1.IsSchema)(K) ? (0, index_4.IndexPropertyKeys)(K) : K;
    // special: mapping types require overridable options
    return (0, type_1.CreateType)({ ...PickResolve(T, I), ...options });
}
