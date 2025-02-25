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
exports.decodeSeed = exports.deriveNodeAddress = exports.deriveAddress = exports.verify = exports.sign = exports.deriveKeypair = exports.generateSeed = void 0;
const assert = __importStar(require("assert"));
const brorand = require("brorand");
const hashjs = __importStar(require("hash.js"));
const elliptic = __importStar(require("elliptic"));
const addressCodec = __importStar(require("ripple-address-codec"));
const secp256k1_1 = require("./secp256k1");
const utils = __importStar(require("./utils"));
const Ed25519 = elliptic.eddsa('ed25519');
const Secp256k1 = elliptic.ec('secp256k1');
const { hexToBytes } = utils;
const { bytesToHex } = utils;
function generateSeed(options = {}) {
    assert.ok(!options.entropy || options.entropy.length >= 16, 'entropy too short');
    const entropy = options.entropy ? options.entropy.slice(0, 16) : brorand(16);
    const type = options.algorithm === 'ed25519' ? 'ed25519' : 'secp256k1';
    return addressCodec.encodeSeed(Buffer.from(entropy), type);
}
exports.generateSeed = generateSeed;
function hash(message) {
    return hashjs.sha512().update(message).digest().slice(0, 32);
}
const secp256k1 = {
    deriveKeypair(entropy, options) {
        const prefix = '00';
        const privateKey = prefix + (0, secp256k1_1.derivePrivateKey)(entropy, options).toString(16, 64).toUpperCase();
        const publicKey = bytesToHex(Secp256k1.keyFromPrivate(privateKey.slice(2))
            .getPublic()
            .encodeCompressed());
        return { privateKey, publicKey };
    },
    sign(message, privateKey) {
        return bytesToHex(Secp256k1.sign(hash(message), hexToBytes(privateKey), {
            canonical: true,
        }).toDER());
    },
    verify(message, signature, publicKey) {
        return Secp256k1.verify(hash(message), signature, hexToBytes(publicKey));
    },
};
const ed25519 = {
    deriveKeypair(entropy) {
        const prefix = 'ED';
        const rawPrivateKey = hash(entropy);
        const privateKey = prefix + bytesToHex(rawPrivateKey);
        const publicKey = prefix + bytesToHex(Ed25519.keyFromSecret(rawPrivateKey).pubBytes());
        return { privateKey, publicKey };
    },
    sign(message, privateKey) {
        // caution: Ed25519.sign interprets all strings as hex, stripping
        // any non-hex characters without warning
        assert.ok(Array.isArray(message), 'message must be array of octets');
        return bytesToHex(Ed25519.sign(message, hexToBytes(privateKey).slice(1)).toBytes());
    },
    verify(message, signature, publicKey) {
        return Ed25519.verify(message, hexToBytes(signature), hexToBytes(publicKey).slice(1));
    },
};
function select(algorithm) {
    const methods = { 'ecdsa-secp256k1': secp256k1, ed25519 };
    return methods[algorithm];
}
function deriveKeypair(seed, options) {
    const decoded = addressCodec.decodeSeed(seed);
    const algorithm = decoded.type === 'ed25519' ? 'ed25519' : 'ecdsa-secp256k1';
    const method = select(algorithm);
    const keypair = method.deriveKeypair(decoded.bytes, options);
    const messageToVerify = hash('This test message should verify.');
    const signature = method.sign(messageToVerify, keypair.privateKey);
    /* istanbul ignore if */
    if (method.verify(messageToVerify, signature, keypair.publicKey) !== true) {
        throw new Error('derived keypair did not generate verifiable signature');
    }
    return keypair;
}
exports.deriveKeypair = deriveKeypair;
function getAlgorithmFromKey(key) {
    const bytes = hexToBytes(key);
    return bytes.length === 33 && bytes[0] === 0xed
        ? 'ed25519'
        : 'ecdsa-secp256k1';
}
function sign(messageHex, privateKey) {
    const algorithm = getAlgorithmFromKey(privateKey);
    return select(algorithm).sign(hexToBytes(messageHex), privateKey);
}
exports.sign = sign;
function verify(messageHex, signature, publicKey) {
    const algorithm = getAlgorithmFromKey(publicKey);
    return select(algorithm).verify(hexToBytes(messageHex), signature, publicKey);
}
exports.verify = verify;
function deriveAddressFromBytes(publicKeyBytes) {
    return addressCodec.encodeAccountID(utils.computePublicKeyHash(publicKeyBytes));
}
function deriveAddress(publicKey) {
    return deriveAddressFromBytes(Buffer.from(hexToBytes(publicKey)));
}
exports.deriveAddress = deriveAddress;
function deriveNodeAddress(publicKey) {
    const generatorBytes = addressCodec.decodeNodePublic(publicKey);
    const accountPublicBytes = (0, secp256k1_1.accountPublicFromPublicGenerator)(generatorBytes);
    return deriveAddressFromBytes(accountPublicBytes);
}
exports.deriveNodeAddress = deriveNodeAddress;
const { decodeSeed } = addressCodec;
exports.decodeSeed = decodeSeed;
//# sourceMappingURL=index.js.map