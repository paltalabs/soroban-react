"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaWorker = exports.ElectrumWorker = exports.BlockfrostWorker = exports.RippleWorker = exports.BlockbookWorker = void 0;
const tslib_1 = require("tslib");
const blockbook_1 = tslib_1.__importDefault(require("@trezor/blockchain-link/lib/workers/blockbook"));
exports.BlockbookWorker = blockbook_1.default;
const ripple_1 = tslib_1.__importDefault(require("@trezor/blockchain-link/lib/workers/ripple"));
exports.RippleWorker = ripple_1.default;
const blockfrost_1 = tslib_1.__importDefault(require("@trezor/blockchain-link/lib/workers/blockfrost"));
exports.BlockfrostWorker = blockfrost_1.default;
const solana_1 = tslib_1.__importDefault(require("@trezor/blockchain-link/lib/workers/solana"));
exports.SolanaWorker = solana_1.default;
const ElectrumWorker = undefined;
exports.ElectrumWorker = ElectrumWorker;
//# sourceMappingURL=workers.native.js.map