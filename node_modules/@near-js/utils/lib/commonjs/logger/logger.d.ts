import type { LoggerService } from './interface';
/**
 * Used to log the library messages
 */
export declare class Logger {
    protected static instanceRef?: LoggerService;
    static overrideLogger: (logger?: LoggerService) => void;
    /**
     * Write an 'error' level log.
     */
    static error(message: any, stack?: string): void;
    static error(message: any, ...optionalParams: [string, ...any[]]): void;
    /**
     * Write a 'log' level log.
     */
    static log(message: any, ...optionalParams: any[]): void;
    /**
     * Write a 'warn' level log.
     */
    static warn(message: any, ...optionalParams: any[]): void;
    /**
     * Write a 'debug' level log.
     */
    static debug(message: any, ...optionalParams: any[]): void;
    /**
     * Write a 'verbose' level log.
     */
    static verbose(message: any, ...optionalParams: any[]): void;
    /**
     * Write a 'fatal' level log.
     */
    static fatal(message: any, stack?: string): void;
    static fatal(message: any, ...optionalParams: [string, ...any[]]): void;
}
//# sourceMappingURL=logger.d.ts.map