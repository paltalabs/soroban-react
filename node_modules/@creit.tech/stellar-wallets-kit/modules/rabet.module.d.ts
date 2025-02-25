import { ModuleInterface, ModuleType } from '../types';
export declare const RABET_ID = "rabet";
export declare class RabetModule implements ModuleInterface {
    moduleType: ModuleType;
    productId: string;
    productName: string;
    productUrl: string;
    productIcon: string;
    isAvailable(): Promise<boolean>;
    getAddress(): Promise<{
        address: string;
    }>;
    signTransaction(xdr: string, opts?: {
        networkPassphrase?: string;
        address?: string;
        path?: string;
        submit?: boolean;
        submitUrl?: string;
    }): Promise<{
        signedTxXdr: string;
        signerAddress?: string;
    }>;
    signAuthEntry(): Promise<{
        signedAuthEntry: string;
        signerAddress?: string;
    }>;
    signMessage(): Promise<{
        signedMessage: string;
        signerAddress?: string;
    }>;
    getNetwork(): Promise<{
        network: string;
        networkPassphrase: string;
    }>;
}
export declare enum RabetNetwork {
    PUBLIC = "mainnet",
    TESTNET = "testnet"
}
//# sourceMappingURL=rabet.module.d.ts.map