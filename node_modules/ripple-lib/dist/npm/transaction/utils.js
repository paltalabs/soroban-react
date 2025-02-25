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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassicAccountAndTag = exports.setCanonicalFlag = exports.common = exports.prepareTransaction = exports.convertMemo = exports.convertStringToHex = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const common = __importStar(require("../common"));
exports.common = common;
const common_1 = require("../common");
const errors_1 = require("../common/errors");
const ripple_address_codec_1 = require("ripple-address-codec");
const txFlags = common.txFlags;
const TRANSACTION_TYPES_WITH_DESTINATION_TAG_FIELD = [
    'Payment',
    'CheckCreate',
    'EscrowCreate',
    'PaymentChannelCreate'
];
function formatPrepareResponse(txJSON) {
    const instructions = {
        fee: common.dropsToXrp(txJSON.Fee),
        maxLedgerVersion: txJSON.LastLedgerSequence == null ? null : txJSON.LastLedgerSequence
    };
    if (txJSON.TicketSequence != null) {
        instructions['ticketSequence'] = txJSON.TicketSequence;
    }
    else {
        instructions['sequence'] = txJSON.Sequence;
    }
    return {
        txJSON: JSON.stringify(txJSON),
        instructions
    };
}
function setCanonicalFlag(txJSON) {
    txJSON.Flags |= txFlags.Universal.FullyCanonicalSig;
    txJSON.Flags = txJSON.Flags >>> 0;
}
exports.setCanonicalFlag = setCanonicalFlag;
function scaleValue(value, multiplier, extra = 0) {
    return new bignumber_js_1.default(value).times(multiplier).plus(extra).toString();
}
function getClassicAccountAndTag(Account, expectedTag) {
    if (ripple_address_codec_1.isValidXAddress(Account)) {
        const classic = ripple_address_codec_1.xAddressToClassicAddress(Account);
        if (expectedTag != null && classic.tag !== expectedTag) {
            throw new errors_1.ValidationError('address includes a tag that does not match the tag specified in the transaction');
        }
        return {
            classicAccount: classic.classicAddress,
            tag: classic.tag
        };
    }
    else {
        return {
            classicAccount: Account,
            tag: expectedTag
        };
    }
}
exports.getClassicAccountAndTag = getClassicAccountAndTag;
function prepareTransaction(txJSON, api, instructions) {
    common.validate.instructions(instructions);
    common.validate.tx_json(txJSON);
    if (instructions.sequence != null && instructions.sequence === 0) {
        return Promise.reject(new errors_1.ValidationError('`sequence` cannot be 0'));
    }
    const disallowedFieldsInTxJSON = [
        'maxLedgerVersion',
        'maxLedgerVersionOffset',
        'fee',
        'sequence',
        'ticketSequence'
    ];
    const badFields = disallowedFieldsInTxJSON.filter((field) => txJSON[field]);
    if (badFields.length) {
        return Promise.reject(new errors_1.ValidationError('txJSON additionalProperty "' +
            badFields[0] +
            '" exists in instance when not allowed'));
    }
    const newTxJSON = Object.assign({}, txJSON);
    if (txJSON['SignerQuorum'] === 0) {
        delete newTxJSON.SignerEntries;
    }
    const { classicAccount, tag: sourceTag } = getClassicAccountAndTag(txJSON.Account);
    newTxJSON.Account = classicAccount;
    if (sourceTag != null) {
        if (txJSON.SourceTag && txJSON.SourceTag !== sourceTag) {
            return Promise.reject(new errors_1.ValidationError('The `SourceTag`, if present, must match the tag of the `Account` X-address'));
        }
        if (sourceTag) {
            newTxJSON.SourceTag = sourceTag;
        }
    }
    if (typeof txJSON.Destination === 'string') {
        const { classicAccount: destinationAccount, tag: destinationTag } = getClassicAccountAndTag(txJSON.Destination);
        newTxJSON.Destination = destinationAccount;
        if (destinationTag != null) {
            if (TRANSACTION_TYPES_WITH_DESTINATION_TAG_FIELD.includes(txJSON.TransactionType)) {
                if (txJSON.DestinationTag && txJSON.DestinationTag !== destinationTag) {
                    return Promise.reject(new errors_1.ValidationError('The Payment `DestinationTag`, if present, must match the tag of the `Destination` X-address'));
                }
                if (destinationTag) {
                    newTxJSON.DestinationTag = destinationTag;
                }
            }
        }
    }
    function convertToClassicAccountIfPresent(fieldName) {
        const account = txJSON[fieldName];
        if (typeof account === 'string') {
            const { classicAccount: ca } = getClassicAccountAndTag(account);
            newTxJSON[fieldName] = ca;
        }
    }
    function convertIssuedCurrencyToAccountIfPresent(fieldName) {
        const amount = txJSON[fieldName];
        if (typeof amount === 'number'
            || amount instanceof Array
            || amount == null)
            return;
        newTxJSON[fieldName] = common_1.toRippledAmount(amount);
    }
    convertToClassicAccountIfPresent('Authorize');
    convertToClassicAccountIfPresent('Unauthorize');
    convertToClassicAccountIfPresent('Owner');
    convertToClassicAccountIfPresent('RegularKey');
    convertIssuedCurrencyToAccountIfPresent('Amount');
    convertIssuedCurrencyToAccountIfPresent('SendMax');
    convertIssuedCurrencyToAccountIfPresent('DeliverMin');
    convertIssuedCurrencyToAccountIfPresent('TakerPays');
    convertIssuedCurrencyToAccountIfPresent('TakerGets');
    convertIssuedCurrencyToAccountIfPresent('LimitAmount');
    setCanonicalFlag(newTxJSON);
    function prepareMaxLedgerVersion() {
        if (newTxJSON.LastLedgerSequence && instructions.maxLedgerVersion) {
            return Promise.reject(new errors_1.ValidationError('`LastLedgerSequence` in txJSON and `maxLedgerVersion`' +
                ' in `instructions` cannot both be set'));
        }
        if (newTxJSON.LastLedgerSequence && instructions.maxLedgerVersionOffset) {
            return Promise.reject(new errors_1.ValidationError('`LastLedgerSequence` in txJSON and `maxLedgerVersionOffset`' +
                ' in `instructions` cannot both be set'));
        }
        if (newTxJSON.LastLedgerSequence) {
            return Promise.resolve();
        }
        if (instructions.maxLedgerVersion !== undefined) {
            if (instructions.maxLedgerVersion !== null) {
                newTxJSON.LastLedgerSequence = instructions.maxLedgerVersion;
            }
            return Promise.resolve();
        }
        const offset = instructions.maxLedgerVersionOffset != null
            ? instructions.maxLedgerVersionOffset
            : 3;
        return api.connection.getLedgerVersion().then((ledgerVersion) => {
            newTxJSON.LastLedgerSequence = ledgerVersion + offset;
            return;
        });
    }
    function prepareFee() {
        if (newTxJSON.Fee && instructions.fee) {
            return Promise.reject(new errors_1.ValidationError('`Fee` in txJSON and `fee` in `instructions` cannot both be set'));
        }
        if (newTxJSON.Fee) {
            return Promise.resolve();
        }
        const multiplier = instructions.signersCount == null
            ? 1
            : instructions.signersCount + 1;
        if (instructions.fee != null) {
            const fee = new bignumber_js_1.default(instructions.fee);
            if (fee.isGreaterThan(api._maxFeeXRP)) {
                return Promise.reject(new errors_1.ValidationError(`Fee of ${fee.toString(10)} XRP exceeds ` +
                    `max of ${api._maxFeeXRP} XRP. To use this fee, increase ` +
                    '`maxFeeXRP` in the RippleAPI constructor.'));
            }
            newTxJSON.Fee = scaleValue(common.xrpToDrops(instructions.fee), multiplier);
            return Promise.resolve();
        }
        const cushion = api._feeCushion;
        return api.getFee(cushion).then((fee) => {
            return api.connection.getFeeRef().then((feeRef) => {
                const extraFee = newTxJSON.TransactionType !== 'EscrowFinish' ||
                    newTxJSON.Fulfillment == null
                    ? 0
                    : cushion *
                        feeRef *
                        (32 +
                            Math.floor(Buffer.from(newTxJSON.Fulfillment, 'hex').length / 16));
                const feeDrops = common.xrpToDrops(fee);
                const maxFeeXRP = instructions.maxFee
                    ? bignumber_js_1.default.min(api._maxFeeXRP, instructions.maxFee)
                    : api._maxFeeXRP;
                const maxFeeDrops = common.xrpToDrops(maxFeeXRP);
                const normalFee = scaleValue(feeDrops, multiplier, extraFee);
                newTxJSON.Fee = bignumber_js_1.default.min(normalFee, maxFeeDrops).toString(10);
                return;
            });
        });
    }
    function prepareSequence() {
        return __awaiter(this, void 0, void 0, function* () {
            if (instructions.sequence != null) {
                if (newTxJSON.Sequence == null ||
                    instructions.sequence === newTxJSON.Sequence) {
                    newTxJSON.Sequence = instructions.sequence;
                    return Promise.resolve();
                }
                else {
                    return Promise.reject(new errors_1.ValidationError('`Sequence` in txJSON must match `sequence` in `instructions`'));
                }
            }
            if (newTxJSON.Sequence != null) {
                return Promise.resolve();
            }
            if (instructions.ticketSequence != null) {
                newTxJSON.Sequence = 0;
                newTxJSON.TicketSequence = instructions.ticketSequence;
                return Promise.resolve();
            }
            try {
                const response = yield api.request('account_info', {
                    account: classicAccount,
                    ledger_index: 'current'
                });
                newTxJSON.Sequence = response.account_data.Sequence;
                return Promise.resolve();
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
    return Promise.all([
        prepareMaxLedgerVersion(),
        prepareFee(),
        prepareSequence()
    ]).then(() => formatPrepareResponse(newTxJSON));
}
exports.prepareTransaction = prepareTransaction;
function convertStringToHex(string) {
    return Buffer.from(string, 'utf8').toString('hex').toUpperCase();
}
exports.convertStringToHex = convertStringToHex;
function convertMemo(memo) {
    return {
        Memo: common.removeUndefined({
            MemoData: memo.data ? convertStringToHex(memo.data) : undefined,
            MemoType: memo.type ? convertStringToHex(memo.type) : undefined,
            MemoFormat: memo.format ? convertStringToHex(memo.format) : undefined
        })
    };
}
exports.convertMemo = convertMemo;
//# sourceMappingURL=utils.js.map