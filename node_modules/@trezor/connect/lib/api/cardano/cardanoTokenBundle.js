"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenBundleToProto = exports.AssetGroupWithTokens = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const constants_1 = require("../../constants");
const cardano_1 = require("../../types/api/cardano");
exports.AssetGroupWithTokens = schema_utils_1.Type.Object({
    policyId: schema_utils_1.Type.String(),
    tokens: schema_utils_1.Type.Array(constants_1.PROTO.CardanoToken, { minItems: 1 }),
});
const tokenAmountsToProto = (tokenAmounts) => tokenAmounts.map(tokenAmount => ({
    asset_name_bytes: tokenAmount.assetNameBytes,
    amount: tokenAmount.amount,
    mint_amount: tokenAmount.mintAmount,
}));
const tokenBundleToProto = (tokenBundle) => {
    (0, schema_utils_1.Assert)(schema_utils_1.Type.Array(cardano_1.CardanoAssetGroup), tokenBundle);
    return tokenBundle.map(tokenGroup => ({
        policyId: tokenGroup.policyId,
        tokens: tokenAmountsToProto(tokenGroup.tokenAmounts),
    }));
};
exports.tokenBundleToProto = tokenBundleToProto;
//# sourceMappingURL=cardanoTokenBundle.js.map