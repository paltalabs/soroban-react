import { ERROR } from '../constants';
declare type ErrorTypeKeys = keyof typeof ERROR;
declare type ErrorObjectType = typeof ERROR[ErrorTypeKeys];
export declare class CoinSelectionError extends Error {
    code: ErrorObjectType['code'];
    constructor(errorObject: ErrorObjectType);
}
export {};
