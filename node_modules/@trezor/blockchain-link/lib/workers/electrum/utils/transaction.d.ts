import type { Transaction as BlockbookTransaction } from '@trezor/blockchain-link-types/lib/blockbook';
import type { ElectrumAPI, HistoryTx } from '@trezor/blockchain-link-types/lib/electrum';
export declare const getTransactions: (client: ElectrumAPI, history: HistoryTx[]) => Promise<BlockbookTransaction[]>;
//# sourceMappingURL=transaction.d.ts.map