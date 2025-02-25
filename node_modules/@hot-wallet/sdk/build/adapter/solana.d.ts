import { WalletName, SendTransactionOptions, BaseMessageSignerWalletAdapter, WalletReadyState } from "@solana/wallet-adapter-base";
import { PublicKey, Connection, Transaction, TransactionSignature, TransactionVersion, VersionedTransaction } from "@solana/web3.js";
export declare const HotWalletName: WalletName<"HOT">;
export declare class HotWalletAdapter extends BaseMessageSignerWalletAdapter {
    name: WalletName<"HOT">;
    url: string;
    icon: string;
    supportedTransactionVersions: ReadonlySet<TransactionVersion>;
    private _connecting;
    private _publicKey;
    private _readyState;
    get publicKey(): PublicKey | null;
    get connecting(): boolean;
    get readyState(): WalletReadyState;
    _getLocalAccount(): PublicKey | null;
    _parseTransaction(base64: string): Transaction | VersionedTransaction;
    autoConnect(): Promise<void>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendTransaction<T extends Transaction | VersionedTransaction>(transaction: T, connection: Connection, options?: SendTransactionOptions): Promise<TransactionSignature>;
    signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T>;
    signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
}
