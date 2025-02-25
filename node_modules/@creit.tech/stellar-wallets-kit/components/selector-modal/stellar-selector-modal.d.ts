import { LitElement } from 'lit';
import { IModalTheme } from '../../types';
export declare enum ModalThemeType {
    DARK = "DARK",
    LIGHT = "LIGHT"
}
export declare const ModalThemes: {
    [key in ModalThemeType]: IModalTheme;
};
export declare class StellarSelectorModal extends LitElement {
    static styles: import("lit").CSSResult[];
    showModal: boolean;
    loadingAccounts: boolean;
    closingModal: boolean;
    modalTitle: string;
    accounts: {
        index: number;
        publicKey: string;
    }[];
    connectedCallback(): void;
    pickAccount(option: {
        publicKey: string;
        index: number;
    }): Promise<void>;
    closeModal(): Promise<void>;
    render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=stellar-selector-modal.d.ts.map