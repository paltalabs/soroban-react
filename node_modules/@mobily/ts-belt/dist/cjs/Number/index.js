var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/Number/index.js
__export(exports, {
  add: () => add,
  clamp: () => clamp,
  divide: () => divide,
  divideWithModulo: () => divideWithModulo,
  gt: () => gt,
  gte: () => gte,
  lt: () => lt,
  lte: () => lte,
  modulo: () => modulo,
  multiply: () => multiply,
  placeholder: () => placeholder,
  pred: () => pred,
  subtract: () => subtract,
  succ: () => succ
});

// node_modules/rescript/lib/es6/caml_int32.js
function mod_(x, y) {
  if (y === 0) {
    throw {
      RE_EXN_ID: "Division_by_zero",
      Error: new Error()
    };
  }
  return x % y;
}

// src/Number/Number.bs.js
function placeholder(param) {
}
function pred(n) {
  return n - 1 | 0;
}
function succ(n) {
  return n + 1 | 0;
}
function _add(a, b) {
  return a + b;
}
function add() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _add(data, args[0]);
    };
  }
  return _add(arguments[0], arguments[1]);
}
function _subtract(a, b) {
  return a - b;
}
function subtract() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _subtract(data, args[0]);
    };
  }
  return _subtract(arguments[0], arguments[1]);
}
function _multiply(a, b) {
  return a * b;
}
function multiply() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _multiply(data, args[0]);
    };
  }
  return _multiply(arguments[0], arguments[1]);
}
function _divide(a, b) {
  return a / b;
}
function divide() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _divide(data, args[0]);
    };
  }
  return _divide(arguments[0], arguments[1]);
}
var _modulo = mod_;
function modulo() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _modulo(data, args[0]);
    };
  }
  return _modulo(arguments[0], arguments[1]);
}
function _divideWithModulo(a, b) {
  return [
    a / b,
    mod_(a | 0, b | 0)
  ];
}
function divideWithModulo() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _divideWithModulo(data, args[0]);
    };
  }
  return _divideWithModulo(arguments[0], arguments[1]);
}
function _gt(a, b) {
  return a > b;
}
function gt() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _gt(data, args[0]);
    };
  }
  return _gt(arguments[0], arguments[1]);
}
function _gte(a, b) {
  return a >= b;
}
function gte() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _gte(data, args[0]);
    };
  }
  return _gte(arguments[0], arguments[1]);
}
function _lt(a, b) {
  return a < b;
}
function lt() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _lt(data, args[0]);
    };
  }
  return _lt(arguments[0], arguments[1]);
}
function _lte(a, b) {
  return a <= b;
}
function lte() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _lte(data, args[0]);
    };
  }
  return _lte(arguments[0], arguments[1]);
}
function _clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function clamp() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _clamp(data, args[0], args[1]);
    };
  }
  return _clamp(arguments[0], arguments[1], arguments[2]);
}
