"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UintBuilder = void 0;
const typebox_1 = require("@sinclair/typebox");
typebox_1.TypeRegistry.Set('Uint', (schema, value) => {
    if (typeof value !== 'string' && typeof value !== 'number') {
        return false;
    }
    if ((typeof value === 'number' && !Number.isSafeInteger(value)) ||
        !/^(?:[1-9]\d*|\d)$/.test(value.toString().replace(/^-/, schema.allowNegative ? '' : '-'))) {
        return false;
    }
    return true;
});
class UintBuilder extends typebox_1.JavaScriptTypeBuilder {
    Uint(options) {
        return (0, typebox_1.CreateType)({ [typebox_1.Kind]: 'Uint', type: 'Uint' }, options);
    }
}
exports.UintBuilder = UintBuilder;
//# sourceMappingURL=uint.js.map