// src/Bool/Bool.bs.js
function placeholder(param) {
}
function _ifElse(value, truthyFn, falsyFn) {
  if (value) {
    return truthyFn(void 0);
  } else {
    return falsyFn(void 0);
  }
}
function ifElse() {
  if (arguments.length === 2) {
    const args = arguments;
    return function fn(data) {
      return _ifElse(data, args[0], args[1]);
    };
  }
  return _ifElse(arguments[0], arguments[1], arguments[2]);
}
function inverse(value) {
  return !value;
}
function not(value) {
  return !value;
}
function _and_(a, b) {
  if (a) {
    return b;
  } else {
    return false;
  }
}
function and() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _and_(data, args[0]);
    };
  }
  return _and_(arguments[0], arguments[1]);
}
function _or_(a, b) {
  if (a) {
    return true;
  } else {
    return b;
  }
}
function or() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _or_(data, args[0]);
    };
  }
  return _or_(arguments[0], arguments[1]);
}
function _nand(a, b) {
  return !(a && b);
}
function nand() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _nand(data, args[0]);
    };
  }
  return _nand(arguments[0], arguments[1]);
}
function _nor(a, b) {
  return !(a || b);
}
function nor() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _nor(data, args[0]);
    };
  }
  return _nor(arguments[0], arguments[1]);
}
function _xor(a, b) {
  if (!a && b) {
    return true;
  } else if (a) {
    return !b;
  } else {
    return false;
  }
}
function xor() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _xor(data, args[0]);
    };
  }
  return _xor(arguments[0], arguments[1]);
}
function _xnor(a, b) {
  return !xor(a, b);
}
function xnor() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _xnor(data, args[0]);
    };
  }
  return _xnor(arguments[0], arguments[1]);
}
function _implies(a, b) {
  if (a) {
    return b;
  } else {
    return true;
  }
}
function implies() {
  if (arguments.length === 1) {
    const args = arguments;
    return function fn(data) {
      return _implies(data, args[0]);
    };
  }
  return _implies(arguments[0], arguments[1]);
}
export {
  and,
  ifElse,
  implies,
  inverse,
  nand,
  nor,
  not,
  or,
  placeholder,
  xnor,
  xor
};
