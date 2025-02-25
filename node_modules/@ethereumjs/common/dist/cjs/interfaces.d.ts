/**
 * External Interfaces for other EthereumJS libraries
 */
import type { Account, Address, PrefixedHexString } from '@ethereumjs/util';
export interface StorageDump {
    [key: string]: string;
}
/**
 * Object that can contain a set of storage keys associated with an account.
 */
export interface StorageRange {
    /**
     * A dictionary where the keys are hashed storage keys, and the values are
     * objects containing the preimage of the hashed key (in `key`) and the
     * storage key (in `value`). Currently, there is no way to retrieve preimages,
     * so they are always `null`.
     */
    storage: {
        [key: string]: {
            key: string | null;
            value: string;
        };
    };
    /**
     * The next (hashed) storage key after the greatest storage key
     * contained in `storage`.
     */
    nextKey: string | null;
}
export declare type AccountFields = Partial<Pick<Account, 'nonce' | 'balance' | 'storageRoot' | 'codeHash'>>;
export declare type StorageProof = {
    key: PrefixedHexString;
    proof: PrefixedHexString[];
    value: PrefixedHexString;
};
export declare type Proof = {
    address: PrefixedHexString;
    balance: PrefixedHexString;
    codeHash: PrefixedHexString;
    nonce: PrefixedHexString;
    storageHash: PrefixedHexString;
    accountProof: PrefixedHexString[];
    storageProof: StorageProof[];
};
export declare type AccessListItem = {
    address: PrefixedHexString;
    storageKeys: PrefixedHexString[];
};
export declare type AccessListBytesItem = [Uint8Array, Uint8Array[]];
export declare type AccessListBytes = AccessListBytesItem[];
export declare type AccessList = AccessListItem[];
/**
 * Authorization list types
 */
export declare type AuthorizationListItem = {
    chainId: PrefixedHexString;
    address: PrefixedHexString;
    nonce: PrefixedHexString[];
    yParity: PrefixedHexString;
    r: PrefixedHexString;
    s: PrefixedHexString;
};
export declare type AuthorizationListBytesItem = [
    Uint8Array,
    Uint8Array,
    Uint8Array[],
    Uint8Array,
    Uint8Array,
    Uint8Array
];
export declare type AuthorizationListBytes = AuthorizationListBytesItem[];
export declare type AuthorizationList = AuthorizationListItem[];
/**
 * Verkle related
 *
 * Experimental (do not implement)
 */
export declare type AccessEventFlags = {
    stemRead: boolean;
    stemWrite: boolean;
    chunkRead: boolean;
    chunkWrite: boolean;
    chunkFill: boolean;
};
/**
 * Verkle related
 *
 * Experimental (do not implement)
 */
export interface AccessWitnessInterface {
    touchAndChargeProofOfAbsence(address: Address): bigint;
    touchAndChargeMessageCall(address: Address): bigint;
    touchAndChargeValueTransfer(caller: Address, target: Address): bigint;
    touchAndChargeContractCreateInit(address: Address): bigint;
    touchAndChargeContractCreateCompleted(address: Address): bigint;
    touchTxOriginAndComputeGas(origin: Address): bigint;
    touchTxTargetAndComputeGas(target: Address, { sendsValue }: {
        sendsValue?: boolean;
    }): bigint;
    touchCodeChunksRangeOnReadAndChargeGas(contact: Address, startPc: number, endPc: number): bigint;
    touchCodeChunksRangeOnWriteAndChargeGas(contact: Address, startPc: number, endPc: number): bigint;
    touchAddressOnWriteAndComputeGas(address: Address, treeIndex: number | bigint, subIndex: number | Uint8Array): bigint;
    touchAddressOnReadAndComputeGas(address: Address, treeIndex: number | bigint, subIndex: number | Uint8Array): bigint;
    touchAddressAndChargeGas(address: Address, treeIndex: number | bigint, subIndex: number | Uint8Array, { isWrite }: {
        isWrite?: boolean;
    }): bigint;
    touchAddress(address: Address, treeIndex: number | bigint, subIndex: number | Uint8Array, { isWrite }: {
        isWrite?: boolean;
    }): AccessEventFlags;
    shallowCopy(): AccessWitnessInterface;
    merge(accessWitness: AccessWitnessInterface): void;
}
export interface StateManagerInterface {
    getAccount(address: Address): Promise<Account | undefined>;
    putAccount(address: Address, account?: Account): Promise<void>;
    deleteAccount(address: Address): Promise<void>;
    modifyAccountFields(address: Address, accountFields: AccountFields): Promise<void>;
    putContractCode(address: Address, value: Uint8Array): Promise<void>;
    getContractCode(address: Address): Promise<Uint8Array>;
    getContractCodeSize?(address: Address): Promise<number>;
    getContractStorage(address: Address, key: Uint8Array): Promise<Uint8Array>;
    putContractStorage(address: Address, key: Uint8Array, value: Uint8Array): Promise<void>;
    clearContractStorage(address: Address): Promise<void>;
    checkpoint(): Promise<void>;
    commit(): Promise<void>;
    revert(): Promise<void>;
    getStateRoot(): Promise<Uint8Array>;
    setStateRoot(stateRoot: Uint8Array, clearCache?: boolean): Promise<void>;
    getProof?(address: Address, storageSlots: Uint8Array[]): Promise<Proof>;
    hasStateRoot(root: Uint8Array): Promise<boolean>;
    shallowCopy(downlevelCaches?: boolean): StateManagerInterface;
    getAppliedKey?(address: Uint8Array): Uint8Array;
    checkChunkWitnessPresent?(contract: Address, programCounter: number): Promise<boolean>;
}
export interface EVMStateManagerInterface extends StateManagerInterface {
    originalStorageCache: {
        get(address: Address, key: Uint8Array): Promise<Uint8Array>;
        clear(): void;
    };
    dumpStorage(address: Address): Promise<StorageDump>;
    dumpStorageRange(address: Address, startKey: bigint, limit: number): Promise<StorageRange>;
    generateCanonicalGenesis(initState: any): Promise<void>;
    getProof(address: Address, storageSlots?: Uint8Array[]): Promise<Proof>;
    shallowCopy(downlevelCaches?: boolean): EVMStateManagerInterface;
}
//# sourceMappingURL=interfaces.d.ts.map