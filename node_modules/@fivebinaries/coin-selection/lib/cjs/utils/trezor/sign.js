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
exports.signTransaction = void 0;
const CardanoWasm = __importStar(require("@emurgo/cardano-serialization-lib-nodejs"));
const trezor_1 = require("../../types/trezor");
const common_1 = require("../common");
const signTransaction = (txBodyHex, 
// txMetadata: CardanoWasm.AuxiliaryData,
signedWitnesses, options) => {
    const txBody = CardanoWasm.TransactionBody.from_bytes(Uint8Array.from(Buffer.from(txBodyHex, 'hex')));
    const witnesses = CardanoWasm.TransactionWitnessSet.new();
    const vkeyWitnesses = CardanoWasm.Vkeywitnesses.new();
    const bootstrapWitnesses = CardanoWasm.BootstrapWitnesses.new();
    signedWitnesses.forEach(w => {
        const vKey = CardanoWasm.Vkey.new(CardanoWasm.PublicKey.from_bytes(Buffer.from(w.pubKey, 'hex')));
        const signature = CardanoWasm.Ed25519Signature.from_bytes(Buffer.from(w.signature, 'hex'));
        if (w.type === trezor_1.CardanoTxWitnessType.SHELLEY_WITNESS) {
            // Shelley witness
            const vKeyWitness = CardanoWasm.Vkeywitness.new(vKey, signature);
            vkeyWitnesses.add(vKeyWitness);
        }
        else if (w.type === trezor_1.CardanoTxWitnessType.BYRON_WITNESS) {
            // Byron witness (TODO: not used, needs testing)
            if (w.chainCode) {
                const xpubHex = `${w.pubKey}${w.chainCode}`;
                const bip32Key = CardanoWasm.Bip32PublicKey.from_bytes(Buffer.from(xpubHex, 'hex'));
                const byronAddress = CardanoWasm.ByronAddress.icarus_from_key(bip32Key, (0, common_1.getProtocolMagic)(!!(options === null || options === void 0 ? void 0 : options.testnet)));
                const bootstrapWitness = CardanoWasm.BootstrapWitness.new(vKey, signature, Buffer.from(w.chainCode, 'hex'), byronAddress.attributes());
                bootstrapWitnesses.add(bootstrapWitness);
            }
        }
    });
    if (bootstrapWitnesses.len() > 0) {
        witnesses.set_bootstraps(bootstrapWitnesses);
    }
    if (vkeyWitnesses.len() > 0) {
        witnesses.set_vkeys(vkeyWitnesses);
    }
    const transaction = CardanoWasm.Transaction.new(txBody, witnesses);
    const serializedTx = Buffer.from(transaction.to_bytes()).toString('hex');
    return serializedTx;
};
exports.signTransaction = signTransaction;
