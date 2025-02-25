"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAdditionalInfo = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const solana_1 = require("../../types/api/solana");
const transformAdditionalInfo = (additionalInfo) => {
    var _a;
    if (!additionalInfo) {
        return undefined;
    }
    (0, schema_utils_1.Assert)(solana_1.SolanaTxAdditionalInfo, additionalInfo);
    return {
        token_accounts_infos: ((_a = additionalInfo.tokenAccountsInfos) === null || _a === void 0 ? void 0 : _a.map(tokenAccountInfo => ({
            base_address: tokenAccountInfo.baseAddress,
            token_program: tokenAccountInfo.tokenProgram,
            token_mint: tokenAccountInfo.tokenMint,
            token_account: tokenAccountInfo.tokenAccount,
        }))) || [],
    };
};
exports.transformAdditionalInfo = transformAdditionalInfo;
//# sourceMappingURL=additionalInfo.js.map