import { TypedEmitter } from '@trezor/utils';
import type { BlockchainSettings } from '@trezor/blockchain-link-types';
import type * as ResponseTypes from '@trezor/blockchain-link-types/lib/responses';
import type * as MessageTypes from '@trezor/blockchain-link-types/lib/messages';
import type { Events } from '@trezor/blockchain-link-types/lib/events';
declare class BlockchainLink extends TypedEmitter<Events> {
    settings: BlockchainSettings;
    private lazyWorker;
    private deferred;
    private throttler;
    constructor(settings: BlockchainSettings);
    private initWorker;
    private disposeWorker;
    sendMessage<R>(message: any): Promise<R>;
    connect(): Promise<boolean>;
    getInfo(): Promise<ResponseTypes.GetInfo['payload']>;
    getBlockHash(payload: MessageTypes.GetBlockHash['payload']): Promise<ResponseTypes.GetBlockHash['payload']>;
    getBlock(payload: MessageTypes.GetBlock['payload']): Promise<ResponseTypes.GetBlock['payload']>;
    getAccountInfo(payload: MessageTypes.GetAccountInfo['payload']): Promise<ResponseTypes.GetAccountInfo['payload']>;
    getAccountUtxo(payload: MessageTypes.GetAccountUtxo['payload']): Promise<ResponseTypes.GetAccountUtxo['payload']>;
    getTransaction(payload: MessageTypes.GetTransaction['payload']): Promise<ResponseTypes.GetTransaction['payload']>;
    getTransactionHex(payload: MessageTypes.GetTransactionHex['payload']): Promise<ResponseTypes.GetTransactionHex['payload']>;
    getAccountBalanceHistory(payload: MessageTypes.GetAccountBalanceHistory['payload']): Promise<ResponseTypes.GetAccountBalanceHistory['payload']>;
    getCurrentFiatRates(payload: MessageTypes.GetCurrentFiatRates['payload']): Promise<ResponseTypes.GetCurrentFiatRates['payload']>;
    getFiatRatesForTimestamps(payload: MessageTypes.GetFiatRatesForTimestamps['payload']): Promise<ResponseTypes.GetFiatRatesForTimestamps['payload']>;
    getFiatRatesTickersList(payload: MessageTypes.GetFiatRatesTickersList['payload']): Promise<ResponseTypes.GetFiatRatesTickersList['payload']>;
    estimateFee(payload: MessageTypes.EstimateFee['payload']): Promise<ResponseTypes.EstimateFee['payload']>;
    rpcCall(payload: MessageTypes.RpcCall['payload']): Promise<ResponseTypes.RpcCall['payload']>;
    subscribe(payload: MessageTypes.Subscribe['payload']): Promise<ResponseTypes.Subscribe['payload']>;
    unsubscribe(payload: MessageTypes.Unsubscribe['payload']): Promise<ResponseTypes.Unsubscribe['payload']>;
    pushTransaction(payload: MessageTypes.PushTransaction['payload']): Promise<ResponseTypes.PushTransaction['payload']>;
    disconnect(): Promise<boolean>;
    onMessage: (event: {
        data: ResponseTypes.Response;
    }) => void;
    onEvent: (data: ResponseTypes.Response) => void;
    onError: (error: {
        message?: string;
        lineno: number;
        filename: string;
    }) => void;
    dispose(): void;
}
export default BlockchainLink;
export type BlockchainLinkInterface = (typeof BlockchainLink)['prototype'];
export type BlockchainLinkParams<T extends keyof BlockchainLinkInterface> = BlockchainLinkInterface[T] extends (...args: any[]) => any ? Parameters<BlockchainLinkInterface[T]>[number] : never;
export type BlockchainLinkResponse<T extends keyof BlockchainLinkInterface> = BlockchainLinkInterface[T] extends (...args: any[]) => any ? ReturnType<BlockchainLinkInterface[T]> extends Promise<infer R> ? R : never : never;
export type { Message } from '@trezor/blockchain-link-types/lib/messages';
export type { Response, BlockEvent, NotificationEvent, FiatRatesEvent, } from '@trezor/blockchain-link-types/lib/responses';
export type { Address, AccountAddresses, AccountInfo, AccountBalanceHistory, AnonymitySet, BlockchainSettings, FiatRatesBySymbol, ServerInfo, SubscriptionAccountInfo, Target, TokenInfo, TokenTransfer, InternalTransfer, Transaction, TransactionDetail, Utxo, } from '@trezor/blockchain-link-types/lib/common';
//# sourceMappingURL=index.d.ts.map