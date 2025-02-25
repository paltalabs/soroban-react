"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const console_logger_1 = require("./console.logger.cjs");
const DEFAULT_LOG_LEVELS = [
    'verbose',
    'debug',
    'log',
    'warn',
    'error',
    'fatal',
];
const DEFAULT_LOGGER = new console_logger_1.ConsoleLogger(DEFAULT_LOG_LEVELS);
/**
 * Used to log the library messages
 */
class Logger {
    static instanceRef = DEFAULT_LOGGER;
    static overrideLogger = (logger) => {
        this.instanceRef = logger;
    };
    static error(message, ...optionalParams) {
        this.instanceRef?.error(message, ...optionalParams);
    }
    /**
     * Write a 'log' level log.
     */
    static log(message, ...optionalParams) {
        this.instanceRef?.log(message, ...optionalParams);
    }
    /**
     * Write a 'warn' level log.
     */
    static warn(message, ...optionalParams) {
        this.instanceRef?.warn(message, ...optionalParams);
    }
    /**
     * Write a 'debug' level log.
     */
    static debug(message, ...optionalParams) {
        this.instanceRef?.debug?.(message, ...optionalParams);
    }
    /**
     * Write a 'verbose' level log.
     */
    static verbose(message, ...optionalParams) {
        this.instanceRef?.verbose?.(message, ...optionalParams);
    }
    static fatal(message, ...optionalParams) {
        this.instanceRef?.fatal?.(message, ...optionalParams);
    }
}
exports.Logger = Logger;
