import { HttpRequestOptions, HttpRequestReturnType, HttpRequestType } from './assetsTypes';
export declare function httpRequest<T extends HttpRequestType>(url: string, type: T, options?: HttpRequestOptions): Promise<HttpRequestReturnType<T>>;
//# sourceMappingURL=assets.d.ts.map