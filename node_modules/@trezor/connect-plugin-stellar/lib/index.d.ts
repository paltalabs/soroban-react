import { Transaction } from '@stellar/stellar-sdk';
export declare const transformTransaction: (path: string, transaction: Transaction) => {
    path: string;
    networkPassphrase: string;
    transaction: {
        source: string;
        fee: number;
        sequence: string;
        memo: {
            type: number;
            text: string;
            id?: undefined;
            hash?: undefined;
        } | {
            type: number;
            id: string;
            text?: undefined;
            hash?: undefined;
        } | {
            type: number;
            hash: string;
            text?: undefined;
            id?: undefined;
        } | {
            type: number;
            text?: undefined;
            id?: undefined;
            hash?: undefined;
        };
        timebounds: {
            minTime: number;
            maxTime: number;
        } | undefined;
        operations: any[];
    };
};
export default transformTransaction;
//# sourceMappingURL=index.d.ts.map