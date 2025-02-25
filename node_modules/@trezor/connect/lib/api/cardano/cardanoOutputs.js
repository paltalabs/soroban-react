"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOutput = exports.transformOutput = exports.OutputValidation = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const cardanoAddressParameters_1 = require("./cardanoAddressParameters");
const cardanoTokenBundle_1 = require("./cardanoTokenBundle");
const cardanoUtils_1 = require("./cardanoUtils");
const cardano_1 = require("../../types/api/cardano");
exports.OutputValidation = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    amount: schema_utils_1.Type.Uint(),
    tokenBundle: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(cardano_1.CardanoAssetGroup)),
    datumHash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    format: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    inlineDatum: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    referenceScript: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    addressParameters: schema_utils_1.Type.Optional(cardano_1.CardanoAddressParameters),
});
const transformOutput = (output) => {
    (0, schema_utils_1.Assert)(exports.OutputValidation, output);
    const result = {
        output: {
            amount: output.amount,
            asset_groups_count: 0,
            datum_hash: output.datumHash,
            format: output.format,
            inline_datum_size: output.inlineDatum
                ? (0, cardanoUtils_1.hexStringByteLength)(output.inlineDatum)
                : undefined,
            reference_script_size: output.referenceScript
                ? (0, cardanoUtils_1.hexStringByteLength)(output.referenceScript)
                : undefined,
        },
        inlineDatum: output.inlineDatum,
        referenceScript: output.referenceScript,
    };
    if (output.addressParameters) {
        (0, cardanoAddressParameters_1.validateAddressParameters)(output.addressParameters);
        result.output.address_parameters = (0, cardanoAddressParameters_1.addressParametersToProto)(output.addressParameters);
    }
    else {
        result.output.address = output.address;
    }
    if (output.tokenBundle) {
        result.tokenBundle = (0, cardanoTokenBundle_1.tokenBundleToProto)(output.tokenBundle);
        result.output.asset_groups_count = result.tokenBundle.length;
    }
    else {
        result.output.asset_groups_count = 0;
    }
    return result;
};
exports.transformOutput = transformOutput;
const sendOutput = async (typedCall, outputWithData) => {
    const MAX_CHUNK_SIZE = 1024 * 2;
    const { output, tokenBundle, inlineDatum, referenceScript } = outputWithData;
    await typedCall('CardanoTxOutput', 'CardanoTxItemAck', output);
    if (tokenBundle) {
        for (const assetGroup of tokenBundle) {
            await typedCall('CardanoAssetGroup', 'CardanoTxItemAck', {
                policy_id: assetGroup.policyId,
                tokens_count: assetGroup.tokens.length,
            });
            for (const token of assetGroup.tokens) {
                await typedCall('CardanoToken', 'CardanoTxItemAck', token);
            }
        }
    }
    if (inlineDatum) {
        await (0, cardanoUtils_1.sendChunkedHexString)(typedCall, inlineDatum, MAX_CHUNK_SIZE, 'CardanoTxInlineDatumChunk');
    }
    if (referenceScript) {
        await (0, cardanoUtils_1.sendChunkedHexString)(typedCall, referenceScript, MAX_CHUNK_SIZE, 'CardanoTxReferenceScriptChunk');
    }
};
exports.sendOutput = sendOutput;
//# sourceMappingURL=cardanoOutputs.js.map