"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinSelectionError = void 0;
class CoinSelectionError extends Error {
    constructor(errorObject) {
        super(errorObject.message);
        this.name = 'CoinSelectionError';
        this.code = errorObject.code;
        this.message = errorObject.message;
        Object.setPrototypeOf(this, CoinSelectionError.prototype);
    }
}
exports.CoinSelectionError = CoinSelectionError;
