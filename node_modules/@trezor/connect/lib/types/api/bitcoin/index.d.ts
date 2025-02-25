import type { AccountAddresses } from '@trezor/blockchain-link';
import type { Transaction as BlockbookTransaction } from '@trezor/blockchain-link-types/lib/blockbook';
import { Static } from '@trezor/schema-utils';
import type { PROTO } from '../../../constants';
import type { AccountTransaction } from '../../account';
import { ProtoWithDerivationPath } from '../../params';
export type SignMessage = Static<typeof SignMessage>;
export declare const SignMessage: import("@trezor/schema-utils").TObject<{
    path: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
    coin: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    message: import("@trezor/schema-utils").TString;
    hex: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    no_script_type: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
}>;
export type RefTransaction = {
    hash: string;
    version: number;
    inputs: PROTO.PrevInput[];
    bin_outputs: PROTO.TxOutputBinType[];
    outputs?: typeof undefined;
    lock_time: number;
    extra_data?: string;
    expiry?: number;
    overwintered?: boolean;
    version_group_id?: number;
    timestamp?: number;
    branch_id?: number;
} | {
    hash: string;
    version: number;
    inputs: PROTO.TxInput[];
    bin_outputs?: typeof undefined;
    outputs: PROTO.TxOutputType[];
    lock_time: number;
    extra_data?: string;
    expiry?: number;
    overwintered?: boolean;
    version_group_id?: number;
    timestamp?: number;
    branch_id?: number;
};
export interface TransactionOptions {
    version?: number;
    lock_time?: number;
    expiry?: number;
    overwintered?: boolean;
    version_group_id?: number;
    timestamp?: number;
    branch_id?: number;
    decred_staking_ticket?: boolean;
    amount_unit?: PROTO.AmountUnit;
    serialize?: boolean;
    coinjoin_request?: PROTO.CoinJoinRequest;
    chunkify?: boolean;
}
export interface SignTransaction {
    inputs: ProtoWithDerivationPath<PROTO.TxInputType>[];
    outputs: ProtoWithDerivationPath<PROTO.TxOutputType>[];
    paymentRequests?: PROTO.TxAckPaymentRequest[];
    refTxs?: RefTransaction[];
    account?: {
        addresses: AccountAddresses;
        transactions?: AccountTransaction[];
    };
    coin: string;
    identity?: string;
    locktime?: number;
    timestamp?: number;
    version?: number;
    expiry?: number;
    overwintered?: boolean;
    versionGroupId?: number;
    branchId?: number;
    decredStakingTicket?: boolean;
    push?: boolean;
    preauthorized?: boolean;
    amountUnit?: PROTO.AmountUnit;
    unlockPath?: PROTO.UnlockPath;
    serialize?: boolean;
    coinjoinRequest?: PROTO.CoinJoinRequest;
    chunkify?: boolean;
}
export type SignedTransaction = {
    signatures: string[];
    serializedTx: string;
    witnesses?: (string | undefined)[];
    txid?: string;
    signedTransaction?: BlockbookTransaction;
};
export type VerifyMessage = Static<typeof VerifyMessage>;
export declare const VerifyMessage: import("@trezor/schema-utils").TObject<{
    address: import("@trezor/schema-utils").TString;
    signature: import("@trezor/schema-utils").TString;
    message: import("@trezor/schema-utils").TString;
    coin: import("@trezor/schema-utils").TString;
    hex: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
}>;
//# sourceMappingURL=index.d.ts.map