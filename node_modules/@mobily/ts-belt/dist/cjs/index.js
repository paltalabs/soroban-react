var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  A: () => A,
  B: () => B,
  D: () => D,
  F: () => F,
  G: () => G,
  N: () => N,
  O: () => O,
  R: () => R,
  S: () => S,
  flow: () => import_flow.flow,
  pipe: () => import_pipe.pipe
});
var import_pipe = __toModule(require("./pipe.js"));
var import_flow = __toModule(require("./flow.js"));
var F = __toModule(require("./Function"));
var A = __toModule(require("./Array"));
var R = __toModule(require("./Result"));
var G = __toModule(require("./Guards"));
var O = __toModule(require("./Option"));
var S = __toModule(require("./String"));
var D = __toModule(require("./Dict"));
var B = __toModule(require("./Bool"));
var N = __toModule(require("./Number"));
