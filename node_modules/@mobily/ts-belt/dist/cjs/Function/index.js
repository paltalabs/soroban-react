var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/Function/index.js
__export(exports, {
  after: () => after,
  allPass: () => allPass,
  always: () => always,
  anyPass: () => anyPass,
  before: () => before,
  both: () => both,
  coerce: () => coerce,
  debounce: () => debounce,
  defaultTo: () => defaultTo,
  either: () => either,
  equals: () => equals,
  falsy: () => falsy,
  identity: () => identity,
  ifElse: () => ifElse,
  ignore: () => ignore,
  makeControlledDebounce: () => makeControlledDebounce,
  makeControlledThrottle: () => makeControlledThrottle,
  memoize: () => memoize,
  memoizeWithKey: () => memoizeWithKey,
  once: () => once,
  placeholder: () => placeholder,
  tap: () => tap,
  throttle: () => throttle,
  toMutable: () => toMutable,
  truthy: () => truthy,
  tryCatch: () => tryCatch,
  unless: () => unless,
  when: () => when
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

// node_modules/rescript/lib/es6/caml_exceptions.js
var id = {
  contents: 0
};
function create(str) {
  id.contents = id.contents + 1 | 0;
  return str + ("/" + id.contents);
}
function caml_is_extension(e) {
  if (e == null) {
    return false;
  } else {
    return typeof e.RE_EXN_ID === "string";
  }
}

// node_modules/rescript/lib/es6/caml_js_exceptions.js
var $$Error = /* @__PURE__ */ create("Caml_js_exceptions.Error");
function internalToOCamlException(e) {
  if (caml_is_extension(e)) {
    return e;
  } else {
    return {
      RE_EXN_ID: $$Error,
      _1: e
    };
  }
}

// node_modules/rescript/lib/es6/js_exn.js
var $$Error$1 = $$Error;

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

// node_modules/rescript/lib/es6/belt_Option.js
function mapWithDefaultU(opt, $$default, f) {
  if (opt !== void 0) {
    return f(valFromOption(opt));
  } else {
    return $$default;
  }
}
function isSome(param) {
  return param !== void 0;
}

// node_modules/rescript/lib/es6/belt_internalAVLtree.js
function treeHeight(n) {
  if (n !== void 0) {
    return n.h;
  } else {
    return 0;
  }
}
function create2(l, x, d, r) {
  var hl = treeHeight(l);
  var hr = treeHeight(r);
  return {
    k: x,
    v: d,
    h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0,
    l,
    r
  };
}
function singleton(x, d) {
  return {
    k: x,
    v: d,
    h: 1,
    l: void 0,
    r: void 0
  };
}
function updateValue(n, newValue) {
  if (n.v === newValue) {
    return n;
  } else {
    return {
      k: n.k,
      v: newValue,
      h: n.h,
      l: n.l,
      r: n.r
    };
  }
}
function bal(l, x, d, r) {
  var hl = l !== void 0 ? l.h : 0;
  var hr = r !== void 0 ? r.h : 0;
  if (hl > (hr + 2 | 0)) {
    var ll = l.l;
    var lr = l.r;
    if (treeHeight(ll) >= treeHeight(lr)) {
      return create2(ll, l.k, l.v, create2(lr, x, d, r));
    } else {
      return create2(create2(ll, l.k, l.v, lr.l), lr.k, lr.v, create2(lr.r, x, d, r));
    }
  }
  if (hr <= (hl + 2 | 0)) {
    return {
      k: x,
      v: d,
      h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0,
      l,
      r
    };
  }
  var rl = r.l;
  var rr = r.r;
  if (treeHeight(rr) >= treeHeight(rl)) {
    return create2(create2(l, x, d, rl), r.k, r.v, rr);
  } else {
    return create2(create2(l, x, d, rl.l), rl.k, rl.v, create2(rl.r, r.k, r.v, rr));
  }
}

// node_modules/rescript/lib/es6/belt_internalMapString.js
function get(_n, x) {
  while (true) {
    var n = _n;
    if (n === void 0) {
      return;
    }
    var v = n.k;
    if (x === v) {
      return some(n.v);
    }
    _n = x < v ? n.l : n.r;
    continue;
  }
  ;
}

// node_modules/rescript/lib/es6/belt_MapString.js
function set(t, newK, newD) {
  if (t === void 0) {
    return singleton(newK, newD);
  }
  var k = t.k;
  if (newK === k) {
    return updateValue(t, newD);
  }
  var v = t.v;
  if (newK < k) {
    return bal(set(t.l, newK, newD), k, v, t.r);
  } else {
    return bal(t.l, k, v, set(t.r, newK, newD));
  }
}
var get2 = get;

// src/Function/Function.bs.js
function placeholder(param) {
}
function identity(value) {
  return value;
}
var _equals = caml_equal;
function equals() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _equals(data, args[0]);
    };
  }
  return _equals(arguments[0], arguments[1]);
}
function _both(value, fn0, fn1) {
  if (fn0(value)) {
    return fn1(value);
  } else {
    return false;
  }
}
function both() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _both(data, args[0], args[1]);
    };
  }
  return _both(arguments[0], arguments[1], arguments[2]);
}
function _either(value, fn0, fn1) {
  if (fn0(value)) {
    return true;
  } else {
    return fn1(value);
  }
}
function either() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _either(data, args[0], args[1]);
    };
  }
  return _either(arguments[0], arguments[1], arguments[2]);
}
function always(value) {
  return function() {
    return value;
  };
}
function _defaultTo(value, defaultValue) {
  if (value == null) {
    return defaultValue;
  } else {
    return value;
  }
}
function defaultTo() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _defaultTo(data, args[0]);
    };
  }
  return _defaultTo(arguments[0], arguments[1]);
}
function falsy() {
  return false;
}
function truthy() {
  return true;
}
function _ifElse(value, predicateFn, truthyFn, falsyFn) {
  if (predicateFn(value)) {
    return truthyFn(value);
  } else {
    return falsyFn(value);
  }
}
function ifElse() {
  if (arguments.length === 3) {
    const args = arguments;
    return function fn(data) {
      return _ifElse(data, args[0], args[1], args[2]);
    };
  }
  return _ifElse(arguments[0], arguments[1], arguments[2], arguments[3]);
}
function ignore(param) {
}
function _unless(value, predicateFn, falsyFn) {
  if (predicateFn(value)) {
    return value;
  } else {
    return falsyFn(value);
  }
}
function unless() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _unless(data, args[0], args[1]);
    };
  }
  return _unless(arguments[0], arguments[1], arguments[2]);
}
function _when_(value, predicateFn, truthyFn) {
  if (predicateFn(value)) {
    return truthyFn(value);
  } else {
    return value;
  }
}
function when() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _when_(data, args[0], args[1]);
    };
  }
  return _when_(arguments[0], arguments[1], arguments[2]);
}
function _allPass(value, fns) {
  return everyU(fns, function(fn) {
    return fn(value);
  });
}
function allPass() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _allPass(data, args[0]);
    };
  }
  return _allPass(arguments[0], arguments[1]);
}
function _anyPass(value, fns) {
  return someU(fns, function(fn) {
    return fn(value);
  });
}
function anyPass() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _anyPass(data, args[0]);
    };
  }
  return _anyPass(arguments[0], arguments[1]);
}
function _tap(value, fn) {
  fn(value);
  return value;
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
function _makeControlledThrottle(fn, options) {
  var isThrottled = {
    contents: false
  };
  var timer = {
    contents: void 0
  };
  var cancel = function(param) {
    mapWithDefaultU(timer.contents, void 0, function(timer2) {
      clearTimeout(timer2);
    });
    timer.contents = void 0;
  };
  var invoke = function(...restArgs) {
    cancel(void 0);
    return fn(...restArgs);
  };
  var isScheduled = function(param) {
    return isThrottled.contents;
  };
  var isLeading = {
    contents: options.leading
  };
  var make = function(...restArgs) {
    if (isLeading.contents) {
      isLeading.contents = false;
      return fn(...restArgs);
    } else {
      if (isThrottled.contents) {
        return;
      }
      cancel(void 0);
      isThrottled.contents = true;
      fn(...restArgs);
      var timeout = setTimeout(function(param) {
        isThrottled.contents = false;
        timer.contents = void 0;
      }, options.delay);
      timer.contents = some(timeout);
      return;
    }
  };
  return {
    cancel,
    invoke,
    isScheduled,
    schedule: make
  };
}
function makeControlledThrottle() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _makeControlledThrottle(data, args[0]);
    };
  }
  return _makeControlledThrottle(arguments[0], arguments[1]);
}
function _throttle(fn, delay) {
  return makeControlledThrottle(fn, {
    delay,
    leading: false
  }).schedule;
}
function throttle() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _throttle(data, args[0]);
    };
  }
  return _throttle(arguments[0], arguments[1]);
}
function _makeControlledDebounce(fn, options) {
  var timer = {
    contents: void 0
  };
  var cancel = function(param) {
    mapWithDefaultU(timer.contents, void 0, function(timer2) {
      clearTimeout(timer2);
    });
    timer.contents = void 0;
  };
  var invoke = function(...restArgs) {
    cancel(void 0);
    return fn(...restArgs);
  };
  var isScheduled = function(param) {
    return isSome(timer.contents);
  };
  var isLeading = {
    contents: options.leading
  };
  var make = function(...restArgs) {
    if (isLeading.contents) {
      isLeading.contents = false;
      return fn(...restArgs);
    } else {
      cancel(void 0);
      var timeout = setTimeout(function(param) {
        fn(...restArgs);
        timer.contents = void 0;
      }, options.delay);
      timer.contents = some(timeout);
      return;
    }
  };
  return {
    cancel,
    invoke,
    isScheduled,
    schedule: make
  };
}
function makeControlledDebounce() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _makeControlledDebounce(data, args[0]);
    };
  }
  return _makeControlledDebounce(arguments[0], arguments[1]);
}
function _debounce(fn, delay) {
  return makeControlledDebounce(fn, {
    delay,
    leading: false
  }).schedule;
}
function debounce() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _debounce(data, args[0]);
    };
  }
  return _debounce(arguments[0], arguments[1]);
}
function _tryCatch(value, fn) {
  try {
    return {
      TAG: 0,
      _0: fn(value)
    };
  } catch (raw_obj) {
    var obj = internalToOCamlException(raw_obj);
    if (obj.RE_EXN_ID === $$Error$1) {
      var message = obj._1.message;
      if (message !== void 0) {
        return {
          TAG: 1,
          _0: message
        };
      } else {
        return {
          TAG: 1,
          _0: "F.tryCatch: unknown error"
        };
      }
    }
    throw obj;
  }
}
function tryCatch() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _tryCatch(data, args[0]);
    };
  }
  return _tryCatch(arguments[0], arguments[1]);
}
function _before(times, fn) {
  var count = {
    contents: 0
  };
  var lastResult = {
    contents: void 0
  };
  return function(...restArgs) {
    var result = lastResult.contents;
    if (result !== void 0) {
      if (count.contents >= times) {
        return valFromOption(result);
      }
      var result$1 = fn(...restArgs);
      lastResult.contents = some(result$1);
      count.contents = count.contents + 1 | 0;
      return result$1;
    }
    var result$2 = fn(...restArgs);
    lastResult.contents = some(result$2);
    count.contents = count.contents + 1 | 0;
    return result$2;
  };
}
function before() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _before(data, args[0]);
    };
  }
  return _before(arguments[0], arguments[1]);
}
function _after(times, fn) {
  var count = {
    contents: 0
  };
  return function(...restArgs) {
    if (count.contents < times) {
      count.contents = count.contents + 1 | 0;
      return;
    } else {
      return some(fn(...restArgs));
    }
  };
}
function after() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _after(data, args[0]);
    };
  }
  return _after(arguments[0], arguments[1]);
}
function once(fn) {
  var lastResult = {
    contents: void 0
  };
  return function(...restArgs) {
    var result = lastResult.contents;
    if (result !== void 0) {
      return valFromOption(result);
    }
    var result$1 = fn(...restArgs);
    lastResult.contents = some(result$1);
    return result$1;
  };
}
var memoize = once;
function _memoizeWithKey(makeKeyFn, fn) {
  var cache = {
    contents: void 0
  };
  return function(...restArgs) {
    var key = makeKeyFn(...restArgs);
    var result = get2(cache.contents, key);
    if (result !== void 0) {
      return valFromOption(result);
    }
    var result$1 = fn(...restArgs);
    cache.contents = set(cache.contents, key, result$1);
    return result$1;
  };
}
function memoizeWithKey() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _memoizeWithKey(data, args[0]);
    };
  }
  return _memoizeWithKey(arguments[0], arguments[1]);
}
function toMutable(value) {
  return value;
}
function coerce(value) {
  return value;
}
