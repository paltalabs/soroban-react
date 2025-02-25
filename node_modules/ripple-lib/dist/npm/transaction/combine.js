"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const ripple_binary_codec_1 = __importDefault(require("ripple-binary-codec"));
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../common/errors");
const ripple_address_codec_1 = require("ripple-address-codec");
const common_1 = require("../common");
const hashes_1 = require("../common/hashes");
function validateTransactionEquivalence(transactions) {
    const exampleTransaction = JSON.stringify(Object.assign(Object.assign({}, transactions[0]), { Signers: null }));
    if (transactions.slice(1).some(tx => JSON.stringify(Object.assign(Object.assign({}, tx), { Signers: null })) !== exampleTransaction)) {
        throw new errors_1.ValidationError('txJSON is not the same for all signedTransactions');
    }
}
function addressToBigNumber(address) {
    const hex = Buffer.from(ripple_address_codec_1.decodeAccountID(address)).toString('hex');
    return new bignumber_js_1.default(hex, 16);
}
function compareSigners(a, b) {
    return addressToBigNumber(a.Signer.Account).comparedTo(addressToBigNumber(b.Signer.Account));
}
function getTransactionWithAllSigners(transactions) {
    const sortedSigners = _.flatMap(transactions, tx => tx.Signers)
        .filter(signer => signer)
        .sort(compareSigners);
    return Object.assign(Object.assign({}, transactions[0]), { Signers: sortedSigners });
}
function combine(signedTransactions) {
    common_1.validate.combine({ signedTransactions });
    const transactions = signedTransactions.map(ripple_binary_codec_1.default.decode);
    validateTransactionEquivalence(transactions);
    const signedTransaction = ripple_binary_codec_1.default.encode(getTransactionWithAllSigners(transactions));
    return {
        signedTransaction: signedTransaction,
        id: hashes_1.computeBinaryTransactionHash(signedTransaction)
    };
}
exports.default = combine;
//# sourceMappingURL=combine.js.map