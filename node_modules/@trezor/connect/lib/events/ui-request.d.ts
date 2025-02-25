import type { EventTypeDeviceSelected } from '@trezor/connect-analytics';
import type { PROTO } from '../constants';
import type { Device, CoinInfo, BitcoinNetworkInfo, SelectFeeLevel } from '../types';
import type { DiscoveryAccountType, DiscoveryAccount } from '../types/account';
import type { MessageFactoryFn } from '../types/utils';
import type { DeviceButtonRequest } from './device';
import { MethodPermission } from '../core/AbstractMethod';
export declare const UI_EVENT = "UI_EVENT";
export declare const UI_REQUEST: {
    readonly TRANSPORT: "ui-no_transport";
    readonly BOOTLOADER: "ui-device_bootloader_mode";
    readonly NOT_IN_BOOTLOADER: "ui-device_not_in_bootloader_mode";
    readonly REQUIRE_MODE: "ui-device_require_mode";
    readonly INITIALIZE: "ui-device_not_initialized";
    readonly SEEDLESS: "ui-device_seedless";
    readonly FIRMWARE_OLD: "ui-device_firmware_old";
    readonly FIRMWARE_OUTDATED: "ui-device_firmware_outdated";
    readonly FIRMWARE_NOT_SUPPORTED: "ui-device_firmware_unsupported";
    readonly FIRMWARE_NOT_COMPATIBLE: "ui-device_firmware_not_compatible";
    readonly FIRMWARE_NOT_INSTALLED: "ui-device_firmware_not_installed";
    readonly FIRMWARE_PROGRESS: "ui-firmware-progress";
    readonly FIRMWARE_RECONNECT: "ui-firmware_reconnect";
    readonly DEVICE_NEEDS_BACKUP: "ui-device_needs_backup";
    readonly REQUEST_UI_WINDOW: "ui-request_window";
    readonly CLOSE_UI_WINDOW: "ui-close_window";
    readonly REQUEST_PERMISSION: "ui-request_permission";
    readonly REQUEST_CONFIRMATION: "ui-request_confirmation";
    readonly REQUEST_PIN: "ui-request_pin";
    readonly INVALID_PIN: "ui-invalid_pin";
    readonly REQUEST_PASSPHRASE: "ui-request_passphrase";
    readonly REQUEST_PASSPHRASE_ON_DEVICE: "ui-request_passphrase_on_device";
    readonly INVALID_PASSPHRASE: "ui-invalid_passphrase";
    readonly CONNECT: "ui-connect";
    readonly LOADING: "ui-loading";
    readonly SET_OPERATION: "ui-set_operation";
    readonly SELECT_DEVICE: "ui-select_device";
    readonly SELECT_ACCOUNT: "ui-select_account";
    readonly SELECT_FEE: "ui-select_fee";
    readonly UPDATE_CUSTOM_FEE: "ui-update_custom_fee";
    readonly INSUFFICIENT_FUNDS: "ui-insufficient_funds";
    readonly REQUEST_BUTTON: "ui-button";
    readonly REQUEST_WORD: "ui-request_word";
    readonly LOGIN_CHALLENGE_REQUEST: "ui-login_challenge_request";
    readonly BUNDLE_PROGRESS: "ui-bundle_progress";
    readonly ADDRESS_VALIDATION: "ui-address_validation";
    readonly IFRAME_FAILURE: "ui-iframe_failure";
};
export type UiRequestWithoutPayload = {
    type: typeof UI_REQUEST.LOADING;
    payload?: typeof undefined;
} | {
    type: typeof UI_REQUEST.REQUEST_UI_WINDOW;
    payload?: typeof undefined;
} | {
    type: typeof UI_REQUEST.IFRAME_FAILURE;
    payload?: typeof undefined;
} | {
    type: typeof UI_REQUEST.TRANSPORT;
    payload?: typeof undefined;
} | {
    type: typeof UI_REQUEST.INSUFFICIENT_FUNDS;
    payload?: typeof undefined;
} | {
    type: typeof UI_REQUEST.CLOSE_UI_WINDOW;
    payload?: typeof undefined;
} | {
    type: typeof UI_REQUEST.LOGIN_CHALLENGE_REQUEST;
    payload?: typeof undefined;
};
export type UiRequestDeviceAction = {
    type: typeof UI_REQUEST.REQUEST_PIN;
    payload: {
        device: Device;
        type?: PROTO.PinMatrixRequestType;
    };
} | {
    type: typeof UI_REQUEST.REQUEST_WORD;
    payload: {
        device: Device;
        type: PROTO.WordRequestType;
    };
} | {
    type: typeof UI_REQUEST.INVALID_PIN;
    payload: {
        device: Device;
        type?: typeof undefined;
    };
} | {
    type: typeof UI_REQUEST.REQUEST_PASSPHRASE_ON_DEVICE;
    payload: {
        device: Device;
        type?: typeof undefined;
    };
} | {
    type: typeof UI_REQUEST.REQUEST_PASSPHRASE;
    payload: {
        device: Device;
        type?: typeof undefined;
    };
} | {
    type: typeof UI_REQUEST.INVALID_PASSPHRASE;
    payload: {
        device: Device;
        type?: typeof undefined;
    };
};
export interface UiRequestButtonData {
    type: 'address';
    serializedPath: string;
    address: string;
}
export interface UiRequestButton {
    type: typeof UI_REQUEST.REQUEST_BUTTON;
    payload: DeviceButtonRequest['payload'] & {
        data?: UiRequestButtonData;
    };
}
export interface UiRequestAddressValidation {
    type: typeof UI_REQUEST.ADDRESS_VALIDATION;
    payload: UiRequestButtonData | undefined;
}
export interface UiRequestSetOperation {
    type: typeof UI_REQUEST.SET_OPERATION;
    payload: string;
}
export interface UiRequestPermission {
    type: typeof UI_REQUEST.REQUEST_PERMISSION;
    payload: {
        permissions: MethodPermission[];
        device: Device;
    };
}
export interface UiRequestConfirmation {
    type: typeof UI_REQUEST.REQUEST_CONFIRMATION;
    payload: {
        view: 'no-backup' | 'export-xpub' | 'export-address' | 'export-account-info' | 'device-management';
        label?: string;
        customConfirmButton?: {
            className: string;
            label: string;
        };
        customCancelButton?: {
            className: string;
            label: string;
        };
        analytics?: EventTypeDeviceSelected;
    };
}
export interface UiRequestSelectDevice {
    type: typeof UI_REQUEST.SELECT_DEVICE;
    payload: {
        devices: Device[];
        webusb: boolean;
    };
}
export interface UiRequestUnexpectedDeviceMode {
    type: typeof UI_REQUEST.BOOTLOADER | typeof UI_REQUEST.NOT_IN_BOOTLOADER | typeof UI_REQUEST.INITIALIZE | typeof UI_REQUEST.SEEDLESS | typeof UI_REQUEST.DEVICE_NEEDS_BACKUP;
    payload: Device;
}
export interface FirmwareException {
    type: typeof UI_REQUEST.FIRMWARE_OLD | typeof UI_REQUEST.FIRMWARE_OUTDATED | typeof UI_REQUEST.FIRMWARE_NOT_SUPPORTED | typeof UI_REQUEST.FIRMWARE_NOT_COMPATIBLE | typeof UI_REQUEST.FIRMWARE_NOT_INSTALLED;
    payload: Device;
}
export interface UiRequestSelectAccount {
    type: typeof UI_REQUEST.SELECT_ACCOUNT;
    payload: {
        type: 'start' | 'progress' | 'end';
        coinInfo: CoinInfo;
        accountTypes?: DiscoveryAccountType[];
        defaultAccountType?: DiscoveryAccountType;
        accounts?: DiscoveryAccount[];
        preventEmpty?: boolean;
    };
}
export interface UiRequestSelectFee {
    type: typeof UI_REQUEST.SELECT_FEE;
    payload: {
        coinInfo: BitcoinNetworkInfo;
        feeLevels: SelectFeeLevel[];
    };
}
export interface UpdateCustomFee {
    type: typeof UI_REQUEST.UPDATE_CUSTOM_FEE;
    payload: {
        coinInfo: BitcoinNetworkInfo;
        feeLevels: SelectFeeLevel[];
    };
}
export interface BundleProgress<R> {
    type: typeof UI_REQUEST.BUNDLE_PROGRESS;
    payload: {
        total: number;
        progress: number;
        response: R;
        error?: string;
    };
}
export interface FirmwareProgress {
    type: typeof UI_REQUEST.FIRMWARE_PROGRESS;
    payload: {
        device: Device;
        operation: 'downloading' | 'flashing' | 'validating';
        progress: number;
    };
}
export interface FirmwareReconnect {
    type: typeof UI_REQUEST.FIRMWARE_RECONNECT;
    payload: {
        device: Device;
        disconnected: boolean;
        method: 'manual' | 'auto' | 'wait';
        target: 'normal' | 'bootloader';
        i: number;
    };
}
export type UiEvent = UiRequestWithoutPayload | UiRequestDeviceAction | UiRequestButton | UiRequestPermission | UiRequestConfirmation | UiRequestSelectDevice | UiRequestUnexpectedDeviceMode | UiRequestSelectAccount | UiRequestSelectFee | UpdateCustomFee | BundleProgress<any> | FirmwareProgress | FirmwareException | FirmwareReconnect | UiRequestAddressValidation | UiRequestSetOperation;
export type UiEventMessage = UiEvent & {
    event: typeof UI_EVENT;
};
export type ProgressEventListenerFn = <R>(type: typeof UI_REQUEST.BUNDLE_PROGRESS, cb: (event: BundleProgress<R>['payload']) => void) => void;
export type UiEventListenerFn = (type: typeof UI_EVENT, cb: (event: UiEventMessage) => void) => void;
export declare const createUiMessage: MessageFactoryFn<typeof UI_EVENT, UiEvent>;
//# sourceMappingURL=ui-request.d.ts.map