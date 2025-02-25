import type { Utxo, Transaction, TokenTransfer, TokenInfo, AccountAddresses, AccountInfo, InternalTransfer } from '@trezor/blockchain-link-types';
import type { ServerInfo, AccountInfo as BlockbookAccountInfo, AccountUtxo as BlockbookAccountUtxo, Transaction as BlockbookTransaction } from '@trezor/blockchain-link-types/lib/blockbook';
import { Addresses } from './utils';
export declare const transformServerInfo: (payload: ServerInfo) => {
    name: string;
    shortcut: string;
    testnet: boolean;
    version: string;
    decimals: number;
    blockHeight: number;
    blockHash: string;
    consensusBranchId: number | undefined;
};
export declare const filterTokenTransfers: (addresses: Addresses, transfers: BlockbookTransaction["tokenTransfers"]) => TokenTransfer[];
export declare const isEthereumStakingInternalTransfer: (from: string, to: string) => boolean;
export declare const filterEthereumInternalTransfers: (address: string | undefined, ethereumSpecific: BlockbookTransaction["ethereumSpecific"]) => InternalTransfer[];
type TransformAddresses = {
    used: {
        address: string;
    }[];
    unused: {
        address: string;
    }[];
    change: {
        address: string;
    }[];
};
export declare const isTxFailed: (tx: BlockbookTransaction) => boolean;
export declare const transformTransaction: (tx: BlockbookTransaction, addressesOrDescriptor?: TransformAddresses | string) => Transaction;
export declare const transformTokenInfo: (tokens: BlockbookAccountInfo["tokens"]) => TokenInfo[] | undefined;
export declare const transformAddresses: (tokens: BlockbookAccountInfo["tokens"]) => AccountAddresses | undefined;
export declare const transformAccountInfo: (payload: BlockbookAccountInfo) => AccountInfo;
export declare const transformAccountUtxo: (payload: BlockbookAccountUtxo) => Utxo[];
export {};
//# sourceMappingURL=blockbook.d.ts.map