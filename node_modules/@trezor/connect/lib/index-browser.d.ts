declare const TrezorConnect: Omit<import("./exports").TrezorConnect, "init"> & {
    init: import("./types/api/init").InitType<Record<string, any>>;
} & Record<string, any>;
export default TrezorConnect;
export * from './exports';
//# sourceMappingURL=index-browser.d.ts.map