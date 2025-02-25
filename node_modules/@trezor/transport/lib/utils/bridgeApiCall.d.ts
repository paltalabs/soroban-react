export type HttpRequestOptions = {
    body?: Array<any> | Record<string, unknown> | string;
    url: string;
    method: 'POST' | 'GET';
    skipContentTypeHeader?: boolean;
    signal?: AbortSignal;
    timeout?: number;
};
export declare function bridgeApiCall(options: HttpRequestOptions): Promise<{
    success: false;
    error: string;
    message: string | undefined;
} | import("../types").Success<string | Record<string, unknown>>>;
//# sourceMappingURL=bridgeApiCall.d.ts.map