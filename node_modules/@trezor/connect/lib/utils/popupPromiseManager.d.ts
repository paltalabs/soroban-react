export declare const createPopupPromiseManager: () => {
    wait: () => Promise<void>;
    isWaiting: () => boolean;
    clear: () => void;
    resolve: () => void;
    reject: (error: Error) => void;
};
//# sourceMappingURL=popupPromiseManager.d.ts.map