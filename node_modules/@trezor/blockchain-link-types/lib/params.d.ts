export interface AccountBalanceHistoryParams {
    descriptor: string;
    from?: number;
    to?: number;
    currencies?: string[];
    groupBy?: number;
}
export interface GetCurrentFiatRatesParams {
    currencies?: string[];
    token?: string;
}
export interface GetFiatRatesForTimestampsParams {
    timestamps: number[];
    currencies?: string[];
    token?: string;
}
export interface GetFiatRatesTickersListParams {
    timestamp?: number;
    token?: string;
}
export interface EstimateFeeParams {
    blocks?: number[];
    specific?: {
        conservative?: boolean;
        txsize?: number;
        from?: string;
        to?: string;
        data?: string;
        value?: string;
        isCreatingAccount?: boolean;
    };
}
export interface RpcCallParams {
    from: string;
    to: string;
    data: string;
}
export interface AccountInfoParams {
    descriptor: string;
    details?: 'basic' | 'tokens' | 'tokenBalances' | 'txids' | 'txs';
    tokens?: 'nonzero' | 'used' | 'derived';
    page?: number;
    pageSize?: number;
    from?: number;
    to?: number;
    contractFilter?: string;
    gap?: number;
    marker?: {
        ledger: number;
        seq: number;
    };
    tokenAccountsPubKeys?: string[];
}
//# sourceMappingURL=params.d.ts.map