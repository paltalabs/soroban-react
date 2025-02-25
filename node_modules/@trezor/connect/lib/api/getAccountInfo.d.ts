import { AbstractMethod } from '../core/AbstractMethod';
import { Discovery } from './common/Discovery';
import type { CoinInfo, AccountInfo, AccountUtxo } from '../types';
import type { GetAccountInfo as GetAccountInfoParams } from '../types/api/getAccountInfo';
type Request = GetAccountInfoParams & {
    address_n: number[];
    coinInfo: CoinInfo;
};
export default class GetAccountInfo extends AbstractMethod<'getAccountInfo', Request[]> {
    disposed: boolean;
    hasBundle?: boolean;
    discovery?: Discovery;
    init(): void;
    get info(): string;
    get confirmation(): {
        view: "export-account-info";
        label: string;
        customConfirmButton: {
            label: string;
            className: string;
        };
    } | {
        view: "export-account-info";
        label: string;
        customConfirmButton?: undefined;
    };
    checkFirmwareRange(): "ui-device_firmware_old" | "ui-device_firmware_unsupported" | "ui-device_firmware_not_compatible" | "ui-device_firmware_not_installed" | undefined;
    run(): Promise<AccountInfo | (AccountInfo | null)[] | {
        utxo: AccountUtxo[] | undefined;
        descriptor: string;
        balance: string;
        availableBalance: string;
        empty: boolean;
        tokens?: import("@trezor/blockchain-link-types/lib/common").TokenInfo[];
        addresses?: import("@trezor/blockchain-link-types/lib/common").AccountAddresses;
        history: {
            total: number;
            tokens?: number;
            unconfirmed: number;
            transactions?: import("@trezor/blockchain-link-types/lib/common").Transaction[];
            txids?: string[];
            addrTxCount?: number;
        };
        misc?: {
            nonce?: string;
            contractInfo?: import("@trezor/blockchain-link-types/lib/blockbook-api").ContractInfo;
            stakingPools?: import("@trezor/blockchain-link-types/lib/blockbook-api").StakingPool[];
            addressAliases?: {
                [key: string]: import("@trezor/blockchain-link-types/lib/blockbook-api").AddressAlias;
            };
            sequence?: number;
            reserve?: string;
            rewards?: string;
            staking?: {
                address: string;
                isActive: boolean;
                rewards: string;
                poolId: string | null;
            };
            owner?: string;
            rent?: number;
        };
        page?: {
            index: number;
            size: number;
            total: number;
        };
        marker?: {
            ledger: number;
            seq: number;
        };
        path: string;
    }>;
    discover(request: Request): Promise<{
        utxo: AccountUtxo[] | undefined;
        descriptor: string;
        balance: string;
        availableBalance: string;
        empty: boolean;
        tokens?: import("@trezor/blockchain-link-types/lib/common").TokenInfo[];
        addresses?: import("@trezor/blockchain-link-types/lib/common").AccountAddresses;
        history: {
            total: number;
            tokens?: number;
            unconfirmed: number;
            transactions?: import("@trezor/blockchain-link-types/lib/common").Transaction[];
            txids?: string[];
            addrTxCount?: number;
        };
        misc?: {
            nonce?: string;
            contractInfo?: import("@trezor/blockchain-link-types/lib/blockbook-api").ContractInfo;
            stakingPools?: import("@trezor/blockchain-link-types/lib/blockbook-api").StakingPool[];
            addressAliases?: {
                [key: string]: import("@trezor/blockchain-link-types/lib/blockbook-api").AddressAlias;
            };
            sequence?: number;
            reserve?: string;
            rewards?: string;
            staking?: {
                address: string;
                isActive: boolean;
                rewards: string;
                poolId: string | null;
            };
            owner?: string;
            rent?: number;
        };
        page?: {
            index: number;
            size: number;
            total: number;
        };
        marker?: {
            ledger: number;
            seq: number;
        };
        path: string;
    }>;
    dispose(): void;
}
export {};
//# sourceMappingURL=getAccountInfo.d.ts.map