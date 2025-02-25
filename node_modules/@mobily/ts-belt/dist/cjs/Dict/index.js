var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/Dict/index.js
__export(exports, {
  deleteKey: () => deleteKey,
  deleteKeys: () => deleteKeys,
  filter: () => filter,
  filterWithKey: () => filterWithKey,
  fromPairs: () => fromPairs,
  get: () => get3,
  getUnsafe: () => getUnsafe,
  isEmpty: () => isEmpty,
  isNotEmpty: () => isNotEmpty,
  keys: () => keys,
  makeEmpty: () => makeEmpty,
  map: () => map,
  mapWithKey: () => mapWithKey,
  merge: () => merge,
  placeholder: () => placeholder,
  prop: () => prop,
  reject: () => reject,
  rejectWithKey: () => rejectWithKey,
  selectKeys: () => selectKeys,
  set: () => set,
  toPairs: () => toPairs,
  update: () => update,
  updateUnsafe: () => updateUnsafe,
  values: () => values2
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

// node_modules/rescript/lib/es6/js_dict.js
function get(dict, k) {
  if (k in dict) {
    return some(dict[k]);
  }
}
var unsafeDeleteKey = function(dict, key) {
  delete dict[key];
};
function values(dict) {
  var keys2 = Object.keys(dict);
  var l = keys2.length;
  var values$1 = new Array(l);
  for (var i = 0; i < l; ++i) {
    values$1[i] = dict[keys2[i]];
  }
  return values$1;
}
function fromArray(entries) {
  var dict = {};
  var l = entries.length;
  for (var i = 0; i < l; ++i) {
    var match = entries[i];
    dict[match[0]] = match[1];
  }
  return dict;
}

// node_modules/rescript/lib/es6/caml_obj.js
var for_in = function(o, foo) {
  for (var x in o) {
    foo(x);
  }
};
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

// node_modules/rescript/lib/es6/belt_Array.js
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
function reduceU(a, x, f) {
  var r = x;
  for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
    r = f(r, a[i]);
  }
  return r;
}

// src/Array/Array.bs.js
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

// src/Dict/Dict.bs.js
function placeholder(param) {
}
function makeEmpty(prim) {
  return {};
}
function _getUnsafe(dict, key) {
  return dict[key];
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
var _get = get;
function get3() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _get(data, args[0]);
    };
  }
  return _get(arguments[0], arguments[1]);
}
function _prop(dict, key) {
  return dict[key];
}
function prop() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _prop(data, args[0]);
    };
  }
  return _prop(arguments[0], arguments[1]);
}
function toPairs(dict) {
  return Object.entries(dict);
}
var values2 = values;
function keys(dict) {
  return Object.keys(dict);
}
var fromPairs = fromArray;
function _merge(fst, snd) {
  return Object.assign({}, fst, snd);
}
function merge() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _merge(data, args[0]);
    };
  }
  return _merge(arguments[0], arguments[1]);
}
function _set(dict, key, value) {
  var obj = merge({}, dict);
  obj[key] = value;
  return obj;
}
function set() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _set(data, args[0], args[1]);
    };
  }
  return _set(arguments[0], arguments[1], arguments[2]);
}
function _update(dict, key, fn) {
  var optionalValue = get(dict, key);
  return set(dict, key, fn(optionalValue));
}
function update() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _update(data, args[0], args[1]);
    };
  }
  return _update(arguments[0], arguments[1], arguments[2]);
}
function _updateUnsafe(dict, key, fn) {
  var value = dict[key];
  return set(dict, key, fn(value));
}
function updateUnsafe() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _updateUnsafe(data, args[0], args[1]);
    };
  }
  return _updateUnsafe(arguments[0], arguments[1], arguments[2]);
}
function _deleteKey(dict, key) {
  var obj = merge({}, dict);
  unsafeDeleteKey(obj, key);
  return obj;
}
function deleteKey() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _deleteKey(data, args[0]);
    };
  }
  return _deleteKey(arguments[0], arguments[1]);
}
function _deleteKeys(dict, keys2) {
  var obj = merge({}, dict);
  forEachU(keys2, function(key) {
    return unsafeDeleteKey(obj, key);
  });
  return obj;
}
function deleteKeys() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _deleteKeys(data, args[0]);
    };
  }
  return _deleteKeys(arguments[0], arguments[1]);
}
function _map(dict, mapFn) {
  return fromArray(mapU(Object.keys(dict), function(key) {
    var value = mapFn(dict[key]);
    return [
      key,
      value
    ];
  }));
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
function _mapWithKey(dict, mapFn) {
  return fromArray(mapU(Object.keys(dict), function(key) {
    var value = mapFn(key, dict[key]);
    return [
      key,
      value
    ];
  }));
}
function mapWithKey() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _mapWithKey(data, args[0]);
    };
  }
  return _mapWithKey(arguments[0], arguments[1]);
}
function _filter(dict, predicateFn) {
  return fromArray(reduceU(Object.keys(dict), [], function(acc, key) {
    var value = dict[key];
    if (predicateFn(value)) {
      return append(acc, [
        key,
        value
      ]);
    } else {
      return acc;
    }
  }));
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
function _filterWithKey(dict, predicateFn) {
  return fromArray(reduceU(Object.keys(dict), [], function(acc, key) {
    var value = dict[key];
    if (predicateFn(key, value)) {
      return append(acc, [
        key,
        value
      ]);
    } else {
      return acc;
    }
  }));
}
function filterWithKey() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _filterWithKey(data, args[0]);
    };
  }
  return _filterWithKey(arguments[0], arguments[1]);
}
function _reject(dict, predicateFn) {
  return filter(dict, function(value) {
    return !predicateFn(value);
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
function _rejectWithKey(dict, predicateFn) {
  return filterWithKey(dict, function(key, value) {
    return !predicateFn(key, value);
  });
}
function rejectWithKey() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _rejectWithKey(data, args[0]);
    };
  }
  return _rejectWithKey(arguments[0], arguments[1]);
}
function _selectKeys(dict, keys2) {
  return filterWithKey(dict, function(key, param) {
    return keys2.includes(key);
  });
}
function selectKeys() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _selectKeys(data, args[0]);
    };
  }
  return _selectKeys(arguments[0], arguments[1]);
}
function isEmpty(dict) {
  return caml_equal(dict, {});
}
function isNotEmpty(dict) {
  return !caml_equal(dict, {});
}
