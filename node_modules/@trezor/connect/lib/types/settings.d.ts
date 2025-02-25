import type { BlockchainSettings } from '@trezor/blockchain-link';
import type { Transport } from '@trezor/transport';
export type { SystemInfo } from '@trezor/connect-common';
export interface Manifest {
    appUrl: string;
    email: string;
}
export type Proxy = BlockchainSettings['proxy'];
type KnownTransport = Exclude<Transport['name'], 'NativeUsbTransport' | 'BluetoothTransport'>;
export interface ConnectSettingsPublic {
    manifest?: Manifest;
    connectSrc?: string;
    debug?: boolean;
    popup?: boolean;
    transportReconnect?: boolean;
    transports?: (KnownTransport | Transport | (new (...args: any[]) => Transport))[];
    pendingTransportEvent?: boolean;
    lazyLoad?: boolean;
    interactionTimeout?: number;
    trustedHost: boolean;
    _sessionsBackgroundUrl?: null | string;
    binFilesBaseUrl?: string;
    enableFirmwareHashCheck?: boolean;
}
export interface ConnectSettingsInternal {
    origin?: string;
    configSrc: string;
    iframeSrc: string;
    popupSrc: string;
    webusbSrc: string;
    version: string;
    priority: number;
    extension?: string;
    env: 'node' | 'web' | 'webextension' | 'electron' | 'react-native';
    timestamp: number;
    proxy?: Proxy;
    sharedLogger?: boolean;
    useCoreInPopup?: boolean;
}
export interface ConnectSettingsWeb {
    hostLabel?: string;
    hostIcon?: string;
    coreMode?: 'auto' | 'popup' | 'iframe' | 'deeplink' | 'suite-desktop';
}
export interface ConnectSettingsWebextension {
    _extendWebextensionLifetime?: boolean;
}
export interface ConnectSettingsMobile {
    deeplinkUrl: string;
    deeplinkOpen?: (url: string) => void;
    deeplinkCallbackUrl?: string;
}
export type ConnectSettings = ConnectSettingsPublic & ConnectSettingsInternal & ConnectSettingsWeb & ConnectSettingsWebextension & ConnectSettingsMobile;
//# sourceMappingURL=settings.d.ts.map