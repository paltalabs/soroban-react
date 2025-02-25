// node_modules/rescript/lib/es6/caml_array.js
function sub(x, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;
  while (j < len) {
    result[j] = x[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  }
  ;
  return result;
}

// node_modules/rescript/lib/es6/curry.js
function app(_f, _args) {
  while (true) {
    var args = _args;
    var f = _f;
    var init_arity = f.length;
    var arity = init_arity === 0 ? 1 : init_arity;
    var len = args.length;
    var d = arity - len | 0;
    if (d === 0) {
      return f.apply(null, args);
    }
    if (d >= 0) {
      return function(f2, args2) {
        return function(x) {
          return app(f2, args2.concat([x]));
        };
      }(f, args);
    }
    _args = sub(args, arity, -d | 0);
    _f = f.apply(null, sub(args, 0, arity));
    continue;
  }
  ;
}
function _1(o, a0) {
  var arity = o.length;
  if (arity === 1) {
    return o(a0);
  } else {
    switch (arity) {
      case 1:
        return o(a0);
      case 2:
        return function(param) {
          return o(a0, param);
        };
      case 3:
        return function(param, param$1) {
          return o(a0, param, param$1);
        };
      case 4:
        return function(param, param$1, param$2) {
          return o(a0, param, param$1, param$2);
        };
      case 5:
        return function(param, param$1, param$2, param$3) {
          return o(a0, param, param$1, param$2, param$3);
        };
      case 6:
        return function(param, param$1, param$2, param$3, param$4) {
          return o(a0, param, param$1, param$2, param$3, param$4);
        };
      case 7:
        return function(param, param$1, param$2, param$3, param$4, param$5) {
          return o(a0, param, param$1, param$2, param$3, param$4, param$5);
        };
      default:
        return app(o, [a0]);
    }
  }
}
function __1(o) {
  var arity = o.length;
  if (arity === 1) {
    return o;
  } else {
    return function(a0) {
      return _1(o, a0);
    };
  }
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
function nullable_to_opt(x) {
  if (x == null) {
    return;
  } else {
    return some(x);
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

// node_modules/rescript/lib/es6/belt_Option.js
function getExn(x) {
  if (x !== void 0) {
    return valFromOption(x);
  }
  throw {
    RE_EXN_ID: "Not_found",
    Error: new Error()
  };
}
function mapWithDefaultU(opt, $$default, f) {
  if (opt !== void 0) {
    return f(valFromOption(opt));
  } else {
    return $$default;
  }
}
function mapU(opt, f) {
  if (opt !== void 0) {
    return some(f(valFromOption(opt)));
  }
}
function flatMapU(opt, f) {
  if (opt !== void 0) {
    return f(valFromOption(opt));
  }
}
function flatMap(opt, f) {
  return flatMapU(opt, __1(f));
}
function getWithDefault(opt, $$default) {
  if (opt !== void 0) {
    return valFromOption(opt);
  } else {
    return $$default;
  }
}
function isSome(param) {
  return param !== void 0;
}
function isNone(x) {
  return x === void 0;
}

// src/Option/Option.bs.js
function placeholder(param) {
}
function fromNullable(value) {
  if (value == null) {
    return;
  } else {
    return some(value);
  }
}
function fromFalsy(value) {
  if (value) {
    return value;
  }
}
function _fromPredicate(value, predicateFn) {
  return flatMap(value == null ? void 0 : some(value), function(value2) {
    if (predicateFn(value2)) {
      return some(value2);
    }
  });
}
function fromPredicate() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _fromPredicate(data, args[0]);
    };
  }
  return _fromPredicate(arguments[0], arguments[1]);
}
function fromExecution(fn) {
  try {
    return some(fn(void 0));
  } catch (exn) {
    return;
  }
}
function fromPromise(promise) {
  var __x = promise.then(function(value) {
    return Promise.resolve(some(value));
  });
  return __x.catch(function(param) {
    return Promise.resolve(void 0);
  });
}
var _map = mapU;
function map() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _map(data, args[0]);
    };
  }
  return _map(arguments[0], arguments[1]);
}
var _flatMap = flatMapU;
function flatMap2() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _flatMap(data, args[0]);
    };
  }
  return _flatMap(arguments[0], arguments[1]);
}
var _mapWithDefault = mapWithDefaultU;
function mapWithDefault() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _mapWithDefault(data, args[0], args[1]);
    };
  }
  return _mapWithDefault(arguments[0], arguments[1], arguments[2]);
}
function _mapNullable(option, mapFn) {
  if (option !== void 0) {
    return nullable_to_opt(mapFn(valFromOption(option)));
  }
}
function mapNullable() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _mapNullable(data, args[0]);
    };
  }
  return _mapNullable(arguments[0], arguments[1]);
}
function _filter(option, predicateFn) {
  return flatMapU(option, function(value) {
    if (predicateFn(value)) {
      return some(value);
    }
  });
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
var _getWithDefault = getWithDefault;
function getWithDefault2() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _getWithDefault(data, args[0]);
    };
  }
  return _getWithDefault(arguments[0], arguments[1]);
}
var getExn2 = getExn;
function toNullable(option) {
  return getWithDefault(option, null);
}
function toUndefined(option) {
  return getWithDefault(option, void 0);
}
function _toResult(option, errorValue) {
  if (option !== void 0) {
    return {
      TAG: 0,
      _0: valFromOption(option)
    };
  } else {
    return {
      TAG: 1,
      _0: errorValue
    };
  }
}
function toResult() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _toResult(data, args[0]);
    };
  }
  return _toResult(arguments[0], arguments[1]);
}
function _match(option, someFn, noneFn) {
  if (option !== void 0) {
    return someFn(valFromOption(option));
  } else {
    return noneFn(void 0);
  }
}
function match() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _match(data, args[0], args[1]);
    };
  }
  return _match(arguments[0], arguments[1], arguments[2]);
}
var isNone2 = isNone;
var isSome2 = isSome;
function _tap(option, someFn) {
  if (option !== void 0) {
    someFn(valFromOption(option));
    return option;
  } else {
    return option;
  }
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
function _contains(option, value) {
  return mapWithDefaultU(option, false, function(someValue) {
    return caml_equal(someValue, value);
  });
}
function contains() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _contains(data, args[0]);
    };
  }
  return _contains(arguments[0], arguments[1]);
}
function _zip(fstOption, sndOption) {
  if (fstOption !== void 0 && sndOption !== void 0) {
    return [
      valFromOption(fstOption),
      valFromOption(sndOption)
    ];
  }
}
function zip() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _zip(data, args[0]);
    };
  }
  return _zip(arguments[0], arguments[1]);
}
function _zipWith(fstOption, sndOption, mapFn) {
  if (fstOption !== void 0 && sndOption !== void 0) {
    return some(mapFn(valFromOption(fstOption), valFromOption(sndOption)));
  }
}
function zipWith() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _zipWith(data, args[0], args[1]);
    };
  }
  return _zipWith(arguments[0], arguments[1], arguments[2]);
}

// src/Option/index.js
var Some = (value) => value;
var None = void 0;
export {
  None,
  Some,
  contains,
  filter,
  flatMap2 as flatMap,
  fromExecution,
  fromFalsy,
  fromNullable,
  fromPredicate,
  fromPromise,
  getExn2 as getExn,
  getWithDefault2 as getWithDefault,
  isNone2 as isNone,
  isSome2 as isSome,
  map,
  mapNullable,
  mapWithDefault,
  match,
  placeholder,
  tap,
  toNullable,
  toResult,
  toUndefined,
  zip,
  zipWith
};
