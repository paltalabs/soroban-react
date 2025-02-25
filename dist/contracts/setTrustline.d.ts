import { SorobanContextType } from '..';
import * as StellarSdk from '@stellar/stellar-sdk';
/**
 * Sets a trustline for a token on the Stellar network.
 * @param {Object} options - The options object.
 * @param {string} options.tokenSymbol - The symbol of the token.
 * @param {string} options.tokenAdmin - The public key of the token's administrator.
 * @param {SorobanContextType} options.sorobanContext - The Soroban context.
 * @returns {Promise<StellarSdk.TransactionResponse>} A promise that resolves with the transaction response.
 * @throws {Error} Throws an error if there is no active chain, no sorobanServer connected, or if network passphrase is missing.
 */
export declare function setTrustline({ tokenSymbol, tokenAdmin, sorobanContext, }: {
    tokenSymbol: string;
    tokenAdmin: string;
    sorobanContext: SorobanContextType;
}): Promise<StellarSdk.Horizon.HorizonApi.SubmitTransactionResponse>;
