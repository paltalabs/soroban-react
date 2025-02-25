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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPayloadSchema = exports.AuthPayload = void 0;
exports.verifySignature = verifySignature;
const borsh = __importStar(require("borsh"));
const js_sha256_1 = __importDefault(require("js-sha256"));
const crypto_1 = require("@near-js/crypto");
class AuthPayload {
    message;
    recipient;
    nonce;
    callbackUrl;
    tag;
    constructor({ message, nonce, recipient }) {
        this.tag = 2147484061;
        this.message = message;
        this.nonce = nonce;
        this.recipient = recipient;
    }
}
exports.AuthPayload = AuthPayload;
exports.authPayloadSchema = {
    struct: {
        tag: "u32",
        message: "string",
        nonce: { array: { type: "u8", len: 32 } },
        recipient: "string",
        callbackUrl: { option: "string" },
    },
};
function verifySignature(request, result) {
    // Reconstruct the payload that was **actually signed**
    const payload = new AuthPayload(request);
    const borsh_payload = borsh.serialize(exports.authPayloadSchema, payload);
    const to_sign = Uint8Array.from(js_sha256_1.default.sha256.array(borsh_payload));
    // Reconstruct the signature from the parameter given in the URL
    let real_signature = new Uint8Array(Buffer.from(result.signature, "base64"));
    // Use the public Key to verify that the private-counterpart signed the message
    const myPK = crypto_1.PublicKey.from(result.publicKey);
    return myPK.verify(to_sign, real_signature);
}
//# sourceMappingURL=nep0314.js.map