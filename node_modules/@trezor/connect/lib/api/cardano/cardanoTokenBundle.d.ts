import { Static } from '@trezor/schema-utils';
import { CardanoAssetGroup } from '../../types/api/cardano';
export type AssetGroupWithTokens = Static<typeof AssetGroupWithTokens>;
export declare const AssetGroupWithTokens: import("@trezor/schema-utils").TObject<{
    policyId: import("@trezor/schema-utils").TString;
    tokens: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        asset_name_bytes: import("@trezor/schema-utils").TString;
        amount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
        mint_amount: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils/lib/custom-types/uint").TUint>;
    }>>;
}>;
export declare const tokenBundleToProto: (tokenBundle: CardanoAssetGroup[]) => AssetGroupWithTokens[];
//# sourceMappingURL=cardanoTokenBundle.d.ts.map