import { PROTO } from '../../constants';
import type { BitcoinNetworkInfo } from '../../types';
import type { DeviceCommands } from '../../device/DeviceCommands';
type GetHDNode = DeviceCommands['getHDNode'];
export declare const verifyTx: (getHDNode: GetHDNode, inputs: PROTO.TxInputType[], outputs: PROTO.TxOutputType[], serializedTx: string, coinInfo: BitcoinNetworkInfo, unlockPath?: PROTO.UnlockPath) => Promise<import("@trezor/utxo-lib/lib/transaction/base").TransactionBase<undefined> | import("@trezor/utxo-lib/lib/transaction/base").TransactionBase<import("@trezor/utxo-lib/lib/transaction/dash").DashSpecific> | import("@trezor/utxo-lib/lib/transaction/base").TransactionBase<import("@trezor/utxo-lib/lib/transaction/zcash").ZcashSpecific>>;
export declare const verifyTicketTx: (getHDNode: GetHDNode, inputs: PROTO.TxInputType[], outputs: PROTO.TxOutputType[], serializedTx: string, coinInfo: BitcoinNetworkInfo) => Promise<void>;
export {};
//# sourceMappingURL=signtxVerify.d.ts.map