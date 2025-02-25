"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashPrefix = void 0;
const buffer_1 = require("buffer/");
/**
 * Write a 32 bit integer to a Buffer
 *
 * @param uint32 32 bit integer to write to buffer
 * @returns a buffer with the bytes representation of uint32
 */
function bytes(uint32) {
    const result = buffer_1.Buffer.alloc(4);
    result.writeUInt32BE(uint32, 0);
    return result;
}
/**
 * Maps HashPrefix names to their byte representation
 */
const HashPrefix = {
    transactionID: bytes(0x54584e00),
    // transaction plus metadata
    transaction: bytes(0x534e4400),
    // account state
    accountStateEntry: bytes(0x4d4c4e00),
    // inner node in tree
    innerNode: bytes(0x4d494e00),
    // ledger master data for signing
    ledgerHeader: bytes(0x4c575200),
    // inner transaction to sign
    transactionSig: bytes(0x53545800),
    // inner transaction to sign
    transactionMultiSig: bytes(0x534d5400),
    // validation for signing
    validation: bytes(0x56414c00),
    // proposal for signing
    proposal: bytes(0x50525000),
    // payment channel claim
    paymentChannelClaim: bytes(0x434c4d00),
};
exports.HashPrefix = HashPrefix;
//# sourceMappingURL=hash-prefixes.js.map