import { serializeError, deserializeError, createCustomErrorClass, addCustomErrorDeserializer, LedgerErrorConstructor } from "./helpers";
export { serializeError, deserializeError, createCustomErrorClass, addCustomErrorDeserializer };
export declare const AccountNameRequiredError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const AccountNotSupported: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const AccountAwaitingSendPendingOperations: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const AmountRequired: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const BluetoothRequired: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const BtcUnmatchedApp: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const CantOpenDevice: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const CashAddrNotSupported: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const ClaimRewardsFeesWarning: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const CurrencyNotSupported: LedgerErrorConstructor<{
    currencyName: string;
}>;
export declare const DeviceAppVerifyNotSupported: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DeviceGenuineSocketEarlyClose: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DeviceNotGenuineError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DeviceOnDashboardExpected: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DeviceOnDashboardUnexpected: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DeviceInOSUExpected: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DeviceHalted: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DeviceNameInvalid: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DeviceSocketFail: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DeviceSocketNoBulkStatus: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DeviceNeedsRestart: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const UnresponsiveDeviceError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DisconnectedDevice: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DisconnectedDeviceDuringOperation: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DeviceExtractOnboardingStateError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DeviceOnboardingStatePollingError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const EnpointConfigError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const EthAppPleaseEnableContractData: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const FeeEstimationFailed: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const FirmwareNotRecognized: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const HardResetFail: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const InvalidXRPTag: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const InvalidAddress: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const InvalidNonce: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const InvalidAddressBecauseDestinationIsAlsoSource: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const LatestMCUInstalledError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const UnknownMCU: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const LedgerAPIError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const LedgerAPIErrorWithMessage: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const LedgerAPINotAvailable: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const ManagerAppAlreadyInstalledError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const ManagerAppRelyOnBTCError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const ManagerAppDepInstallRequired: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const ManagerAppDepUninstallRequired: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const ManagerDeviceLockedError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const ManagerFirmwareNotEnoughSpaceError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const ManagerNotEnoughSpaceError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const ManagerUninstallBTCDep: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const NetworkDown: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const NetworkError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const NoAddressesFound: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const NotEnoughBalance: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const NotEnoughBalanceSwap: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const NotEnoughBalanceToDelegate: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const NotEnoughBalanceInParentAccount: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const NotEnoughSpendableBalance: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const NotEnoughBalanceBecauseDestinationNotCreated: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const NoAccessToCamera: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const NotEnoughGas: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const NotEnoughGasSwap: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const TronEmptyAccount: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const MaybeKeepTronAccountAlive: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const NotSupportedLegacyAddress: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const GasLessThanEstimate: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const PriorityFeeTooLow: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const PriorityFeeTooHigh: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const PriorityFeeHigherThanMaxFee: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const MaxFeeTooLow: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const PasswordsDontMatchError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const PasswordIncorrectError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const RecommendSubAccountsToEmpty: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const RecommendUndelegation: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const TimeoutTagged: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const UnexpectedBootloader: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const MCUNotGenuineToDashboard: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const RecipientRequired: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const UnavailableTezosOriginatedAccountReceive: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const UnavailableTezosOriginatedAccountSend: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const UpdateFetchFileFail: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const UpdateIncorrectHash: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const UpdateIncorrectSig: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const UpdateYourApp: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const UserRefusedDeviceNameChange: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const UserRefusedAddress: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const UserRefusedFirmwareUpdate: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const UserRefusedAllowManager: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const UserRefusedOnDevice: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const PinNotSet: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const ExpertModeRequired: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const TransportOpenUserCancelled: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const TransportInterfaceNotAvailable: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const TransportRaceCondition: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const TransportWebUSBGestureRequired: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const TransactionHasBeenValidatedError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const TransportExchangeTimeoutError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DeviceShouldStayInApp: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const WebsocketConnectionError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const WebsocketConnectionFailed: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const WrongDeviceForAccount: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const WrongDeviceForAccountPayout: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const WrongDeviceForAccountRefund: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const WrongAppForCurrency: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const ETHAddressNonEIP: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const CantScanQRCode: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const FeeNotLoaded: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const FeeNotLoadedSwap: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const FeeRequired: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const FeeTooHigh: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const PendingOperation: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const SyncError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const PairingFailed: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const PeerRemovedPairing: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const GenuineCheckFailed: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
type NetworkType = {
    status: number;
    url: string | undefined;
    method: string;
};
export declare const LedgerAPI4xx: LedgerErrorConstructor<NetworkType>;
export declare const LedgerAPI5xx: LedgerErrorConstructor<NetworkType>;
export declare const FirmwareOrAppUpdateRequired: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const ReplacementTransactionUnderpriced: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const OpReturnDataSizeLimit: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DustLimit: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const LanguageNotFound: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const NoDBPathGiven: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DBWrongPassword: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DBNotReset: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const SequenceNumberError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export declare const DisabledTransactionBroadcastError: LedgerErrorConstructor<{
    [key: string]: unknown;
}>;
export type CustomErrorClassType = ReturnType<typeof createCustomErrorClass>;
/**
 * Type of a Transport error used to represent all equivalent errors coming from all possible implementation of Transport
 */
export declare enum HwTransportErrorType {
    Unknown = "Unknown",
    LocationServicesDisabled = "LocationServicesDisabled",
    LocationServicesUnauthorized = "LocationServicesUnauthorized",
    BluetoothScanStartFailed = "BluetoothScanStartFailed"
}
/**
 * Represents an error coming from the usage of any Transport implementation.
 *
 * Needed to map a specific implementation error into an error that
 * can be managed by any code unaware of the specific Transport implementation
 * that was used.
 */
export declare class HwTransportError extends Error {
    type: HwTransportErrorType;
    constructor(type: HwTransportErrorType, message: string);
}
/**
 * TransportError is used for any generic transport errors.
 * e.g. Error thrown when data received by exchanges are incorrect or if exchanged failed to communicate with the device for various reason.
 */
export declare class TransportError extends Error {
    id: string;
    constructor(message: string, id: string);
}
export declare const StatusCodes: {
    ACCESS_CONDITION_NOT_FULFILLED: number;
    ALGORITHM_NOT_SUPPORTED: number;
    CLA_NOT_SUPPORTED: number;
    CODE_BLOCKED: number;
    CODE_NOT_INITIALIZED: number;
    COMMAND_INCOMPATIBLE_FILE_STRUCTURE: number;
    CONDITIONS_OF_USE_NOT_SATISFIED: number;
    CONTRADICTION_INVALIDATION: number;
    CONTRADICTION_SECRET_CODE_STATUS: number;
    DEVICE_IN_RECOVERY_MODE: number;
    CUSTOM_IMAGE_EMPTY: number;
    FILE_ALREADY_EXISTS: number;
    FILE_NOT_FOUND: number;
    GP_AUTH_FAILED: number;
    HALTED: number;
    INCONSISTENT_FILE: number;
    INCORRECT_DATA: number;
    INCORRECT_LENGTH: number;
    INCORRECT_P1_P2: number;
    INS_NOT_SUPPORTED: number;
    DEVICE_NOT_ONBOARDED: number;
    DEVICE_NOT_ONBOARDED_2: number;
    INVALID_KCV: number;
    INVALID_OFFSET: number;
    LICENSING: number;
    LOCKED_DEVICE: number;
    MAX_VALUE_REACHED: number;
    MEMORY_PROBLEM: number;
    MISSING_CRITICAL_PARAMETER: number;
    NO_EF_SELECTED: number;
    NOT_ENOUGH_MEMORY_SPACE: number;
    OK: number;
    PIN_REMAINING_ATTEMPTS: number;
    REFERENCED_DATA_NOT_FOUND: number;
    SECURITY_STATUS_NOT_SATISFIED: number;
    TECHNICAL_PROBLEM: number;
    UNKNOWN_APDU: number;
    USER_REFUSED_ON_DEVICE: number;
    NOT_ENOUGH_SPACE: number;
    APP_NOT_FOUND_OR_INVALID_CONTEXT: number;
    INVALID_APP_NAME_LENGTH: number;
    GEN_AES_KEY_FAILED: number;
    INTERNAL_CRYPTO_OPERATION_FAILED: number;
    INTERNAL_COMPUTE_AES_CMAC_FAILED: number;
    ENCRYPT_APP_STORAGE_FAILED: number;
    INVALID_BACKUP_STATE: number;
    PIN_NOT_SET: number;
    INVALID_BACKUP_LENGTH: number;
    INVALID_RESTORE_STATE: number;
    INVALID_CHUNK_LENGTH: number;
    INVALID_BACKUP_HEADER: number;
    TRUSTCHAIN_WRONG_SEED: number;
};
export declare function getAltStatusMessage(code: number): string | undefined | null;
/**
 * Error thrown when a device returned a non success status.
 * the error.statusCode is one of the `StatusCodes` exported by this library.
 */
export declare class TransportStatusError extends Error {
    statusCode: number;
    statusText: string;
    /**
     * @param statusCode The error status code coming from a Transport implementation
     * @param options containing:
     *  - canBeMappedToChildError: enable the mapping of TransportStatusError to an error extending/inheriting from it
     *  . Ex: LockedDeviceError. Default to true.
     */
    constructor(statusCode: number, { canBeMappedToChildError }?: {
        canBeMappedToChildError?: boolean;
    });
}
export declare class LockedDeviceError extends TransportStatusError {
    constructor(message?: string);
}
export type TransportStatusErrorClassType = typeof TransportStatusError | typeof LockedDeviceError;
//# sourceMappingURL=index.d.ts.map