import { CreateType } from '../create/type.mjs';
import { Discard } from '../discard/discard.mjs';
import { Intersect } from '../intersect/index.mjs';
import { Union } from '../union/index.mjs';
import { Object } from '../object/index.mjs';
import { IndexPropertyKeys } from '../indexed/index.mjs';
import { OmitFromMappedKey } from './omit-from-mapped-key.mjs';
import { OmitFromMappedResult } from './omit-from-mapped-result.mjs';
import { TransformKind } from '../symbols/symbols.mjs';
// ------------------------------------------------------------------
// TypeGuard
// ------------------------------------------------------------------
import { IsMappedKey, IsIntersect, IsUnion, IsObject, IsSchema, IsMappedResult } from '../guard/kind.mjs';
// prettier-ignore
function FromIntersect(T, K) {
    return T.map((T) => OmitResolve(T, K));
}
// prettier-ignore
function FromUnion(T, K) {
    return T.map((T) => OmitResolve(T, K));
}
// ------------------------------------------------------------------
// FromProperty
// ------------------------------------------------------------------
// prettier-ignore
function FromProperty(T, K) {
    const { [K]: _, ...R } = T;
    return R;
}
// prettier-ignore
function FromProperties(T, K) {
    return K.reduce((T, K2) => FromProperty(T, K2), T);
}
// prettier-ignore
function FromObject(T, K) {
    const options = Discard(T, [TransformKind, '$id', 'required', 'properties']);
    const properties = FromProperties(T['properties'], K);
    return Object(properties, options);
}
// ------------------------------------------------------------------
// OmitResolve
// ------------------------------------------------------------------
// prettier-ignore
function OmitResolve(T, K) {
    return (IsIntersect(T) ? Intersect(FromIntersect(T.allOf, K)) :
        IsUnion(T) ? Union(FromUnion(T.anyOf, K)) :
            IsObject(T) ? FromObject(T, K) :
                Object({}));
}
export function Omit(T, K, options) {
    // mapped
    if (IsMappedKey(K))
        return OmitFromMappedKey(T, K, options);
    if (IsMappedResult(T))
        return OmitFromMappedResult(T, K, options);
    // non-mapped
    const I = IsSchema(K) ? IndexPropertyKeys(K) : K;
    // special: mapping types require overridable options
    return CreateType({ ...OmitResolve(T, I), ...options });
}
