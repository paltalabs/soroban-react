export declare const proxyApi = "https://h4n.app";
export declare const getResponse: (id: string) => Promise<object>;
export declare const deleteRequest: (id: string) => Promise<void>;
export declare const computeRequestId: (request: object) => Promise<{
    requestId: string;
    query: string;
}>;
export declare const createRequest: (request: object, signal?: AbortSignal) => Promise<string>;
