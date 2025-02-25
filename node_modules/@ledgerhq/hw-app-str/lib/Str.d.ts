/// <reference types="node" />
/********************************************************************************
 *   Ledger Node JS API
 *   (c) 2017-2018 Ledger
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ********************************************************************************/
import type Transport from "@ledgerhq/hw-transport";
/**
 * Stellar API
 *
 * @param transport a transport for sending commands to a device
 * @param scrambleKey a scramble key
 *
 * @example
 * import Str from "@ledgerhq/hw-app-str";
 * const str = new Str(transport)
 */
export default class Str {
    private transport;
    constructor(transport: Transport, scrambleKey?: string);
    /**
     * Get Stellar application configuration.
     *
     * @returns an object with the application configuration, including the version,
     *    whether hash signing is enabled, and the maximum data size in bytes that the device can sign.
     * @example
     * str.getAppConfiguration().then(o => o.version)
     */
    getAppConfiguration(): Promise<{
        version: string;
        hashSigningEnabled: boolean;
        maxDataSize?: number;
    }>;
    /**
     * Get Stellar raw public key for a given BIP 32 path.
     *
     * @param path a path in BIP 32 format
     * @param display if true, the device will ask the user to confirm the address on the device, if false, it will return the raw public key directly
     * @return an object with the raw ed25519 public key.
     *    If you want to convert it to string, you can use {@link https://stellar.github.io/js-stellar-base/StrKey.html#.encodeEd25519PublicKey StrKey.encodeEd25519PublicKey}
     * @example
     * str.getPublicKey("44'/148'/0'").then(o => o.rawPublicKey)
     */
    getPublicKey(path: string, display?: boolean): Promise<{
        rawPublicKey: Buffer;
    }>;
    /**
     * Sign a Stellar transaction.
     *
     * @param path a path in BIP 32 format
     * @param transaction {@link https://stellar.github.io/js-stellar-base/Transaction.html#signatureBase signature base} of the transaction to sign
     * @return an object with the signature
     * @example
     * str.signTransaction("44'/148'/0'", signatureBase).then(o => o.signature)
     */
    signTransaction(path: string, transaction: Buffer): Promise<{
        signature: Buffer;
    }>;
    /**
     * Sign a Stellar Soroban authorization.
     *
     * @param path a path in BIP 32 format
     * @param hashIdPreimage the {@link https://github.com/stellar/stellar-xdr/blob/1a04392432dacc0092caaeae22a600ea1af3c6a5/Stellar-transaction.x#L702-L709 Soroban authorization hashIdPreimage} to sign
     * @return an object with the signature
     * @example
     * str.signSorobanAuthorization("44'/148'/0'", hashIdPreimage).then(o => o.signature)
     */
    signSorobanAuthorization(path: string, hashIdPreimage: Buffer): Promise<{
        signature: Buffer;
    }>;
    /**
     * Sign a hash.
     *
     * @param path a path in BIP 32 format
     * @param hash the hash to sign
     * @return an object with the signature
     * @example
     * str.signHash("44'/148'/0'", hash).then(o => o.signature)
     */
    signHash(path: string, hash: Buffer): Promise<{
        signature: Buffer;
    }>;
    private sendToDevice;
}
export * from "./errors";
//# sourceMappingURL=Str.d.ts.map