import { Observable } from 'rxjs';
import { ISupportedWallet, IModalTheme, WalletNetwork, IButtonTheme } from '../types';
export interface StateProps {
    allowedWallets: ISupportedWallet[];
    horizonUrl?: string;
    selectedNetwork?: WalletNetwork;
    selectedModuleId?: string;
    modalTheme?: IModalTheme;
    buttonTheme?: IButtonTheme;
    activeAddress?: string;
    mnemonicPath?: string;
    hardwareWalletPaths: {
        publicKey: string;
        index: number;
    }[];
}
export declare const store: import("@ngneat/elf").Store<{
    name: string;
    state: StateProps;
    config: undefined;
}, StateProps>;
export declare const allowedWallets$: Observable<ISupportedWallet[]>;
export declare const selectedNetwork$: Observable<StateProps['selectedNetwork']>;
export declare const modalTheme$: Observable<IModalTheme | undefined>;
export declare const buttonTheme$: Observable<IButtonTheme | undefined>;
export declare const activeAddress$: Observable<string | undefined>;
export declare const horizonUrl$: Observable<string | undefined>;
export declare const mnemonicPath$: Observable<string | undefined>;
export declare const hardwareWalletPaths$: Observable<{
    publicKey: string;
    index: number;
}[]>;
export declare function setSelectedModuleId(moduleId: Required<StateProps['selectedModuleId']>): void;
export declare function setNetwork(network: WalletNetwork): void;
export declare function setModalTheme(theme: IModalTheme): void;
export declare function seButtonTheme(theme: IButtonTheme): void;
export declare function setAllowedWallets(data: ISupportedWallet[]): void;
export declare function setAddress(address: string): void;
export declare function removeAddress(): void;
export declare function setHorizonUrl(url: string): void;
export declare function setMnemonicPath(path: string): void;
export declare function removeMnemonicPath(): void;
export declare function setHardwareWalletPaths(accounts: {
    publicKey: string;
    index: number;
}[]): void;
export declare function removeHardwareWalletPaths(): void;
//# sourceMappingURL=store.d.ts.map