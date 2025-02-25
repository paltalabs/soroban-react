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
exports.CoinSelectionError = exports.types = exports.trezorUtils = exports.coinSelection = void 0;
const constants_1 = require("./constants");
const largestFirst_1 = require("./methods/largestFirst");
const randomImprove_1 = require("./methods/randomImprove");
const errors_1 = require("./utils/errors");
const logger_1 = require("./utils/logger");
const common_1 = require("./utils/common");
const coinSelection = (params, options) => {
    const logger = (0, logger_1.getLogger)(!!(options === null || options === void 0 ? void 0 : options.debug));
    logger.debug('Args:', {
        params,
        options,
    });
    if (params.utxos.length === 0) {
        logger.debug('Empty Utxo set');
        throw new errors_1.CoinSelectionError(constants_1.ERROR.UTXO_BALANCE_INSUFFICIENT);
    }
    const t1 = new Date().getTime();
    let res;
    if (params.outputs.find(o => o.setMax) ||
        params.certificates.length > 0 ||
        params.withdrawals.length > 0 ||
        (options === null || options === void 0 ? void 0 : options.forceLargestFirstSelection)) {
        logger.debug('Running largest-first alg');
        res = (0, largestFirst_1.largestFirst)(params, options);
    }
    else {
        logger.debug('Running random-improve alg');
        try {
            res = (0, randomImprove_1.randomImprove)(params, options);
        }
        catch (error) {
            if (error instanceof errors_1.CoinSelectionError &&
                error.code === 'UTXO_NOT_FRAGMENTED_ENOUGH') {
                logger.debug(`random-improve failed with ${error.code}. Retrying with largest-first alg.`);
                res = (0, largestFirst_1.largestFirst)(params, options);
            }
            else {
                throw error;
            }
        }
    }
    const t2 = new Date().getTime();
    logger.debug(`Duration: ${(t2 - t1) / 1000} seconds`);
    const incompleteOutputs = res.outputs.find(o => !o.address ||
        !o.amount ||
        // assets set with quantity = 0
        (o.assets.length > 0 &&
            o.assets.find(a => !a.quantity ||
                (0, common_1.bigNumFromStr)(a.quantity).compare((0, common_1.bigNumFromStr)('0')) === 0)));
    if (incompleteOutputs) {
        const selection = {
            type: 'nonfinal',
            fee: res.fee,
            totalSpent: res.totalSpent,
            deposit: res.deposit,
            withdrawal: res.withdrawal,
            max: res.max,
        };
        logger.debug('Coin selection for a draft transaction:', selection);
        return selection;
    }
    else {
        const selection = Object.assign(Object.assign({ type: 'final' }, res), { outputs: res.outputs });
        logger.debug('Coin selection for a final transaction:', selection);
        return selection;
    }
};
exports.coinSelection = coinSelection;
exports.trezorUtils = __importStar(require("./utils/trezor"));
exports.types = __importStar(require("./types/types"));
var errors_2 = require("./utils/errors");
Object.defineProperty(exports, "CoinSelectionError", { enumerable: true, get: function () { return errors_2.CoinSelectionError; } });
