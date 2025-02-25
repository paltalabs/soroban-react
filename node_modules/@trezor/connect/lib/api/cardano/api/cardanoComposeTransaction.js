"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coin_selection_1 = require("@fivebinaries/coin-selection");
const AbstractMethod_1 = require("../../../core/AbstractMethod");
const paramsValidator_1 = require("../../common/paramsValidator");
const cardanoUtils_1 = require("../cardanoUtils");
class CardanoComposeTransaction extends AbstractMethod_1.AbstractMethod {
    init() {
        const { payload } = this;
        (0, paramsValidator_1.validateParams)(payload, [
            { name: 'account', type: 'object', required: true },
            { name: 'feeLevels', type: 'array' },
            { name: 'outputs', type: 'array' },
            { name: 'certificates', type: 'array', allowEmpty: true },
            { name: 'withdrawals', type: 'array', allowEmpty: true },
            { name: 'changeAddress', type: 'object', required: true },
            { name: 'addressParameters', type: 'object', required: true },
            { name: 'testnet', type: 'boolean' },
        ]);
        this.useDevice = false;
        this.useDeviceState = false;
        this.useUi = false;
        this.params = payload;
    }
    get info() {
        return 'Compose Cardano transaction';
    }
    run() {
        const { feeLevels = [{}], account, outputs = [], certificates = [], withdrawals = [], changeAddress, addressParameters, testnet, } = this.params;
        const result = feeLevels.map(({ feePerUnit }) => {
            try {
                const txPlan = (0, cardanoUtils_1.composeTxPlan)(account.descriptor, account.utxo, outputs, certificates, withdrawals, changeAddress.address, !!testnet, { feeParams: feePerUnit ? { a: feePerUnit } : undefined });
                return {
                    fee: txPlan.fee,
                    feePerByte: feePerUnit !== null && feePerUnit !== void 0 ? feePerUnit : '0',
                    deposit: txPlan.deposit,
                    totalSpent: txPlan.totalSpent,
                    max: txPlan.max,
                    ...(txPlan.type === 'nonfinal'
                        ? {
                            type: txPlan.type,
                            bytes: 0,
                        }
                        : {
                            type: txPlan.type,
                            bytes: txPlan.tx.size,
                            ttl: txPlan.ttl,
                            inputs: coin_selection_1.trezorUtils.transformToTrezorInputs(txPlan.inputs, account.utxo),
                            outputs: coin_selection_1.trezorUtils.transformToTrezorOutputs(txPlan.outputs, addressParameters),
                            unsignedTx: txPlan.tx,
                        }),
                };
            }
            catch (error) {
                if (error instanceof coin_selection_1.CoinSelectionError &&
                    error.code === 'UTXO_BALANCE_INSUFFICIENT') {
                    return { type: 'error', error: 'UTXO_BALANCE_INSUFFICIENT' };
                }
                if (error instanceof coin_selection_1.CoinSelectionError && error.code === 'UTXO_VALUE_TOO_SMALL') {
                    return { type: 'error', error: 'UTXO_VALUE_TOO_SMALL' };
                }
                return { type: 'error', error: error.message };
            }
        });
        return Promise.resolve(result);
    }
}
exports.default = CardanoComposeTransaction;
//# sourceMappingURL=cardanoComposeTransaction.js.map