var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/Result/index.js
__export(exports, {
  Error: () => Error2,
  Ok: () => Ok,
  catchError: () => catchError,
  flatMap: () => flatMap2,
  flip: () => flip,
  fromExecution: () => fromExecution,
  fromFalsy: () => fromFalsy,
  fromNullable: () => fromNullable,
  fromPredicate: () => fromPredicate,
  fromPromise: () => fromPromise,
  getExn: () => getExn2,
  getWithDefault: () => getWithDefault2,
  handleError: () => handleError,
  isError: () => isError2,
  isOk: () => isOk2,
  map: () => map,
  mapError: () => mapError,
  mapWithDefault: () => mapWithDefault,
  match: () => match,
  placeholder: () => placeholder,
  recover: () => recover,
  tap: () => tap,
  tapError: () => tapError,
  toNullable: () => toNullable,
  toOption: () => toOption,
  toUndefined: () => toUndefined
});

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

// node_modules/rescript/lib/es6/belt_Result.js
function getExn(x) {
  if (x.TAG === 0) {
    return x._0;
  }
  throw {
    RE_EXN_ID: "Not_found",
    Error: new Error()
  };
}
function mapWithDefaultU(opt, $$default, f) {
  if (opt.TAG === 0) {
    return f(opt._0);
  } else {
    return $$default;
  }
}
function mapU(opt, f) {
  if (opt.TAG === 0) {
    return {
      TAG: 0,
      _0: f(opt._0)
    };
  } else {
    return {
      TAG: 1,
      _0: opt._0
    };
  }
}
function flatMapU(opt, f) {
  if (opt.TAG === 0) {
    return f(opt._0);
  } else {
    return {
      TAG: 1,
      _0: opt._0
    };
  }
}
function flatMap(opt, f) {
  return flatMapU(opt, __1(f));
}
function getWithDefault(opt, $$default) {
  if (opt.TAG === 0) {
    return opt._0;
  } else {
    return $$default;
  }
}
function isOk(param) {
  if (param.TAG === 0) {
    return true;
  } else {
    return false;
  }
}
function isError(param) {
  if (param.TAG === 0) {
    return false;
  } else {
    return true;
  }
}

// src/Result/Result.bs.js
function placeholder(param) {
}
function _fromNullable(value, errorValue) {
  if (value == null) {
    return {
      TAG: 1,
      _0: errorValue
    };
  } else {
    return {
      TAG: 0,
      _0: value
    };
  }
}
function fromNullable() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _fromNullable(data, args[0]);
    };
  }
  return _fromNullable(arguments[0], arguments[1]);
}
function _fromFalsy(value, errorValue) {
  if (value) {
    return {
      TAG: 0,
      _0: value
    };
  } else {
    return {
      TAG: 1,
      _0: errorValue
    };
  }
}
function fromFalsy() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _fromFalsy(data, args[0]);
    };
  }
  return _fromFalsy(arguments[0], arguments[1]);
}
function _fromPredicate(value, predicateFn, errorValue) {
  return flatMap(fromNullable(value, errorValue), function(value2) {
    if (predicateFn(value2)) {
      return {
        TAG: 0,
        _0: value2
      };
    } else {
      return {
        TAG: 1,
        _0: errorValue
      };
    }
  });
}
function fromPredicate() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _fromPredicate(data, args[0], args[1]);
    };
  }
  return _fromPredicate(arguments[0], arguments[1], arguments[2]);
}
function fromExecution(fn) {
  try {
    return {
      TAG: 0,
      _0: fn(void 0)
    };
  } catch (raw_err) {
    var err = internalToOCamlException(raw_err);
    if (err.RE_EXN_ID === $$Error$1) {
      return {
        TAG: 1,
        _0: err._1
      };
    }
    throw err;
  }
}
function fromPromise(promise) {
  var __x = promise.then(function(value) {
    return Promise.resolve({
      TAG: 0,
      _0: value
    });
  });
  return __x.catch(function(err) {
    return Promise.resolve({
      TAG: 1,
      _0: err
    });
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
var getExn2 = getExn;
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
function toUndefined(result) {
  return getWithDefault(result, void 0);
}
function toNullable(result) {
  return getWithDefault(result, null);
}
function toOption(result) {
  if (result.TAG === 0) {
    return some(result._0);
  }
}
function _match(result, okFn, errorFn) {
  if (result.TAG === 0) {
    return okFn(result._0);
  } else {
    return errorFn(result._0);
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
var isError2 = isError;
var isOk2 = isOk;
function _tap(result, okFn) {
  if (result.TAG !== 0) {
    return result;
  }
  okFn(result._0);
  return result;
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
function _tapError(result, errorFn) {
  if (result.TAG === 0) {
    return result;
  }
  errorFn(result._0);
  return result;
}
function tapError() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _tapError(data, args[0]);
    };
  }
  return _tapError(arguments[0], arguments[1]);
}
function _handleError(result, mapFn) {
  if (result.TAG === 0) {
    return result;
  } else {
    return {
      TAG: 0,
      _0: mapFn(result._0)
    };
  }
}
function handleError() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _handleError(data, args[0]);
    };
  }
  return _handleError(arguments[0], arguments[1]);
}
function _mapError(result, mapFn) {
  if (result.TAG === 0) {
    return result;
  } else {
    return {
      TAG: 1,
      _0: mapFn(result._0)
    };
  }
}
function mapError() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _mapError(data, args[0]);
    };
  }
  return _mapError(arguments[0], arguments[1]);
}
function _catchError(result, mapFn) {
  if (result.TAG === 0) {
    return result;
  } else {
    return mapFn(result._0);
  }
}
function catchError() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _catchError(data, args[0]);
    };
  }
  return _catchError(arguments[0], arguments[1]);
}
function _recover(result, defaultValue) {
  return catchError(result, function(param) {
    return {
      TAG: 0,
      _0: defaultValue
    };
  });
}
function recover() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _recover(data, args[0]);
    };
  }
  return _recover(arguments[0], arguments[1]);
}
function flip(result) {
  if (result.TAG === 0) {
    return {
      TAG: 1,
      _0: result._0
    };
  } else {
    return {
      TAG: 0,
      _0: result._0
    };
  }
}

// src/Result/index.js
var Ok = (value) => {
  return {
    TAG: 0,
    _0: value
  };
};
var Error2 = (value) => {
  return {
    TAG: 1,
    _0: value
  };
};
