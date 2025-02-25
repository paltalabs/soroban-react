import { Transaction as BitcoinJsTransaction } from '@trezor/utxo-lib';
import { PROTO } from '../../constants';
import type { AccountAddresses } from '../../types';
export declare const createPendingTransaction: (tx: BitcoinJsTransaction, { addresses, inputs, outputs, }: {
    addresses: AccountAddresses;
    inputs: PROTO.TxInputType[];
    outputs: PROTO.TxOutputType[];
}) => {
    txid: string;
    hex: string;
    blockHeight: number;
    blockTime: number;
    confirmations: number;
    vsize: number;
    size: number;
    value: string;
    valueIn: string;
    fees: string;
    vin: {
        n: number;
        txid: string;
        vout: number;
        isAddress: boolean;
        addresses: string[];
        value: string;
        sequence: number | undefined;
    }[];
    vout: {
        n: number;
        isAddress: boolean;
        addresses: string[];
        value: string;
    }[];
};
//# sourceMappingURL=createPendingTx.d.ts.map