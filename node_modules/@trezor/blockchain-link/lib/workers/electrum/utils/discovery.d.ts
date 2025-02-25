import type { ElectrumAPI, HistoryTx } from '@trezor/blockchain-link-types/lib/electrum';
export type AddressHistory = {
    address: string;
    scripthash: string;
    path: string;
    history: HistoryTx[];
    empty: boolean;
};
export declare const discoverAddress: (client: ElectrumAPI) => ({ address, path }: {
    address: string;
    path: string;
}) => Promise<AddressHistory>;
//# sourceMappingURL=discovery.d.ts.map