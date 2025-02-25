"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LIBUSB_ERROR_MESSAGE = exports.serializeError = exports.TypedError = exports.TrezorError = exports.ERROR_CODES = void 0;
exports.ERROR_CODES = {
    Init_NotInitialized: 'TrezorConnect not initialized',
    Init_AlreadyInitialized: 'TrezorConnect has been already initialized',
    Init_IframeBlocked: 'Iframe blocked',
    Init_IframeTimeout: 'Iframe timeout',
    Init_ManifestMissing: 'Manifest not set. Read more at https://github.com/trezor/trezor-suite/blob/develop/docs/packages/connect/index.md',
    Popup_ConnectionMissing: 'Unable to establish connection with iframe',
    Transport_Missing: 'Transport is missing',
    Transport_InvalidProtobuf: '',
    Method_InvalidPackage: 'This package is not suitable to work with browser. Use @trezor/connect-web package instead',
    Method_InvalidParameter: '',
    Method_NotAllowed: 'Method not allowed for this configuration',
    Method_PermissionsNotGranted: 'Permissions not granted',
    Method_Cancel: 'Cancelled',
    Method_Interrupted: 'Popup closed',
    Method_UnknownCoin: 'Coin not found',
    Method_AddressNotMatch: 'Addresses do not match',
    Method_FirmwareUpdate_DownloadFailed: 'Failed to download firmware binary',
    Method_Discovery_BundleException: '',
    Method_Override: 'override',
    Method_NoResponse: 'Call resolved without response',
    Backend_NotSupported: 'BlockchainLink settings not found in coins.json',
    Backend_WorkerMissing: '',
    Backend_Disconnected: 'Backend disconnected',
    Backend_Invalid: 'Invalid backend',
    Backend_Error: '',
    Runtime: '',
    Device_NotFound: 'Device not found',
    Device_InitializeFailed: '',
    Device_FwException: '',
    Device_ModeException: '',
    Device_Disconnected: 'Device disconnected',
    Device_UsedElsewhere: 'Device is used in another window',
    Device_InvalidState: 'Passphrase is incorrect',
    Device_CallInProgress: 'Device call in progress',
    Device_MultipleNotSupported: 'Multiple devices are not supported',
    Device_MissingCapability: 'Device is missing capability',
    Device_MissingCapabilityBtcOnly: 'Device is missing capability (BTC only)',
    Failure_ActionCancelled: 'Action cancelled by user',
    Failure_FirmwareError: 'Firmware installation failed',
    Failure_UnknownCode: 'Unknown error',
    Failure_PinCancelled: 'PIN cancelled',
    Failure_PinInvalid: 'PIN invalid',
    Failure_PinMismatch: 'PIN mismatch',
    Failure_WipeCodeMismatch: 'Wipe code mismatch',
    Deeplink_VersionMismatch: 'Not compatible with current version of the app',
};
class TrezorError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.message = message;
    }
}
exports.TrezorError = TrezorError;
const TypedError = (id, message) => new TrezorError(id, message || exports.ERROR_CODES[id]);
exports.TypedError = TypedError;
const serializeError = (payload) => {
    if (payload && payload.error instanceof Error) {
        return { error: payload.error.message, code: payload.error.code };
    }
    if (payload instanceof TrezorError) {
        return { error: payload.message, code: payload.code };
    }
    return payload;
};
exports.serializeError = serializeError;
exports.LIBUSB_ERROR_MESSAGE = 'LIBUSB_ERROR';
//# sourceMappingURL=errors.js.map