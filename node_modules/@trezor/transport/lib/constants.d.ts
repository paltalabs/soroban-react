export declare const CONFIGURATION_ID = 1;
export declare const INTERFACE_ID = 0;
export declare const ENDPOINT_ID = 1;
export declare const DEBUGLINK_INTERFACE_ID = 1;
export declare const DEBUGLINK_ENDPOINT_ID = 2;
export declare const T1_HID_VENDOR = 21324;
export declare const T1_HID_PRODUCT = 1;
export declare const WEBUSB_BOOTLOADER_PRODUCT = 21440;
export declare const TREZOR_USB_DESCRIPTORS: {
    vendorId: number;
    productId: number;
}[];
export declare const ACTION_TIMEOUT = 10000;
export declare const TRANSPORT: {
    readonly START: "transport-start";
    readonly ERROR: "transport-error";
    readonly DEVICE_CONNECTED: "transport-device_connected";
    readonly DEVICE_DISCONNECTED: "transport-device_disconnected";
    readonly DEVICE_SESSION_CHANGED: "transport-device_session_changed";
    readonly DEVICE_REQUEST_RELEASE: "transport-device_request_release";
    readonly DISABLE_WEBUSB: "transport-disable_webusb";
    readonly REQUEST_DEVICE: "transport-request_device";
    readonly GET_INFO: "transport-get_info";
};
//# sourceMappingURL=constants.d.ts.map