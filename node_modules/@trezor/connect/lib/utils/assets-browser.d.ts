import { HttpRequestType, HttpRequestReturnType, HttpRequestOptions } from './assetsTypes';
export declare const httpRequest: <T extends HttpRequestType>(url: string, type?: T, options?: HttpRequestOptions) => Promise<HttpRequestReturnType<T>>;
//# sourceMappingURL=assets-browser.d.ts.map