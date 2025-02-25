"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParameter = void 0;
class InvalidParameter extends Error {
    constructor(reason, field, type, value) {
        let message = `Invalid parameter`;
        message += ` "${field.substring(1)}"`;
        message += ` (= ${JSON.stringify(value)})`;
        message += `: ${reason.replace(/'/g, '"')}`;
        super(message);
        this.name = 'InvalidParameter';
        this.field = field;
        this.type = type;
    }
}
exports.InvalidParameter = InvalidParameter;
//# sourceMappingURL=errors.js.map