import type { InjectedState, HotRequest, HotResponse } from "./helpers/types";
declare global {
    interface Window {
        hotExtension?: {
            autoRun: boolean;
            request: (method: string, args: any) => any;
            subscribe: (event: string, args: any) => () => void;
            evm: any;
        };
    }
}
export declare const wait: (timeout: number) => Promise<void>;
export declare class RequestFailed extends Error {
    readonly payload: any;
    name: string;
    constructor(payload: any);
}
export declare const getExtension: () => {
    autoRun: boolean;
    request: (method: string, args: any) => any;
    subscribe: (event: string, args: any) => () => void;
    evm: any;
} | null | undefined;
declare class HOT {
    walletId: string;
    ancestorOrigins: string[];
    readonly connection: Promise<InjectedState | null>;
    get isInjected(): boolean;
    openInHotBrowserUrl: string | null;
    toggleOpenInHotBrowser(url: string | null): void;
    customProvider?: (data: any, chain: number, address?: string | null) => Promise<any>;
    setupEthProvider(provider?: (data: any, chain: number, address?: string | null) => Promise<any>): void;
    injectedRequest<T extends keyof HotResponse>(method: T, request: HotRequest[T]): Promise<HotResponse[T]>;
    subscribe(event: string, cb: (e: any) => void): () => void;
    request<T extends keyof HotResponse>(method: T, request: HotRequest[T]): Promise<HotResponse[T]>;
}
declare const _default: HOT;
export default _default;
