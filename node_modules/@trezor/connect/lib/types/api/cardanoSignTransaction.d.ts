import type { Params, Response } from '../params';
import type { CardanoSignTransaction, CardanoSignTransactionExtended, CardanoSignedTxData } from './cardano';
export declare function cardanoSignTransaction(params: Params<CardanoSignTransaction & {
    unsignedTx?: undefined;
    testnet?: undefined;
}>): Response<CardanoSignedTxData>;
export declare function cardanoSignTransaction(params: Params<CardanoSignTransactionExtended>): Response<CardanoSignedTxData & {
    serializedTx: string;
}>;
//# sourceMappingURL=cardanoSignTransaction.d.ts.map