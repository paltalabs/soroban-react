import type { ConnectSettingsWeb } from '@trezor/connect';
type ConnectWebExtraMethods = {
    renderWebUSBButton: (className?: string) => void;
    disableWebUSB: () => void;
    requestWebUSBDevice: () => void;
};
declare const TrezorConnect: Omit<import("@trezor/connect").TrezorConnect, "init"> & {
    init: import("@trezor/connect/lib/types/api/init").InitType<ConnectSettingsWeb>;
} & ConnectWebExtraMethods;
export default TrezorConnect;
export * from '@trezor/connect/lib/exports';
//# sourceMappingURL=index.d.ts.map