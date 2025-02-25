import BlockchainLink, { ServerInfo, SubscriptionAccountInfo, BlockchainLinkParams, BlockchainLinkResponse } from '@trezor/blockchain-link';
import { CoreEventMessage } from '../events';
import { ERRORS } from '../constants';
import type { CoinInfo, Proxy } from '../types';
export type BlockchainOptions = {
    coinInfo: CoinInfo;
    postMessage: (message: CoreEventMessage) => void;
    proxy?: Proxy;
    debug?: boolean;
    identity?: string;
    onDisconnected?: (pendingSubscriptions?: boolean) => void;
};
export declare class Blockchain {
    link: BlockchainLink;
    serverInfo?: ServerInfo;
    readonly identity?: string;
    readonly coinInfo: BlockchainOptions['coinInfo'];
    readonly postMessage: BlockchainOptions['postMessage'];
    feeForBlock: BlockchainLinkResponse<'estimateFee'>;
    feeTimestamp: number;
    private onDisconnected;
    private initPromise?;
    constructor(options: BlockchainOptions);
    onError(error: ERRORS.TrezorError): void;
    private initLink;
    init(): Promise<ServerInfo>;
    getTransactions(txs: string[]): Promise<import("@trezor/blockchain-link").Transaction[]>;
    getTransactionHexes(txids: string[]): Promise<string[]>;
    getCurrentFiatRates(params: {
        currencies?: string[];
        token?: string;
    }): Promise<{
        ts: number;
        rates: import("@trezor/blockchain-link").FiatRatesBySymbol;
    }>;
    getFiatRatesForTimestamps(params: {
        currencies?: string[];
        timestamps: number[];
        token?: string;
    }): Promise<{
        tickers: {
            ts: number;
            rates: import("@trezor/blockchain-link").FiatRatesBySymbol;
        }[];
    }>;
    getAccountBalanceHistory(params: BlockchainLinkParams<'getAccountBalanceHistory'>): Promise<import("@trezor/blockchain-link").AccountBalanceHistory[]>;
    getNetworkInfo(): Promise<ServerInfo>;
    getAccountInfo(request: BlockchainLinkParams<'getAccountInfo'>): Promise<import("@trezor/blockchain-link").AccountInfo>;
    getAccountUtxo(descriptor: string): Promise<import("@trezor/blockchain-link").Utxo[]>;
    rpcCall(params: BlockchainLinkParams<'rpcCall'>): Promise<{
        data: string;
    }>;
    estimateFee(request: Parameters<typeof this.link.estimateFee>[0]): Promise<{
        feePerUnit: string;
        feePerTx?: string;
        feeLimit?: string;
    }[]>;
    subscribeBlocks(): Promise<{
        subscribed: boolean;
    }>;
    subscribeAccounts(accounts: SubscriptionAccountInfo[]): Promise<{
        subscribed: boolean;
    }>;
    subscribeFiatRates(_currency?: string): Promise<{
        subscribed: boolean;
    }>;
    unsubscribeBlocks(): Promise<{
        subscribed: boolean;
    }>;
    unsubscribeAccounts(accounts: SubscriptionAccountInfo[]): Promise<{
        subscribed: boolean;
    }>;
    unsubscribeFiatRates(): Promise<{
        subscribed: boolean;
    }>;
    unsubscribeAll(): Promise<{
        subscribed: boolean;
    }>;
    pushTransaction(tx: string): Promise<string>;
    disconnect(): void;
}
//# sourceMappingURL=Blockchain.d.ts.map