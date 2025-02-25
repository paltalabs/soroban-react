interface Logger {
    debug: (...args: unknown[]) => void;
}
export declare const getLogger: (debug: boolean) => Logger;
export {};
