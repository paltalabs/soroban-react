import { SolanaTxAdditionalInfo } from '../../types/api/solana';
export declare const transformAdditionalInfo: (additionalInfo?: SolanaTxAdditionalInfo) => {
    token_accounts_infos: {
        base_address: string;
        token_program: string;
        token_mint: string;
        token_account: string;
    }[];
} | undefined;
//# sourceMappingURL=additionalInfo.d.ts.map