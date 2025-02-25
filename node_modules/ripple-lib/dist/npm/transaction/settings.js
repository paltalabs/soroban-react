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
const assert = __importStar(require("assert"));
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const utils = __importStar(require("./utils"));
const validate = utils.common.validate;
const AccountSetFlags = utils.common.constants.AccountSetFlags;
const AccountFields = utils.common.constants.AccountFields;
function setTransactionFlags(txJSON, values) {
    const keys = Object.keys(values).filter((key) => AccountSetFlags[key] != null);
    assert.ok(keys.length <= 1, 'ERROR: can only set one setting per transaction');
    const flagName = keys[0];
    const value = values[flagName];
    const index = AccountSetFlags[flagName];
    if (index != null) {
        if (value) {
            txJSON.SetFlag = index;
        }
        else {
            txJSON.ClearFlag = index;
        }
    }
}
function setTransactionFields(txJSON, input) {
    const fieldSchema = AccountFields;
    for (const fieldName in fieldSchema) {
        const field = fieldSchema[fieldName];
        let value = input[field.name];
        if (value === undefined) {
            continue;
        }
        if (value === null && field.hasOwnProperty('defaults')) {
            value = field.defaults;
        }
        if (field.encoding === 'hex' && !field.length) {
            value = Buffer.from(value, 'ascii').toString('hex').toUpperCase();
        }
        txJSON[fieldName] = value;
    }
}
function convertTransferRate(transferRate) {
    return new bignumber_js_1.default(transferRate).shiftedBy(9).toNumber();
}
function formatSignerEntry(signer) {
    return {
        SignerEntry: {
            Account: signer.address,
            SignerWeight: signer.weight
        }
    };
}
function createSettingsTransactionWithoutMemos(account, settings) {
    if (settings.regularKey !== undefined) {
        const removeRegularKey = {
            TransactionType: 'SetRegularKey',
            Account: account
        };
        if (settings.regularKey === null) {
            return removeRegularKey;
        }
        return Object.assign({}, removeRegularKey, {
            RegularKey: settings.regularKey
        });
    }
    if (settings.signers != null) {
        const setSignerList = {
            TransactionType: 'SignerListSet',
            Account: account,
            SignerEntries: [],
            SignerQuorum: settings.signers.threshold
        };
        if (settings.signers.weights != null) {
            setSignerList.SignerEntries = settings.signers.weights.map(formatSignerEntry);
        }
        return setSignerList;
    }
    const txJSON = {
        TransactionType: 'AccountSet',
        Account: account
    };
    const settingsWithoutMemos = Object.assign({}, settings);
    delete settingsWithoutMemos.memos;
    setTransactionFlags(txJSON, settingsWithoutMemos);
    setTransactionFields(txJSON, settings);
    if (txJSON.TransferRate != null) {
        txJSON.TransferRate = convertTransferRate(txJSON.TransferRate);
    }
    return txJSON;
}
function createSettingsTransaction(account, settings) {
    const txJSON = createSettingsTransactionWithoutMemos(account, settings);
    if (settings.memos != null) {
        txJSON.Memos = settings.memos.map(utils.convertMemo);
    }
    return txJSON;
}
function prepareSettings(address, settings, instructions = {}) {
    try {
        validate.prepareSettings({ address, settings, instructions });
        const txJSON = createSettingsTransaction(address, settings);
        return utils.prepareTransaction(txJSON, this, instructions);
    }
    catch (e) {
        return Promise.reject(e);
    }
}
exports.default = prepareSettings;
//# sourceMappingURL=settings.js.map