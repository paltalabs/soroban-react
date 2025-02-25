var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  pipe: () => pipe
});
function pipe() {
  let x = arguments[0];
  for (let i = 1, l = arguments.length; i < l; i++) {
    x = arguments[i](x);
  }
  return x;
}
