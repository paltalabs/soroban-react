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
const assert = __importStar(require("assert"));
const common_1 = require("../../common");
const AccountFlags = common_1.constants.AccountFlags;
const fields_1 = __importDefault(require("./fields"));
function getAccountRootModifiedNode(tx) {
    const modifiedNodes = tx.meta.AffectedNodes.filter(node => { var _a; return ((_a = node.ModifiedNode) === null || _a === void 0 ? void 0 : _a.LedgerEntryType) === 'AccountRoot'; });
    assert.ok(modifiedNodes.length === 1);
    return modifiedNodes[0].ModifiedNode;
}
function parseFlags(tx) {
    const settings = {};
    if (tx.TransactionType !== 'AccountSet') {
        return settings;
    }
    const node = getAccountRootModifiedNode(tx);
    const oldFlags = _.get(node.PreviousFields, 'Flags');
    const newFlags = _.get(node.FinalFields, 'Flags');
    if (oldFlags != null && newFlags != null) {
        const changedFlags = oldFlags ^ newFlags;
        const setFlags = newFlags & changedFlags;
        const clearedFlags = oldFlags & changedFlags;
        Object.entries(AccountFlags).forEach(entry => {
            const [flagName, flagValue] = entry;
            if (setFlags & flagValue) {
                settings[flagName] = true;
            }
            else if (clearedFlags & flagValue) {
                settings[flagName] = false;
            }
        });
    }
    const oldField = _.get(node.PreviousFields, 'AccountTxnID');
    const newField = _.get(node.FinalFields, 'AccountTxnID');
    if (newField && !oldField) {
        settings.enableTransactionIDTracking = true;
    }
    else if (oldField && !newField) {
        settings.enableTransactionIDTracking = false;
    }
    return settings;
}
function parseSettings(tx) {
    const txType = tx.TransactionType;
    assert.ok(txType === 'AccountSet' ||
        txType === 'SetRegularKey' ||
        txType === 'SignerListSet');
    return Object.assign({}, parseFlags(tx), fields_1.default(tx));
}
exports.default = parseSettings;
//# sourceMappingURL=settings.js.map