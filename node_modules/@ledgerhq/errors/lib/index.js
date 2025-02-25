"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerFirmwareNotEnoughSpaceError = exports.ManagerDeviceLockedError = exports.ManagerAppDepUninstallRequired = exports.ManagerAppDepInstallRequired = exports.ManagerAppRelyOnBTCError = exports.ManagerAppAlreadyInstalledError = exports.LedgerAPINotAvailable = exports.LedgerAPIErrorWithMessage = exports.LedgerAPIError = exports.UnknownMCU = exports.LatestMCUInstalledError = exports.InvalidAddressBecauseDestinationIsAlsoSource = exports.InvalidNonce = exports.InvalidAddress = exports.InvalidXRPTag = exports.HardResetFail = exports.FirmwareNotRecognized = exports.FeeEstimationFailed = exports.EthAppPleaseEnableContractData = exports.EnpointConfigError = exports.DeviceOnboardingStatePollingError = exports.DeviceExtractOnboardingStateError = exports.DisconnectedDeviceDuringOperation = exports.DisconnectedDevice = exports.UnresponsiveDeviceError = exports.DeviceNeedsRestart = exports.DeviceSocketNoBulkStatus = exports.DeviceSocketFail = exports.DeviceNameInvalid = exports.DeviceHalted = exports.DeviceInOSUExpected = exports.DeviceOnDashboardUnexpected = exports.DeviceOnDashboardExpected = exports.DeviceNotGenuineError = exports.DeviceGenuineSocketEarlyClose = exports.DeviceAppVerifyNotSupported = exports.CurrencyNotSupported = exports.ClaimRewardsFeesWarning = exports.CashAddrNotSupported = exports.CantOpenDevice = exports.BtcUnmatchedApp = exports.BluetoothRequired = exports.AmountRequired = exports.AccountAwaitingSendPendingOperations = exports.AccountNotSupported = exports.AccountNameRequiredError = exports.addCustomErrorDeserializer = exports.createCustomErrorClass = exports.deserializeError = exports.serializeError = void 0;
exports.DeviceShouldStayInApp = exports.TransportExchangeTimeoutError = exports.TransactionHasBeenValidatedError = exports.TransportWebUSBGestureRequired = exports.TransportRaceCondition = exports.TransportInterfaceNotAvailable = exports.TransportOpenUserCancelled = exports.ExpertModeRequired = exports.PinNotSet = exports.UserRefusedOnDevice = exports.UserRefusedAllowManager = exports.UserRefusedFirmwareUpdate = exports.UserRefusedAddress = exports.UserRefusedDeviceNameChange = exports.UpdateYourApp = exports.UpdateIncorrectSig = exports.UpdateIncorrectHash = exports.UpdateFetchFileFail = exports.UnavailableTezosOriginatedAccountSend = exports.UnavailableTezosOriginatedAccountReceive = exports.RecipientRequired = exports.MCUNotGenuineToDashboard = exports.UnexpectedBootloader = exports.TimeoutTagged = exports.RecommendUndelegation = exports.RecommendSubAccountsToEmpty = exports.PasswordIncorrectError = exports.PasswordsDontMatchError = exports.MaxFeeTooLow = exports.PriorityFeeHigherThanMaxFee = exports.PriorityFeeTooHigh = exports.PriorityFeeTooLow = exports.GasLessThanEstimate = exports.NotSupportedLegacyAddress = exports.MaybeKeepTronAccountAlive = exports.TronEmptyAccount = exports.NotEnoughGasSwap = exports.NotEnoughGas = exports.NoAccessToCamera = exports.NotEnoughBalanceBecauseDestinationNotCreated = exports.NotEnoughSpendableBalance = exports.NotEnoughBalanceInParentAccount = exports.NotEnoughBalanceToDelegate = exports.NotEnoughBalanceSwap = exports.NotEnoughBalance = exports.NoAddressesFound = exports.NetworkError = exports.NetworkDown = exports.ManagerUninstallBTCDep = exports.ManagerNotEnoughSpaceError = void 0;
exports.LockedDeviceError = exports.TransportStatusError = exports.getAltStatusMessage = exports.StatusCodes = exports.TransportError = exports.HwTransportError = exports.HwTransportErrorType = exports.DisabledTransactionBroadcastError = exports.SequenceNumberError = exports.DBNotReset = exports.DBWrongPassword = exports.NoDBPathGiven = exports.LanguageNotFound = exports.DustLimit = exports.OpReturnDataSizeLimit = exports.ReplacementTransactionUnderpriced = exports.FirmwareOrAppUpdateRequired = exports.LedgerAPI5xx = exports.LedgerAPI4xx = exports.GenuineCheckFailed = exports.PeerRemovedPairing = exports.PairingFailed = exports.SyncError = exports.PendingOperation = exports.FeeTooHigh = exports.FeeRequired = exports.FeeNotLoadedSwap = exports.FeeNotLoaded = exports.CantScanQRCode = exports.ETHAddressNonEIP = exports.WrongAppForCurrency = exports.WrongDeviceForAccountRefund = exports.WrongDeviceForAccountPayout = exports.WrongDeviceForAccount = exports.WebsocketConnectionFailed = exports.WebsocketConnectionError = void 0;
const helpers_1 = require("./helpers");
Object.defineProperty(exports, "serializeError", { enumerable: true, get: function () { return helpers_1.serializeError; } });
Object.defineProperty(exports, "deserializeError", { enumerable: true, get: function () { return helpers_1.deserializeError; } });
Object.defineProperty(exports, "createCustomErrorClass", { enumerable: true, get: function () { return helpers_1.createCustomErrorClass; } });
Object.defineProperty(exports, "addCustomErrorDeserializer", { enumerable: true, get: function () { return helpers_1.addCustomErrorDeserializer; } });
exports.AccountNameRequiredError = (0, helpers_1.createCustomErrorClass)("AccountNameRequired");
exports.AccountNotSupported = (0, helpers_1.createCustomErrorClass)("AccountNotSupported");
exports.AccountAwaitingSendPendingOperations = (0, helpers_1.createCustomErrorClass)("AccountAwaitingSendPendingOperations");
exports.AmountRequired = (0, helpers_1.createCustomErrorClass)("AmountRequired");
exports.BluetoothRequired = (0, helpers_1.createCustomErrorClass)("BluetoothRequired");
exports.BtcUnmatchedApp = (0, helpers_1.createCustomErrorClass)("BtcUnmatchedApp");
exports.CantOpenDevice = (0, helpers_1.createCustomErrorClass)("CantOpenDevice");
exports.CashAddrNotSupported = (0, helpers_1.createCustomErrorClass)("CashAddrNotSupported");
exports.ClaimRewardsFeesWarning = (0, helpers_1.createCustomErrorClass)("ClaimRewardsFeesWarning");
exports.CurrencyNotSupported = (0, helpers_1.createCustomErrorClass)("CurrencyNotSupported");
exports.DeviceAppVerifyNotSupported = (0, helpers_1.createCustomErrorClass)("DeviceAppVerifyNotSupported");
exports.DeviceGenuineSocketEarlyClose = (0, helpers_1.createCustomErrorClass)("DeviceGenuineSocketEarlyClose");
exports.DeviceNotGenuineError = (0, helpers_1.createCustomErrorClass)("DeviceNotGenuine");
exports.DeviceOnDashboardExpected = (0, helpers_1.createCustomErrorClass)("DeviceOnDashboardExpected");
exports.DeviceOnDashboardUnexpected = (0, helpers_1.createCustomErrorClass)("DeviceOnDashboardUnexpected");
exports.DeviceInOSUExpected = (0, helpers_1.createCustomErrorClass)("DeviceInOSUExpected");
exports.DeviceHalted = (0, helpers_1.createCustomErrorClass)("DeviceHalted");
exports.DeviceNameInvalid = (0, helpers_1.createCustomErrorClass)("DeviceNameInvalid");
exports.DeviceSocketFail = (0, helpers_1.createCustomErrorClass)("DeviceSocketFail");
exports.DeviceSocketNoBulkStatus = (0, helpers_1.createCustomErrorClass)("DeviceSocketNoBulkStatus");
exports.DeviceNeedsRestart = (0, helpers_1.createCustomErrorClass)("DeviceSocketNoBulkStatus");
exports.UnresponsiveDeviceError = (0, helpers_1.createCustomErrorClass)("UnresponsiveDeviceError");
exports.DisconnectedDevice = (0, helpers_1.createCustomErrorClass)("DisconnectedDevice");
exports.DisconnectedDeviceDuringOperation = (0, helpers_1.createCustomErrorClass)("DisconnectedDeviceDuringOperation");
exports.DeviceExtractOnboardingStateError = (0, helpers_1.createCustomErrorClass)("DeviceExtractOnboardingStateError");
exports.DeviceOnboardingStatePollingError = (0, helpers_1.createCustomErrorClass)("DeviceOnboardingStatePollingError");
exports.EnpointConfigError = (0, helpers_1.createCustomErrorClass)("EnpointConfig");
exports.EthAppPleaseEnableContractData = (0, helpers_1.createCustomErrorClass)("EthAppPleaseEnableContractData");
exports.FeeEstimationFailed = (0, helpers_1.createCustomErrorClass)("FeeEstimationFailed");
exports.FirmwareNotRecognized = (0, helpers_1.createCustomErrorClass)("FirmwareNotRecognized");
exports.HardResetFail = (0, helpers_1.createCustomErrorClass)("HardResetFail");
exports.InvalidXRPTag = (0, helpers_1.createCustomErrorClass)("InvalidXRPTag");
exports.InvalidAddress = (0, helpers_1.createCustomErrorClass)("InvalidAddress");
exports.InvalidNonce = (0, helpers_1.createCustomErrorClass)("InvalidNonce");
exports.InvalidAddressBecauseDestinationIsAlsoSource = (0, helpers_1.createCustomErrorClass)("InvalidAddressBecauseDestinationIsAlsoSource");
exports.LatestMCUInstalledError = (0, helpers_1.createCustomErrorClass)("LatestMCUInstalledError");
exports.UnknownMCU = (0, helpers_1.createCustomErrorClass)("UnknownMCU");
exports.LedgerAPIError = (0, helpers_1.createCustomErrorClass)("LedgerAPIError");
exports.LedgerAPIErrorWithMessage = (0, helpers_1.createCustomErrorClass)("LedgerAPIErrorWithMessage");
exports.LedgerAPINotAvailable = (0, helpers_1.createCustomErrorClass)("LedgerAPINotAvailable");
exports.ManagerAppAlreadyInstalledError = (0, helpers_1.createCustomErrorClass)("ManagerAppAlreadyInstalled");
exports.ManagerAppRelyOnBTCError = (0, helpers_1.createCustomErrorClass)("ManagerAppRelyOnBTC");
exports.ManagerAppDepInstallRequired = (0, helpers_1.createCustomErrorClass)("ManagerAppDepInstallRequired");
exports.ManagerAppDepUninstallRequired = (0, helpers_1.createCustomErrorClass)("ManagerAppDepUninstallRequired");
exports.ManagerDeviceLockedError = (0, helpers_1.createCustomErrorClass)("ManagerDeviceLocked");
exports.ManagerFirmwareNotEnoughSpaceError = (0, helpers_1.createCustomErrorClass)("ManagerFirmwareNotEnoughSpace");
exports.ManagerNotEnoughSpaceError = (0, helpers_1.createCustomErrorClass)("ManagerNotEnoughSpace");
exports.ManagerUninstallBTCDep = (0, helpers_1.createCustomErrorClass)("ManagerUninstallBTCDep");
exports.NetworkDown = (0, helpers_1.createCustomErrorClass)("NetworkDown");
exports.NetworkError = (0, helpers_1.createCustomErrorClass)("NetworkError");
exports.NoAddressesFound = (0, helpers_1.createCustomErrorClass)("NoAddressesFound");
exports.NotEnoughBalance = (0, helpers_1.createCustomErrorClass)("NotEnoughBalance");
exports.NotEnoughBalanceSwap = (0, helpers_1.createCustomErrorClass)("NotEnoughBalanceSwap");
exports.NotEnoughBalanceToDelegate = (0, helpers_1.createCustomErrorClass)("NotEnoughBalanceToDelegate");
exports.NotEnoughBalanceInParentAccount = (0, helpers_1.createCustomErrorClass)("NotEnoughBalanceInParentAccount");
exports.NotEnoughSpendableBalance = (0, helpers_1.createCustomErrorClass)("NotEnoughSpendableBalance");
exports.NotEnoughBalanceBecauseDestinationNotCreated = (0, helpers_1.createCustomErrorClass)("NotEnoughBalanceBecauseDestinationNotCreated");
exports.NoAccessToCamera = (0, helpers_1.createCustomErrorClass)("NoAccessToCamera");
exports.NotEnoughGas = (0, helpers_1.createCustomErrorClass)("NotEnoughGas");
// Error message specifically for the PTX swap flow
exports.NotEnoughGasSwap = (0, helpers_1.createCustomErrorClass)("NotEnoughGasSwap");
exports.TronEmptyAccount = (0, helpers_1.createCustomErrorClass)("TronEmptyAccount");
exports.MaybeKeepTronAccountAlive = (0, helpers_1.createCustomErrorClass)("MaybeKeepTronAccountAlive");
exports.NotSupportedLegacyAddress = (0, helpers_1.createCustomErrorClass)("NotSupportedLegacyAddress");
exports.GasLessThanEstimate = (0, helpers_1.createCustomErrorClass)("GasLessThanEstimate");
exports.PriorityFeeTooLow = (0, helpers_1.createCustomErrorClass)("PriorityFeeTooLow");
exports.PriorityFeeTooHigh = (0, helpers_1.createCustomErrorClass)("PriorityFeeTooHigh");
exports.PriorityFeeHigherThanMaxFee = (0, helpers_1.createCustomErrorClass)("PriorityFeeHigherThanMaxFee");
exports.MaxFeeTooLow = (0, helpers_1.createCustomErrorClass)("MaxFeeTooLow");
exports.PasswordsDontMatchError = (0, helpers_1.createCustomErrorClass)("PasswordsDontMatch");
exports.PasswordIncorrectError = (0, helpers_1.createCustomErrorClass)("PasswordIncorrect");
exports.RecommendSubAccountsToEmpty = (0, helpers_1.createCustomErrorClass)("RecommendSubAccountsToEmpty");
exports.RecommendUndelegation = (0, helpers_1.createCustomErrorClass)("RecommendUndelegation");
exports.TimeoutTagged = (0, helpers_1.createCustomErrorClass)("TimeoutTagged");
exports.UnexpectedBootloader = (0, helpers_1.createCustomErrorClass)("UnexpectedBootloader");
exports.MCUNotGenuineToDashboard = (0, helpers_1.createCustomErrorClass)("MCUNotGenuineToDashboard");
exports.RecipientRequired = (0, helpers_1.createCustomErrorClass)("RecipientRequired");
exports.UnavailableTezosOriginatedAccountReceive = (0, helpers_1.createCustomErrorClass)("UnavailableTezosOriginatedAccountReceive");
exports.UnavailableTezosOriginatedAccountSend = (0, helpers_1.createCustomErrorClass)("UnavailableTezosOriginatedAccountSend");
exports.UpdateFetchFileFail = (0, helpers_1.createCustomErrorClass)("UpdateFetchFileFail");
exports.UpdateIncorrectHash = (0, helpers_1.createCustomErrorClass)("UpdateIncorrectHash");
exports.UpdateIncorrectSig = (0, helpers_1.createCustomErrorClass)("UpdateIncorrectSig");
exports.UpdateYourApp = (0, helpers_1.createCustomErrorClass)("UpdateYourApp");
exports.UserRefusedDeviceNameChange = (0, helpers_1.createCustomErrorClass)("UserRefusedDeviceNameChange");
exports.UserRefusedAddress = (0, helpers_1.createCustomErrorClass)("UserRefusedAddress");
exports.UserRefusedFirmwareUpdate = (0, helpers_1.createCustomErrorClass)("UserRefusedFirmwareUpdate");
exports.UserRefusedAllowManager = (0, helpers_1.createCustomErrorClass)("UserRefusedAllowManager");
exports.UserRefusedOnDevice = (0, helpers_1.createCustomErrorClass)("UserRefusedOnDevice"); // TODO rename because it's just for transaction refusal
exports.PinNotSet = (0, helpers_1.createCustomErrorClass)("PinNotSet");
exports.ExpertModeRequired = (0, helpers_1.createCustomErrorClass)("ExpertModeRequired");
exports.TransportOpenUserCancelled = (0, helpers_1.createCustomErrorClass)("TransportOpenUserCancelled");
exports.TransportInterfaceNotAvailable = (0, helpers_1.createCustomErrorClass)("TransportInterfaceNotAvailable");
exports.TransportRaceCondition = (0, helpers_1.createCustomErrorClass)("TransportRaceCondition");
exports.TransportWebUSBGestureRequired = (0, helpers_1.createCustomErrorClass)("TransportWebUSBGestureRequired");
exports.TransactionHasBeenValidatedError = (0, helpers_1.createCustomErrorClass)("TransactionHasBeenValidatedError");
exports.TransportExchangeTimeoutError = (0, helpers_1.createCustomErrorClass)("TransportExchangeTimeoutError");
exports.DeviceShouldStayInApp = (0, helpers_1.createCustomErrorClass)("DeviceShouldStayInApp");
exports.WebsocketConnectionError = (0, helpers_1.createCustomErrorClass)("WebsocketConnectionError");
exports.WebsocketConnectionFailed = (0, helpers_1.createCustomErrorClass)("WebsocketConnectionFailed");
exports.WrongDeviceForAccount = (0, helpers_1.createCustomErrorClass)("WrongDeviceForAccount");
exports.WrongDeviceForAccountPayout = (0, helpers_1.createCustomErrorClass)("WrongDeviceForAccountPayout");
exports.WrongDeviceForAccountRefund = (0, helpers_1.createCustomErrorClass)("WrongDeviceForAccountRefund");
exports.WrongAppForCurrency = (0, helpers_1.createCustomErrorClass)("WrongAppForCurrency");
exports.ETHAddressNonEIP = (0, helpers_1.createCustomErrorClass)("ETHAddressNonEIP");
exports.CantScanQRCode = (0, helpers_1.createCustomErrorClass)("CantScanQRCode");
exports.FeeNotLoaded = (0, helpers_1.createCustomErrorClass)("FeeNotLoaded");
exports.FeeNotLoadedSwap = (0, helpers_1.createCustomErrorClass)("FeeNotLoadedSwap");
exports.FeeRequired = (0, helpers_1.createCustomErrorClass)("FeeRequired");
exports.FeeTooHigh = (0, helpers_1.createCustomErrorClass)("FeeTooHigh");
exports.PendingOperation = (0, helpers_1.createCustomErrorClass)("PendingOperation");
exports.SyncError = (0, helpers_1.createCustomErrorClass)("SyncError");
exports.PairingFailed = (0, helpers_1.createCustomErrorClass)("PairingFailed");
exports.PeerRemovedPairing = (0, helpers_1.createCustomErrorClass)("PeerRemovedPairing");
exports.GenuineCheckFailed = (0, helpers_1.createCustomErrorClass)("GenuineCheckFailed");
exports.LedgerAPI4xx = (0, helpers_1.createCustomErrorClass)("LedgerAPI4xx");
exports.LedgerAPI5xx = (0, helpers_1.createCustomErrorClass)("LedgerAPI5xx");
exports.FirmwareOrAppUpdateRequired = (0, helpers_1.createCustomErrorClass)("FirmwareOrAppUpdateRequired");
// SpeedUp / Cancel EVM tx
exports.ReplacementTransactionUnderpriced = (0, helpers_1.createCustomErrorClass)("ReplacementTransactionUnderpriced");
// Bitcoin family
exports.OpReturnDataSizeLimit = (0, helpers_1.createCustomErrorClass)("OpReturnSizeLimit");
exports.DustLimit = (0, helpers_1.createCustomErrorClass)("DustLimit");
// Language
exports.LanguageNotFound = (0, helpers_1.createCustomErrorClass)("LanguageNotFound");
// db stuff, no need to translate
exports.NoDBPathGiven = (0, helpers_1.createCustomErrorClass)("NoDBPathGiven");
exports.DBWrongPassword = (0, helpers_1.createCustomErrorClass)("DBWrongPassword");
exports.DBNotReset = (0, helpers_1.createCustomErrorClass)("DBNotReset");
exports.SequenceNumberError = (0, helpers_1.createCustomErrorClass)("SequenceNumberError");
exports.DisabledTransactionBroadcastError = (0, helpers_1.createCustomErrorClass)("DisabledTransactionBroadcastError");
/**
 * Type of a Transport error used to represent all equivalent errors coming from all possible implementation of Transport
 */
var HwTransportErrorType;
(function (HwTransportErrorType) {
    HwTransportErrorType["Unknown"] = "Unknown";
    HwTransportErrorType["LocationServicesDisabled"] = "LocationServicesDisabled";
    HwTransportErrorType["LocationServicesUnauthorized"] = "LocationServicesUnauthorized";
    HwTransportErrorType["BluetoothScanStartFailed"] = "BluetoothScanStartFailed";
})(HwTransportErrorType || (exports.HwTransportErrorType = HwTransportErrorType = {}));
/**
 * Represents an error coming from the usage of any Transport implementation.
 *
 * Needed to map a specific implementation error into an error that
 * can be managed by any code unaware of the specific Transport implementation
 * that was used.
 */
class HwTransportError extends Error {
    constructor(type, message) {
        super(message);
        this.name = "HwTransportError";
        this.type = type;
        // Needed as long as we target < ES6
        Object.setPrototypeOf(this, HwTransportError.prototype);
    }
}
exports.HwTransportError = HwTransportError;
/**
 * TransportError is used for any generic transport errors.
 * e.g. Error thrown when data received by exchanges are incorrect or if exchanged failed to communicate with the device for various reason.
 */
class TransportError extends Error {
    constructor(message, id) {
        const name = "TransportError";
        super(message || name);
        this.name = name;
        this.message = message;
        this.stack = new Error(message).stack;
        this.id = id;
    }
}
exports.TransportError = TransportError;
(0, helpers_1.addCustomErrorDeserializer)("TransportError", e => new TransportError(e.message, e.id));
exports.StatusCodes = {
    ACCESS_CONDITION_NOT_FULFILLED: 0x9804,
    ALGORITHM_NOT_SUPPORTED: 0x9484,
    CLA_NOT_SUPPORTED: 0x6e00,
    CODE_BLOCKED: 0x9840,
    CODE_NOT_INITIALIZED: 0x9802,
    COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 0x6981,
    CONDITIONS_OF_USE_NOT_SATISFIED: 0x6985,
    CONTRADICTION_INVALIDATION: 0x9810,
    CONTRADICTION_SECRET_CODE_STATUS: 0x9808,
    DEVICE_IN_RECOVERY_MODE: 0x662f,
    CUSTOM_IMAGE_EMPTY: 0x662e,
    FILE_ALREADY_EXISTS: 0x6a89,
    FILE_NOT_FOUND: 0x9404,
    GP_AUTH_FAILED: 0x6300,
    HALTED: 0x6faa,
    INCONSISTENT_FILE: 0x9408,
    INCORRECT_DATA: 0x6a80,
    INCORRECT_LENGTH: 0x6700,
    INCORRECT_P1_P2: 0x6b00,
    INS_NOT_SUPPORTED: 0x6d00,
    DEVICE_NOT_ONBOARDED: 0x6d07,
    DEVICE_NOT_ONBOARDED_2: 0x6611,
    INVALID_KCV: 0x9485,
    INVALID_OFFSET: 0x9402,
    LICENSING: 0x6f42,
    LOCKED_DEVICE: 0x5515,
    MAX_VALUE_REACHED: 0x9850,
    MEMORY_PROBLEM: 0x9240,
    MISSING_CRITICAL_PARAMETER: 0x6800,
    NO_EF_SELECTED: 0x9400,
    NOT_ENOUGH_MEMORY_SPACE: 0x6a84,
    OK: 0x9000,
    PIN_REMAINING_ATTEMPTS: 0x63c0,
    REFERENCED_DATA_NOT_FOUND: 0x6a88,
    SECURITY_STATUS_NOT_SATISFIED: 0x6982,
    TECHNICAL_PROBLEM: 0x6f00,
    UNKNOWN_APDU: 0x6d02,
    USER_REFUSED_ON_DEVICE: 0x5501,
    NOT_ENOUGH_SPACE: 0x5102,
    APP_NOT_FOUND_OR_INVALID_CONTEXT: 0x5123,
    INVALID_APP_NAME_LENGTH: 0x670a,
    GEN_AES_KEY_FAILED: 0x5419,
    INTERNAL_CRYPTO_OPERATION_FAILED: 0x541a,
    INTERNAL_COMPUTE_AES_CMAC_FAILED: 0x541b,
    ENCRYPT_APP_STORAGE_FAILED: 0x541c,
    INVALID_BACKUP_STATE: 0x6642,
    PIN_NOT_SET: 0x5502,
    INVALID_BACKUP_LENGTH: 0x6733,
    INVALID_RESTORE_STATE: 0x6643,
    INVALID_CHUNK_LENGTH: 0x6734,
    INVALID_BACKUP_HEADER: 0x684a,
    // Not documented:
    TRUSTCHAIN_WRONG_SEED: 0xb007,
};
function getAltStatusMessage(code) {
    switch (code) {
        // improve text of most common errors
        case 0x6700:
            return "Incorrect length";
        case 0x6800:
            return "Missing critical parameter";
        case 0x6982:
            return "Security not satisfied (dongle locked or have invalid access rights)";
        case 0x6985:
            return "Condition of use not satisfied (denied by the user?)";
        case 0x6a80:
            return "Invalid data received";
        case 0x6b00:
            return "Invalid parameter received";
        case 0x5515:
            return "Locked device";
    }
    if (0x6f00 <= code && code <= 0x6fff) {
        return "Internal error, please report";
    }
}
exports.getAltStatusMessage = getAltStatusMessage;
/**
 * Error thrown when a device returned a non success status.
 * the error.statusCode is one of the `StatusCodes` exported by this library.
 */
class TransportStatusError extends Error {
    /**
     * @param statusCode The error status code coming from a Transport implementation
     * @param options containing:
     *  - canBeMappedToChildError: enable the mapping of TransportStatusError to an error extending/inheriting from it
     *  . Ex: LockedDeviceError. Default to true.
     */
    constructor(statusCode, { canBeMappedToChildError = true } = {}) {
        const statusText = Object.keys(exports.StatusCodes).find(k => exports.StatusCodes[k] === statusCode) || "UNKNOWN_ERROR";
        const smsg = getAltStatusMessage(statusCode) || statusText;
        const statusCodeStr = statusCode.toString(16);
        const message = `Ledger device: ${smsg} (0x${statusCodeStr})`;
        super(message);
        this.name = "TransportStatusError";
        this.statusCode = statusCode;
        this.statusText = statusText;
        Object.setPrototypeOf(this, TransportStatusError.prototype);
        // Maps to a LockedDeviceError
        if (canBeMappedToChildError && statusCode === exports.StatusCodes.LOCKED_DEVICE) {
            return new LockedDeviceError(message);
        }
    }
}
exports.TransportStatusError = TransportStatusError;
class LockedDeviceError extends TransportStatusError {
    constructor(message) {
        super(exports.StatusCodes.LOCKED_DEVICE, { canBeMappedToChildError: false });
        if (message) {
            this.message = message;
        }
        this.name = "LockedDeviceError";
        Object.setPrototypeOf(this, LockedDeviceError.prototype);
    }
}
exports.LockedDeviceError = LockedDeviceError;
(0, helpers_1.addCustomErrorDeserializer)("TransportStatusError", e => new TransportStatusError(e.statusCode));
//# sourceMappingURL=index.js.map