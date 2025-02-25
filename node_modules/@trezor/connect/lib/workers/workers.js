"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaWorker = exports.ElectrumWorker = exports.BlockfrostWorker = exports.RippleWorker = exports.BlockbookWorker = void 0;
const BlockbookWorker = () => Promise.resolve().then(() => __importStar(require('@trezor/blockchain-link/lib/workers/blockbook'))).then(w => w.default());
exports.BlockbookWorker = BlockbookWorker;
const RippleWorker = () => Promise.resolve().then(() => __importStar(require('@trezor/blockchain-link/lib/workers/ripple'))).then(w => w.default());
exports.RippleWorker = RippleWorker;
const BlockfrostWorker = () => Promise.resolve().then(() => __importStar(require('@trezor/blockchain-link/lib/workers/blockfrost'))).then(w => w.default());
exports.BlockfrostWorker = BlockfrostWorker;
const ElectrumWorker = () => Promise.resolve().then(() => __importStar(require('@trezor/blockchain-link/lib/workers/electrum'))).then(w => w.default());
exports.ElectrumWorker = ElectrumWorker;
const SolanaWorker = () => Promise.resolve().then(() => __importStar(require('@trezor/blockchain-link/lib/workers/solana'))).then(w => w.default());
exports.SolanaWorker = SolanaWorker;
//# sourceMappingURL=workers.js.map