var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all2) => {
  __markAsModule(target);
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true });
};

// src/Array/index.js
__export(exports, {
  all: () => all,
  any: () => any,
  append: () => append,
  at: () => at,
  concat: () => concat2,
  concatMany: () => concatMany2,
  copy: () => copy,
  deepFlat: () => deepFlat,
  difference: () => difference,
  drop: () => drop,
  dropExactly: () => dropExactly,
  dropWhile: () => dropWhile,
  eq: () => eq,
  every: () => every,
  filter: () => filter,
  filterMap: () => filterMap,
  filterWithIndex: () => filterWithIndex,
  find: () => find,
  flat: () => flat,
  flatten: () => flatten,
  flip: () => flip,
  forEach: () => forEach,
  forEachWithIndex: () => forEachWithIndex,
  get: () => get3,
  getBy: () => getBy,
  getIndexBy: () => getIndexBy,
  getUndefined: () => getUndefined,
  getUnsafe: () => getUnsafe,
  groupBy: () => groupBy,
  head: () => head,
  includes: () => includes,
  init: () => init,
  initOrEmpty: () => initOrEmpty,
  insertAt: () => insertAt,
  intersection: () => intersection,
  intersperse: () => intersperse,
  isEmpty: () => isEmpty,
  isNotEmpty: () => isNotEmpty,
  join: () => join,
  keep: () => keep,
  keepMap: () => keepMap,
  keepWithIndex: () => keepWithIndex,
  last: () => last,
  length: () => length,
  make: () => make2,
  makeEmpty: () => makeEmpty,
  makeWithIndex: () => makeWithIndex,
  map: () => map,
  mapWithIndex: () => mapWithIndex,
  partition: () => partition,
  placeholder: () => placeholder,
  prepend: () => prepend,
  prependToAll: () => prependToAll,
  range: () => range2,
  rangeBy: () => rangeBy2,
  reduce: () => reduce,
  reduceReverse: () => reduceReverse,
  reduceWithIndex: () => reduceWithIndex,
  reject: () => reject,
  rejectWithIndex: () => rejectWithIndex,
  removeAt: () => removeAt,
  removeFirst: () => removeFirst,
  removeFirstBy: () => removeFirstBy,
  repeat: () => repeat,
  replaceAt: () => replaceAt,
  reverse: () => reverse2,
  shuffle: () => shuffle2,
  slice: () => slice2,
  sliceToEnd: () => sliceToEnd2,
  some: () => some2,
  sort: () => sort,
  sortBy: () => sortBy,
  splitAt: () => splitAt,
  splitEvery: () => splitEvery,
  swapAt: () => swapAt,
  tail: () => tail,
  tailOrEmpty: () => tailOrEmpty,
  take: () => take,
  takeExactly: () => takeExactly,
  takeWhile: () => takeWhile,
  tap: () => tap,
  toTuple: () => toTuple,
  uncons: () => uncons,
  union: () => union,
  uniq: () => uniq,
  uniqBy: () => uniqBy,
  unzip: () => unzip2,
  updateAt: () => updateAt,
  zip: () => zip2,
  zipWith: () => zipWith,
  zipWithIndex: () => zipWithIndex
});

// node_modules/rescript/lib/es6/caml_option.js
function some(x) {
  if (x === void 0) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: 0
    };
  } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
    };
  } else {
    return x;
  }
}
function valFromOption(x) {
  if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) {
    return x;
  }
  var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
  if (depth === 0) {
    return;
  } else {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
    };
  }
}

// node_modules/rescript/lib/es6/js_dict.js
function get(dict, k) {
  if (k in dict) {
    return some(dict[k]);
  }
}

// node_modules/rescript/lib/es6/caml.js
function caml_int_compare(x, y) {
  if (x < y) {
    return -1;
  } else if (x === y) {
    return 0;
  } else {
    return 1;
  }
}
function caml_bool_compare(x, y) {
  if (x) {
    if (y) {
      return 0;
    } else {
      return 1;
    }
  } else if (y) {
    return -1;
  } else {
    return 0;
  }
}
function caml_string_compare(s1, s2) {
  if (s1 === s2) {
    return 0;
  } else if (s1 < s2) {
    return -1;
  } else {
    return 1;
  }
}
function caml_int_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

// node_modules/rescript/lib/es6/caml_obj.js
var for_in = function(o, foo) {
  for (var x in o) {
    foo(x);
  }
};
function caml_compare(a, b) {
  if (a === b) {
    return 0;
  }
  var a_type = typeof a;
  var b_type = typeof b;
  switch (a_type) {
    case "boolean":
      if (b_type === "boolean") {
        return caml_bool_compare(a, b);
      }
      break;
    case "function":
      if (b_type === "function") {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "compare: functional value",
          Error: new Error()
        };
      }
      break;
    case "number":
      if (b_type === "number") {
        return caml_int_compare(a, b);
      }
      break;
    case "string":
      if (b_type === "string") {
        return caml_string_compare(a, b);
      } else {
        return 1;
      }
    case "undefined":
      return -1;
    default:
  }
  switch (b_type) {
    case "string":
      return -1;
    case "undefined":
      return 1;
    default:
      if (a_type === "boolean") {
        return 1;
      }
      if (b_type === "boolean") {
        return -1;
      }
      if (a_type === "function") {
        return 1;
      }
      if (b_type === "function") {
        return -1;
      }
      if (a_type === "number") {
        if (b === null || b.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
          return 1;
        } else {
          return -1;
        }
      }
      if (b_type === "number") {
        if (a === null || a.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
          return -1;
        } else {
          return 1;
        }
      }
      if (a === null) {
        if (b.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
          return 1;
        } else {
          return -1;
        }
      }
      if (b === null) {
        if (a.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
          return -1;
        } else {
          return 1;
        }
      }
      if (a.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
        if (b.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
          return aux_obj_compare(a, b);
        } else {
          return -1;
        }
      }
      var tag_a = a.TAG | 0;
      var tag_b = b.TAG | 0;
      if (tag_a === 248) {
        return caml_int_compare(a[1], b[1]);
      }
      if (tag_a === 251) {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "equal: abstract value",
          Error: new Error()
        };
      }
      if (tag_a !== tag_b) {
        if (tag_a < tag_b) {
          return -1;
        } else {
          return 1;
        }
      }
      var len_a = a.length | 0;
      var len_b = b.length | 0;
      if (len_a === len_b) {
        if (Array.isArray(a)) {
          var _i = 0;
          while (true) {
            var i = _i;
            if (i === len_a) {
              return 0;
            }
            var res = caml_compare(a[i], b[i]);
            if (res !== 0) {
              return res;
            }
            _i = i + 1 | 0;
            continue;
          }
          ;
        } else if (a instanceof Date && b instanceof Date) {
          return a - b;
        } else {
          return aux_obj_compare(a, b);
        }
      } else if (len_a < len_b) {
        var _i$1 = 0;
        while (true) {
          var i$1 = _i$1;
          if (i$1 === len_a) {
            return -1;
          }
          var res$1 = caml_compare(a[i$1], b[i$1]);
          if (res$1 !== 0) {
            return res$1;
          }
          _i$1 = i$1 + 1 | 0;
          continue;
        }
        ;
      } else {
        var _i$2 = 0;
        while (true) {
          var i$2 = _i$2;
          if (i$2 === len_b) {
            return 1;
          }
          var res$2 = caml_compare(a[i$2], b[i$2]);
          if (res$2 !== 0) {
            return res$2;
          }
          _i$2 = i$2 + 1 | 0;
          continue;
        }
        ;
      }
  }
}
function aux_obj_compare(a, b) {
  var min_key_lhs = {
    contents: void 0
  };
  var min_key_rhs = {
    contents: void 0
  };
  var do_key = function(param, key) {
    var min_key = param[2];
    var b2 = param[1];
    if (!(!Object.prototype.hasOwnProperty.call(b2, key) || caml_compare(param[0][key], b2[key]) > 0)) {
      return;
    }
    var mk = min_key.contents;
    if (mk !== void 0 && key >= mk) {
      return;
    } else {
      min_key.contents = key;
      return;
    }
  };
  var partial_arg = [
    a,
    b,
    min_key_rhs
  ];
  var do_key_a = function(param) {
    return do_key(partial_arg, param);
  };
  var partial_arg$1 = [
    b,
    a,
    min_key_lhs
  ];
  var do_key_b = function(param) {
    return do_key(partial_arg$1, param);
  };
  for_in(a, do_key_a);
  for_in(b, do_key_b);
  var match = min_key_lhs.contents;
  var match$1 = min_key_rhs.contents;
  if (match !== void 0) {
    if (match$1 !== void 0) {
      return caml_string_compare(match, match$1);
    } else {
      return -1;
    }
  } else if (match$1 !== void 0) {
    return 1;
  } else {
    return 0;
  }
}
function caml_equal(a, b) {
  if (a === b) {
    return true;
  }
  var a_type = typeof a;
  if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
    return false;
  }
  var b_type = typeof b;
  if (a_type === "function" || b_type === "function") {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "equal: functional value",
      Error: new Error()
    };
  }
  if (b_type === "number" || b_type === "undefined" || b === null) {
    return false;
  }
  var tag_a = a.TAG | 0;
  var tag_b = b.TAG | 0;
  if (tag_a === 248) {
    return a[1] === b[1];
  }
  if (tag_a === 251) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "equal: abstract value",
      Error: new Error()
    };
  }
  if (tag_a !== tag_b) {
    return false;
  }
  var len_a = a.length | 0;
  var len_b = b.length | 0;
  if (len_a === len_b) {
    if (Array.isArray(a)) {
      var _i = 0;
      while (true) {
        var i = _i;
        if (i === len_a) {
          return true;
        }
        if (!caml_equal(a[i], b[i])) {
          return false;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    } else if (a instanceof Date && b instanceof Date) {
      return !(a > b || a < b);
    } else {
      var result = {
        contents: true
      };
      var do_key_a = function(key) {
        if (!Object.prototype.hasOwnProperty.call(b, key)) {
          result.contents = false;
          return;
        }
      };
      var do_key_b = function(key) {
        if (!Object.prototype.hasOwnProperty.call(a, key) || !caml_equal(b[key], a[key])) {
          result.contents = false;
          return;
        }
      };
      for_in(a, do_key_a);
      if (result.contents) {
        for_in(b, do_key_b);
      }
      return result.contents;
    }
  } else {
    return false;
  }
}
function caml_lessthan(a, b) {
  return caml_compare(a, b) < 0;
}

// node_modules/rescript/lib/es6/js_int.js
var max = 2147483647;
var min = -2147483648;

// node_modules/rescript/lib/es6/js_math.js
function floor_int(f) {
  if (f > max) {
    return max;
  } else if (f < min) {
    return min;
  } else {
    return Math.floor(f);
  }
}
function random_int(min2, max2) {
  return floor_int(Math.random() * (max2 - min2 | 0)) + min2 | 0;
}

// node_modules/rescript/lib/es6/belt_Array.js
function get2(arr, i) {
  if (i >= 0 && i < arr.length) {
    return some(arr[i]);
  }
}
function getExn(arr, i) {
  if (!(i >= 0 && i < arr.length)) {
    throw {
      RE_EXN_ID: "Assert_failure",
      _1: [
        "belt_Array.ml",
        27,
        4
      ],
      Error: new Error()
    };
  }
  return arr[i];
}
function swapUnsafe(xs, i, j) {
  var tmp = xs[i];
  xs[i] = xs[j];
  xs[j] = tmp;
}
function shuffleInPlace(xs) {
  var len = xs.length;
  for (var i = 0; i < len; ++i) {
    swapUnsafe(xs, i, random_int(i, len));
  }
}
function shuffle(xs) {
  var result = xs.slice(0);
  shuffleInPlace(result);
  return result;
}
function reverse(xs) {
  var len = xs.length;
  var result = new Array(len);
  for (var i = 0; i < len; ++i) {
    result[i] = xs[(len - 1 | 0) - i | 0];
  }
  return result;
}
function make(l, f) {
  if (l <= 0) {
    return [];
  }
  var res = new Array(l);
  for (var i = 0; i < l; ++i) {
    res[i] = f;
  }
  return res;
}
function makeByU(l, f) {
  if (l <= 0) {
    return [];
  }
  var res = new Array(l);
  for (var i = 0; i < l; ++i) {
    res[i] = f(i);
  }
  return res;
}
function range(start, finish) {
  var cut = finish - start | 0;
  if (cut < 0) {
    return [];
  }
  var arr = new Array(cut + 1 | 0);
  for (var i = 0; i <= cut; ++i) {
    arr[i] = start + i | 0;
  }
  return arr;
}
function rangeBy(start, finish, step) {
  var cut = finish - start | 0;
  if (cut < 0 || step <= 0) {
    return [];
  }
  var nb = (cut / step | 0) + 1 | 0;
  var arr = new Array(nb);
  var cur = start;
  for (var i = 0; i < nb; ++i) {
    arr[i] = cur;
    cur = cur + step | 0;
  }
  return arr;
}
function zip(xs, ys) {
  var lenx = xs.length;
  var leny = ys.length;
  var len = lenx < leny ? lenx : leny;
  var s = new Array(len);
  for (var i = 0; i < len; ++i) {
    s[i] = [
      xs[i],
      ys[i]
    ];
  }
  return s;
}
function zipByU(xs, ys, f) {
  var lenx = xs.length;
  var leny = ys.length;
  var len = lenx < leny ? lenx : leny;
  var s = new Array(len);
  for (var i = 0; i < len; ++i) {
    s[i] = f(xs[i], ys[i]);
  }
  return s;
}
function concat(a1, a2) {
  var l1 = a1.length;
  var l2 = a2.length;
  var a1a2 = new Array(l1 + l2 | 0);
  for (var i = 0; i < l1; ++i) {
    a1a2[i] = a1[i];
  }
  for (var i$1 = 0; i$1 < l2; ++i$1) {
    a1a2[l1 + i$1 | 0] = a2[i$1];
  }
  return a1a2;
}
function concatMany(arrs) {
  var lenArrs = arrs.length;
  var totalLen = 0;
  for (var i = 0; i < lenArrs; ++i) {
    totalLen = totalLen + arrs[i].length | 0;
  }
  var result = new Array(totalLen);
  totalLen = 0;
  for (var j = 0; j < lenArrs; ++j) {
    var cur = arrs[j];
    for (var k = 0, k_finish = cur.length; k < k_finish; ++k) {
      result[totalLen] = cur[k];
      totalLen = totalLen + 1 | 0;
    }
  }
  return result;
}
function slice(a, offset, len) {
  if (len <= 0) {
    return [];
  }
  var lena = a.length;
  var ofs = offset < 0 ? caml_int_max(lena + offset | 0, 0) : offset;
  var hasLen = lena - ofs | 0;
  var copyLength = hasLen < len ? hasLen : len;
  if (copyLength <= 0) {
    return [];
  }
  var result = new Array(copyLength);
  for (var i = 0; i < copyLength; ++i) {
    result[i] = a[ofs + i | 0];
  }
  return result;
}
function sliceToEnd(a, offset) {
  var lena = a.length;
  var ofs = offset < 0 ? caml_int_max(lena + offset | 0, 0) : offset;
  var len = lena - ofs | 0;
  var result = new Array(len);
  for (var i = 0; i < len; ++i) {
    result[i] = a[ofs + i | 0];
  }
  return result;
}
function blitUnsafe(a1, srcofs1, a2, srcofs2, blitLength) {
  if (srcofs2 <= srcofs1) {
    for (var j = 0; j < blitLength; ++j) {
      a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
    }
    return;
  }
  for (var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
    a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
  }
}
function forEachU(a, f) {
  for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
    f(a[i]);
  }
}
function mapU(a, f) {
  var l = a.length;
  var r = new Array(l);
  for (var i = 0; i < l; ++i) {
    r[i] = f(a[i]);
  }
  return r;
}
function getByU(a, p) {
  var l = a.length;
  var i = 0;
  var r;
  while (r === void 0 && i < l) {
    var v = a[i];
    if (p(v)) {
      r = some(v);
    }
    i = i + 1 | 0;
  }
  ;
  return r;
}
function getIndexByU(a, p) {
  var l = a.length;
  var i = 0;
  var r;
  while (r === void 0 && i < l) {
    var v = a[i];
    if (p(v)) {
      r = i;
    }
    i = i + 1 | 0;
  }
  ;
  return r;
}
function keepMapU(a, f) {
  var l = a.length;
  var r = new Array(l);
  var j = 0;
  for (var i = 0; i < l; ++i) {
    var v = a[i];
    var v$1 = f(v);
    if (v$1 !== void 0) {
      r[j] = valFromOption(v$1);
      j = j + 1 | 0;
    }
  }
  r.length = j;
  return r;
}
function forEachWithIndexU(a, f) {
  for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
    f(i, a[i]);
  }
}
function mapWithIndexU(a, f) {
  var l = a.length;
  var r = new Array(l);
  for (var i = 0; i < l; ++i) {
    r[i] = f(i, a[i]);
  }
  return r;
}
function reduceU(a, x, f) {
  var r = x;
  for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
    r = f(r, a[i]);
  }
  return r;
}
function reduceReverseU(a, x, f) {
  var r = x;
  for (var i = a.length - 1 | 0; i >= 0; --i) {
    r = f(r, a[i]);
  }
  return r;
}
function reduceWithIndexU(a, x, f) {
  var r = x;
  for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
    r = f(r, a[i], i);
  }
  return r;
}
function everyU(arr, b) {
  var len = arr.length;
  var _i = 0;
  while (true) {
    var i = _i;
    if (i === len) {
      return true;
    }
    if (!b(arr[i])) {
      return false;
    }
    _i = i + 1 | 0;
    continue;
  }
  ;
}
function someU(arr, b) {
  var len = arr.length;
  var _i = 0;
  while (true) {
    var i = _i;
    if (i === len) {
      return false;
    }
    if (b(arr[i])) {
      return true;
    }
    _i = i + 1 | 0;
    continue;
  }
  ;
}
function everyAux2(arr1, arr2, _i, b, len) {
  while (true) {
    var i = _i;
    if (i === len) {
      return true;
    }
    if (!b(arr1[i], arr2[i])) {
      return false;
    }
    _i = i + 1 | 0;
    continue;
  }
  ;
}
function eqU(a, b, p) {
  var lena = a.length;
  var lenb = b.length;
  if (lena === lenb) {
    return everyAux2(a, b, 0, p, lena);
  } else {
    return false;
  }
}
function partitionU(a, f) {
  var l = a.length;
  var i = 0;
  var j = 0;
  var a1 = new Array(l);
  var a2 = new Array(l);
  for (var ii = 0; ii < l; ++ii) {
    var v = a[ii];
    if (f(v)) {
      a1[i] = v;
      i = i + 1 | 0;
    } else {
      a2[j] = v;
      j = j + 1 | 0;
    }
  }
  a1.length = i;
  a2.length = j;
  return [
    a1,
    a2
  ];
}
function unzip(a) {
  var l = a.length;
  var a1 = new Array(l);
  var a2 = new Array(l);
  for (var i = 0; i < l; ++i) {
    var match = a[i];
    a1[i] = match[0];
    a2[i] = match[1];
  }
  return [
    a1,
    a2
  ];
}

// node_modules/rescript/lib/es6/belt_SortArray.js
function merge(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
  var src1r = src1ofs + src1len | 0;
  var src2r = src2ofs + src2len | 0;
  var _i1 = src1ofs;
  var _s1 = src[src1ofs];
  var _i2 = src2ofs;
  var _s2 = src2[src2ofs];
  var _d = dstofs;
  while (true) {
    var d = _d;
    var s2 = _s2;
    var i2 = _i2;
    var s1 = _s1;
    var i1 = _i1;
    if (cmp(s1, s2) <= 0) {
      dst[d] = s1;
      var i1$1 = i1 + 1 | 0;
      if (i1$1 >= src1r) {
        return blitUnsafe(src2, i2, dst, d + 1 | 0, src2r - i2 | 0);
      }
      _d = d + 1 | 0;
      _s1 = src[i1$1];
      _i1 = i1$1;
      continue;
    }
    dst[d] = s2;
    var i2$1 = i2 + 1 | 0;
    if (i2$1 >= src2r) {
      return blitUnsafe(src, i1, dst, d + 1 | 0, src1r - i1 | 0);
    }
    _d = d + 1 | 0;
    _s2 = src2[i2$1];
    _i2 = i2$1;
    continue;
  }
  ;
}
function insertionSort(src, srcofs, dst, dstofs, len, cmp) {
  for (var i = 0; i < len; ++i) {
    var e = src[srcofs + i | 0];
    var j = (dstofs + i | 0) - 1 | 0;
    while (j >= dstofs && cmp(dst[j], e) > 0) {
      dst[j + 1 | 0] = dst[j];
      j = j - 1 | 0;
    }
    ;
    dst[j + 1 | 0] = e;
  }
}
function sortTo(src, srcofs, dst, dstofs, len, cmp) {
  if (len <= 5) {
    return insertionSort(src, srcofs, dst, dstofs, len, cmp);
  }
  var l1 = len / 2 | 0;
  var l2 = len - l1 | 0;
  sortTo(src, srcofs + l1 | 0, dst, dstofs + l1 | 0, l2, cmp);
  sortTo(src, srcofs, src, srcofs + l2 | 0, l1, cmp);
  return merge(src, srcofs + l2 | 0, l1, dst, dstofs + l1 | 0, l2, dst, dstofs, cmp);
}
function stableSortInPlaceByU(a, cmp) {
  var l = a.length;
  if (l <= 5) {
    return insertionSort(a, 0, a, 0, l, cmp);
  }
  var l1 = l / 2 | 0;
  var l2 = l - l1 | 0;
  var t = new Array(l2);
  sortTo(a, l1, t, 0, l2, cmp);
  sortTo(a, 0, a, l2, l1, cmp);
  return merge(a, l2, l1, t, 0, l2, a, 0, cmp);
}
function stableSortByU(a, cmp) {
  var b = a.slice(0);
  stableSortInPlaceByU(b, cmp);
  return b;
}

// src/Array/Array.bs.js
function placeholder(param) {
}
function makeEmpty(param) {
  return [];
}
var _makeWithIndex = makeByU;
function makeWithIndex() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _makeWithIndex(data, args[0]);
    };
  }
  return _makeWithIndex(arguments[0], arguments[1]);
}
var _make = make;
function make2() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _make(data, args[0]);
    };
  }
  return _make(arguments[0], arguments[1]);
}
var _repeat = make;
function repeat() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _repeat(data, args[0]);
    };
  }
  return _repeat(arguments[0], arguments[1]);
}
function length(xs) {
  return xs.length;
}
function isEmpty(xs) {
  return xs.length === 0;
}
function isNotEmpty(xs) {
  return xs.length !== 0;
}
var reverse2 = reverse;
function _append(xs, element) {
  return concat(xs, [element]);
}
function append() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _append(data, args[0]);
    };
  }
  return _append(arguments[0], arguments[1]);
}
function _prepend(xs, element) {
  return concat([element], xs);
}
function prepend() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _prepend(data, args[0]);
    };
  }
  return _prepend(arguments[0], arguments[1]);
}
function _prependToAll(xs, delimiter) {
  return reduceU(xs, [], function(acc, value) {
    return concat(acc, [
      delimiter,
      value
    ]);
  });
}
function prependToAll() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _prependToAll(data, args[0]);
    };
  }
  return _prependToAll(arguments[0], arguments[1]);
}
function _intersperse(xs, delimiter) {
  return reduceWithIndexU(xs, [], function(acc, value, index) {
    if ((xs.length - 1 | 0) === index) {
      acc.push(value);
    } else {
      acc.push(value, delimiter);
    }
    return acc;
  });
}
function intersperse() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _intersperse(data, args[0]);
    };
  }
  return _intersperse(arguments[0], arguments[1]);
}
var _get = get2;
function get3() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _get(data, args[0]);
    };
  }
  return _get(arguments[0], arguments[1]);
}
var _at = get2;
function at() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _at(data, args[0]);
    };
  }
  return _at(arguments[0], arguments[1]);
}
function _getUnsafe(xs, index) {
  return xs[index];
}
function getUnsafe() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _getUnsafe(data, args[0]);
    };
  }
  return _getUnsafe(arguments[0], arguments[1]);
}
function _getUndefined(xs, index) {
  return xs[index];
}
function getUndefined() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _getUndefined(data, args[0]);
    };
  }
  return _getUndefined(arguments[0], arguments[1]);
}
var _getBy = getByU;
function getBy() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _getBy(data, args[0]);
    };
  }
  return _getBy(arguments[0], arguments[1]);
}
var _find = getByU;
function find() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _find(data, args[0]);
    };
  }
  return _find(arguments[0], arguments[1]);
}
function head(xs) {
  return get2(xs, 0);
}
function last(xs) {
  var l = xs.length;
  if (l === 0) {
    return;
  } else {
    return get2(xs, l - 1 | 0);
  }
}
function tail(xs) {
  var l = xs.length;
  if (l === 1) {
    return [];
  }
  if (l === 0) {
    return;
  }
  var xs$1 = sliceToEnd(xs, 1);
  if (xs$1.length !== 0) {
    return xs$1;
  }
}
function tailOrEmpty(xs) {
  var xs$1 = tail(xs);
  if (xs$1 !== void 0) {
    return xs$1;
  } else {
    return [];
  }
}
function init(xs) {
  var l = xs.length;
  if (l === 0) {
    return;
  } else {
    return slice(xs, 0, l - 1 | 0);
  }
}
function initOrEmpty(xs) {
  var xs$1 = init(xs);
  if (xs$1 !== void 0) {
    return xs$1;
  } else {
    return [];
  }
}
function _take(xs, n) {
  var l = xs.length;
  var len = n < 0 ? 0 : l < n ? l : n;
  return slice(xs, 0, len);
}
function take() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _take(data, args[0]);
    };
  }
  return _take(arguments[0], arguments[1]);
}
function _takeExactly(xs, n) {
  if (n < 0 || n > xs.length) {
    return;
  } else {
    return slice(xs, 0, n);
  }
}
function takeExactly() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _takeExactly(data, args[0]);
    };
  }
  return _takeExactly(arguments[0], arguments[1]);
}
function _takeWhile(xs, predicateFn) {
  return reduceU(xs, [], function(acc, element) {
    if (predicateFn(element)) {
      acc.push(element);
    }
    return acc;
  });
}
function takeWhile() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _takeWhile(data, args[0]);
    };
  }
  return _takeWhile(arguments[0], arguments[1]);
}
function _drop(xs, n) {
  var l = xs.length;
  var start = n < 0 ? 0 : l < n ? l : n;
  return sliceToEnd(xs, start);
}
function drop() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _drop(data, args[0]);
    };
  }
  return _drop(arguments[0], arguments[1]);
}
function _dropExactly(xs, n) {
  if (n < 0 || n > xs.length) {
    return;
  } else {
    return sliceToEnd(xs, n);
  }
}
function dropExactly() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _dropExactly(data, args[0]);
    };
  }
  return _dropExactly(arguments[0], arguments[1]);
}
function _dropWhile(xs, predicateFn) {
  return reduceU(xs, [], function(acc, element) {
    if (!predicateFn(element)) {
      acc.push(element);
    }
    return acc;
  });
}
function dropWhile() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _dropWhile(data, args[0]);
    };
  }
  return _dropWhile(arguments[0], arguments[1]);
}
function uncons(xs) {
  if (xs.length !== 0) {
    return [
      getExn(xs, 0),
      sliceToEnd(xs, 1)
    ];
  }
}
function _map(xs, mapFn) {
  return mapU(xs, mapFn);
}
function map() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _map(data, args[0]);
    };
  }
  return _map(arguments[0], arguments[1]);
}
var _mapWithIndex = mapWithIndexU;
function mapWithIndex() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _mapWithIndex(data, args[0]);
    };
  }
  return _mapWithIndex(arguments[0], arguments[1]);
}
function _filter(xs, predicateFn) {
  var index = 0;
  var arr = [];
  while (index < xs.length) {
    var value = xs[index];
    if (predicateFn(value)) {
      arr.push(value);
    }
    index = index + 1 | 0;
  }
  ;
  return arr;
}
function filter() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _filter(data, args[0]);
    };
  }
  return _filter(arguments[0], arguments[1]);
}
var keep = filter;
function _filterWithIndex(xs, predicateFn) {
  var index = 0;
  var arr = [];
  while (index < xs.length) {
    var value = xs[index];
    if (predicateFn(index, value)) {
      arr.push(value);
    }
    index = index + 1 | 0;
  }
  ;
  return arr;
}
function filterWithIndex() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _filterWithIndex(data, args[0]);
    };
  }
  return _filterWithIndex(arguments[0], arguments[1]);
}
var keepWithIndex = filterWithIndex;
function _reject(xs, predicateFn) {
  return filter(xs, function(el) {
    return !predicateFn(el);
  });
}
function reject() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _reject(data, args[0]);
    };
  }
  return _reject(arguments[0], arguments[1]);
}
function _rejectWithIndex(xs, predicateFn) {
  return filterWithIndex(xs, function(index, el) {
    return !predicateFn(index, el);
  });
}
function rejectWithIndex() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _rejectWithIndex(data, args[0]);
    };
  }
  return _rejectWithIndex(arguments[0], arguments[1]);
}
var _reduce = reduceU;
function reduce() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _reduce(data, args[0], args[1]);
    };
  }
  return _reduce(arguments[0], arguments[1], arguments[2]);
}
var _reduceReverse = reduceReverseU;
function reduceReverse() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _reduceReverse(data, args[0], args[1]);
    };
  }
  return _reduceReverse(arguments[0], arguments[1], arguments[2]);
}
var _reduceWithIndex = reduceWithIndexU;
function reduceWithIndex() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _reduceWithIndex(data, args[0], args[1]);
    };
  }
  return _reduceWithIndex(arguments[0], arguments[1], arguments[2]);
}
function _splitAt(xs, offset) {
  if (offset < 0 || offset > xs.length) {
    return;
  } else {
    return [
      slice(xs, 0, offset),
      sliceToEnd(xs, offset)
    ];
  }
}
function splitAt() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _splitAt(data, args[0]);
    };
  }
  return _splitAt(arguments[0], arguments[1]);
}
function _splitEvery(xs, size) {
  if (size < 1 || xs.length <= size) {
    return [xs];
  }
  var offset = 0;
  var arr = [];
  while (offset < xs.length) {
    var len = offset + size | 0;
    arr.push(slice(xs, offset, size));
    offset = len;
  }
  ;
  return arr;
}
function splitEvery() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _splitEvery(data, args[0]);
    };
  }
  return _splitEvery(arguments[0], arguments[1]);
}
var shuffle2 = shuffle;
var _partition = partitionU;
function partition() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _partition(data, args[0]);
    };
  }
  return _partition(arguments[0], arguments[1]);
}
var _concat = concat;
function concat2() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _concat(data, args[0]);
    };
  }
  return _concat(arguments[0], arguments[1]);
}
var concatMany2 = concatMany;
var _every = everyU;
function every() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _every(data, args[0]);
    };
  }
  return _every(arguments[0], arguments[1]);
}
var _some = someU;
function some2() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _some(data, args[0]);
    };
  }
  return _some(arguments[0], arguments[1]);
}
var _slice = slice;
function slice2() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _slice(data, args[0], args[1]);
    };
  }
  return _slice(arguments[0], arguments[1], arguments[2]);
}
var _sliceToEnd = sliceToEnd;
function sliceToEnd2() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _sliceToEnd(data, args[0]);
    };
  }
  return _sliceToEnd(arguments[0], arguments[1]);
}
var _eq = eqU;
function eq() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _eq(data, args[0], args[1]);
    };
  }
  return _eq(arguments[0], arguments[1], arguments[2]);
}
var _range = range;
function range2() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _range(data, args[0]);
    };
  }
  return _range(arguments[0], arguments[1]);
}
var _rangeBy = rangeBy;
function rangeBy2() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _rangeBy(data, args[0], args[1]);
    };
  }
  return _rangeBy(arguments[0], arguments[1], arguments[2]);
}
function copy(xs) {
  return xs.slice(0);
}
var _zip = zip;
function zip2() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _zip(data, args[0]);
    };
  }
  return _zip(arguments[0], arguments[1]);
}
var _zipWith = zipByU;
function zipWith() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _zipWith(data, args[0], args[1]);
    };
  }
  return _zipWith(arguments[0], arguments[1], arguments[2]);
}
var unzip2 = unzip;
function _replaceAt(xs, targetIndex, element) {
  return mapWithIndexU(xs, function(currentIndex, current) {
    if (currentIndex === targetIndex) {
      return element;
    } else {
      return current;
    }
  });
}
function replaceAt() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _replaceAt(data, args[0], args[1]);
    };
  }
  return _replaceAt(arguments[0], arguments[1], arguments[2]);
}
function _insertAt(xs, targetIndex, element) {
  var match = splitAt(xs, targetIndex);
  if (match !== void 0) {
    return concat(match[0], concat([element], match[1]));
  } else {
    return xs;
  }
}
function insertAt() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _insertAt(data, args[0], args[1]);
    };
  }
  return _insertAt(arguments[0], arguments[1], arguments[2]);
}
function _updateAt(xs, targetIndex, fn) {
  return mapWithIndexU(xs, function(index, el) {
    if (index === targetIndex) {
      return fn(el);
    } else {
      return el;
    }
  });
}
function updateAt() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _updateAt(data, args[0], args[1]);
    };
  }
  return _updateAt(arguments[0], arguments[1], arguments[2]);
}
function _swapAt(xs, targetIndex, swapIndex) {
  var match = get2(xs, targetIndex);
  var match$1 = get2(xs, swapIndex);
  if (match === void 0) {
    return xs;
  }
  if (match$1 === void 0) {
    return xs;
  }
  var b = valFromOption(match$1);
  var a = valFromOption(match);
  return mapWithIndexU(xs, function(k, x) {
    if (targetIndex === k) {
      return b;
    } else if (swapIndex === k) {
      return a;
    } else {
      return x;
    }
  });
}
function swapAt() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _swapAt(data, args[0], args[1]);
    };
  }
  return _swapAt(arguments[0], arguments[1], arguments[2]);
}
function _removeAt(xs, targetIndex) {
  return filterWithIndex(xs, function(index, param) {
    return index !== targetIndex;
  });
}
function removeAt() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _removeAt(data, args[0]);
    };
  }
  return _removeAt(arguments[0], arguments[1]);
}
function _uniqBy(xs, uniqFn) {
  var index = 0;
  var arr = [];
  while (index < xs.length) {
    var value = xs[index];
    var alreadyAdded = someU(arr, function(value2) {
      return function(x) {
        return caml_equal(uniqFn(x), uniqFn(value2));
      };
    }(value));
    if (!alreadyAdded) {
      arr.push(value);
    }
    index = index + 1 | 0;
  }
  ;
  return arr;
}
function uniqBy() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _uniqBy(data, args[0]);
    };
  }
  return _uniqBy(arguments[0], arguments[1]);
}
function uniq(xs) {
  return uniqBy(xs, function(element) {
    return element;
  });
}
var _forEach = forEachU;
function forEach() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _forEach(data, args[0]);
    };
  }
  return _forEach(arguments[0], arguments[1]);
}
var _forEachWithIndex = forEachWithIndexU;
function forEachWithIndex() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _forEachWithIndex(data, args[0]);
    };
  }
  return _forEachWithIndex(arguments[0], arguments[1]);
}
var _getIndexBy = getIndexByU;
function getIndexBy() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _getIndexBy(data, args[0]);
    };
  }
  return _getIndexBy(arguments[0], arguments[1]);
}
function _includes(xs, value) {
  return someU(xs, function(x) {
    return caml_equal(x, value);
  });
}
function includes() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _includes(data, args[0]);
    };
  }
  return _includes(arguments[0], arguments[1]);
}
function _join(xs, delimiter) {
  return xs.join(delimiter);
}
function join() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _join(data, args[0]);
    };
  }
  return _join(arguments[0], arguments[1]);
}
var _sort = stableSortByU;
function sort() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _sort(data, args[0]);
    };
  }
  return _sort(arguments[0], arguments[1]);
}
function _sortBy(xs, sortFn) {
  return stableSortByU(xs, function(a, b) {
    var a$1 = sortFn(a);
    var b$1 = sortFn(b);
    if (a$1 === b$1) {
      return 0;
    } else if (caml_lessthan(a$1, b$1)) {
      return -1;
    } else {
      return 1;
    }
  });
}
function sortBy() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _sortBy(data, args[0]);
    };
  }
  return _sortBy(arguments[0], arguments[1]);
}
function _groupBy(xs, groupFn) {
  return reduceU(xs, {}, function(acc, element) {
    var key = groupFn(element);
    var value = get(acc, key);
    if (value !== void 0) {
      value.push(element);
    } else {
      acc[key] = [element];
    }
    return acc;
  });
}
function groupBy() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _groupBy(data, args[0]);
    };
  }
  return _groupBy(arguments[0], arguments[1]);
}
function flat(xs) {
  return reduceU(xs, [], function(acc, value) {
    if (Array.isArray(value)) {
      forEachU(value, function(element) {
        acc.push(element);
      });
    } else {
      acc.push(value);
    }
    return acc;
  });
}
function _flatten(xs, arr) {
  var index = 0;
  while (index < xs.length) {
    var value = xs[index];
    if (Array.isArray(value)) {
      flatten(value, arr);
    } else {
      arr.push(value);
    }
    index = index + 1 | 0;
  }
  ;
  return arr;
}
function flatten() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _flatten(data, args[0]);
    };
  }
  return _flatten(arguments[0], arguments[1]);
}
function deepFlat(xs) {
  return flatten(xs, []);
}
function toTuple(xs) {
  return xs;
}
function _tap(xs, fn) {
  forEachU(xs, fn);
  return xs;
}
function tap() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _tap(data, args[0]);
    };
  }
  return _tap(arguments[0], arguments[1]);
}
function flip(xs) {
  return [
    xs[1],
    xs[0]
  ];
}
var _filterMap = keepMapU;
function filterMap() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _filterMap(data, args[0]);
    };
  }
  return _filterMap(arguments[0], arguments[1]);
}
var _keepMap = keepMapU;
function keepMap() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _keepMap(data, args[0]);
    };
  }
  return _keepMap(arguments[0], arguments[1]);
}
function _removeFirstBy(xs, value, predicateFn) {
  return reduceU(xs, [
    false,
    []
  ], function(acc, v) {
    var ys = acc[1];
    if (acc[0]) {
      ys.push(v);
      return [
        true,
        ys
      ];
    } else if (predicateFn(v, value)) {
      return [
        true,
        ys
      ];
    } else {
      ys.push(v);
      return [
        false,
        ys
      ];
    }
  })[1];
}
function removeFirstBy() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _removeFirstBy(data, args[0], args[1]);
    };
  }
  return _removeFirstBy(arguments[0], arguments[1], arguments[2]);
}
function _removeFirst(xs, value) {
  return removeFirstBy(xs, value, caml_equal);
}
function removeFirst() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _removeFirst(data, args[0]);
    };
  }
  return _removeFirst(arguments[0], arguments[1]);
}
function zipWithIndex(xs) {
  return reduceWithIndexU(xs, [], function(acc, value, index) {
    acc.push([
      value,
      index
    ]);
    return acc;
  });
}
function _all(xs, predicateFn) {
  return everyU(xs, predicateFn);
}
function all() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _all(data, args[0]);
    };
  }
  return _all(arguments[0], arguments[1]);
}
function _any(xs, predicateFn) {
  return someU(xs, predicateFn);
}
function any() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _any(data, args[0]);
    };
  }
  return _any(arguments[0], arguments[1]);
}
function _difference(xs, ys) {
  return reject(uniqBy(xs, function(element) {
    return element;
  }), function(value) {
    return includes(ys, value);
  });
}
function difference() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _difference(data, args[0]);
    };
  }
  return _difference(arguments[0], arguments[1]);
}
function _union(xs, ys) {
  var xs$1 = concat(xs, ys);
  return uniqBy(xs$1, function(element) {
    return element;
  });
}
function union() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _union(data, args[0]);
    };
  }
  return _union(arguments[0], arguments[1]);
}
function _intersection(xs, ys) {
  var match = xs.length > ys.length ? [
    xs,
    ys
  ] : [
    ys,
    xs
  ];
  var ys$1 = match[1];
  var xs$1 = filter(match[0], function(value) {
    return includes(ys$1, value);
  });
  return uniqBy(xs$1, function(element) {
    return element;
  });
}
function intersection() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _intersection(data, args[0]);
    };
  }
  return _intersection(arguments[0], arguments[1]);
}
