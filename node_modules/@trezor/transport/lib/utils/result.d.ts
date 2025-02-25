import type { Success } from '../types';
export declare const success: <T>(payload: T) => Success<T>;
export declare const error: <E>({ error, message }: {
    error: E;
    message?: string;
}) => {
    success: false;
    error: E;
    message: string | undefined;
};
export declare const unknownError: <E = never>(err: Error, expectedErrors?: E[]) => {
    success: false;
    error: NonNullable<E>;
    message: string | undefined;
} | {
    success: false;
    error: "unexpected error";
    message: string;
};
//# sourceMappingURL=result.d.ts.map