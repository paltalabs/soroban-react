import { decodeLedgerData } from './ledger-hashes';
import { JsonObject } from './types/serialized-type';
import { XrplDefinitionsBase, TRANSACTION_TYPES, DEFAULT_DEFINITIONS } from './enums';
import { XrplDefinitions } from './enums/xrpl-definitions';
import { coreTypes } from './types';
/**
 * Decode a transaction
 *
 * @param binary hex-string of the encoded transaction
 * @param definitions Custom rippled types to use instead of the default. Used for sidechains and amendments.
 * @returns the JSON representation of the transaction
 */
declare function decode(binary: string, definitions?: XrplDefinitionsBase): JsonObject;
/**
 * Encode a transaction
 *
 * @param json The JSON representation of a transaction
 * @param definitions Custom rippled types to use instead of the default. Used for sidechains and amendments.
 *
 * @returns A hex-string of the encoded transaction
 */
declare function encode(json: object, definitions?: XrplDefinitionsBase): string;
/**
 * Encode a transaction and prepare for signing
 *
 * @param json JSON object representing the transaction
 * @param signer string representing the account to sign the transaction with
 * @param definitions Custom rippled types to use instead of the default. Used for sidechains and amendments.
 * @returns a hex string of the encoded transaction
 */
declare function encodeForSigning(json: object, definitions?: XrplDefinitionsBase): string;
/**
 * Encode a transaction and prepare for signing with a claim
 *
 * @param json JSON object representing the transaction
 * @param signer string representing the account to sign the transaction with
 * @param definitions Custom rippled types to use instead of the default. Used for sidechains and amendments.
 * @returns a hex string of the encoded transaction
 */
declare function encodeForSigningClaim(json: object): string;
/**
 * Encode a transaction and prepare for multi-signing
 *
 * @param json JSON object representing the transaction
 * @param signer string representing the account to sign the transaction with
 * @param definitions Custom rippled types to use instead of the default. Used for sidechains and amendments.
 * @returns a hex string of the encoded transaction
 */
declare function encodeForMultisigning(json: object, signer: string, definitions?: XrplDefinitionsBase): string;
/**
 * Encode a quality value
 *
 * @param value string representation of a number
 * @returns a hex-string representing the quality
 */
declare function encodeQuality(value: string): string;
/**
 * Decode a quality value
 *
 * @param value hex-string of a quality
 * @returns a string representing the quality
 */
declare function decodeQuality(value: string): string;
export { decode, encode, encodeForSigning, encodeForSigningClaim, encodeForMultisigning, encodeQuality, decodeQuality, decodeLedgerData, TRANSACTION_TYPES, XrplDefinitions, XrplDefinitionsBase, DEFAULT_DEFINITIONS, coreTypes, };
