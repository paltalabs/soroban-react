import { ModuleInterface, ModuleType } from '../types';
export declare const ALBEDO_ID = "albedo";
export declare class AlbedoModule implements ModuleInterface {
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
    /**
     * We understand that Albedo has a method to sign a message, but that method is not compatible with SEP-0043
     */
    signMessage(): Promise<{
        signedMessage: string;
        signerAddress?: string;
    }>;
    getNetwork(): Promise<{
        network: string;
        networkPassphrase: string;
    }>;
}
export declare enum AlbedoNetwork {
    PUBLIC = "public",
    TESTNET = "testnet"
}
//# sourceMappingURL=albedo.module.d.ts.map