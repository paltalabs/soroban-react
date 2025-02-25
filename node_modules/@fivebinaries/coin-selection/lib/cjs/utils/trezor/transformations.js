"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformToTrezorOutputs = exports.transformToTrezorInputs = exports.transformToTokenBundle = void 0;
const common_1 = require("../common");
const transformToTokenBundle = (assets) => {
    // prepare token bundle used in trezor output
    if (assets.length === 0)
        return undefined;
    const uniquePolicies = [];
    assets.forEach(asset => {
        const { policyId } = (0, common_1.parseAsset)(asset.unit);
        if (!uniquePolicies.includes(policyId)) {
            uniquePolicies.push(policyId);
        }
    });
    const assetsByPolicy = [];
    uniquePolicies.forEach(policyId => {
        const assetsInPolicy = [];
        assets.forEach(asset => {
            const assetInfo = (0, common_1.parseAsset)(asset.unit);
            if (assetInfo.policyId !== policyId)
                return;
            assetsInPolicy.push({
                assetNameBytes: assetInfo.assetNameInHex,
                amount: asset.quantity,
            });
        }),
            assetsByPolicy.push({
                policyId,
                tokenAmounts: assetsInPolicy,
            });
    });
    return assetsByPolicy;
};
exports.transformToTokenBundle = transformToTokenBundle;
const transformToTrezorInputs = (utxos, trezorUtxos) => {
    return utxos.map(utxo => {
        const utxoWithPath = trezorUtxos.find(u => u.txid === utxo.txHash && u.vout === utxo.outputIndex);
        // shouldn't happen since utxos should be subset of trezorUtxos (with different shape/fields)
        if (!utxoWithPath)
            throw Error(`Cannot transform utxo ${utxo.txHash}:${utxo.outputIndex}`);
        return {
            path: utxoWithPath.path,
            prev_hash: utxo.txHash,
            prev_index: utxo.outputIndex,
        };
    });
};
exports.transformToTrezorInputs = transformToTrezorInputs;
const transformToTrezorOutputs = (outputs, changeAddressParameters) => {
    return outputs.map(output => {
        let params;
        if (output.isChange) {
            params = {
                addressParameters: changeAddressParameters,
            };
        }
        else {
            params = {
                address: output.address,
            };
        }
        return Object.assign(Object.assign({}, params), { amount: output.amount, tokenBundle: (0, exports.transformToTokenBundle)(output.assets) });
    });
};
exports.transformToTrezorOutputs = transformToTrezorOutputs;
