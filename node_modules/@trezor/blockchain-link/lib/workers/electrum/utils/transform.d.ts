import { Network } from '@trezor/utxo-lib';
export declare const btcToSat: (btc: number) => string;
export declare const addressToScripthash: (address: string, network?: Network) => string;
export declare const scriptToScripthash: (hex: string) => string;
export declare const blockheaderToBlockhash: (header: string) => string;
export declare const tryGetScripthash: (address: string, network?: Network) => {
    valid: true;
    scripthash: string;
} | {
    valid: false;
};
//# sourceMappingURL=transform.d.ts.map