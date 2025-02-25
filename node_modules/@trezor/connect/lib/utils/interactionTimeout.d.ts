type TimeoutID = any;
export declare class InteractionTimeout {
    timeout?: TimeoutID | null;
    seconds: number;
    constructor(seconds?: number);
    start(cancelFn: () => void, seconds?: number): void;
    stop(): void;
}
export {};
//# sourceMappingURL=interactionTimeout.d.ts.map