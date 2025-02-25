import { PROTO } from '../../constants';
import { TezosOperation } from '../../types/api/tezos';
export declare const createTx: (address_n: number[], branch: string, operation: TezosOperation, chunkify?: boolean) => {
    chunkify?: boolean | undefined;
    transaction?: {
        parameters?: number[] | undefined;
        parameters_manager?: {
            transfer?: {
                amount: string | number;
                destination: {
                    hash: Uint8Array;
                    tag: number;
                };
            } | undefined;
            set_delegate?: Uint8Array | undefined;
            cancel_delegate?: boolean | undefined;
        } | undefined;
        source: Uint8Array;
        amount: string | number;
        fee: string | number;
        gas_limit: number;
        destination: {
            hash: Uint8Array;
            tag: number;
        };
        counter: number;
        storage_limit: number;
    } | undefined;
    proposal?: {
        source: string;
        period: number;
        proposals: string[];
    } | undefined;
    ballot?: {
        source: string;
        period: number;
        proposal: string;
        ballot: PROTO.TezosBallotType;
    } | undefined;
    reveal?: {
        source: Uint8Array;
        public_key: Uint8Array;
        fee: string | number;
        gas_limit: number;
        counter: number;
        storage_limit: number;
    } | undefined;
    origination?: {
        delegate?: Uint8Array | undefined;
        manager_pubkey?: string | undefined;
        spendable?: boolean | undefined;
        delegatable?: boolean | undefined;
        source: Uint8Array;
        fee: string | number;
        script: string | number[];
        gas_limit: number;
        counter: number;
        storage_limit: number;
        balance: number;
    } | undefined;
    delegation?: {
        source: Uint8Array;
        fee: string | number;
        delegate: Uint8Array;
        gas_limit: number;
        counter: number;
        storage_limit: number;
    } | undefined;
    address_n: number[];
    branch: Uint8Array;
};
//# sourceMappingURL=tezosSignTx.d.ts.map