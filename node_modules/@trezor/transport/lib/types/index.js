"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathPublic = exports.PathInternal = exports.Session = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./apiCall"), exports);
const Session = (input) => {
    return `${input}`;
};
exports.Session = Session;
const PathInternal = (input) => {
    return input;
};
exports.PathInternal = PathInternal;
const PathPublic = (input) => {
    return `${input}`;
};
exports.PathPublic = PathPublic;
//# sourceMappingURL=index.js.map