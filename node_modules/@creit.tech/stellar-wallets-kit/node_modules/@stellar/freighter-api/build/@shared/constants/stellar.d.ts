export declare enum NETWORK_NAMES {
    TESTNET = "Test Net",
    PUBNET = "Main Net",
    FUTURENET = "Future Net"
}
export declare enum NETWORKS {
    PUBLIC = "PUBLIC",
    TESTNET = "TESTNET",
    FUTURENET = "FUTURENET"
}
export declare enum NETWORK_URLS {
    PUBLIC = "https://horizon.stellar.org",
    TESTNET = "https://horizon-testnet.stellar.org",
    FUTURENET = "https://horizon-futurenet.stellar.org"
}
export declare enum FRIENDBOT_URLS {
    TESTNET = "https://friendbot.stellar.org",
    FUTURENET = "https://friendbot-futurenet.stellar.org"
}
export declare const SOROBAN_RPC_URLS: {
    [key in NETWORKS]: string;
};
export interface NetworkDetails {
    network: string;
    networkName: string;
    networkUrl: string;
    networkPassphrase: string;
    friendbotUrl?: string;
    sorobanRpcUrl?: string;
}
export declare const MAINNET_NETWORK_DETAILS: NetworkDetails;
export declare const TESTNET_NETWORK_DETAILS: NetworkDetails;
export declare const FUTURENET_NETWORK_DETAILS: NetworkDetails;
export declare const DEFAULT_NETWORKS: Array<NetworkDetails>;
export declare const BASE_RESERVE: 0.5;
export declare const BASE_RESERVE_MIN_COUNT: 2;
