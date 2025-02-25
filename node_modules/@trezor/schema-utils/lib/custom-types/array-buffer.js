"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayBufferBuilder = void 0;
const typebox_1 = require("@sinclair/typebox");
typebox_1.TypeRegistry.Set('ArrayBuffer', (_, value) => value instanceof ArrayBuffer);
class ArrayBufferBuilder extends typebox_1.JavaScriptTypeBuilder {
    ArrayBuffer(options) {
        return (0, typebox_1.CreateType)({ [typebox_1.Kind]: 'ArrayBuffer', type: 'ArrayBuffer' }, options);
    }
}
exports.ArrayBufferBuilder = ArrayBufferBuilder;
//# sourceMappingURL=array-buffer.js.map