import { PROTO } from '../../constants';
import type { EosSDKTransaction } from '../../types/api/eos';
import type { TypedCall } from '../../device/DeviceCommands';
export declare const validate: (tx: EosSDKTransaction) => {
    chain_id: string;
    header: {
        expiration: number;
        ref_block_num: number;
        ref_block_prefix: number;
        max_net_usage_words: number;
        max_cpu_usage_ms: number;
        delay_sec: number;
    };
    ack: {
        unknown?: {
            data_size: number;
            data_chunk: string;
        } | undefined;
        transfer?: {
            memo: string;
            quantity: {
                symbol: string;
                amount: string | number;
            };
            sender: string;
            receiver: string;
        } | undefined;
        refund?: {
            owner: string;
        } | undefined;
        delegate?: {
            transfer: boolean;
            sender: string;
            receiver: string;
            net_quantity: {
                symbol: string;
                amount: string | number;
            };
            cpu_quantity: {
                symbol: string;
                amount: string | number;
            };
        } | undefined;
        undelegate?: {
            sender: string;
            receiver: string;
            net_quantity: {
                symbol: string;
                amount: string | number;
            };
            cpu_quantity: {
                symbol: string;
                amount: string | number;
            };
        } | undefined;
        buy_ram?: {
            quantity: {
                symbol: string;
                amount: string | number;
            };
            receiver: string;
            payer: string;
        } | undefined;
        buy_ram_bytes?: {
            bytes: number;
            receiver: string;
            payer: string;
        } | undefined;
        sell_ram?: {
            bytes: number;
            account: string;
        } | undefined;
        vote_producer?: {
            voter: string;
            proxy: string;
            producers: string[];
        } | undefined;
        update_auth?: {
            permission: string;
            account: string;
            parent: string;
            auth: {
                keys: {
                    type?: number | undefined;
                    address_n?: number[] | undefined;
                    weight: number;
                    key: string;
                }[];
                threshold: number;
                accounts: {
                    weight: number;
                    account: {
                        permission: string;
                        actor: string;
                    };
                }[];
                waits: {
                    weight: number;
                    wait_sec: number;
                }[];
            };
        } | undefined;
        delete_auth?: {
            permission: string;
            account: string;
        } | undefined;
        link_auth?: {
            type: string;
            account: string;
            code: string;
            requirement: string;
        } | undefined;
        unlink_auth?: {
            type: string;
            account: string;
            code: string;
        } | undefined;
        new_account?: {
            name: string;
            owner: {
                keys: {
                    type?: number | undefined;
                    address_n?: number[] | undefined;
                    weight: number;
                    key: string;
                }[];
                threshold: number;
                accounts: {
                    weight: number;
                    account: {
                        permission: string;
                        actor: string;
                    };
                }[];
                waits: {
                    weight: number;
                    wait_sec: number;
                }[];
            };
            creator: string;
            active: {
                keys: {
                    type?: number | undefined;
                    address_n?: number[] | undefined;
                    weight: number;
                    key: string;
                }[];
                threshold: number;
                accounts: {
                    weight: number;
                    account: {
                        permission: string;
                        actor: string;
                    };
                }[];
                waits: {
                    weight: number;
                    wait_sec: number;
                }[];
            };
        } | undefined;
        common: {
            name: string;
            account: string;
            authorization: {
                permission: string;
                actor: string;
            }[];
        };
    }[];
};
export declare const signTx: (typedCall: TypedCall, address_n: number[], chain_id: string, header: PROTO.EosTxHeader, actions: PROTO.EosTxActionAck[], chunkify: boolean) => Promise<{
    signature: string;
}>;
//# sourceMappingURL=eosSignTx.d.ts.map