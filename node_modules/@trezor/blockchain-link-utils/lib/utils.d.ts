import { BigNumberValue } from '@trezor/utils/lib/bigNumber';
import type { Transaction, EnhancedVinVout } from '@trezor/blockchain-link-types/lib/common';
import type { VinVout } from '@trezor/blockchain-link-types/lib/blockbook';
export type Addresses = ({
    address: string;
} | string)[] | string;
export declare const isAccountOwned: (addresses: string[]) => (vinVout: VinVout) => boolean;
export declare const filterTargets: (addresses: Addresses, targets: VinVout[]) => VinVout[];
export declare const enhanceVinVout: (addresses: string[]) => (vinVout: VinVout) => EnhancedVinVout;
export declare const sumVinVout: (sum: BigNumberValue, { value }: VinVout) => BigNumberValue;
export declare const transformTarget: (target: VinVout, incoming: VinVout[]) => {
    n: number;
    addresses: string[] | undefined;
    isAddress: boolean;
    amount: string | undefined;
    coinbase: string | undefined;
    isAccountTarget: boolean | undefined;
};
export declare const sortTxsFromLatest: (transactions: Transaction[]) => Transaction[];
export declare const formatTokenSymbol: (symbol: string) => string;
//# sourceMappingURL=utils.d.ts.map