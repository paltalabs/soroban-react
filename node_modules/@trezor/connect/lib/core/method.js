"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMethod = void 0;
const tslib_1 = require("tslib");
const Methods = tslib_1.__importStar(require("../api"));
const errors_1 = require("../constants/errors");
const network_1 = require("../constants/network");
const getMethodModule = (method) => network_1.MODULES.find(module => method.startsWith(module));
const getMethod = async (message) => {
    const { method } = message.payload;
    if (typeof method !== 'string') {
        throw (0, errors_1.TypedError)('Method_InvalidParameter', 'Message method is not set');
    }
    const methodModule = getMethodModule(method);
    const methods = methodModule
        ? await Promise.resolve(`${`../api/${methodModule}/api`}`).then(s => tslib_1.__importStar(require(s)))
        : Methods;
    const MethodConstructor = methods[method];
    if (MethodConstructor) {
        return new MethodConstructor(message);
    }
    throw (0, errors_1.TypedError)('Method_InvalidParameter', `Method ${method} not found`);
};
exports.getMethod = getMethod;
//# sourceMappingURL=method.js.map