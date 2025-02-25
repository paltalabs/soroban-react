import { SorobanContextType } from '..';
/**
 * Creates a Stellar asset contract by wrapping a Stellar asset.
 * @param code The code of the asset.
 * @param issuer The issuer of the asset.
 * @param sorobanContext The Soroban context containing information about the active chain, address, and sorobanServer.
 * @returns A promise that resolves to the result of the transaction.
 * @throws An error if there is no active chain, not connected to a sorobanServer, or no network passphrase.
 */
export declare function wrapStellarAsset({ code, issuer, sorobanContext, }: {
    code: string;
    issuer: string;
    sorobanContext: SorobanContextType;
}): Promise<import("./types").TxResponse>;
