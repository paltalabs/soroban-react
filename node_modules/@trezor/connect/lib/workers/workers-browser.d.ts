import BlockbookWorker from '@trezor/blockchain-link/lib/workers/blockbook';
import RippleWorker from '@trezor/blockchain-link/lib/workers/ripple';
import BlockfrostWorker from '@trezor/blockchain-link/lib/workers/blockfrost';
import type { BaseWorker } from '@trezor/blockchain-link/lib/workers/baseWorker';
type WorkerAsyncImporter = () => Promise<BaseWorker<unknown>>;
declare const SolanaWorker: WorkerAsyncImporter;
declare const ElectrumWorker: undefined;
export { BlockbookWorker, RippleWorker, BlockfrostWorker, ElectrumWorker, SolanaWorker };
//# sourceMappingURL=workers-browser.d.ts.map