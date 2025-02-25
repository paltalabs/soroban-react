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
exports.computePublicKeyHash = exports.hexToBytes = exports.bytesToHex = void 0;
const assert = __importStar(require("assert"));
const hashjs = __importStar(require("hash.js"));
const BN = require("bn.js");
function bytesToHex(a) {
    return Array.from(a, (byteValue) => {
        const hex = byteValue.toString(16).toUpperCase();
        return hex.length > 1 ? hex : `0${hex}`;
    }).join('');
}
exports.bytesToHex = bytesToHex;
function hexToBytes(a) {
    assert.ok(a.length % 2 === 0);
    // Special-case length zero to return [].
    // BN.toArray intentionally returns [0] rather than [] for length zero,
    // which may make sense for BigNum data, but not for byte strings.
    return a.length === 0 ? [] : new BN(a, 16).toArray(null, a.length / 2);
}
exports.hexToBytes = hexToBytes;
function computePublicKeyHash(publicKeyBytes) {
    const hash256 = hashjs.sha256().update(publicKeyBytes).digest();
    const hash160 = hashjs.ripemd160().update(hash256).digest();
    return Buffer.from(hash160);
}
exports.computePublicKeyHash = computePublicKeyHash;
//# sourceMappingURL=utils.js.map