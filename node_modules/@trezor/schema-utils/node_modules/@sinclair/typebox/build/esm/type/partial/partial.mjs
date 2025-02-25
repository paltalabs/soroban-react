import { CreateType } from '../create/type.mjs';
import { Optional } from '../optional/index.mjs';
import { Object } from '../object/index.mjs';
import { Intersect } from '../intersect/index.mjs';
import { Union } from '../union/index.mjs';
import { Discard } from '../discard/index.mjs';
import { TransformKind } from '../symbols/index.mjs';
import { PartialFromMappedResult } from './partial-from-mapped-result.mjs';
// ------------------------------------------------------------------
// TypeGuard
// ------------------------------------------------------------------
import { IsMappedResult, IsIntersect, IsUnion, IsObject } from '../guard/kind.mjs';
// prettier-ignore
function FromRest(T) {
    return T.map(L => PartialResolve(L));
}
// prettier-ignore
function FromProperties(T) {
    const Acc = {};
    for (const K of globalThis.Object.getOwnPropertyNames(T))
        Acc[K] = Optional(T[K]);
    return Acc;
}
// prettier-ignore
function FromObject(T) {
    const options = Discard(T, [TransformKind, '$id', 'required', 'properties']);
    const properties = FromProperties(T['properties']);
    return Object(properties, options);
}
// ------------------------------------------------------------------
// PartialResolve
// ------------------------------------------------------------------
// prettier-ignore
function PartialResolve(T) {
    return (IsIntersect(T) ? Intersect(FromRest(T.allOf)) :
        IsUnion(T) ? Union(FromRest(T.anyOf)) :
            IsObject(T) ? FromObject(T) :
                Object({}));
}
/** `[Json]` Constructs a type where all properties are optional */
export function Partial(T, options) {
    if (IsMappedResult(T)) {
        return PartialFromMappedResult(T, options);
    }
    else {
        // special: mapping types require overridable options
        return CreateType({ ...PartialResolve(T), ...options });
    }
}
