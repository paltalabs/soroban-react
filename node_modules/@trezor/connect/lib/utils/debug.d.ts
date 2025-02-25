export declare const initLog: (prefix: string, enabled?: boolean, logWriter?: import("@trezor/utils").LogWriter) => import("@trezor/utils").Log;
export declare const setLogWriter: (logWriterFactory: () => import("@trezor/utils").LogWriter | undefined) => void;
export declare const enableLog: (enabled?: boolean) => void;
export declare const enableLogByPrefix: (prefix: string, enabled: boolean) => void;
export declare const getLog: () => import("@trezor/utils").LogMessage[];
export type { LogMessage, LogWriter, Log } from '@trezor/utils';
//# sourceMappingURL=debug.d.ts.map