import { LitElement } from 'lit';
import { Subscription } from 'rxjs';
import { ReactiveState } from '../../state/reactive-state';
import { IButtonTheme } from '../../types';
export declare enum ButtonThemeType {
    DARK = "DARK",
    LIGHT = "LIGHT"
}
export declare const ButtonThemes: {
    [key in ButtonThemeType]: IButtonTheme;
};
export declare class StellarWalletsButton extends LitElement {
    static styles: import("lit").CSSResult[];
    buttonText: string;
    showDropdown: boolean;
    accountBalance?: string;
    showCopiedMessage: boolean;
    activeAddress: ReactiveState<string | undefined>;
    theme: ReactiveState<IButtonTheme | undefined>;
    fetchAddressSubscription: Subscription | undefined;
    private get getThemeStyles();
    onButtonClicked(): void;
    closeDropdown(): void;
    disconnect(): void;
    copyPublicKey(): Promise<void>;
    startBalanceFetcher(): Promise<void>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=stellar-wallets-button.d.ts.map