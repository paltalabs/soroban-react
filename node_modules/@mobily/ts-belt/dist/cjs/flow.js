var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  flow: () => flow
});
function flow() {
  let fns = arguments;
  return function() {
    let x = fns[0].apply(null, arguments);
    for (let i = 1, l = fns.length; i < l; i++) {
      x = fns[i](x);
    }
    return x;
  };
}
