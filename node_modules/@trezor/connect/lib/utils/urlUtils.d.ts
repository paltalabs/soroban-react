export declare const getOrigin: (url: unknown) => string;
export declare const getHost: (url: unknown) => string | undefined;
interface GetOnionDomain {
    (url: string, dict: {
        [domain: string]: string;
    }): string;
    (url: string[], dict: {
        [domain: string]: string;
    }): string[];
}
export declare const getOnionDomain: GetOnionDomain;
export {};
//# sourceMappingURL=urlUtils.d.ts.map