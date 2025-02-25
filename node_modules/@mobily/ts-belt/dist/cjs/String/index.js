var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/String/index.js
__export(exports, {
  append: () => append,
  concat: () => concat,
  endsWith: () => endsWith,
  get: () => get,
  getUnsafe: () => getUnsafe,
  head: () => head,
  includes: () => includes,
  indexOf: () => indexOf,
  isEmpty: () => isEmpty,
  isNotEmpty: () => isNotEmpty,
  last: () => last,
  lastIndexOf: () => lastIndexOf,
  length: () => length,
  make: () => make,
  match: () => match,
  placeholder: () => placeholder,
  prepend: () => prepend,
  remove: () => remove,
  removeAll: () => removeAll,
  repeat: () => repeat,
  replace: () => replace,
  replaceAll: () => replaceAll,
  replaceByRe: () => replaceByRe,
  search: () => search,
  slice: () => slice,
  sliceToEnd: () => sliceToEnd,
  split: () => split,
  splitAt: () => splitAt,
  splitByRe: () => splitByRe,
  startsWith: () => startsWith,
  toArray: () => toArray,
  toLowerCase: () => toLowerCase,
  toUpperCase: () => toUpperCase,
  trim: () => trim,
  trimEnd: () => trimEnd,
  trimStart: () => trimStart
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
function undefined_to_opt(x) {
  if (x === void 0) {
    return;
  } else {
    return some(x);
  }
}
function null_to_opt(x) {
  if (x === null) {
    return;
  } else {
    return some(x);
  }
}

// node_modules/rescript/lib/es6/belt_Array.js
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
function reduceWithIndexU(a, x, f) {
  var r = x;
  for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
    r = f(r, a[i], i);
  }
  return r;
}

// src/String/String.bs.js
function placeholder(param) {
}
function make(value) {
  return String(value);
}
function length(str) {
  return str.length;
}
function _concat(str, appendValue) {
  return str.concat(appendValue);
}
function concat() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _concat(data, args[0]);
    };
  }
  return _concat(arguments[0], arguments[1]);
}
function _append(str, appendValue) {
  return str.concat(appendValue);
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
function _prepend(str, prependValue) {
  return prependValue.concat(str);
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
function _slice(str, start, end) {
  return str.slice(start, end);
}
function slice() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _slice(data, args[0], args[1]);
    };
  }
  return _slice(arguments[0], arguments[1], arguments[2]);
}
function _sliceToEnd(str, start) {
  return str.slice(start);
}
function sliceToEnd() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _sliceToEnd(data, args[0]);
    };
  }
  return _sliceToEnd(arguments[0], arguments[1]);
}
function toLowerCase(str) {
  return str.toLowerCase();
}
function toUpperCase(str) {
  return str.toUpperCase();
}
function trim(str) {
  return str.trim();
}
function trimStart(str) {
  return str.trimStart();
}
function trimEnd(str) {
  return str.trimEnd();
}
function isEmpty(str) {
  return str.length === 0;
}
function isNotEmpty(str) {
  return str.length > 0;
}
function _split(str, delimiter) {
  return str.split(delimiter);
}
function split() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _split(data, args[0]);
    };
  }
  return _split(arguments[0], arguments[1]);
}
function _splitByRe(str, regex) {
  return str.split(regex);
}
function splitByRe() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _splitByRe(data, args[0]);
    };
  }
  return _splitByRe(arguments[0], arguments[1]);
}
function _splitAt(str, index) {
  return [
    str.slice(0, index),
    str.slice(index)
  ];
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
function _includes(str, searchValue) {
  return str.includes(searchValue);
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
function _replace(str, oldValue, newValue) {
  return str.replace(oldValue, newValue);
}
function replace() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _replace(data, args[0], args[1]);
    };
  }
  return _replace(arguments[0], arguments[1], arguments[2]);
}
function _replaceAll(str, oldValue, newValue) {
  var xs = str.split(oldValue);
  return reduceWithIndexU(xs, "", function(acc, str2, index) {
    var value = index < (xs.length - 1 | 0) ? str2.concat(newValue) : str2;
    return acc.concat(value);
  });
}
function replaceAll() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _replaceAll(data, args[0], args[1]);
    };
  }
  return _replaceAll(arguments[0], arguments[1], arguments[2]);
}
function _replaceByRe(str, regex, value) {
  return str.replace(regex, value);
}
function replaceByRe() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _replaceByRe(data, args[0], args[1]);
    };
  }
  return _replaceByRe(arguments[0], arguments[1], arguments[2]);
}
function _remove(str, value) {
  return str.replace(value, "");
}
function remove() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _remove(data, args[0]);
    };
  }
  return _remove(arguments[0], arguments[1]);
}
function _removeAll(str, value) {
  return replaceAll(str, value, "");
}
function removeAll() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _removeAll(data, args[0]);
    };
  }
  return _removeAll(arguments[0], arguments[1]);
}
function _search(str, regex) {
  var index = str.search(regex);
  if (index < 0) {
    return;
  } else {
    return index;
  }
}
function search() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _search(data, args[0]);
    };
  }
  return _search(arguments[0], arguments[1]);
}
function _match(str, regex) {
  return null_to_opt(str.match(regex));
}
function match() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _match(data, args[0]);
    };
  }
  return _match(arguments[0], arguments[1]);
}
function _repeat(str, n) {
  return str.repeat(n);
}
function repeat() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _repeat(data, args[0]);
    };
  }
  return _repeat(arguments[0], arguments[1]);
}
function _indexOf(str, searchValue) {
  var index = str.indexOf(searchValue);
  if (index < 0) {
    return;
  } else {
    return index;
  }
}
function indexOf() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _indexOf(data, args[0]);
    };
  }
  return _indexOf(arguments[0], arguments[1]);
}
function _lastIndexOf(str, searchValue) {
  var index = str.lastIndexOf(searchValue);
  if (index < 0) {
    return;
  } else {
    return index;
  }
}
function lastIndexOf() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _lastIndexOf(data, args[0]);
    };
  }
  return _lastIndexOf(arguments[0], arguments[1]);
}
function _endsWith(str, substr) {
  return str.endsWith(substr);
}
function endsWith() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _endsWith(data, args[0]);
    };
  }
  return _endsWith(arguments[0], arguments[1]);
}
function _startsWith(str, substr) {
  return str.startsWith(substr);
}
function startsWith() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _startsWith(data, args[0]);
    };
  }
  return _startsWith(arguments[0], arguments[1]);
}
function _getUnsafe(str, n) {
  return str[n];
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
function _get(str, n) {
  return undefined_to_opt(str[n]);
}
function get() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _get(data, args[0]);
    };
  }
  return _get(arguments[0], arguments[1]);
}
function toArray(str) {
  return makeByU(str.length, function(index) {
    return str[index];
  });
}
function head(str) {
  return undefined_to_opt(str[0]);
}
function last(str) {
  var n = str.length - 1 | 0;
  return undefined_to_opt(str[n]);
}
