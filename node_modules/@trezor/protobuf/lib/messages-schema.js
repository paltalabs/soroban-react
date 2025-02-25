"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxRequest = exports.TxRequestSerializedType = exports.TxRequestDetailsType = exports.RequestType = exports.EnumEnum_RequestType = exports.Enum_RequestType = exports.SignTx = exports.CoinJoinRequest = exports.VerifyMessage = exports.MessageSignature = exports.SignMessage = exports.OwnershipId = exports.GetOwnershipId = exports.Address = exports.GetAddress = exports.PublicKey = exports.GetPublicKey = exports.MultisigRedeemScriptType = exports.HDNodePathType = exports.HDNodeType = exports.EnumAmountUnit = exports.AmountUnit = exports.EnumDecredStakingSpendType = exports.DecredStakingSpendType = exports.OutputScriptType = exports.EnumEnum_OutputScriptType = exports.Enum_OutputScriptType = exports.InputScriptType = exports.EnumEnum_InputScriptType = exports.Enum_InputScriptType = exports.BinanceSignedTx = exports.BinanceCancelMsg = exports.BinanceOrderMsg = exports.EnumBinanceTimeInForce = exports.BinanceTimeInForce = exports.EnumBinanceOrderSide = exports.BinanceOrderSide = exports.EnumBinanceOrderType = exports.BinanceOrderType = exports.BinanceTransferMsg = exports.BinanceInputOutput = exports.BinanceCoin = exports.BinanceTxRequest = exports.BinanceSignTx = exports.BinancePublicKey = exports.BinanceGetPublicKey = exports.BinanceAddress = exports.BinanceGetAddress = exports.EnumDeviceModelInternal = exports.DeviceModelInternal = void 0;
exports.CardanoPoolRelayType = exports.EnumCardanoDRepType = exports.CardanoDRepType = exports.EnumCardanoCertificateType = exports.CardanoCertificateType = exports.EnumCardanoTxOutputSerializationFormat = exports.CardanoTxOutputSerializationFormat = exports.EnumCardanoNativeScriptHashDisplayFormat = exports.CardanoNativeScriptHashDisplayFormat = exports.EnumCardanoNativeScriptType = exports.CardanoNativeScriptType = exports.EnumCardanoAddressType = exports.CardanoAddressType = exports.EnumCardanoDerivationType = exports.CardanoDerivationType = exports.ProdTestT1 = exports.FirmwareUpload = exports.FirmwareRequest = exports.FirmwareErase = exports.AuthorizeCoinJoin = exports.OwnershipProof = exports.GetOwnershipProof = exports.TxAckPrevExtraData = exports.TxAckPrevExtraDataWrapper = exports.TxAckPrevOutput = exports.TxAckPrevOutputWrapper = exports.TxAckPrevInput = exports.TxAckPrevInputWrapper = exports.TxAckPrevMeta = exports.TxAckOutput = exports.TxAckOutputWrapper = exports.TxAckInput = exports.TxAckInputWrapper = exports.TxAck = exports.TxAckResponse = exports.TxAckPaymentRequest = exports.PaymentRequestMemo = exports.CoinPurchaseMemo = exports.RefundMemo = exports.TextMemo = exports.PrevOutput = exports.PrevInput = exports.PrevTx = exports.TxOutput = exports.TxOutputType = exports.ChangeOutputScriptType = exports.TxOutputBinType = exports.TxInput = exports.TxInputType = exports.InternalInputScriptType = void 0;
exports.Failure = exports.EnumFailureType = exports.FailureType = exports.Success = exports.CardanoSignTxFinished = exports.CardanoTxBodyHash = exports.CardanoTxHostAck = exports.CardanoTxWitnessResponse = exports.CardanoTxWitnessRequest = exports.CardanoTxAuxiliaryDataSupplement = exports.CardanoTxItemAck = exports.CardanoTxReferenceInput = exports.CardanoTxRequiredSigner = exports.CardanoTxCollateralInput = exports.CardanoTxMint = exports.CardanoTxAuxiliaryData = exports.CardanoCVoteRegistrationParametersType = exports.CardanoCVoteRegistrationDelegation = exports.CardanoTxWithdrawal = exports.CardanoTxCertificate = exports.CardanoDRep = exports.CardanoPoolParametersType = exports.CardanoPoolMetadataType = exports.CardanoPoolRelayParameters = exports.CardanoPoolOwner = exports.CardanoTxReferenceScriptChunk = exports.CardanoTxInlineDatumChunk = exports.CardanoToken = exports.CardanoAssetGroup = exports.CardanoTxOutput = exports.CardanoTxInput = exports.CardanoSignTxInit = exports.CardanoPublicKey = exports.CardanoGetPublicKey = exports.CardanoAddress = exports.CardanoGetAddress = exports.CardanoAddressParametersType = exports.CardanoNativeScriptHash = exports.CardanoGetNativeScriptHash = exports.CardanoNativeScript = exports.CardanoBlockchainPointerType = exports.EnumCardanoTxWitnessType = exports.CardanoTxWitnessType = exports.EnumCardanoTxSigningMode = exports.CardanoTxSigningMode = exports.EnumCardanoCVoteRegistrationFormat = exports.CardanoCVoteRegistrationFormat = exports.EnumCardanoTxAuxiliaryDataSupplementType = exports.CardanoTxAuxiliaryDataSupplementType = exports.EnumCardanoPoolRelayType = void 0;
exports.EosActionUpdateAuth = exports.EosActionVoteProducer = exports.EosActionSellRam = exports.EosActionBuyRamBytes = exports.EosActionBuyRam = exports.EosActionRefund = exports.EosActionUndelegate = exports.EosActionDelegate = exports.EosActionTransfer = exports.EosActionCommon = exports.EosAuthorization = exports.EosAuthorizationWait = exports.EosAuthorizationAccount = exports.EosAuthorizationKey = exports.EosPermissionLevel = exports.EosAsset = exports.EosTxActionRequest = exports.EosSignTx = exports.EosTxHeader = exports.EosPublicKey = exports.EosGetPublicKey = exports.DebugLinkOptigaSetSecMax = exports.DebugLinkResetDebugEvents = exports.EnumDebugWaitType = exports.DebugWaitType = exports.EnumDebugPhysicalButton = exports.DebugPhysicalButton = exports.EnumDebugButton = exports.DebugButton = exports.ECDHSessionKey = exports.GetECDHSessionKey = exports.SignedIdentity = exports.SignIdentity = exports.IdentityType = exports.CipheredKeyValue = exports.CipherKeyValue = exports.Deprecated_PassphraseStateAck = exports.Deprecated_PassphraseStateRequest = exports.PassphraseAck = exports.PassphraseRequest = exports.PinMatrixAck = exports.PinMatrixRequest = exports.PinMatrixRequestType = exports.EnumEnum_PinMatrixRequestType = exports.Enum_PinMatrixRequestType = exports.ButtonAck = exports.ButtonRequest = exports.ButtonRequestType = exports.EnumEnum_ButtonRequestType = exports.Enum_ButtonRequestType = void 0;
exports.Enum_BackupAvailability = exports.GetFeatures = exports.Initialize = exports.HomescreenFormat = exports.EnumEnum_HomescreenFormat = exports.Enum_HomescreenFormat = exports.DisplayRotation = exports.EnumEnum_DisplayRotation = exports.Enum_DisplayRotation = exports.SafetyCheckLevel = exports.EnumEnum_SafetyCheckLevel = exports.Enum_SafetyCheckLevel = exports.BackupType = exports.EnumEnum_BackupType = exports.Enum_BackupType = exports.EthereumTypedDataSignature = exports.EthereumSignTypedHash = exports.EthereumVerifyMessage = exports.EthereumMessageSignature = exports.EthereumSignMessage = exports.EthereumTxAck = exports.EthereumTxRequest = exports.EthereumSignTxEIP1559 = exports.EthereumAccessList = exports.EthereumSignTx = exports.EthereumAddress = exports.EthereumGetAddress = exports.EthereumPublicKey = exports.EthereumGetPublicKey = exports.EthereumTypedDataValueAck = exports.EthereumTypedDataValueRequest = exports.EthereumTypedDataStructAck = exports.EthereumStructMember = exports.EthereumFieldType = exports.EnumEthereumDataType = exports.EthereumDataType = exports.EthereumTypedDataStructRequest = exports.EthereumSignTypedData = exports.EthereumDefinitions = exports.EthereumTokenInfo = exports.EthereumNetworkInfo = exports.EnumEthereumDefinitionType = exports.EthereumDefinitionType = exports.EosSignedTx = exports.EosTxActionAck = exports.EosActionUnknown = exports.EosActionNewAccount = exports.EosActionUnlinkAuth = exports.EosActionLinkAuth = exports.EosActionDeleteAuth = void 0;
exports.GetNextU2FCounter = exports.SetU2FCounter = exports.WordAck = exports.WordRequest = exports.WordRequestType = exports.EnumEnum_WordRequestType = exports.Enum_WordRequestType = exports.EntropyAck = exports.EntropyRequest = exports.BackupDevice = exports.Slip39Group = exports.ResetDevice = exports.LoadDevice = exports.WipeDevice = exports.AuthenticityProof = exports.AuthenticateDevice = exports.FirmwareHash = exports.GetFirmwareHash = exports.Entropy = exports.GetEntropy = exports.Cancel = exports.Ping = exports.SdProtect = exports.EnumSdProtectOperationType = exports.SdProtectOperationType = exports.ChangeWipeCode = exports.ChangePin = exports.ApplyFlags = exports.TranslationDataAck = exports.TranslationDataRequest = exports.ChangeLanguage = exports.ApplySettings = exports.EndSession = exports.SetBusy = exports.LockDevice = exports.Features = exports.RecoveryDevice = exports.RecoveryType = exports.EnumEnum_RecoveryType = exports.Enum_RecoveryType = exports.EnumRecoveryDeviceInputMethod = exports.RecoveryDeviceInputMethod = exports.Capability = exports.EnumEnum_Capability = exports.Enum_Capability = exports.RecoveryStatus = exports.EnumEnum_RecoveryStatus = exports.Enum_RecoveryStatus = exports.BackupAvailability = exports.EnumEnum_BackupAvailability = void 0;
exports.SolanaSignTx = exports.SolanaTxAdditionalInfo = exports.SolanaTxTokenAccountInfo = exports.SolanaAddress = exports.SolanaGetAddress = exports.SolanaPublicKey = exports.SolanaGetPublicKey = exports.RippleSignedTx = exports.RippleSignTx = exports.RipplePayment = exports.RippleAddress = exports.RippleGetAddress = exports.NEMDecryptedMessage = exports.NEMDecryptMessage = exports.NEMSignedTx = exports.NEMSignTx = exports.NEMImportanceTransfer = exports.EnumNEMImportanceTransferMode = exports.NEMImportanceTransferMode = exports.NEMAggregateModification = exports.NEMCosignatoryModification = exports.EnumNEMModificationType = exports.NEMModificationType = exports.NEMMosaicSupplyChange = exports.EnumNEMSupplyChangeType = exports.NEMSupplyChangeType = exports.NEMMosaicCreation = exports.NEMMosaicDefinition = exports.EnumNEMMosaicLevy = exports.NEMMosaicLevy = exports.NEMProvisionNamespace = exports.NEMTransfer = exports.NEMMosaic = exports.NEMTransactionCommon = exports.NEMAddress = exports.NEMGetAddress = exports.SetBrightness = exports.UnlockBootloader = exports.ShowDeviceTutorial = exports.UnlockedPathRequest = exports.UnlockPath = exports.Nonce = exports.GetNonce = exports.RebootToBootloader = exports.EnumBootCommand = exports.BootCommand = exports.CancelAuthorization = exports.PreauthorizedRequest = exports.DoPreauthorized = exports.NextU2FCounter = void 0;
exports.MessageType = exports.TezosSignedTx = exports.TezosSignTx = exports.TezosBallotOp = exports.EnumTezosBallotType = exports.TezosBallotType = exports.TezosProposalOp = exports.TezosDelegationOp = exports.TezosOriginationOp = exports.TezosTransactionOp = exports.TezosParametersManager = exports.TezosManagerTransfer = exports.TezosRevealOp = exports.TezosContractID = exports.EnumTezosContractType = exports.TezosContractType = exports.TezosPublicKey = exports.TezosGetPublicKey = exports.TezosAddress = exports.TezosGetAddress = exports.StellarSignedTx = exports.StellarClaimClaimableBalanceOp = exports.StellarBumpSequenceOp = exports.StellarManageDataOp = exports.StellarAccountMergeOp = exports.StellarAllowTrustOp = exports.StellarChangeTrustOp = exports.StellarSetOptionsOp = exports.EnumStellarSignerType = exports.StellarSignerType = exports.StellarCreatePassiveSellOfferOp = exports.StellarManageBuyOfferOp = exports.StellarManageSellOfferOp = exports.StellarPathPaymentStrictSendOp = exports.StellarPathPaymentStrictReceiveOp = exports.StellarCreateAccountOp = exports.StellarPaymentOp = exports.StellarTxOpRequest = exports.StellarSignTx = exports.EnumStellarMemoType = exports.StellarMemoType = exports.StellarAddress = exports.StellarGetAddress = exports.StellarAsset = exports.EnumStellarAssetType = exports.StellarAssetType = exports.SolanaTxSignature = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
var DeviceModelInternal;
(function (DeviceModelInternal) {
    DeviceModelInternal["T1B1"] = "T1B1";
    DeviceModelInternal["T2T1"] = "T2T1";
    DeviceModelInternal["T2B1"] = "T2B1";
    DeviceModelInternal["T3B1"] = "T3B1";
    DeviceModelInternal["T3T1"] = "T3T1";
    DeviceModelInternal["T3W1"] = "T3W1";
})(DeviceModelInternal || (exports.DeviceModelInternal = DeviceModelInternal = {}));
exports.EnumDeviceModelInternal = schema_utils_1.Type.Enum(DeviceModelInternal);
exports.BinanceGetAddress = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    show_display: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'BinanceGetAddress' });
exports.BinanceAddress = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
}, { $id: 'BinanceAddress' });
exports.BinanceGetPublicKey = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    show_display: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'BinanceGetPublicKey' });
exports.BinancePublicKey = schema_utils_1.Type.Object({
    public_key: schema_utils_1.Type.String(),
}, { $id: 'BinancePublicKey' });
exports.BinanceSignTx = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    msg_count: schema_utils_1.Type.Number(),
    account_number: schema_utils_1.Type.Number(),
    chain_id: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    memo: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    sequence: schema_utils_1.Type.Number(),
    source: schema_utils_1.Type.Number(),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'BinanceSignTx' });
exports.BinanceTxRequest = schema_utils_1.Type.Object({}, { $id: 'BinanceTxRequest' });
exports.BinanceCoin = schema_utils_1.Type.Object({
    amount: schema_utils_1.Type.Uint(),
    denom: schema_utils_1.Type.String(),
}, { $id: 'BinanceCoin' });
exports.BinanceInputOutput = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
    coins: schema_utils_1.Type.Array(exports.BinanceCoin),
}, { $id: 'BinanceInputOutput' });
exports.BinanceTransferMsg = schema_utils_1.Type.Object({
    inputs: schema_utils_1.Type.Array(exports.BinanceInputOutput),
    outputs: schema_utils_1.Type.Array(exports.BinanceInputOutput),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'BinanceTransferMsg' });
var BinanceOrderType;
(function (BinanceOrderType) {
    BinanceOrderType[BinanceOrderType["OT_UNKNOWN"] = 0] = "OT_UNKNOWN";
    BinanceOrderType[BinanceOrderType["MARKET"] = 1] = "MARKET";
    BinanceOrderType[BinanceOrderType["LIMIT"] = 2] = "LIMIT";
    BinanceOrderType[BinanceOrderType["OT_RESERVED"] = 3] = "OT_RESERVED";
})(BinanceOrderType || (exports.BinanceOrderType = BinanceOrderType = {}));
exports.EnumBinanceOrderType = schema_utils_1.Type.Enum(BinanceOrderType);
var BinanceOrderSide;
(function (BinanceOrderSide) {
    BinanceOrderSide[BinanceOrderSide["SIDE_UNKNOWN"] = 0] = "SIDE_UNKNOWN";
    BinanceOrderSide[BinanceOrderSide["BUY"] = 1] = "BUY";
    BinanceOrderSide[BinanceOrderSide["SELL"] = 2] = "SELL";
})(BinanceOrderSide || (exports.BinanceOrderSide = BinanceOrderSide = {}));
exports.EnumBinanceOrderSide = schema_utils_1.Type.Enum(BinanceOrderSide);
var BinanceTimeInForce;
(function (BinanceTimeInForce) {
    BinanceTimeInForce[BinanceTimeInForce["TIF_UNKNOWN"] = 0] = "TIF_UNKNOWN";
    BinanceTimeInForce[BinanceTimeInForce["GTE"] = 1] = "GTE";
    BinanceTimeInForce[BinanceTimeInForce["TIF_RESERVED"] = 2] = "TIF_RESERVED";
    BinanceTimeInForce[BinanceTimeInForce["IOC"] = 3] = "IOC";
})(BinanceTimeInForce || (exports.BinanceTimeInForce = BinanceTimeInForce = {}));
exports.EnumBinanceTimeInForce = schema_utils_1.Type.Enum(BinanceTimeInForce);
exports.BinanceOrderMsg = schema_utils_1.Type.Object({
    id: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    ordertype: exports.EnumBinanceOrderType,
    price: schema_utils_1.Type.Number(),
    quantity: schema_utils_1.Type.Number(),
    sender: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    side: exports.EnumBinanceOrderSide,
    symbol: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    timeinforce: exports.EnumBinanceTimeInForce,
}, { $id: 'BinanceOrderMsg' });
exports.BinanceCancelMsg = schema_utils_1.Type.Object({
    refid: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    sender: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    symbol: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'BinanceCancelMsg' });
exports.BinanceSignedTx = schema_utils_1.Type.Object({
    signature: schema_utils_1.Type.String(),
    public_key: schema_utils_1.Type.String(),
}, { $id: 'BinanceSignedTx' });
var Enum_InputScriptType;
(function (Enum_InputScriptType) {
    Enum_InputScriptType[Enum_InputScriptType["SPENDADDRESS"] = 0] = "SPENDADDRESS";
    Enum_InputScriptType[Enum_InputScriptType["SPENDMULTISIG"] = 1] = "SPENDMULTISIG";
    Enum_InputScriptType[Enum_InputScriptType["EXTERNAL"] = 2] = "EXTERNAL";
    Enum_InputScriptType[Enum_InputScriptType["SPENDWITNESS"] = 3] = "SPENDWITNESS";
    Enum_InputScriptType[Enum_InputScriptType["SPENDP2SHWITNESS"] = 4] = "SPENDP2SHWITNESS";
    Enum_InputScriptType[Enum_InputScriptType["SPENDTAPROOT"] = 5] = "SPENDTAPROOT";
})(Enum_InputScriptType || (exports.Enum_InputScriptType = Enum_InputScriptType = {}));
exports.EnumEnum_InputScriptType = schema_utils_1.Type.Enum(Enum_InputScriptType);
exports.InputScriptType = schema_utils_1.Type.KeyOfEnum(Enum_InputScriptType, { $id: 'InputScriptType' });
var Enum_OutputScriptType;
(function (Enum_OutputScriptType) {
    Enum_OutputScriptType[Enum_OutputScriptType["PAYTOADDRESS"] = 0] = "PAYTOADDRESS";
    Enum_OutputScriptType[Enum_OutputScriptType["PAYTOSCRIPTHASH"] = 1] = "PAYTOSCRIPTHASH";
    Enum_OutputScriptType[Enum_OutputScriptType["PAYTOMULTISIG"] = 2] = "PAYTOMULTISIG";
    Enum_OutputScriptType[Enum_OutputScriptType["PAYTOOPRETURN"] = 3] = "PAYTOOPRETURN";
    Enum_OutputScriptType[Enum_OutputScriptType["PAYTOWITNESS"] = 4] = "PAYTOWITNESS";
    Enum_OutputScriptType[Enum_OutputScriptType["PAYTOP2SHWITNESS"] = 5] = "PAYTOP2SHWITNESS";
    Enum_OutputScriptType[Enum_OutputScriptType["PAYTOTAPROOT"] = 6] = "PAYTOTAPROOT";
})(Enum_OutputScriptType || (exports.Enum_OutputScriptType = Enum_OutputScriptType = {}));
exports.EnumEnum_OutputScriptType = schema_utils_1.Type.Enum(Enum_OutputScriptType);
exports.OutputScriptType = schema_utils_1.Type.KeyOfEnum(Enum_OutputScriptType, { $id: 'OutputScriptType' });
var DecredStakingSpendType;
(function (DecredStakingSpendType) {
    DecredStakingSpendType[DecredStakingSpendType["SSGen"] = 0] = "SSGen";
    DecredStakingSpendType[DecredStakingSpendType["SSRTX"] = 1] = "SSRTX";
})(DecredStakingSpendType || (exports.DecredStakingSpendType = DecredStakingSpendType = {}));
exports.EnumDecredStakingSpendType = schema_utils_1.Type.Enum(DecredStakingSpendType);
var AmountUnit;
(function (AmountUnit) {
    AmountUnit[AmountUnit["BITCOIN"] = 0] = "BITCOIN";
    AmountUnit[AmountUnit["MILLIBITCOIN"] = 1] = "MILLIBITCOIN";
    AmountUnit[AmountUnit["MICROBITCOIN"] = 2] = "MICROBITCOIN";
    AmountUnit[AmountUnit["SATOSHI"] = 3] = "SATOSHI";
})(AmountUnit || (exports.AmountUnit = AmountUnit = {}));
exports.EnumAmountUnit = schema_utils_1.Type.Enum(AmountUnit);
exports.HDNodeType = schema_utils_1.Type.Object({
    depth: schema_utils_1.Type.Number(),
    fingerprint: schema_utils_1.Type.Number(),
    child_num: schema_utils_1.Type.Number(),
    chain_code: schema_utils_1.Type.String(),
    private_key: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    public_key: schema_utils_1.Type.String(),
}, { $id: 'HDNodeType' });
exports.HDNodePathType = schema_utils_1.Type.Object({
    node: schema_utils_1.Type.Union([exports.HDNodeType, schema_utils_1.Type.String()]),
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
}, { $id: 'HDNodePathType' });
exports.MultisigRedeemScriptType = schema_utils_1.Type.Object({
    pubkeys: schema_utils_1.Type.Array(exports.HDNodePathType),
    signatures: schema_utils_1.Type.Array(schema_utils_1.Type.String()),
    m: schema_utils_1.Type.Number(),
    nodes: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.HDNodeType)),
    address_n: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(schema_utils_1.Type.Number())),
}, { $id: 'MultisigRedeemScriptType' });
exports.GetPublicKey = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    ecdsa_curve_name: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    show_display: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    coin_name: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    script_type: schema_utils_1.Type.Optional(exports.InputScriptType),
    ignore_xpub_magic: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'GetPublicKey' });
exports.PublicKey = schema_utils_1.Type.Object({
    node: exports.HDNodeType,
    xpub: schema_utils_1.Type.String(),
    root_fingerprint: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    descriptor: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'PublicKey' });
exports.GetAddress = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    coin_name: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    show_display: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    multisig: schema_utils_1.Type.Optional(exports.MultisigRedeemScriptType),
    script_type: schema_utils_1.Type.Optional(exports.InputScriptType),
    ignore_xpub_magic: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'GetAddress' });
exports.Address = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
    mac: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'Address' });
exports.GetOwnershipId = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    coin_name: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    multisig: schema_utils_1.Type.Optional(exports.MultisigRedeemScriptType),
    script_type: schema_utils_1.Type.Optional(exports.InputScriptType),
}, { $id: 'GetOwnershipId' });
exports.OwnershipId = schema_utils_1.Type.Object({
    ownership_id: schema_utils_1.Type.String(),
}, { $id: 'OwnershipId' });
exports.SignMessage = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    message: schema_utils_1.Type.String(),
    coin_name: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    script_type: schema_utils_1.Type.Optional(exports.InputScriptType),
    no_script_type: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'SignMessage' });
exports.MessageSignature = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
    signature: schema_utils_1.Type.String(),
}, { $id: 'MessageSignature' });
exports.VerifyMessage = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
    signature: schema_utils_1.Type.String(),
    message: schema_utils_1.Type.String(),
    coin_name: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'VerifyMessage' });
exports.CoinJoinRequest = schema_utils_1.Type.Object({
    fee_rate: schema_utils_1.Type.Number(),
    no_fee_threshold: schema_utils_1.Type.Number(),
    min_registrable_amount: schema_utils_1.Type.Number(),
    mask_public_key: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    signature: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'CoinJoinRequest' });
exports.SignTx = schema_utils_1.Type.Object({
    outputs_count: schema_utils_1.Type.Number(),
    inputs_count: schema_utils_1.Type.Number(),
    coin_name: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    version: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    lock_time: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    expiry: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    overwintered: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    version_group_id: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    timestamp: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    branch_id: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    amount_unit: schema_utils_1.Type.Optional(exports.EnumAmountUnit),
    decred_staking_ticket: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    serialize: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    coinjoin_request: schema_utils_1.Type.Optional(exports.CoinJoinRequest),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'SignTx' });
var Enum_RequestType;
(function (Enum_RequestType) {
    Enum_RequestType[Enum_RequestType["TXINPUT"] = 0] = "TXINPUT";
    Enum_RequestType[Enum_RequestType["TXOUTPUT"] = 1] = "TXOUTPUT";
    Enum_RequestType[Enum_RequestType["TXMETA"] = 2] = "TXMETA";
    Enum_RequestType[Enum_RequestType["TXFINISHED"] = 3] = "TXFINISHED";
    Enum_RequestType[Enum_RequestType["TXEXTRADATA"] = 4] = "TXEXTRADATA";
    Enum_RequestType[Enum_RequestType["TXORIGINPUT"] = 5] = "TXORIGINPUT";
    Enum_RequestType[Enum_RequestType["TXORIGOUTPUT"] = 6] = "TXORIGOUTPUT";
    Enum_RequestType[Enum_RequestType["TXPAYMENTREQ"] = 7] = "TXPAYMENTREQ";
})(Enum_RequestType || (exports.Enum_RequestType = Enum_RequestType = {}));
exports.EnumEnum_RequestType = schema_utils_1.Type.Enum(Enum_RequestType);
exports.RequestType = schema_utils_1.Type.KeyOfEnum(Enum_RequestType, { $id: 'RequestType' });
exports.TxRequestDetailsType = schema_utils_1.Type.Object({
    request_index: schema_utils_1.Type.Number(),
    tx_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    extra_data_len: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    extra_data_offset: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
}, { $id: 'TxRequestDetailsType' });
exports.TxRequestSerializedType = schema_utils_1.Type.Object({
    signature_index: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    signature: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    serialized_tx: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'TxRequestSerializedType' });
exports.TxRequest = schema_utils_1.Type.Object({
    request_type: exports.RequestType,
    details: exports.TxRequestDetailsType,
    serialized: schema_utils_1.Type.Optional(exports.TxRequestSerializedType),
}, { $id: 'TxRequest' });
exports.InternalInputScriptType = schema_utils_1.Type.Exclude(exports.InputScriptType, schema_utils_1.Type.Literal('EXTERNAL'), {
    $id: 'InternalInputScriptType',
});
const CommonTxInputType = schema_utils_1.Type.Object({
    prev_hash: schema_utils_1.Type.String(),
    prev_index: schema_utils_1.Type.Number(),
    amount: schema_utils_1.Type.Uint(),
    sequence: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    multisig: schema_utils_1.Type.Optional(exports.MultisigRedeemScriptType),
    decred_tree: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    orig_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    orig_index: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    decred_staking_spend: schema_utils_1.Type.Optional(exports.EnumDecredStakingSpendType),
    script_pubkey: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    coinjoin_flags: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    script_sig: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    witness: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    ownership_proof: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    commitment_data: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'CommonTxInputType' });
exports.TxInputType = schema_utils_1.Type.Union([
    schema_utils_1.Type.Intersect([
        CommonTxInputType,
        schema_utils_1.Type.Object({
            address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
            script_type: schema_utils_1.Type.Optional(exports.InternalInputScriptType),
        }),
    ]),
    schema_utils_1.Type.Intersect([
        CommonTxInputType,
        schema_utils_1.Type.Object({
            address_n: schema_utils_1.Type.Optional(schema_utils_1.Type.Undefined()),
            script_type: schema_utils_1.Type.Literal('EXTERNAL'),
            script_pubkey: schema_utils_1.Type.String(),
        }),
    ]),
], { $id: 'TxInputType' });
exports.TxInput = (0, schema_utils_1.CloneType)(exports.TxInputType, { $id: 'TxInput' });
exports.TxOutputBinType = schema_utils_1.Type.Object({
    amount: schema_utils_1.Type.Uint(),
    script_pubkey: schema_utils_1.Type.String(),
    decred_script_version: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
}, { $id: 'TxOutputBinType' });
exports.ChangeOutputScriptType = schema_utils_1.Type.Exclude(exports.OutputScriptType, schema_utils_1.Type.Literal('PAYTOOPRETURN'), { $id: 'ChangeOutputScriptType' });
exports.TxOutputType = schema_utils_1.Type.Union([
    schema_utils_1.Type.Object({
        address: schema_utils_1.Type.String(),
        address_n: schema_utils_1.Type.Optional(schema_utils_1.Type.Undefined()),
        script_type: schema_utils_1.Type.Literal('PAYTOADDRESS'),
        amount: schema_utils_1.Type.Uint(),
        multisig: schema_utils_1.Type.Optional(exports.MultisigRedeemScriptType),
        orig_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
        orig_index: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
        payment_req_index: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    }),
    schema_utils_1.Type.Object({
        address: schema_utils_1.Type.Optional(schema_utils_1.Type.Undefined()),
        address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
        script_type: schema_utils_1.Type.Optional(exports.ChangeOutputScriptType),
        amount: schema_utils_1.Type.Uint(),
        multisig: schema_utils_1.Type.Optional(exports.MultisigRedeemScriptType),
        orig_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
        orig_index: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
        payment_req_index: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    }),
    schema_utils_1.Type.Object({
        address: schema_utils_1.Type.String(),
        address_n: schema_utils_1.Type.Optional(schema_utils_1.Type.Undefined()),
        script_type: schema_utils_1.Type.Optional(exports.ChangeOutputScriptType),
        amount: schema_utils_1.Type.Uint(),
        multisig: schema_utils_1.Type.Optional(exports.MultisigRedeemScriptType),
        orig_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
        orig_index: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
        payment_req_index: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    }),
    schema_utils_1.Type.Object({
        address: schema_utils_1.Type.Optional(schema_utils_1.Type.Undefined()),
        address_n: schema_utils_1.Type.Optional(schema_utils_1.Type.Undefined()),
        amount: schema_utils_1.Type.Union([schema_utils_1.Type.Literal('0'), schema_utils_1.Type.Literal(0)]),
        op_return_data: schema_utils_1.Type.String(),
        script_type: schema_utils_1.Type.Literal('PAYTOOPRETURN'),
        orig_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
        orig_index: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
        payment_req_index: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    }),
], { $id: 'TxOutputType' });
exports.TxOutput = (0, schema_utils_1.CloneType)(exports.TxOutputType, { $id: 'TxOutput' });
exports.PrevTx = schema_utils_1.Type.Object({
    version: schema_utils_1.Type.Number(),
    lock_time: schema_utils_1.Type.Number(),
    inputs_count: schema_utils_1.Type.Number(),
    outputs_count: schema_utils_1.Type.Number(),
    extra_data_len: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    expiry: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    version_group_id: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    timestamp: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    branch_id: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
}, { $id: 'PrevTx' });
exports.PrevInput = schema_utils_1.Type.Object({
    prev_hash: schema_utils_1.Type.String(),
    prev_index: schema_utils_1.Type.Number(),
    script_sig: schema_utils_1.Type.String(),
    sequence: schema_utils_1.Type.Number(),
    decred_tree: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
}, { $id: 'PrevInput' });
exports.PrevOutput = schema_utils_1.Type.Object({
    amount: schema_utils_1.Type.Uint(),
    script_pubkey: schema_utils_1.Type.String(),
    decred_script_version: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
}, { $id: 'PrevOutput' });
exports.TextMemo = schema_utils_1.Type.Object({
    text: schema_utils_1.Type.String(),
}, { $id: 'TextMemo' });
exports.RefundMemo = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
    mac: schema_utils_1.Type.String(),
}, { $id: 'RefundMemo' });
exports.CoinPurchaseMemo = schema_utils_1.Type.Object({
    coin_type: schema_utils_1.Type.Number(),
    amount: schema_utils_1.Type.Uint(),
    address: schema_utils_1.Type.String(),
    mac: schema_utils_1.Type.String(),
}, { $id: 'CoinPurchaseMemo' });
exports.PaymentRequestMemo = schema_utils_1.Type.Object({
    text_memo: schema_utils_1.Type.Optional(exports.TextMemo),
    refund_memo: schema_utils_1.Type.Optional(exports.RefundMemo),
    coin_purchase_memo: schema_utils_1.Type.Optional(exports.CoinPurchaseMemo),
}, { $id: 'PaymentRequestMemo' });
exports.TxAckPaymentRequest = schema_utils_1.Type.Object({
    nonce: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    recipient_name: schema_utils_1.Type.String(),
    memos: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.PaymentRequestMemo)),
    amount: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    signature: schema_utils_1.Type.String(),
}, { $id: 'TxAckPaymentRequest' });
exports.TxAckResponse = schema_utils_1.Type.Union([
    schema_utils_1.Type.Object({
        inputs: schema_utils_1.Type.Array(schema_utils_1.Type.Union([exports.TxInputType, exports.PrevInput])),
    }),
    schema_utils_1.Type.Object({
        bin_outputs: schema_utils_1.Type.Array(exports.TxOutputBinType),
    }),
    schema_utils_1.Type.Object({
        outputs: schema_utils_1.Type.Array(exports.TxOutputType),
    }),
    schema_utils_1.Type.Object({
        extra_data: schema_utils_1.Type.String(),
    }),
    schema_utils_1.Type.Object({
        version: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
        lock_time: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
        inputs_cnt: schema_utils_1.Type.Number(),
        outputs_cnt: schema_utils_1.Type.Number(),
        extra_data: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
        extra_data_len: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
        timestamp: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
        version_group_id: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
        expiry: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
        branch_id: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    }),
], { $id: 'TxAckResponse' });
exports.TxAck = schema_utils_1.Type.Object({
    tx: exports.TxAckResponse,
}, { $id: 'TxAck' });
exports.TxAckInputWrapper = schema_utils_1.Type.Object({
    input: exports.TxInput,
}, { $id: 'TxAckInputWrapper' });
exports.TxAckInput = schema_utils_1.Type.Object({
    tx: exports.TxAckInputWrapper,
}, { $id: 'TxAckInput' });
exports.TxAckOutputWrapper = schema_utils_1.Type.Object({
    output: exports.TxOutput,
}, { $id: 'TxAckOutputWrapper' });
exports.TxAckOutput = schema_utils_1.Type.Object({
    tx: exports.TxAckOutputWrapper,
}, { $id: 'TxAckOutput' });
exports.TxAckPrevMeta = schema_utils_1.Type.Object({
    tx: exports.PrevTx,
}, { $id: 'TxAckPrevMeta' });
exports.TxAckPrevInputWrapper = schema_utils_1.Type.Object({
    input: exports.PrevInput,
}, { $id: 'TxAckPrevInputWrapper' });
exports.TxAckPrevInput = schema_utils_1.Type.Object({
    tx: exports.TxAckPrevInputWrapper,
}, { $id: 'TxAckPrevInput' });
exports.TxAckPrevOutputWrapper = schema_utils_1.Type.Object({
    output: exports.PrevOutput,
}, { $id: 'TxAckPrevOutputWrapper' });
exports.TxAckPrevOutput = schema_utils_1.Type.Object({
    tx: exports.TxAckPrevOutputWrapper,
}, { $id: 'TxAckPrevOutput' });
exports.TxAckPrevExtraDataWrapper = schema_utils_1.Type.Object({
    extra_data_chunk: schema_utils_1.Type.String(),
}, { $id: 'TxAckPrevExtraDataWrapper' });
exports.TxAckPrevExtraData = schema_utils_1.Type.Object({
    tx: exports.TxAckPrevExtraDataWrapper,
}, { $id: 'TxAckPrevExtraData' });
exports.GetOwnershipProof = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    coin_name: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    script_type: schema_utils_1.Type.Optional(exports.InputScriptType),
    multisig: schema_utils_1.Type.Optional(exports.MultisigRedeemScriptType),
    user_confirmation: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    ownership_ids: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(schema_utils_1.Type.String())),
    commitment_data: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'GetOwnershipProof' });
exports.OwnershipProof = schema_utils_1.Type.Object({
    ownership_proof: schema_utils_1.Type.String(),
    signature: schema_utils_1.Type.String(),
}, { $id: 'OwnershipProof' });
exports.AuthorizeCoinJoin = schema_utils_1.Type.Object({
    coordinator: schema_utils_1.Type.String(),
    max_rounds: schema_utils_1.Type.Number(),
    max_coordinator_fee_rate: schema_utils_1.Type.Number(),
    max_fee_per_kvbyte: schema_utils_1.Type.Number(),
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    coin_name: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    script_type: schema_utils_1.Type.Optional(exports.InputScriptType),
    amount_unit: schema_utils_1.Type.Optional(exports.EnumAmountUnit),
}, { $id: 'AuthorizeCoinJoin' });
exports.FirmwareErase = schema_utils_1.Type.Object({
    length: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
}, { $id: 'FirmwareErase' });
exports.FirmwareRequest = schema_utils_1.Type.Object({
    offset: schema_utils_1.Type.Number(),
    length: schema_utils_1.Type.Number(),
}, { $id: 'FirmwareRequest' });
exports.FirmwareUpload = schema_utils_1.Type.Object({
    payload: schema_utils_1.Type.Union([schema_utils_1.Type.Buffer(), schema_utils_1.Type.ArrayBuffer()]),
    hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'FirmwareUpload' });
exports.ProdTestT1 = schema_utils_1.Type.Object({
    payload: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'ProdTestT1' });
var CardanoDerivationType;
(function (CardanoDerivationType) {
    CardanoDerivationType[CardanoDerivationType["LEDGER"] = 0] = "LEDGER";
    CardanoDerivationType[CardanoDerivationType["ICARUS"] = 1] = "ICARUS";
    CardanoDerivationType[CardanoDerivationType["ICARUS_TREZOR"] = 2] = "ICARUS_TREZOR";
})(CardanoDerivationType || (exports.CardanoDerivationType = CardanoDerivationType = {}));
exports.EnumCardanoDerivationType = schema_utils_1.Type.Enum(CardanoDerivationType);
var CardanoAddressType;
(function (CardanoAddressType) {
    CardanoAddressType[CardanoAddressType["BASE"] = 0] = "BASE";
    CardanoAddressType[CardanoAddressType["BASE_SCRIPT_KEY"] = 1] = "BASE_SCRIPT_KEY";
    CardanoAddressType[CardanoAddressType["BASE_KEY_SCRIPT"] = 2] = "BASE_KEY_SCRIPT";
    CardanoAddressType[CardanoAddressType["BASE_SCRIPT_SCRIPT"] = 3] = "BASE_SCRIPT_SCRIPT";
    CardanoAddressType[CardanoAddressType["POINTER"] = 4] = "POINTER";
    CardanoAddressType[CardanoAddressType["POINTER_SCRIPT"] = 5] = "POINTER_SCRIPT";
    CardanoAddressType[CardanoAddressType["ENTERPRISE"] = 6] = "ENTERPRISE";
    CardanoAddressType[CardanoAddressType["ENTERPRISE_SCRIPT"] = 7] = "ENTERPRISE_SCRIPT";
    CardanoAddressType[CardanoAddressType["BYRON"] = 8] = "BYRON";
    CardanoAddressType[CardanoAddressType["REWARD"] = 14] = "REWARD";
    CardanoAddressType[CardanoAddressType["REWARD_SCRIPT"] = 15] = "REWARD_SCRIPT";
})(CardanoAddressType || (exports.CardanoAddressType = CardanoAddressType = {}));
exports.EnumCardanoAddressType = schema_utils_1.Type.Enum(CardanoAddressType);
var CardanoNativeScriptType;
(function (CardanoNativeScriptType) {
    CardanoNativeScriptType[CardanoNativeScriptType["PUB_KEY"] = 0] = "PUB_KEY";
    CardanoNativeScriptType[CardanoNativeScriptType["ALL"] = 1] = "ALL";
    CardanoNativeScriptType[CardanoNativeScriptType["ANY"] = 2] = "ANY";
    CardanoNativeScriptType[CardanoNativeScriptType["N_OF_K"] = 3] = "N_OF_K";
    CardanoNativeScriptType[CardanoNativeScriptType["INVALID_BEFORE"] = 4] = "INVALID_BEFORE";
    CardanoNativeScriptType[CardanoNativeScriptType["INVALID_HEREAFTER"] = 5] = "INVALID_HEREAFTER";
})(CardanoNativeScriptType || (exports.CardanoNativeScriptType = CardanoNativeScriptType = {}));
exports.EnumCardanoNativeScriptType = schema_utils_1.Type.Enum(CardanoNativeScriptType);
var CardanoNativeScriptHashDisplayFormat;
(function (CardanoNativeScriptHashDisplayFormat) {
    CardanoNativeScriptHashDisplayFormat[CardanoNativeScriptHashDisplayFormat["HIDE"] = 0] = "HIDE";
    CardanoNativeScriptHashDisplayFormat[CardanoNativeScriptHashDisplayFormat["BECH32"] = 1] = "BECH32";
    CardanoNativeScriptHashDisplayFormat[CardanoNativeScriptHashDisplayFormat["POLICY_ID"] = 2] = "POLICY_ID";
})(CardanoNativeScriptHashDisplayFormat || (exports.CardanoNativeScriptHashDisplayFormat = CardanoNativeScriptHashDisplayFormat = {}));
exports.EnumCardanoNativeScriptHashDisplayFormat = schema_utils_1.Type.Enum(CardanoNativeScriptHashDisplayFormat);
var CardanoTxOutputSerializationFormat;
(function (CardanoTxOutputSerializationFormat) {
    CardanoTxOutputSerializationFormat[CardanoTxOutputSerializationFormat["ARRAY_LEGACY"] = 0] = "ARRAY_LEGACY";
    CardanoTxOutputSerializationFormat[CardanoTxOutputSerializationFormat["MAP_BABBAGE"] = 1] = "MAP_BABBAGE";
})(CardanoTxOutputSerializationFormat || (exports.CardanoTxOutputSerializationFormat = CardanoTxOutputSerializationFormat = {}));
exports.EnumCardanoTxOutputSerializationFormat = schema_utils_1.Type.Enum(CardanoTxOutputSerializationFormat);
var CardanoCertificateType;
(function (CardanoCertificateType) {
    CardanoCertificateType[CardanoCertificateType["STAKE_REGISTRATION"] = 0] = "STAKE_REGISTRATION";
    CardanoCertificateType[CardanoCertificateType["STAKE_DEREGISTRATION"] = 1] = "STAKE_DEREGISTRATION";
    CardanoCertificateType[CardanoCertificateType["STAKE_DELEGATION"] = 2] = "STAKE_DELEGATION";
    CardanoCertificateType[CardanoCertificateType["STAKE_POOL_REGISTRATION"] = 3] = "STAKE_POOL_REGISTRATION";
    CardanoCertificateType[CardanoCertificateType["STAKE_REGISTRATION_CONWAY"] = 7] = "STAKE_REGISTRATION_CONWAY";
    CardanoCertificateType[CardanoCertificateType["STAKE_DEREGISTRATION_CONWAY"] = 8] = "STAKE_DEREGISTRATION_CONWAY";
    CardanoCertificateType[CardanoCertificateType["VOTE_DELEGATION"] = 9] = "VOTE_DELEGATION";
})(CardanoCertificateType || (exports.CardanoCertificateType = CardanoCertificateType = {}));
exports.EnumCardanoCertificateType = schema_utils_1.Type.Enum(CardanoCertificateType);
var CardanoDRepType;
(function (CardanoDRepType) {
    CardanoDRepType[CardanoDRepType["KEY_HASH"] = 0] = "KEY_HASH";
    CardanoDRepType[CardanoDRepType["SCRIPT_HASH"] = 1] = "SCRIPT_HASH";
    CardanoDRepType[CardanoDRepType["ABSTAIN"] = 2] = "ABSTAIN";
    CardanoDRepType[CardanoDRepType["NO_CONFIDENCE"] = 3] = "NO_CONFIDENCE";
})(CardanoDRepType || (exports.CardanoDRepType = CardanoDRepType = {}));
exports.EnumCardanoDRepType = schema_utils_1.Type.Enum(CardanoDRepType);
var CardanoPoolRelayType;
(function (CardanoPoolRelayType) {
    CardanoPoolRelayType[CardanoPoolRelayType["SINGLE_HOST_IP"] = 0] = "SINGLE_HOST_IP";
    CardanoPoolRelayType[CardanoPoolRelayType["SINGLE_HOST_NAME"] = 1] = "SINGLE_HOST_NAME";
    CardanoPoolRelayType[CardanoPoolRelayType["MULTIPLE_HOST_NAME"] = 2] = "MULTIPLE_HOST_NAME";
})(CardanoPoolRelayType || (exports.CardanoPoolRelayType = CardanoPoolRelayType = {}));
exports.EnumCardanoPoolRelayType = schema_utils_1.Type.Enum(CardanoPoolRelayType);
var CardanoTxAuxiliaryDataSupplementType;
(function (CardanoTxAuxiliaryDataSupplementType) {
    CardanoTxAuxiliaryDataSupplementType[CardanoTxAuxiliaryDataSupplementType["NONE"] = 0] = "NONE";
    CardanoTxAuxiliaryDataSupplementType[CardanoTxAuxiliaryDataSupplementType["CVOTE_REGISTRATION_SIGNATURE"] = 1] = "CVOTE_REGISTRATION_SIGNATURE";
})(CardanoTxAuxiliaryDataSupplementType || (exports.CardanoTxAuxiliaryDataSupplementType = CardanoTxAuxiliaryDataSupplementType = {}));
exports.EnumCardanoTxAuxiliaryDataSupplementType = schema_utils_1.Type.Enum(CardanoTxAuxiliaryDataSupplementType);
var CardanoCVoteRegistrationFormat;
(function (CardanoCVoteRegistrationFormat) {
    CardanoCVoteRegistrationFormat[CardanoCVoteRegistrationFormat["CIP15"] = 0] = "CIP15";
    CardanoCVoteRegistrationFormat[CardanoCVoteRegistrationFormat["CIP36"] = 1] = "CIP36";
})(CardanoCVoteRegistrationFormat || (exports.CardanoCVoteRegistrationFormat = CardanoCVoteRegistrationFormat = {}));
exports.EnumCardanoCVoteRegistrationFormat = schema_utils_1.Type.Enum(CardanoCVoteRegistrationFormat);
var CardanoTxSigningMode;
(function (CardanoTxSigningMode) {
    CardanoTxSigningMode[CardanoTxSigningMode["ORDINARY_TRANSACTION"] = 0] = "ORDINARY_TRANSACTION";
    CardanoTxSigningMode[CardanoTxSigningMode["POOL_REGISTRATION_AS_OWNER"] = 1] = "POOL_REGISTRATION_AS_OWNER";
    CardanoTxSigningMode[CardanoTxSigningMode["MULTISIG_TRANSACTION"] = 2] = "MULTISIG_TRANSACTION";
    CardanoTxSigningMode[CardanoTxSigningMode["PLUTUS_TRANSACTION"] = 3] = "PLUTUS_TRANSACTION";
})(CardanoTxSigningMode || (exports.CardanoTxSigningMode = CardanoTxSigningMode = {}));
exports.EnumCardanoTxSigningMode = schema_utils_1.Type.Enum(CardanoTxSigningMode);
var CardanoTxWitnessType;
(function (CardanoTxWitnessType) {
    CardanoTxWitnessType[CardanoTxWitnessType["BYRON_WITNESS"] = 0] = "BYRON_WITNESS";
    CardanoTxWitnessType[CardanoTxWitnessType["SHELLEY_WITNESS"] = 1] = "SHELLEY_WITNESS";
})(CardanoTxWitnessType || (exports.CardanoTxWitnessType = CardanoTxWitnessType = {}));
exports.EnumCardanoTxWitnessType = schema_utils_1.Type.Enum(CardanoTxWitnessType);
exports.CardanoBlockchainPointerType = schema_utils_1.Type.Object({
    block_index: schema_utils_1.Type.Number(),
    tx_index: schema_utils_1.Type.Number(),
    certificate_index: schema_utils_1.Type.Number(),
}, { $id: 'CardanoBlockchainPointerType' });
exports.CardanoNativeScript = schema_utils_1.Type.Recursive(This => schema_utils_1.Type.Object({
    type: exports.EnumCardanoNativeScriptType,
    scripts: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(This)),
    key_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    key_path: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(schema_utils_1.Type.Number())),
    required_signatures_count: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    invalid_before: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    invalid_hereafter: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
}), { $id: 'CardanoNativeScript' });
exports.CardanoGetNativeScriptHash = schema_utils_1.Type.Object({
    script: exports.CardanoNativeScript,
    display_format: exports.EnumCardanoNativeScriptHashDisplayFormat,
    derivation_type: exports.EnumCardanoDerivationType,
}, { $id: 'CardanoGetNativeScriptHash' });
exports.CardanoNativeScriptHash = schema_utils_1.Type.Object({
    script_hash: schema_utils_1.Type.String(),
}, { $id: 'CardanoNativeScriptHash' });
exports.CardanoAddressParametersType = schema_utils_1.Type.Object({
    address_type: exports.EnumCardanoAddressType,
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    address_n_staking: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    staking_key_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    certificate_pointer: schema_utils_1.Type.Optional(exports.CardanoBlockchainPointerType),
    script_payment_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    script_staking_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'CardanoAddressParametersType' });
exports.CardanoGetAddress = schema_utils_1.Type.Object({
    show_display: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    protocol_magic: schema_utils_1.Type.Number(),
    network_id: schema_utils_1.Type.Number(),
    address_parameters: exports.CardanoAddressParametersType,
    derivation_type: exports.EnumCardanoDerivationType,
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'CardanoGetAddress' });
exports.CardanoAddress = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
}, { $id: 'CardanoAddress' });
exports.CardanoGetPublicKey = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    show_display: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    derivation_type: exports.EnumCardanoDerivationType,
}, { $id: 'CardanoGetPublicKey' });
exports.CardanoPublicKey = schema_utils_1.Type.Object({
    xpub: schema_utils_1.Type.String(),
    node: exports.HDNodeType,
}, { $id: 'CardanoPublicKey' });
exports.CardanoSignTxInit = schema_utils_1.Type.Object({
    signing_mode: exports.EnumCardanoTxSigningMode,
    protocol_magic: schema_utils_1.Type.Number(),
    network_id: schema_utils_1.Type.Number(),
    inputs_count: schema_utils_1.Type.Number(),
    outputs_count: schema_utils_1.Type.Number(),
    fee: schema_utils_1.Type.Uint(),
    ttl: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    certificates_count: schema_utils_1.Type.Number(),
    withdrawals_count: schema_utils_1.Type.Number(),
    has_auxiliary_data: schema_utils_1.Type.Boolean(),
    validity_interval_start: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    witness_requests_count: schema_utils_1.Type.Number(),
    minting_asset_groups_count: schema_utils_1.Type.Number(),
    derivation_type: exports.EnumCardanoDerivationType,
    include_network_id: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    script_data_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    collateral_inputs_count: schema_utils_1.Type.Number(),
    required_signers_count: schema_utils_1.Type.Number(),
    has_collateral_return: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    total_collateral: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    reference_inputs_count: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    tag_cbor_sets: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'CardanoSignTxInit' });
exports.CardanoTxInput = schema_utils_1.Type.Object({
    prev_hash: schema_utils_1.Type.String(),
    prev_index: schema_utils_1.Type.Number(),
}, { $id: 'CardanoTxInput' });
exports.CardanoTxOutput = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    address_parameters: schema_utils_1.Type.Optional(exports.CardanoAddressParametersType),
    amount: schema_utils_1.Type.Uint(),
    asset_groups_count: schema_utils_1.Type.Number(),
    datum_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    format: schema_utils_1.Type.Optional(exports.EnumCardanoTxOutputSerializationFormat),
    inline_datum_size: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    reference_script_size: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
}, { $id: 'CardanoTxOutput' });
exports.CardanoAssetGroup = schema_utils_1.Type.Object({
    policy_id: schema_utils_1.Type.String(),
    tokens_count: schema_utils_1.Type.Number(),
}, { $id: 'CardanoAssetGroup' });
exports.CardanoToken = schema_utils_1.Type.Object({
    asset_name_bytes: schema_utils_1.Type.String(),
    amount: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    mint_amount: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint({ allowNegative: true })),
}, { $id: 'CardanoToken' });
exports.CardanoTxInlineDatumChunk = schema_utils_1.Type.Object({
    data: schema_utils_1.Type.String(),
}, { $id: 'CardanoTxInlineDatumChunk' });
exports.CardanoTxReferenceScriptChunk = schema_utils_1.Type.Object({
    data: schema_utils_1.Type.String(),
}, { $id: 'CardanoTxReferenceScriptChunk' });
exports.CardanoPoolOwner = schema_utils_1.Type.Object({
    staking_key_path: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(schema_utils_1.Type.Number())),
    staking_key_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'CardanoPoolOwner' });
exports.CardanoPoolRelayParameters = schema_utils_1.Type.Object({
    type: exports.EnumCardanoPoolRelayType,
    ipv4_address: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    ipv6_address: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    host_name: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    port: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
}, { $id: 'CardanoPoolRelayParameters' });
exports.CardanoPoolMetadataType = schema_utils_1.Type.Object({
    url: schema_utils_1.Type.String(),
    hash: schema_utils_1.Type.String(),
}, { $id: 'CardanoPoolMetadataType' });
exports.CardanoPoolParametersType = schema_utils_1.Type.Object({
    pool_id: schema_utils_1.Type.String(),
    vrf_key_hash: schema_utils_1.Type.String(),
    pledge: schema_utils_1.Type.Uint(),
    cost: schema_utils_1.Type.Uint(),
    margin_numerator: schema_utils_1.Type.Uint(),
    margin_denominator: schema_utils_1.Type.Uint(),
    reward_account: schema_utils_1.Type.String(),
    metadata: schema_utils_1.Type.Optional(exports.CardanoPoolMetadataType),
    owners_count: schema_utils_1.Type.Number(),
    relays_count: schema_utils_1.Type.Number(),
}, { $id: 'CardanoPoolParametersType' });
exports.CardanoDRep = schema_utils_1.Type.Object({
    type: exports.EnumCardanoDRepType,
    key_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    script_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'CardanoDRep' });
exports.CardanoTxCertificate = schema_utils_1.Type.Object({
    type: exports.EnumCardanoCertificateType,
    path: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(schema_utils_1.Type.Number())),
    pool: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    pool_parameters: schema_utils_1.Type.Optional(exports.CardanoPoolParametersType),
    script_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    key_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    deposit: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    drep: schema_utils_1.Type.Optional(exports.CardanoDRep),
}, { $id: 'CardanoTxCertificate' });
exports.CardanoTxWithdrawal = schema_utils_1.Type.Object({
    path: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(schema_utils_1.Type.Number())),
    amount: schema_utils_1.Type.Uint(),
    script_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    key_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'CardanoTxWithdrawal' });
exports.CardanoCVoteRegistrationDelegation = schema_utils_1.Type.Object({
    vote_public_key: schema_utils_1.Type.String(),
    weight: schema_utils_1.Type.Uint(),
}, { $id: 'CardanoCVoteRegistrationDelegation' });
exports.CardanoCVoteRegistrationParametersType = schema_utils_1.Type.Object({
    vote_public_key: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    staking_path: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    payment_address_parameters: schema_utils_1.Type.Optional(exports.CardanoAddressParametersType),
    nonce: schema_utils_1.Type.Uint(),
    format: schema_utils_1.Type.Optional(exports.EnumCardanoCVoteRegistrationFormat),
    delegations: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.CardanoCVoteRegistrationDelegation)),
    voting_purpose: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    payment_address: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'CardanoCVoteRegistrationParametersType' });
exports.CardanoTxAuxiliaryData = schema_utils_1.Type.Object({
    cvote_registration_parameters: schema_utils_1.Type.Optional(exports.CardanoCVoteRegistrationParametersType),
    hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'CardanoTxAuxiliaryData' });
exports.CardanoTxMint = schema_utils_1.Type.Object({
    asset_groups_count: schema_utils_1.Type.Number(),
}, { $id: 'CardanoTxMint' });
exports.CardanoTxCollateralInput = schema_utils_1.Type.Object({
    prev_hash: schema_utils_1.Type.String(),
    prev_index: schema_utils_1.Type.Number(),
}, { $id: 'CardanoTxCollateralInput' });
exports.CardanoTxRequiredSigner = schema_utils_1.Type.Object({
    key_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    key_path: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(schema_utils_1.Type.Number())),
}, { $id: 'CardanoTxRequiredSigner' });
exports.CardanoTxReferenceInput = schema_utils_1.Type.Object({
    prev_hash: schema_utils_1.Type.String(),
    prev_index: schema_utils_1.Type.Number(),
}, { $id: 'CardanoTxReferenceInput' });
exports.CardanoTxItemAck = schema_utils_1.Type.Object({}, { $id: 'CardanoTxItemAck' });
exports.CardanoTxAuxiliaryDataSupplement = schema_utils_1.Type.Object({
    type: exports.EnumCardanoTxAuxiliaryDataSupplementType,
    auxiliary_data_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    cvote_registration_signature: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'CardanoTxAuxiliaryDataSupplement' });
exports.CardanoTxWitnessRequest = schema_utils_1.Type.Object({
    path: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
}, { $id: 'CardanoTxWitnessRequest' });
exports.CardanoTxWitnessResponse = schema_utils_1.Type.Object({
    type: exports.EnumCardanoTxWitnessType,
    pub_key: schema_utils_1.Type.String(),
    signature: schema_utils_1.Type.String(),
    chain_code: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'CardanoTxWitnessResponse' });
exports.CardanoTxHostAck = schema_utils_1.Type.Object({}, { $id: 'CardanoTxHostAck' });
exports.CardanoTxBodyHash = schema_utils_1.Type.Object({
    tx_hash: schema_utils_1.Type.String(),
}, { $id: 'CardanoTxBodyHash' });
exports.CardanoSignTxFinished = schema_utils_1.Type.Object({}, { $id: 'CardanoSignTxFinished' });
exports.Success = schema_utils_1.Type.Object({
    message: schema_utils_1.Type.String(),
}, { $id: 'Success' });
var FailureType;
(function (FailureType) {
    FailureType[FailureType["Failure_UnexpectedMessage"] = 1] = "Failure_UnexpectedMessage";
    FailureType[FailureType["Failure_ButtonExpected"] = 2] = "Failure_ButtonExpected";
    FailureType[FailureType["Failure_DataError"] = 3] = "Failure_DataError";
    FailureType[FailureType["Failure_ActionCancelled"] = 4] = "Failure_ActionCancelled";
    FailureType[FailureType["Failure_PinExpected"] = 5] = "Failure_PinExpected";
    FailureType[FailureType["Failure_PinCancelled"] = 6] = "Failure_PinCancelled";
    FailureType[FailureType["Failure_PinInvalid"] = 7] = "Failure_PinInvalid";
    FailureType[FailureType["Failure_InvalidSignature"] = 8] = "Failure_InvalidSignature";
    FailureType[FailureType["Failure_ProcessError"] = 9] = "Failure_ProcessError";
    FailureType[FailureType["Failure_NotEnoughFunds"] = 10] = "Failure_NotEnoughFunds";
    FailureType[FailureType["Failure_NotInitialized"] = 11] = "Failure_NotInitialized";
    FailureType[FailureType["Failure_PinMismatch"] = 12] = "Failure_PinMismatch";
    FailureType[FailureType["Failure_WipeCodeMismatch"] = 13] = "Failure_WipeCodeMismatch";
    FailureType[FailureType["Failure_InvalidSession"] = 14] = "Failure_InvalidSession";
    FailureType[FailureType["Failure_FirmwareError"] = 99] = "Failure_FirmwareError";
})(FailureType || (exports.FailureType = FailureType = {}));
exports.EnumFailureType = schema_utils_1.Type.Enum(FailureType);
exports.Failure = schema_utils_1.Type.Object({
    code: schema_utils_1.Type.Optional(exports.EnumFailureType),
    message: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'Failure' });
var Enum_ButtonRequestType;
(function (Enum_ButtonRequestType) {
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_Other"] = 1] = "ButtonRequest_Other";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_FeeOverThreshold"] = 2] = "ButtonRequest_FeeOverThreshold";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_ConfirmOutput"] = 3] = "ButtonRequest_ConfirmOutput";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_ResetDevice"] = 4] = "ButtonRequest_ResetDevice";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_ConfirmWord"] = 5] = "ButtonRequest_ConfirmWord";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_WipeDevice"] = 6] = "ButtonRequest_WipeDevice";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_ProtectCall"] = 7] = "ButtonRequest_ProtectCall";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_SignTx"] = 8] = "ButtonRequest_SignTx";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_FirmwareCheck"] = 9] = "ButtonRequest_FirmwareCheck";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_Address"] = 10] = "ButtonRequest_Address";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_PublicKey"] = 11] = "ButtonRequest_PublicKey";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_MnemonicWordCount"] = 12] = "ButtonRequest_MnemonicWordCount";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_MnemonicInput"] = 13] = "ButtonRequest_MnemonicInput";
    Enum_ButtonRequestType[Enum_ButtonRequestType["_Deprecated_ButtonRequest_PassphraseType"] = 14] = "_Deprecated_ButtonRequest_PassphraseType";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_UnknownDerivationPath"] = 15] = "ButtonRequest_UnknownDerivationPath";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_RecoveryHomepage"] = 16] = "ButtonRequest_RecoveryHomepage";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_Success"] = 17] = "ButtonRequest_Success";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_Warning"] = 18] = "ButtonRequest_Warning";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_PassphraseEntry"] = 19] = "ButtonRequest_PassphraseEntry";
    Enum_ButtonRequestType[Enum_ButtonRequestType["ButtonRequest_PinEntry"] = 20] = "ButtonRequest_PinEntry";
})(Enum_ButtonRequestType || (exports.Enum_ButtonRequestType = Enum_ButtonRequestType = {}));
exports.EnumEnum_ButtonRequestType = schema_utils_1.Type.Enum(Enum_ButtonRequestType);
exports.ButtonRequestType = schema_utils_1.Type.KeyOfEnum(Enum_ButtonRequestType, {
    $id: 'ButtonRequestType',
});
exports.ButtonRequest = schema_utils_1.Type.Object({
    code: schema_utils_1.Type.Optional(exports.ButtonRequestType),
    pages: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    name: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'ButtonRequest' });
exports.ButtonAck = schema_utils_1.Type.Object({}, { $id: 'ButtonAck' });
var Enum_PinMatrixRequestType;
(function (Enum_PinMatrixRequestType) {
    Enum_PinMatrixRequestType[Enum_PinMatrixRequestType["PinMatrixRequestType_Current"] = 1] = "PinMatrixRequestType_Current";
    Enum_PinMatrixRequestType[Enum_PinMatrixRequestType["PinMatrixRequestType_NewFirst"] = 2] = "PinMatrixRequestType_NewFirst";
    Enum_PinMatrixRequestType[Enum_PinMatrixRequestType["PinMatrixRequestType_NewSecond"] = 3] = "PinMatrixRequestType_NewSecond";
    Enum_PinMatrixRequestType[Enum_PinMatrixRequestType["PinMatrixRequestType_WipeCodeFirst"] = 4] = "PinMatrixRequestType_WipeCodeFirst";
    Enum_PinMatrixRequestType[Enum_PinMatrixRequestType["PinMatrixRequestType_WipeCodeSecond"] = 5] = "PinMatrixRequestType_WipeCodeSecond";
})(Enum_PinMatrixRequestType || (exports.Enum_PinMatrixRequestType = Enum_PinMatrixRequestType = {}));
exports.EnumEnum_PinMatrixRequestType = schema_utils_1.Type.Enum(Enum_PinMatrixRequestType);
exports.PinMatrixRequestType = schema_utils_1.Type.KeyOfEnum(Enum_PinMatrixRequestType, {
    $id: 'PinMatrixRequestType',
});
exports.PinMatrixRequest = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Optional(exports.PinMatrixRequestType),
}, { $id: 'PinMatrixRequest' });
exports.PinMatrixAck = schema_utils_1.Type.Object({
    pin: schema_utils_1.Type.String(),
}, { $id: 'PinMatrixAck' });
exports.PassphraseRequest = schema_utils_1.Type.Object({
    _on_device: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'PassphraseRequest' });
exports.PassphraseAck = schema_utils_1.Type.Object({
    passphrase: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    _state: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    on_device: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'PassphraseAck' });
exports.Deprecated_PassphraseStateRequest = schema_utils_1.Type.Object({
    state: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'Deprecated_PassphraseStateRequest' });
exports.Deprecated_PassphraseStateAck = schema_utils_1.Type.Object({}, { $id: 'Deprecated_PassphraseStateAck' });
exports.CipherKeyValue = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    key: schema_utils_1.Type.String(),
    value: schema_utils_1.Type.String(),
    encrypt: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    ask_on_encrypt: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    ask_on_decrypt: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    iv: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'CipherKeyValue' });
exports.CipheredKeyValue = schema_utils_1.Type.Object({
    value: schema_utils_1.Type.String(),
}, { $id: 'CipheredKeyValue' });
exports.IdentityType = schema_utils_1.Type.Object({
    proto: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    user: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    host: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    port: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    path: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    index: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
}, { $id: 'IdentityType' });
exports.SignIdentity = schema_utils_1.Type.Object({
    identity: exports.IdentityType,
    challenge_hidden: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    challenge_visual: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    ecdsa_curve_name: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'SignIdentity' });
exports.SignedIdentity = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
    public_key: schema_utils_1.Type.String(),
    signature: schema_utils_1.Type.String(),
}, { $id: 'SignedIdentity' });
exports.GetECDHSessionKey = schema_utils_1.Type.Object({
    identity: exports.IdentityType,
    peer_public_key: schema_utils_1.Type.String(),
    ecdsa_curve_name: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'GetECDHSessionKey' });
exports.ECDHSessionKey = schema_utils_1.Type.Object({
    session_key: schema_utils_1.Type.String(),
    public_key: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'ECDHSessionKey' });
var DebugButton;
(function (DebugButton) {
    DebugButton[DebugButton["NO"] = 0] = "NO";
    DebugButton[DebugButton["YES"] = 1] = "YES";
    DebugButton[DebugButton["INFO"] = 2] = "INFO";
})(DebugButton || (exports.DebugButton = DebugButton = {}));
exports.EnumDebugButton = schema_utils_1.Type.Enum(DebugButton);
var DebugPhysicalButton;
(function (DebugPhysicalButton) {
    DebugPhysicalButton[DebugPhysicalButton["LEFT_BTN"] = 0] = "LEFT_BTN";
    DebugPhysicalButton[DebugPhysicalButton["MIDDLE_BTN"] = 1] = "MIDDLE_BTN";
    DebugPhysicalButton[DebugPhysicalButton["RIGHT_BTN"] = 2] = "RIGHT_BTN";
})(DebugPhysicalButton || (exports.DebugPhysicalButton = DebugPhysicalButton = {}));
exports.EnumDebugPhysicalButton = schema_utils_1.Type.Enum(DebugPhysicalButton);
var DebugWaitType;
(function (DebugWaitType) {
    DebugWaitType[DebugWaitType["IMMEDIATE"] = 0] = "IMMEDIATE";
    DebugWaitType[DebugWaitType["NEXT_LAYOUT"] = 1] = "NEXT_LAYOUT";
    DebugWaitType[DebugWaitType["CURRENT_LAYOUT"] = 2] = "CURRENT_LAYOUT";
})(DebugWaitType || (exports.DebugWaitType = DebugWaitType = {}));
exports.EnumDebugWaitType = schema_utils_1.Type.Enum(DebugWaitType);
exports.DebugLinkResetDebugEvents = schema_utils_1.Type.Object({}, { $id: 'DebugLinkResetDebugEvents' });
exports.DebugLinkOptigaSetSecMax = schema_utils_1.Type.Object({}, { $id: 'DebugLinkOptigaSetSecMax' });
exports.EosGetPublicKey = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    show_display: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'EosGetPublicKey' });
exports.EosPublicKey = schema_utils_1.Type.Object({
    wif_public_key: schema_utils_1.Type.String(),
    raw_public_key: schema_utils_1.Type.String(),
}, { $id: 'EosPublicKey' });
exports.EosTxHeader = schema_utils_1.Type.Object({
    expiration: schema_utils_1.Type.Number(),
    ref_block_num: schema_utils_1.Type.Number(),
    ref_block_prefix: schema_utils_1.Type.Number(),
    max_net_usage_words: schema_utils_1.Type.Number(),
    max_cpu_usage_ms: schema_utils_1.Type.Number(),
    delay_sec: schema_utils_1.Type.Number(),
}, { $id: 'EosTxHeader' });
exports.EosSignTx = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    chain_id: schema_utils_1.Type.String(),
    header: exports.EosTxHeader,
    num_actions: schema_utils_1.Type.Number(),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'EosSignTx' });
exports.EosTxActionRequest = schema_utils_1.Type.Object({
    data_size: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
}, { $id: 'EosTxActionRequest' });
exports.EosAsset = schema_utils_1.Type.Object({
    amount: schema_utils_1.Type.Uint(),
    symbol: schema_utils_1.Type.String(),
}, { $id: 'EosAsset' });
exports.EosPermissionLevel = schema_utils_1.Type.Object({
    actor: schema_utils_1.Type.String(),
    permission: schema_utils_1.Type.String(),
}, { $id: 'EosPermissionLevel' });
exports.EosAuthorizationKey = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    key: schema_utils_1.Type.String(),
    address_n: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(schema_utils_1.Type.Number())),
    weight: schema_utils_1.Type.Number(),
}, { $id: 'EosAuthorizationKey' });
exports.EosAuthorizationAccount = schema_utils_1.Type.Object({
    account: exports.EosPermissionLevel,
    weight: schema_utils_1.Type.Number(),
}, { $id: 'EosAuthorizationAccount' });
exports.EosAuthorizationWait = schema_utils_1.Type.Object({
    wait_sec: schema_utils_1.Type.Number(),
    weight: schema_utils_1.Type.Number(),
}, { $id: 'EosAuthorizationWait' });
exports.EosAuthorization = schema_utils_1.Type.Object({
    threshold: schema_utils_1.Type.Number(),
    keys: schema_utils_1.Type.Array(exports.EosAuthorizationKey),
    accounts: schema_utils_1.Type.Array(exports.EosAuthorizationAccount),
    waits: schema_utils_1.Type.Array(exports.EosAuthorizationWait),
}, { $id: 'EosAuthorization' });
exports.EosActionCommon = schema_utils_1.Type.Object({
    account: schema_utils_1.Type.String(),
    name: schema_utils_1.Type.String(),
    authorization: schema_utils_1.Type.Array(exports.EosPermissionLevel),
}, { $id: 'EosActionCommon' });
exports.EosActionTransfer = schema_utils_1.Type.Object({
    sender: schema_utils_1.Type.String(),
    receiver: schema_utils_1.Type.String(),
    quantity: exports.EosAsset,
    memo: schema_utils_1.Type.String(),
}, { $id: 'EosActionTransfer' });
exports.EosActionDelegate = schema_utils_1.Type.Object({
    sender: schema_utils_1.Type.String(),
    receiver: schema_utils_1.Type.String(),
    net_quantity: exports.EosAsset,
    cpu_quantity: exports.EosAsset,
    transfer: schema_utils_1.Type.Boolean(),
}, { $id: 'EosActionDelegate' });
exports.EosActionUndelegate = schema_utils_1.Type.Object({
    sender: schema_utils_1.Type.String(),
    receiver: schema_utils_1.Type.String(),
    net_quantity: exports.EosAsset,
    cpu_quantity: exports.EosAsset,
}, { $id: 'EosActionUndelegate' });
exports.EosActionRefund = schema_utils_1.Type.Object({
    owner: schema_utils_1.Type.String(),
}, { $id: 'EosActionRefund' });
exports.EosActionBuyRam = schema_utils_1.Type.Object({
    payer: schema_utils_1.Type.String(),
    receiver: schema_utils_1.Type.String(),
    quantity: exports.EosAsset,
}, { $id: 'EosActionBuyRam' });
exports.EosActionBuyRamBytes = schema_utils_1.Type.Object({
    payer: schema_utils_1.Type.String(),
    receiver: schema_utils_1.Type.String(),
    bytes: schema_utils_1.Type.Number(),
}, { $id: 'EosActionBuyRamBytes' });
exports.EosActionSellRam = schema_utils_1.Type.Object({
    account: schema_utils_1.Type.String(),
    bytes: schema_utils_1.Type.Number(),
}, { $id: 'EosActionSellRam' });
exports.EosActionVoteProducer = schema_utils_1.Type.Object({
    voter: schema_utils_1.Type.String(),
    proxy: schema_utils_1.Type.String(),
    producers: schema_utils_1.Type.Array(schema_utils_1.Type.String()),
}, { $id: 'EosActionVoteProducer' });
exports.EosActionUpdateAuth = schema_utils_1.Type.Object({
    account: schema_utils_1.Type.String(),
    permission: schema_utils_1.Type.String(),
    parent: schema_utils_1.Type.String(),
    auth: exports.EosAuthorization,
}, { $id: 'EosActionUpdateAuth' });
exports.EosActionDeleteAuth = schema_utils_1.Type.Object({
    account: schema_utils_1.Type.String(),
    permission: schema_utils_1.Type.String(),
}, { $id: 'EosActionDeleteAuth' });
exports.EosActionLinkAuth = schema_utils_1.Type.Object({
    account: schema_utils_1.Type.String(),
    code: schema_utils_1.Type.String(),
    type: schema_utils_1.Type.String(),
    requirement: schema_utils_1.Type.String(),
}, { $id: 'EosActionLinkAuth' });
exports.EosActionUnlinkAuth = schema_utils_1.Type.Object({
    account: schema_utils_1.Type.String(),
    code: schema_utils_1.Type.String(),
    type: schema_utils_1.Type.String(),
}, { $id: 'EosActionUnlinkAuth' });
exports.EosActionNewAccount = schema_utils_1.Type.Object({
    creator: schema_utils_1.Type.String(),
    name: schema_utils_1.Type.String(),
    owner: exports.EosAuthorization,
    active: exports.EosAuthorization,
}, { $id: 'EosActionNewAccount' });
exports.EosActionUnknown = schema_utils_1.Type.Object({
    data_size: schema_utils_1.Type.Number(),
    data_chunk: schema_utils_1.Type.String(),
}, { $id: 'EosActionUnknown' });
exports.EosTxActionAck = schema_utils_1.Type.Object({
    common: exports.EosActionCommon,
    transfer: schema_utils_1.Type.Optional(exports.EosActionTransfer),
    delegate: schema_utils_1.Type.Optional(exports.EosActionDelegate),
    undelegate: schema_utils_1.Type.Optional(exports.EosActionUndelegate),
    refund: schema_utils_1.Type.Optional(exports.EosActionRefund),
    buy_ram: schema_utils_1.Type.Optional(exports.EosActionBuyRam),
    buy_ram_bytes: schema_utils_1.Type.Optional(exports.EosActionBuyRamBytes),
    sell_ram: schema_utils_1.Type.Optional(exports.EosActionSellRam),
    vote_producer: schema_utils_1.Type.Optional(exports.EosActionVoteProducer),
    update_auth: schema_utils_1.Type.Optional(exports.EosActionUpdateAuth),
    delete_auth: schema_utils_1.Type.Optional(exports.EosActionDeleteAuth),
    link_auth: schema_utils_1.Type.Optional(exports.EosActionLinkAuth),
    unlink_auth: schema_utils_1.Type.Optional(exports.EosActionUnlinkAuth),
    new_account: schema_utils_1.Type.Optional(exports.EosActionNewAccount),
    unknown: schema_utils_1.Type.Optional(exports.EosActionUnknown),
}, { $id: 'EosTxActionAck' });
exports.EosSignedTx = schema_utils_1.Type.Object({
    signature: schema_utils_1.Type.String(),
}, { $id: 'EosSignedTx' });
var EthereumDefinitionType;
(function (EthereumDefinitionType) {
    EthereumDefinitionType[EthereumDefinitionType["NETWORK"] = 0] = "NETWORK";
    EthereumDefinitionType[EthereumDefinitionType["TOKEN"] = 1] = "TOKEN";
})(EthereumDefinitionType || (exports.EthereumDefinitionType = EthereumDefinitionType = {}));
exports.EnumEthereumDefinitionType = schema_utils_1.Type.Enum(EthereumDefinitionType);
exports.EthereumNetworkInfo = schema_utils_1.Type.Object({
    chain_id: schema_utils_1.Type.Number(),
    symbol: schema_utils_1.Type.String(),
    slip44: schema_utils_1.Type.Number(),
    name: schema_utils_1.Type.String(),
}, { $id: 'EthereumNetworkInfo' });
exports.EthereumTokenInfo = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
    chain_id: schema_utils_1.Type.Number(),
    symbol: schema_utils_1.Type.String(),
    decimals: schema_utils_1.Type.Number(),
    name: schema_utils_1.Type.String(),
}, { $id: 'EthereumTokenInfo' });
exports.EthereumDefinitions = schema_utils_1.Type.Object({
    encoded_network: schema_utils_1.Type.Optional(schema_utils_1.Type.ArrayBuffer()),
    encoded_token: schema_utils_1.Type.Optional(schema_utils_1.Type.ArrayBuffer()),
}, { $id: 'EthereumDefinitions' });
exports.EthereumSignTypedData = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    primary_type: schema_utils_1.Type.String(),
    metamask_v4_compat: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    definitions: schema_utils_1.Type.Optional(exports.EthereumDefinitions),
}, { $id: 'EthereumSignTypedData' });
exports.EthereumTypedDataStructRequest = schema_utils_1.Type.Object({
    name: schema_utils_1.Type.String(),
}, { $id: 'EthereumTypedDataStructRequest' });
var EthereumDataType;
(function (EthereumDataType) {
    EthereumDataType[EthereumDataType["UINT"] = 1] = "UINT";
    EthereumDataType[EthereumDataType["INT"] = 2] = "INT";
    EthereumDataType[EthereumDataType["BYTES"] = 3] = "BYTES";
    EthereumDataType[EthereumDataType["STRING"] = 4] = "STRING";
    EthereumDataType[EthereumDataType["BOOL"] = 5] = "BOOL";
    EthereumDataType[EthereumDataType["ADDRESS"] = 6] = "ADDRESS";
    EthereumDataType[EthereumDataType["ARRAY"] = 7] = "ARRAY";
    EthereumDataType[EthereumDataType["STRUCT"] = 8] = "STRUCT";
})(EthereumDataType || (exports.EthereumDataType = EthereumDataType = {}));
exports.EnumEthereumDataType = schema_utils_1.Type.Enum(EthereumDataType);
exports.EthereumFieldType = schema_utils_1.Type.Recursive(This => schema_utils_1.Type.Object({
    data_type: exports.EnumEthereumDataType,
    size: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    entry_type: schema_utils_1.Type.Optional(This),
    struct_name: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}), { $id: 'EthereumFieldType' });
exports.EthereumStructMember = schema_utils_1.Type.Object({
    type: exports.EthereumFieldType,
    name: schema_utils_1.Type.String(),
}, { $id: 'EthereumStructMember' });
exports.EthereumTypedDataStructAck = schema_utils_1.Type.Object({
    members: schema_utils_1.Type.Array(exports.EthereumStructMember),
}, { $id: 'EthereumTypedDataStructAck' });
exports.EthereumTypedDataValueRequest = schema_utils_1.Type.Object({
    member_path: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
}, { $id: 'EthereumTypedDataValueRequest' });
exports.EthereumTypedDataValueAck = schema_utils_1.Type.Object({
    value: schema_utils_1.Type.String(),
}, { $id: 'EthereumTypedDataValueAck' });
exports.EthereumGetPublicKey = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    show_display: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'EthereumGetPublicKey' });
exports.EthereumPublicKey = schema_utils_1.Type.Object({
    node: exports.HDNodeType,
    xpub: schema_utils_1.Type.String(),
}, { $id: 'EthereumPublicKey' });
exports.EthereumGetAddress = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    show_display: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    encoded_network: schema_utils_1.Type.Optional(schema_utils_1.Type.ArrayBuffer()),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'EthereumGetAddress' });
exports.EthereumAddress = schema_utils_1.Type.Object({
    _old_address: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    address: schema_utils_1.Type.String(),
}, { $id: 'EthereumAddress' });
exports.EthereumSignTx = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    nonce: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    gas_price: schema_utils_1.Type.String(),
    gas_limit: schema_utils_1.Type.String(),
    to: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    value: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    data_initial_chunk: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    data_length: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    chain_id: schema_utils_1.Type.Number(),
    tx_type: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    definitions: schema_utils_1.Type.Optional(exports.EthereumDefinitions),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'EthereumSignTx' });
exports.EthereumAccessList = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
    storage_keys: schema_utils_1.Type.Array(schema_utils_1.Type.String()),
}, { $id: 'EthereumAccessList' });
exports.EthereumSignTxEIP1559 = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    nonce: schema_utils_1.Type.String(),
    max_gas_fee: schema_utils_1.Type.String(),
    max_priority_fee: schema_utils_1.Type.String(),
    gas_limit: schema_utils_1.Type.String(),
    to: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    value: schema_utils_1.Type.String(),
    data_initial_chunk: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    data_length: schema_utils_1.Type.Number(),
    chain_id: schema_utils_1.Type.Number(),
    access_list: schema_utils_1.Type.Array(exports.EthereumAccessList),
    definitions: schema_utils_1.Type.Optional(exports.EthereumDefinitions),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'EthereumSignTxEIP1559' });
exports.EthereumTxRequest = schema_utils_1.Type.Object({
    data_length: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    signature_v: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    signature_r: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    signature_s: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'EthereumTxRequest' });
exports.EthereumTxAck = schema_utils_1.Type.Object({
    data_chunk: schema_utils_1.Type.String(),
}, { $id: 'EthereumTxAck' });
exports.EthereumSignMessage = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    message: schema_utils_1.Type.String(),
    encoded_network: schema_utils_1.Type.Optional(schema_utils_1.Type.ArrayBuffer()),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'EthereumSignMessage' });
exports.EthereumMessageSignature = schema_utils_1.Type.Object({
    signature: schema_utils_1.Type.String(),
    address: schema_utils_1.Type.String(),
}, { $id: 'EthereumMessageSignature' });
exports.EthereumVerifyMessage = schema_utils_1.Type.Object({
    signature: schema_utils_1.Type.String(),
    message: schema_utils_1.Type.String(),
    address: schema_utils_1.Type.String(),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'EthereumVerifyMessage' });
exports.EthereumSignTypedHash = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    domain_separator_hash: schema_utils_1.Type.String(),
    message_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    encoded_network: schema_utils_1.Type.Optional(schema_utils_1.Type.ArrayBuffer()),
}, { $id: 'EthereumSignTypedHash' });
exports.EthereumTypedDataSignature = schema_utils_1.Type.Object({
    signature: schema_utils_1.Type.String(),
    address: schema_utils_1.Type.String(),
}, { $id: 'EthereumTypedDataSignature' });
var Enum_BackupType;
(function (Enum_BackupType) {
    Enum_BackupType[Enum_BackupType["Bip39"] = 0] = "Bip39";
    Enum_BackupType[Enum_BackupType["Slip39_Basic"] = 1] = "Slip39_Basic";
    Enum_BackupType[Enum_BackupType["Slip39_Advanced"] = 2] = "Slip39_Advanced";
    Enum_BackupType[Enum_BackupType["Slip39_Single_Extendable"] = 3] = "Slip39_Single_Extendable";
    Enum_BackupType[Enum_BackupType["Slip39_Basic_Extendable"] = 4] = "Slip39_Basic_Extendable";
    Enum_BackupType[Enum_BackupType["Slip39_Advanced_Extendable"] = 5] = "Slip39_Advanced_Extendable";
})(Enum_BackupType || (exports.Enum_BackupType = Enum_BackupType = {}));
exports.EnumEnum_BackupType = schema_utils_1.Type.Enum(Enum_BackupType);
exports.BackupType = schema_utils_1.Type.KeyOfEnum(Enum_BackupType, { $id: 'BackupType' });
var Enum_SafetyCheckLevel;
(function (Enum_SafetyCheckLevel) {
    Enum_SafetyCheckLevel[Enum_SafetyCheckLevel["Strict"] = 0] = "Strict";
    Enum_SafetyCheckLevel[Enum_SafetyCheckLevel["PromptAlways"] = 1] = "PromptAlways";
    Enum_SafetyCheckLevel[Enum_SafetyCheckLevel["PromptTemporarily"] = 2] = "PromptTemporarily";
})(Enum_SafetyCheckLevel || (exports.Enum_SafetyCheckLevel = Enum_SafetyCheckLevel = {}));
exports.EnumEnum_SafetyCheckLevel = schema_utils_1.Type.Enum(Enum_SafetyCheckLevel);
exports.SafetyCheckLevel = schema_utils_1.Type.KeyOfEnum(Enum_SafetyCheckLevel, { $id: 'SafetyCheckLevel' });
var Enum_DisplayRotation;
(function (Enum_DisplayRotation) {
    Enum_DisplayRotation[Enum_DisplayRotation["North"] = 0] = "North";
    Enum_DisplayRotation[Enum_DisplayRotation["East"] = 90] = "East";
    Enum_DisplayRotation[Enum_DisplayRotation["South"] = 180] = "South";
    Enum_DisplayRotation[Enum_DisplayRotation["West"] = 270] = "West";
})(Enum_DisplayRotation || (exports.Enum_DisplayRotation = Enum_DisplayRotation = {}));
exports.EnumEnum_DisplayRotation = schema_utils_1.Type.Enum(Enum_DisplayRotation);
exports.DisplayRotation = schema_utils_1.Type.KeyOfEnum(Enum_DisplayRotation, { $id: 'DisplayRotation' });
var Enum_HomescreenFormat;
(function (Enum_HomescreenFormat) {
    Enum_HomescreenFormat[Enum_HomescreenFormat["Toif"] = 1] = "Toif";
    Enum_HomescreenFormat[Enum_HomescreenFormat["Jpeg"] = 2] = "Jpeg";
    Enum_HomescreenFormat[Enum_HomescreenFormat["ToiG"] = 3] = "ToiG";
})(Enum_HomescreenFormat || (exports.Enum_HomescreenFormat = Enum_HomescreenFormat = {}));
exports.EnumEnum_HomescreenFormat = schema_utils_1.Type.Enum(Enum_HomescreenFormat);
exports.HomescreenFormat = schema_utils_1.Type.KeyOfEnum(Enum_HomescreenFormat, { $id: 'HomescreenFormat' });
exports.Initialize = schema_utils_1.Type.Object({
    session_id: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    _skip_passphrase: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    derive_cardano: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'Initialize' });
exports.GetFeatures = schema_utils_1.Type.Object({}, { $id: 'GetFeatures' });
var Enum_BackupAvailability;
(function (Enum_BackupAvailability) {
    Enum_BackupAvailability[Enum_BackupAvailability["NotAvailable"] = 0] = "NotAvailable";
    Enum_BackupAvailability[Enum_BackupAvailability["Required"] = 1] = "Required";
    Enum_BackupAvailability[Enum_BackupAvailability["Available"] = 2] = "Available";
})(Enum_BackupAvailability || (exports.Enum_BackupAvailability = Enum_BackupAvailability = {}));
exports.EnumEnum_BackupAvailability = schema_utils_1.Type.Enum(Enum_BackupAvailability);
exports.BackupAvailability = schema_utils_1.Type.KeyOfEnum(Enum_BackupAvailability, {
    $id: 'BackupAvailability',
});
var Enum_RecoveryStatus;
(function (Enum_RecoveryStatus) {
    Enum_RecoveryStatus[Enum_RecoveryStatus["Nothing"] = 0] = "Nothing";
    Enum_RecoveryStatus[Enum_RecoveryStatus["Recovery"] = 1] = "Recovery";
    Enum_RecoveryStatus[Enum_RecoveryStatus["Backup"] = 2] = "Backup";
})(Enum_RecoveryStatus || (exports.Enum_RecoveryStatus = Enum_RecoveryStatus = {}));
exports.EnumEnum_RecoveryStatus = schema_utils_1.Type.Enum(Enum_RecoveryStatus);
exports.RecoveryStatus = schema_utils_1.Type.KeyOfEnum(Enum_RecoveryStatus, { $id: 'RecoveryStatus' });
var Enum_Capability;
(function (Enum_Capability) {
    Enum_Capability[Enum_Capability["Capability_Bitcoin"] = 1] = "Capability_Bitcoin";
    Enum_Capability[Enum_Capability["Capability_Bitcoin_like"] = 2] = "Capability_Bitcoin_like";
    Enum_Capability[Enum_Capability["Capability_Binance"] = 3] = "Capability_Binance";
    Enum_Capability[Enum_Capability["Capability_Cardano"] = 4] = "Capability_Cardano";
    Enum_Capability[Enum_Capability["Capability_Crypto"] = 5] = "Capability_Crypto";
    Enum_Capability[Enum_Capability["Capability_EOS"] = 6] = "Capability_EOS";
    Enum_Capability[Enum_Capability["Capability_Ethereum"] = 7] = "Capability_Ethereum";
    Enum_Capability[Enum_Capability["Capability_Lisk"] = 8] = "Capability_Lisk";
    Enum_Capability[Enum_Capability["Capability_Monero"] = 9] = "Capability_Monero";
    Enum_Capability[Enum_Capability["Capability_NEM"] = 10] = "Capability_NEM";
    Enum_Capability[Enum_Capability["Capability_Ripple"] = 11] = "Capability_Ripple";
    Enum_Capability[Enum_Capability["Capability_Stellar"] = 12] = "Capability_Stellar";
    Enum_Capability[Enum_Capability["Capability_Tezos"] = 13] = "Capability_Tezos";
    Enum_Capability[Enum_Capability["Capability_U2F"] = 14] = "Capability_U2F";
    Enum_Capability[Enum_Capability["Capability_Shamir"] = 15] = "Capability_Shamir";
    Enum_Capability[Enum_Capability["Capability_ShamirGroups"] = 16] = "Capability_ShamirGroups";
    Enum_Capability[Enum_Capability["Capability_PassphraseEntry"] = 17] = "Capability_PassphraseEntry";
    Enum_Capability[Enum_Capability["Capability_Solana"] = 18] = "Capability_Solana";
    Enum_Capability[Enum_Capability["Capability_Translations"] = 19] = "Capability_Translations";
    Enum_Capability[Enum_Capability["Capability_Brightness"] = 20] = "Capability_Brightness";
    Enum_Capability[Enum_Capability["Capability_Haptic"] = 21] = "Capability_Haptic";
})(Enum_Capability || (exports.Enum_Capability = Enum_Capability = {}));
exports.EnumEnum_Capability = schema_utils_1.Type.Enum(Enum_Capability);
exports.Capability = schema_utils_1.Type.KeyOfEnum(Enum_Capability, { $id: 'Capability' });
var RecoveryDeviceInputMethod;
(function (RecoveryDeviceInputMethod) {
    RecoveryDeviceInputMethod[RecoveryDeviceInputMethod["ScrambledWords"] = 0] = "ScrambledWords";
    RecoveryDeviceInputMethod[RecoveryDeviceInputMethod["Matrix"] = 1] = "Matrix";
})(RecoveryDeviceInputMethod || (exports.RecoveryDeviceInputMethod = RecoveryDeviceInputMethod = {}));
exports.EnumRecoveryDeviceInputMethod = schema_utils_1.Type.Enum(RecoveryDeviceInputMethod);
var Enum_RecoveryType;
(function (Enum_RecoveryType) {
    Enum_RecoveryType[Enum_RecoveryType["NormalRecovery"] = 0] = "NormalRecovery";
    Enum_RecoveryType[Enum_RecoveryType["DryRun"] = 1] = "DryRun";
    Enum_RecoveryType[Enum_RecoveryType["UnlockRepeatedBackup"] = 2] = "UnlockRepeatedBackup";
})(Enum_RecoveryType || (exports.Enum_RecoveryType = Enum_RecoveryType = {}));
exports.EnumEnum_RecoveryType = schema_utils_1.Type.Enum(Enum_RecoveryType);
exports.RecoveryType = schema_utils_1.Type.KeyOfEnum(Enum_RecoveryType, { $id: 'RecoveryType' });
exports.RecoveryDevice = schema_utils_1.Type.Object({
    word_count: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    passphrase_protection: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    pin_protection: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    language: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    label: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    enforce_wordlist: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    input_method: schema_utils_1.Type.Optional(exports.EnumRecoveryDeviceInputMethod),
    u2f_counter: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    type: schema_utils_1.Type.Optional(exports.RecoveryType),
}, { $id: 'RecoveryDevice' });
exports.Features = schema_utils_1.Type.Object({
    vendor: schema_utils_1.Type.String(),
    major_version: schema_utils_1.Type.Number(),
    minor_version: schema_utils_1.Type.Number(),
    patch_version: schema_utils_1.Type.Number(),
    bootloader_mode: schema_utils_1.Type.Union([schema_utils_1.Type.Boolean(), schema_utils_1.Type.Null()]),
    device_id: schema_utils_1.Type.Union([schema_utils_1.Type.String(), schema_utils_1.Type.Null()]),
    pin_protection: schema_utils_1.Type.Union([schema_utils_1.Type.Boolean(), schema_utils_1.Type.Null()]),
    passphrase_protection: schema_utils_1.Type.Union([schema_utils_1.Type.Boolean(), schema_utils_1.Type.Null()]),
    language: schema_utils_1.Type.Union([schema_utils_1.Type.String(), schema_utils_1.Type.Null()]),
    label: schema_utils_1.Type.Union([schema_utils_1.Type.String(), schema_utils_1.Type.Null()]),
    initialized: schema_utils_1.Type.Union([schema_utils_1.Type.Boolean(), schema_utils_1.Type.Null()]),
    revision: schema_utils_1.Type.Union([schema_utils_1.Type.String(), schema_utils_1.Type.Null()]),
    bootloader_hash: schema_utils_1.Type.Union([schema_utils_1.Type.String(), schema_utils_1.Type.Null()]),
    imported: schema_utils_1.Type.Union([schema_utils_1.Type.Boolean(), schema_utils_1.Type.Null()]),
    unlocked: schema_utils_1.Type.Union([schema_utils_1.Type.Boolean(), schema_utils_1.Type.Null()]),
    _passphrase_cached: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    firmware_present: schema_utils_1.Type.Union([schema_utils_1.Type.Boolean(), schema_utils_1.Type.Null()]),
    backup_availability: schema_utils_1.Type.Union([exports.BackupAvailability, schema_utils_1.Type.Null()]),
    flags: schema_utils_1.Type.Union([schema_utils_1.Type.Number(), schema_utils_1.Type.Null()]),
    model: schema_utils_1.Type.String(),
    fw_major: schema_utils_1.Type.Union([schema_utils_1.Type.Number(), schema_utils_1.Type.Null()]),
    fw_minor: schema_utils_1.Type.Union([schema_utils_1.Type.Number(), schema_utils_1.Type.Null()]),
    fw_patch: schema_utils_1.Type.Union([schema_utils_1.Type.Number(), schema_utils_1.Type.Null()]),
    fw_vendor: schema_utils_1.Type.Union([schema_utils_1.Type.String(), schema_utils_1.Type.Null()]),
    unfinished_backup: schema_utils_1.Type.Union([schema_utils_1.Type.Boolean(), schema_utils_1.Type.Null()]),
    no_backup: schema_utils_1.Type.Union([schema_utils_1.Type.Boolean(), schema_utils_1.Type.Null()]),
    recovery_status: schema_utils_1.Type.Union([exports.RecoveryStatus, schema_utils_1.Type.Null()]),
    capabilities: schema_utils_1.Type.Array(exports.Capability),
    backup_type: schema_utils_1.Type.Union([exports.BackupType, schema_utils_1.Type.Null()]),
    sd_card_present: schema_utils_1.Type.Union([schema_utils_1.Type.Boolean(), schema_utils_1.Type.Null()]),
    sd_protection: schema_utils_1.Type.Union([schema_utils_1.Type.Boolean(), schema_utils_1.Type.Null()]),
    wipe_code_protection: schema_utils_1.Type.Union([schema_utils_1.Type.Boolean(), schema_utils_1.Type.Null()]),
    session_id: schema_utils_1.Type.Union([schema_utils_1.Type.String(), schema_utils_1.Type.Null()]),
    passphrase_always_on_device: schema_utils_1.Type.Union([schema_utils_1.Type.Boolean(), schema_utils_1.Type.Null()]),
    safety_checks: schema_utils_1.Type.Union([exports.SafetyCheckLevel, schema_utils_1.Type.Null()]),
    auto_lock_delay_ms: schema_utils_1.Type.Union([schema_utils_1.Type.Number(), schema_utils_1.Type.Null()]),
    display_rotation: schema_utils_1.Type.Union([exports.DisplayRotation, schema_utils_1.Type.Null()]),
    experimental_features: schema_utils_1.Type.Union([schema_utils_1.Type.Boolean(), schema_utils_1.Type.Null()]),
    busy: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    homescreen_format: schema_utils_1.Type.Optional(exports.HomescreenFormat),
    hide_passphrase_from_host: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    internal_model: exports.EnumDeviceModelInternal,
    unit_color: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    unit_btconly: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    homescreen_width: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    homescreen_height: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    bootloader_locked: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    language_version_matches: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    unit_packaging: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    haptic_feedback: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    recovery_type: schema_utils_1.Type.Optional(exports.RecoveryType),
    optiga_sec: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
}, { $id: 'Features' });
exports.LockDevice = schema_utils_1.Type.Object({}, { $id: 'LockDevice' });
exports.SetBusy = schema_utils_1.Type.Object({
    expiry_ms: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
}, { $id: 'SetBusy' });
exports.EndSession = schema_utils_1.Type.Object({}, { $id: 'EndSession' });
exports.ApplySettings = schema_utils_1.Type.Object({
    language: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    label: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    use_passphrase: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    homescreen: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    _passphrase_source: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    auto_lock_delay_ms: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    display_rotation: schema_utils_1.Type.Optional(schema_utils_1.Type.Union([exports.DisplayRotation, exports.EnumEnum_DisplayRotation])),
    passphrase_always_on_device: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    safety_checks: schema_utils_1.Type.Optional(exports.SafetyCheckLevel),
    experimental_features: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    hide_passphrase_from_host: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    haptic_feedback: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'ApplySettings' });
exports.ChangeLanguage = schema_utils_1.Type.Object({
    data_length: schema_utils_1.Type.Number(),
    show_display: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'ChangeLanguage' });
exports.TranslationDataRequest = schema_utils_1.Type.Object({
    data_length: schema_utils_1.Type.Number(),
    data_offset: schema_utils_1.Type.Number(),
}, { $id: 'TranslationDataRequest' });
exports.TranslationDataAck = schema_utils_1.Type.Object({
    data_chunk: schema_utils_1.Type.String(),
}, { $id: 'TranslationDataAck' });
exports.ApplyFlags = schema_utils_1.Type.Object({
    flags: schema_utils_1.Type.Number(),
}, { $id: 'ApplyFlags' });
exports.ChangePin = schema_utils_1.Type.Object({
    remove: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'ChangePin' });
exports.ChangeWipeCode = schema_utils_1.Type.Object({
    remove: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'ChangeWipeCode' });
var SdProtectOperationType;
(function (SdProtectOperationType) {
    SdProtectOperationType[SdProtectOperationType["DISABLE"] = 0] = "DISABLE";
    SdProtectOperationType[SdProtectOperationType["ENABLE"] = 1] = "ENABLE";
    SdProtectOperationType[SdProtectOperationType["REFRESH"] = 2] = "REFRESH";
})(SdProtectOperationType || (exports.SdProtectOperationType = SdProtectOperationType = {}));
exports.EnumSdProtectOperationType = schema_utils_1.Type.Enum(SdProtectOperationType);
exports.SdProtect = schema_utils_1.Type.Object({
    operation: exports.EnumSdProtectOperationType,
}, { $id: 'SdProtect' });
exports.Ping = schema_utils_1.Type.Object({
    message: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    button_protection: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'Ping' });
exports.Cancel = schema_utils_1.Type.Object({}, { $id: 'Cancel' });
exports.GetEntropy = schema_utils_1.Type.Object({
    size: schema_utils_1.Type.Number(),
}, { $id: 'GetEntropy' });
exports.Entropy = schema_utils_1.Type.Object({
    entropy: schema_utils_1.Type.String(),
}, { $id: 'Entropy' });
exports.GetFirmwareHash = schema_utils_1.Type.Object({
    challenge: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'GetFirmwareHash' });
exports.FirmwareHash = schema_utils_1.Type.Object({
    hash: schema_utils_1.Type.String(),
}, { $id: 'FirmwareHash' });
exports.AuthenticateDevice = schema_utils_1.Type.Object({
    challenge: schema_utils_1.Type.String(),
}, { $id: 'AuthenticateDevice' });
exports.AuthenticityProof = schema_utils_1.Type.Object({
    certificates: schema_utils_1.Type.Array(schema_utils_1.Type.String()),
    signature: schema_utils_1.Type.String(),
}, { $id: 'AuthenticityProof' });
exports.WipeDevice = schema_utils_1.Type.Object({}, { $id: 'WipeDevice' });
exports.LoadDevice = schema_utils_1.Type.Object({
    mnemonics: schema_utils_1.Type.Array(schema_utils_1.Type.String()),
    pin: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    passphrase_protection: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    language: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    label: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    skip_checksum: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    u2f_counter: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    needs_backup: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    no_backup: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'LoadDevice' });
exports.ResetDevice = schema_utils_1.Type.Object({
    strength: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    passphrase_protection: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    pin_protection: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    language: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    label: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    u2f_counter: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    skip_backup: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    no_backup: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    backup_type: schema_utils_1.Type.Optional(exports.EnumEnum_BackupType),
}, { $id: 'ResetDevice' });
exports.Slip39Group = schema_utils_1.Type.Object({
    member_threshold: schema_utils_1.Type.Number(),
    member_count: schema_utils_1.Type.Number(),
}, { $id: 'Slip39Group' });
exports.BackupDevice = schema_utils_1.Type.Object({
    group_threshold: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    groups: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.Slip39Group)),
}, { $id: 'BackupDevice' });
exports.EntropyRequest = schema_utils_1.Type.Object({}, { $id: 'EntropyRequest' });
exports.EntropyAck = schema_utils_1.Type.Object({
    entropy: schema_utils_1.Type.String(),
}, { $id: 'EntropyAck' });
var Enum_WordRequestType;
(function (Enum_WordRequestType) {
    Enum_WordRequestType[Enum_WordRequestType["WordRequestType_Plain"] = 0] = "WordRequestType_Plain";
    Enum_WordRequestType[Enum_WordRequestType["WordRequestType_Matrix9"] = 1] = "WordRequestType_Matrix9";
    Enum_WordRequestType[Enum_WordRequestType["WordRequestType_Matrix6"] = 2] = "WordRequestType_Matrix6";
})(Enum_WordRequestType || (exports.Enum_WordRequestType = Enum_WordRequestType = {}));
exports.EnumEnum_WordRequestType = schema_utils_1.Type.Enum(Enum_WordRequestType);
exports.WordRequestType = schema_utils_1.Type.KeyOfEnum(Enum_WordRequestType, { $id: 'WordRequestType' });
exports.WordRequest = schema_utils_1.Type.Object({
    type: exports.WordRequestType,
}, { $id: 'WordRequest' });
exports.WordAck = schema_utils_1.Type.Object({
    word: schema_utils_1.Type.String(),
}, { $id: 'WordAck' });
exports.SetU2FCounter = schema_utils_1.Type.Object({
    u2f_counter: schema_utils_1.Type.Number(),
}, { $id: 'SetU2FCounter' });
exports.GetNextU2FCounter = schema_utils_1.Type.Object({}, { $id: 'GetNextU2FCounter' });
exports.NextU2FCounter = schema_utils_1.Type.Object({
    u2f_counter: schema_utils_1.Type.Number(),
}, { $id: 'NextU2FCounter' });
exports.DoPreauthorized = schema_utils_1.Type.Object({}, { $id: 'DoPreauthorized' });
exports.PreauthorizedRequest = schema_utils_1.Type.Object({}, { $id: 'PreauthorizedRequest' });
exports.CancelAuthorization = schema_utils_1.Type.Object({}, { $id: 'CancelAuthorization' });
var BootCommand;
(function (BootCommand) {
    BootCommand[BootCommand["STOP_AND_WAIT"] = 0] = "STOP_AND_WAIT";
    BootCommand[BootCommand["INSTALL_UPGRADE"] = 1] = "INSTALL_UPGRADE";
})(BootCommand || (exports.BootCommand = BootCommand = {}));
exports.EnumBootCommand = schema_utils_1.Type.Enum(BootCommand);
exports.RebootToBootloader = schema_utils_1.Type.Object({
    boot_command: schema_utils_1.Type.Optional(exports.EnumBootCommand),
    firmware_header: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    language_data_length: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
}, { $id: 'RebootToBootloader' });
exports.GetNonce = schema_utils_1.Type.Object({}, { $id: 'GetNonce' });
exports.Nonce = schema_utils_1.Type.Object({
    nonce: schema_utils_1.Type.String(),
}, { $id: 'Nonce' });
exports.UnlockPath = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    mac: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'UnlockPath' });
exports.UnlockedPathRequest = schema_utils_1.Type.Object({
    mac: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'UnlockedPathRequest' });
exports.ShowDeviceTutorial = schema_utils_1.Type.Object({}, { $id: 'ShowDeviceTutorial' });
exports.UnlockBootloader = schema_utils_1.Type.Object({}, { $id: 'UnlockBootloader' });
exports.SetBrightness = schema_utils_1.Type.Object({
    value: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
}, { $id: 'SetBrightness' });
exports.NEMGetAddress = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    network: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    show_display: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'NEMGetAddress' });
exports.NEMAddress = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
}, { $id: 'NEMAddress' });
exports.NEMTransactionCommon = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(schema_utils_1.Type.Number())),
    network: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    timestamp: schema_utils_1.Type.Number(),
    fee: schema_utils_1.Type.Uint(),
    deadline: schema_utils_1.Type.Number(),
    signer: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'NEMTransactionCommon' });
exports.NEMMosaic = schema_utils_1.Type.Object({
    namespace: schema_utils_1.Type.String(),
    mosaic: schema_utils_1.Type.String(),
    quantity: schema_utils_1.Type.Number(),
}, { $id: 'NEMMosaic' });
exports.NEMTransfer = schema_utils_1.Type.Object({
    recipient: schema_utils_1.Type.String(),
    amount: schema_utils_1.Type.Uint(),
    payload: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    public_key: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    mosaics: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.NEMMosaic)),
}, { $id: 'NEMTransfer' });
exports.NEMProvisionNamespace = schema_utils_1.Type.Object({
    namespace: schema_utils_1.Type.String(),
    parent: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    sink: schema_utils_1.Type.String(),
    fee: schema_utils_1.Type.Uint(),
}, { $id: 'NEMProvisionNamespace' });
var NEMMosaicLevy;
(function (NEMMosaicLevy) {
    NEMMosaicLevy[NEMMosaicLevy["MosaicLevy_Absolute"] = 1] = "MosaicLevy_Absolute";
    NEMMosaicLevy[NEMMosaicLevy["MosaicLevy_Percentile"] = 2] = "MosaicLevy_Percentile";
})(NEMMosaicLevy || (exports.NEMMosaicLevy = NEMMosaicLevy = {}));
exports.EnumNEMMosaicLevy = schema_utils_1.Type.Enum(NEMMosaicLevy);
exports.NEMMosaicDefinition = schema_utils_1.Type.Object({
    name: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    ticker: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    namespace: schema_utils_1.Type.String(),
    mosaic: schema_utils_1.Type.String(),
    divisibility: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    levy: schema_utils_1.Type.Optional(exports.EnumNEMMosaicLevy),
    fee: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    levy_address: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    levy_namespace: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    levy_mosaic: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    supply: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    mutable_supply: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    transferable: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    description: schema_utils_1.Type.String(),
    networks: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(schema_utils_1.Type.Number())),
}, { $id: 'NEMMosaicDefinition' });
exports.NEMMosaicCreation = schema_utils_1.Type.Object({
    definition: exports.NEMMosaicDefinition,
    sink: schema_utils_1.Type.String(),
    fee: schema_utils_1.Type.Uint(),
}, { $id: 'NEMMosaicCreation' });
var NEMSupplyChangeType;
(function (NEMSupplyChangeType) {
    NEMSupplyChangeType[NEMSupplyChangeType["SupplyChange_Increase"] = 1] = "SupplyChange_Increase";
    NEMSupplyChangeType[NEMSupplyChangeType["SupplyChange_Decrease"] = 2] = "SupplyChange_Decrease";
})(NEMSupplyChangeType || (exports.NEMSupplyChangeType = NEMSupplyChangeType = {}));
exports.EnumNEMSupplyChangeType = schema_utils_1.Type.Enum(NEMSupplyChangeType);
exports.NEMMosaicSupplyChange = schema_utils_1.Type.Object({
    namespace: schema_utils_1.Type.String(),
    mosaic: schema_utils_1.Type.String(),
    type: exports.EnumNEMSupplyChangeType,
    delta: schema_utils_1.Type.Number(),
}, { $id: 'NEMMosaicSupplyChange' });
var NEMModificationType;
(function (NEMModificationType) {
    NEMModificationType[NEMModificationType["CosignatoryModification_Add"] = 1] = "CosignatoryModification_Add";
    NEMModificationType[NEMModificationType["CosignatoryModification_Delete"] = 2] = "CosignatoryModification_Delete";
})(NEMModificationType || (exports.NEMModificationType = NEMModificationType = {}));
exports.EnumNEMModificationType = schema_utils_1.Type.Enum(NEMModificationType);
exports.NEMCosignatoryModification = schema_utils_1.Type.Object({
    type: exports.EnumNEMModificationType,
    public_key: schema_utils_1.Type.String(),
}, { $id: 'NEMCosignatoryModification' });
exports.NEMAggregateModification = schema_utils_1.Type.Object({
    modifications: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.NEMCosignatoryModification)),
    relative_change: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
}, { $id: 'NEMAggregateModification' });
var NEMImportanceTransferMode;
(function (NEMImportanceTransferMode) {
    NEMImportanceTransferMode[NEMImportanceTransferMode["ImportanceTransfer_Activate"] = 1] = "ImportanceTransfer_Activate";
    NEMImportanceTransferMode[NEMImportanceTransferMode["ImportanceTransfer_Deactivate"] = 2] = "ImportanceTransfer_Deactivate";
})(NEMImportanceTransferMode || (exports.NEMImportanceTransferMode = NEMImportanceTransferMode = {}));
exports.EnumNEMImportanceTransferMode = schema_utils_1.Type.Enum(NEMImportanceTransferMode);
exports.NEMImportanceTransfer = schema_utils_1.Type.Object({
    mode: exports.EnumNEMImportanceTransferMode,
    public_key: schema_utils_1.Type.String(),
}, { $id: 'NEMImportanceTransfer' });
exports.NEMSignTx = schema_utils_1.Type.Object({
    transaction: exports.NEMTransactionCommon,
    multisig: schema_utils_1.Type.Optional(exports.NEMTransactionCommon),
    transfer: schema_utils_1.Type.Optional(exports.NEMTransfer),
    cosigning: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    provision_namespace: schema_utils_1.Type.Optional(exports.NEMProvisionNamespace),
    mosaic_creation: schema_utils_1.Type.Optional(exports.NEMMosaicCreation),
    supply_change: schema_utils_1.Type.Optional(exports.NEMMosaicSupplyChange),
    aggregate_modification: schema_utils_1.Type.Optional(exports.NEMAggregateModification),
    importance_transfer: schema_utils_1.Type.Optional(exports.NEMImportanceTransfer),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'NEMSignTx' });
exports.NEMSignedTx = schema_utils_1.Type.Object({
    data: schema_utils_1.Type.String(),
    signature: schema_utils_1.Type.String(),
}, { $id: 'NEMSignedTx' });
exports.NEMDecryptMessage = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    network: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    public_key: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    payload: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'NEMDecryptMessage' });
exports.NEMDecryptedMessage = schema_utils_1.Type.Object({
    payload: schema_utils_1.Type.String(),
}, { $id: 'NEMDecryptedMessage' });
exports.RippleGetAddress = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    show_display: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'RippleGetAddress' });
exports.RippleAddress = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
}, { $id: 'RippleAddress' });
exports.RipplePayment = schema_utils_1.Type.Object({
    amount: schema_utils_1.Type.Uint(),
    destination: schema_utils_1.Type.String(),
    destination_tag: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
}, { $id: 'RipplePayment' });
exports.RippleSignTx = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    fee: schema_utils_1.Type.Uint(),
    flags: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    sequence: schema_utils_1.Type.Number(),
    last_ledger_sequence: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    payment: exports.RipplePayment,
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'RippleSignTx' });
exports.RippleSignedTx = schema_utils_1.Type.Object({
    signature: schema_utils_1.Type.String(),
    serialized_tx: schema_utils_1.Type.String(),
}, { $id: 'RippleSignedTx' });
exports.SolanaGetPublicKey = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    show_display: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'SolanaGetPublicKey' });
exports.SolanaPublicKey = schema_utils_1.Type.Object({
    public_key: schema_utils_1.Type.String(),
}, { $id: 'SolanaPublicKey' });
exports.SolanaGetAddress = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    show_display: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'SolanaGetAddress' });
exports.SolanaAddress = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
}, { $id: 'SolanaAddress' });
exports.SolanaTxTokenAccountInfo = schema_utils_1.Type.Object({
    base_address: schema_utils_1.Type.String(),
    token_program: schema_utils_1.Type.String(),
    token_mint: schema_utils_1.Type.String(),
    token_account: schema_utils_1.Type.String(),
}, { $id: 'SolanaTxTokenAccountInfo' });
exports.SolanaTxAdditionalInfo = schema_utils_1.Type.Object({
    token_accounts_infos: schema_utils_1.Type.Array(exports.SolanaTxTokenAccountInfo),
}, { $id: 'SolanaTxAdditionalInfo' });
exports.SolanaSignTx = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    serialized_tx: schema_utils_1.Type.String(),
    additional_info: schema_utils_1.Type.Optional(exports.SolanaTxAdditionalInfo),
}, { $id: 'SolanaSignTx' });
exports.SolanaTxSignature = schema_utils_1.Type.Object({
    signature: schema_utils_1.Type.String(),
}, { $id: 'SolanaTxSignature' });
var StellarAssetType;
(function (StellarAssetType) {
    StellarAssetType[StellarAssetType["NATIVE"] = 0] = "NATIVE";
    StellarAssetType[StellarAssetType["ALPHANUM4"] = 1] = "ALPHANUM4";
    StellarAssetType[StellarAssetType["ALPHANUM12"] = 2] = "ALPHANUM12";
})(StellarAssetType || (exports.StellarAssetType = StellarAssetType = {}));
exports.EnumStellarAssetType = schema_utils_1.Type.Enum(StellarAssetType);
exports.StellarAsset = schema_utils_1.Type.Object({
    type: schema_utils_1.Type.Union([
        schema_utils_1.Type.Literal(0),
        schema_utils_1.Type.Literal(1),
        schema_utils_1.Type.Literal(2),
        schema_utils_1.Type.Literal('NATIVE'),
        schema_utils_1.Type.Literal('ALPHANUM4'),
        schema_utils_1.Type.Literal('ALPHANUM12'),
    ]),
    code: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    issuer: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}, { $id: 'StellarAsset' });
exports.StellarGetAddress = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    show_display: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'StellarGetAddress' });
exports.StellarAddress = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
}, { $id: 'StellarAddress' });
var StellarMemoType;
(function (StellarMemoType) {
    StellarMemoType[StellarMemoType["NONE"] = 0] = "NONE";
    StellarMemoType[StellarMemoType["TEXT"] = 1] = "TEXT";
    StellarMemoType[StellarMemoType["ID"] = 2] = "ID";
    StellarMemoType[StellarMemoType["HASH"] = 3] = "HASH";
    StellarMemoType[StellarMemoType["RETURN"] = 4] = "RETURN";
})(StellarMemoType || (exports.StellarMemoType = StellarMemoType = {}));
exports.EnumStellarMemoType = schema_utils_1.Type.Enum(StellarMemoType);
exports.StellarSignTx = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    network_passphrase: schema_utils_1.Type.String(),
    source_account: schema_utils_1.Type.String(),
    fee: schema_utils_1.Type.Uint(),
    sequence_number: schema_utils_1.Type.Uint(),
    timebounds_start: schema_utils_1.Type.Number(),
    timebounds_end: schema_utils_1.Type.Number(),
    memo_type: exports.EnumStellarMemoType,
    memo_text: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    memo_id: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    memo_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.Union([schema_utils_1.Type.Buffer(), schema_utils_1.Type.String()])),
    num_operations: schema_utils_1.Type.Number(),
}, { $id: 'StellarSignTx' });
exports.StellarTxOpRequest = schema_utils_1.Type.Object({}, { $id: 'StellarTxOpRequest' });
exports.StellarPaymentOp = schema_utils_1.Type.Object({
    source_account: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    destination_account: schema_utils_1.Type.String(),
    asset: exports.StellarAsset,
    amount: schema_utils_1.Type.Uint(),
}, { $id: 'StellarPaymentOp' });
exports.StellarCreateAccountOp = schema_utils_1.Type.Object({
    source_account: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    new_account: schema_utils_1.Type.String(),
    starting_balance: schema_utils_1.Type.Uint(),
}, { $id: 'StellarCreateAccountOp' });
exports.StellarPathPaymentStrictReceiveOp = schema_utils_1.Type.Object({
    source_account: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    send_asset: exports.StellarAsset,
    send_max: schema_utils_1.Type.Uint(),
    destination_account: schema_utils_1.Type.String(),
    destination_asset: exports.StellarAsset,
    destination_amount: schema_utils_1.Type.Uint(),
    paths: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.StellarAsset)),
}, { $id: 'StellarPathPaymentStrictReceiveOp' });
exports.StellarPathPaymentStrictSendOp = schema_utils_1.Type.Object({
    source_account: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    send_asset: exports.StellarAsset,
    send_amount: schema_utils_1.Type.Uint(),
    destination_account: schema_utils_1.Type.String(),
    destination_asset: exports.StellarAsset,
    destination_min: schema_utils_1.Type.Uint(),
    paths: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.StellarAsset)),
}, { $id: 'StellarPathPaymentStrictSendOp' });
exports.StellarManageSellOfferOp = schema_utils_1.Type.Object({
    source_account: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    selling_asset: exports.StellarAsset,
    buying_asset: exports.StellarAsset,
    amount: schema_utils_1.Type.Uint(),
    price_n: schema_utils_1.Type.Number(),
    price_d: schema_utils_1.Type.Number(),
    offer_id: schema_utils_1.Type.Uint(),
}, { $id: 'StellarManageSellOfferOp' });
exports.StellarManageBuyOfferOp = schema_utils_1.Type.Object({
    source_account: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    selling_asset: exports.StellarAsset,
    buying_asset: exports.StellarAsset,
    amount: schema_utils_1.Type.Uint(),
    price_n: schema_utils_1.Type.Number(),
    price_d: schema_utils_1.Type.Number(),
    offer_id: schema_utils_1.Type.Uint(),
}, { $id: 'StellarManageBuyOfferOp' });
exports.StellarCreatePassiveSellOfferOp = schema_utils_1.Type.Object({
    source_account: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    selling_asset: exports.StellarAsset,
    buying_asset: exports.StellarAsset,
    amount: schema_utils_1.Type.Uint(),
    price_n: schema_utils_1.Type.Number(),
    price_d: schema_utils_1.Type.Number(),
}, { $id: 'StellarCreatePassiveSellOfferOp' });
var StellarSignerType;
(function (StellarSignerType) {
    StellarSignerType[StellarSignerType["ACCOUNT"] = 0] = "ACCOUNT";
    StellarSignerType[StellarSignerType["PRE_AUTH"] = 1] = "PRE_AUTH";
    StellarSignerType[StellarSignerType["HASH"] = 2] = "HASH";
})(StellarSignerType || (exports.StellarSignerType = StellarSignerType = {}));
exports.EnumStellarSignerType = schema_utils_1.Type.Enum(StellarSignerType);
exports.StellarSetOptionsOp = schema_utils_1.Type.Object({
    source_account: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    inflation_destination_account: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    clear_flags: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    set_flags: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    master_weight: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    low_threshold: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    medium_threshold: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    high_threshold: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    home_domain: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    signer_type: schema_utils_1.Type.Optional(exports.EnumStellarSignerType),
    signer_key: schema_utils_1.Type.Optional(schema_utils_1.Type.Union([schema_utils_1.Type.Buffer(), schema_utils_1.Type.String()])),
    signer_weight: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
}, { $id: 'StellarSetOptionsOp' });
exports.StellarChangeTrustOp = schema_utils_1.Type.Object({
    source_account: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    asset: exports.StellarAsset,
    limit: schema_utils_1.Type.Uint(),
}, { $id: 'StellarChangeTrustOp' });
exports.StellarAllowTrustOp = schema_utils_1.Type.Object({
    source_account: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    trusted_account: schema_utils_1.Type.String(),
    asset_type: exports.EnumStellarAssetType,
    asset_code: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    is_authorized: schema_utils_1.Type.Boolean(),
}, { $id: 'StellarAllowTrustOp' });
exports.StellarAccountMergeOp = schema_utils_1.Type.Object({
    source_account: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    destination_account: schema_utils_1.Type.String(),
}, { $id: 'StellarAccountMergeOp' });
exports.StellarManageDataOp = schema_utils_1.Type.Object({
    source_account: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    key: schema_utils_1.Type.String(),
    value: schema_utils_1.Type.Optional(schema_utils_1.Type.Union([schema_utils_1.Type.Buffer(), schema_utils_1.Type.String()])),
}, { $id: 'StellarManageDataOp' });
exports.StellarBumpSequenceOp = schema_utils_1.Type.Object({
    source_account: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    bump_to: schema_utils_1.Type.Uint(),
}, { $id: 'StellarBumpSequenceOp' });
exports.StellarClaimClaimableBalanceOp = schema_utils_1.Type.Object({
    source_account: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    balance_id: schema_utils_1.Type.String(),
}, { $id: 'StellarClaimClaimableBalanceOp' });
exports.StellarSignedTx = schema_utils_1.Type.Object({
    public_key: schema_utils_1.Type.String(),
    signature: schema_utils_1.Type.String(),
}, { $id: 'StellarSignedTx' });
exports.TezosGetAddress = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    show_display: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'TezosGetAddress' });
exports.TezosAddress = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
}, { $id: 'TezosAddress' });
exports.TezosGetPublicKey = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    show_display: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'TezosGetPublicKey' });
exports.TezosPublicKey = schema_utils_1.Type.Object({
    public_key: schema_utils_1.Type.String(),
}, { $id: 'TezosPublicKey' });
var TezosContractType;
(function (TezosContractType) {
    TezosContractType[TezosContractType["Implicit"] = 0] = "Implicit";
    TezosContractType[TezosContractType["Originated"] = 1] = "Originated";
})(TezosContractType || (exports.TezosContractType = TezosContractType = {}));
exports.EnumTezosContractType = schema_utils_1.Type.Enum(TezosContractType);
exports.TezosContractID = schema_utils_1.Type.Object({
    tag: schema_utils_1.Type.Number(),
    hash: schema_utils_1.Type.Uint8Array(),
}, { $id: 'TezosContractID' });
exports.TezosRevealOp = schema_utils_1.Type.Object({
    source: schema_utils_1.Type.Uint8Array(),
    fee: schema_utils_1.Type.Uint(),
    counter: schema_utils_1.Type.Number(),
    gas_limit: schema_utils_1.Type.Number(),
    storage_limit: schema_utils_1.Type.Number(),
    public_key: schema_utils_1.Type.Uint8Array(),
}, { $id: 'TezosRevealOp' });
exports.TezosManagerTransfer = schema_utils_1.Type.Object({
    destination: exports.TezosContractID,
    amount: schema_utils_1.Type.Uint(),
}, { $id: 'TezosManagerTransfer' });
exports.TezosParametersManager = schema_utils_1.Type.Object({
    set_delegate: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint8Array()),
    cancel_delegate: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    transfer: schema_utils_1.Type.Optional(exports.TezosManagerTransfer),
}, { $id: 'TezosParametersManager' });
exports.TezosTransactionOp = schema_utils_1.Type.Object({
    source: schema_utils_1.Type.Uint8Array(),
    fee: schema_utils_1.Type.Uint(),
    counter: schema_utils_1.Type.Number(),
    gas_limit: schema_utils_1.Type.Number(),
    storage_limit: schema_utils_1.Type.Number(),
    amount: schema_utils_1.Type.Uint(),
    destination: exports.TezosContractID,
    parameters: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(schema_utils_1.Type.Number())),
    parameters_manager: schema_utils_1.Type.Optional(exports.TezosParametersManager),
}, { $id: 'TezosTransactionOp' });
exports.TezosOriginationOp = schema_utils_1.Type.Object({
    source: schema_utils_1.Type.Uint8Array(),
    fee: schema_utils_1.Type.Uint(),
    counter: schema_utils_1.Type.Number(),
    gas_limit: schema_utils_1.Type.Number(),
    storage_limit: schema_utils_1.Type.Number(),
    manager_pubkey: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    balance: schema_utils_1.Type.Number(),
    spendable: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    delegatable: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    delegate: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint8Array()),
    script: schema_utils_1.Type.Union([schema_utils_1.Type.String(), schema_utils_1.Type.Array(schema_utils_1.Type.Number())]),
}, { $id: 'TezosOriginationOp' });
exports.TezosDelegationOp = schema_utils_1.Type.Object({
    source: schema_utils_1.Type.Uint8Array(),
    fee: schema_utils_1.Type.Uint(),
    counter: schema_utils_1.Type.Number(),
    gas_limit: schema_utils_1.Type.Number(),
    storage_limit: schema_utils_1.Type.Number(),
    delegate: schema_utils_1.Type.Uint8Array(),
}, { $id: 'TezosDelegationOp' });
exports.TezosProposalOp = schema_utils_1.Type.Object({
    source: schema_utils_1.Type.String(),
    period: schema_utils_1.Type.Number(),
    proposals: schema_utils_1.Type.Array(schema_utils_1.Type.String()),
}, { $id: 'TezosProposalOp' });
var TezosBallotType;
(function (TezosBallotType) {
    TezosBallotType[TezosBallotType["Yay"] = 0] = "Yay";
    TezosBallotType[TezosBallotType["Nay"] = 1] = "Nay";
    TezosBallotType[TezosBallotType["Pass"] = 2] = "Pass";
})(TezosBallotType || (exports.TezosBallotType = TezosBallotType = {}));
exports.EnumTezosBallotType = schema_utils_1.Type.Enum(TezosBallotType);
exports.TezosBallotOp = schema_utils_1.Type.Object({
    source: schema_utils_1.Type.String(),
    period: schema_utils_1.Type.Number(),
    proposal: schema_utils_1.Type.String(),
    ballot: exports.EnumTezosBallotType,
}, { $id: 'TezosBallotOp' });
exports.TezosSignTx = schema_utils_1.Type.Object({
    address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
    branch: schema_utils_1.Type.Uint8Array(),
    reveal: schema_utils_1.Type.Optional(exports.TezosRevealOp),
    transaction: schema_utils_1.Type.Optional(exports.TezosTransactionOp),
    origination: schema_utils_1.Type.Optional(exports.TezosOriginationOp),
    delegation: schema_utils_1.Type.Optional(exports.TezosDelegationOp),
    proposal: schema_utils_1.Type.Optional(exports.TezosProposalOp),
    ballot: schema_utils_1.Type.Optional(exports.TezosBallotOp),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
}, { $id: 'TezosSignTx' });
exports.TezosSignedTx = schema_utils_1.Type.Object({
    signature: schema_utils_1.Type.String(),
    sig_op_contents: schema_utils_1.Type.String(),
    operation_hash: schema_utils_1.Type.String(),
}, { $id: 'TezosSignedTx' });
exports.MessageType = schema_utils_1.Type.Object({
    BinanceGetAddress: exports.BinanceGetAddress,
    BinanceAddress: exports.BinanceAddress,
    BinanceGetPublicKey: exports.BinanceGetPublicKey,
    BinancePublicKey: exports.BinancePublicKey,
    BinanceSignTx: exports.BinanceSignTx,
    BinanceTxRequest: exports.BinanceTxRequest,
    BinanceCoin: exports.BinanceCoin,
    BinanceInputOutput: exports.BinanceInputOutput,
    BinanceTransferMsg: exports.BinanceTransferMsg,
    BinanceOrderMsg: exports.BinanceOrderMsg,
    BinanceCancelMsg: exports.BinanceCancelMsg,
    BinanceSignedTx: exports.BinanceSignedTx,
    HDNodeType: exports.HDNodeType,
    HDNodePathType: exports.HDNodePathType,
    MultisigRedeemScriptType: exports.MultisigRedeemScriptType,
    GetPublicKey: exports.GetPublicKey,
    PublicKey: exports.PublicKey,
    GetAddress: exports.GetAddress,
    Address: exports.Address,
    GetOwnershipId: exports.GetOwnershipId,
    OwnershipId: exports.OwnershipId,
    SignMessage: exports.SignMessage,
    MessageSignature: exports.MessageSignature,
    VerifyMessage: exports.VerifyMessage,
    CoinJoinRequest: exports.CoinJoinRequest,
    SignTx: exports.SignTx,
    TxRequestDetailsType: exports.TxRequestDetailsType,
    TxRequestSerializedType: exports.TxRequestSerializedType,
    TxRequest: exports.TxRequest,
    TxInputType: exports.TxInputType,
    TxOutputBinType: exports.TxOutputBinType,
    TxOutputType: exports.TxOutputType,
    PrevTx: exports.PrevTx,
    PrevInput: exports.PrevInput,
    PrevOutput: exports.PrevOutput,
    TextMemo: exports.TextMemo,
    RefundMemo: exports.RefundMemo,
    CoinPurchaseMemo: exports.CoinPurchaseMemo,
    PaymentRequestMemo: exports.PaymentRequestMemo,
    TxAckPaymentRequest: exports.TxAckPaymentRequest,
    TxAck: exports.TxAck,
    TxAckInputWrapper: exports.TxAckInputWrapper,
    TxAckInput: exports.TxAckInput,
    TxAckOutputWrapper: exports.TxAckOutputWrapper,
    TxAckOutput: exports.TxAckOutput,
    TxAckPrevMeta: exports.TxAckPrevMeta,
    TxAckPrevInputWrapper: exports.TxAckPrevInputWrapper,
    TxAckPrevInput: exports.TxAckPrevInput,
    TxAckPrevOutputWrapper: exports.TxAckPrevOutputWrapper,
    TxAckPrevOutput: exports.TxAckPrevOutput,
    TxAckPrevExtraDataWrapper: exports.TxAckPrevExtraDataWrapper,
    TxAckPrevExtraData: exports.TxAckPrevExtraData,
    GetOwnershipProof: exports.GetOwnershipProof,
    OwnershipProof: exports.OwnershipProof,
    AuthorizeCoinJoin: exports.AuthorizeCoinJoin,
    FirmwareErase: exports.FirmwareErase,
    FirmwareRequest: exports.FirmwareRequest,
    FirmwareUpload: exports.FirmwareUpload,
    ProdTestT1: exports.ProdTestT1,
    CardanoBlockchainPointerType: exports.CardanoBlockchainPointerType,
    CardanoNativeScript: exports.CardanoNativeScript,
    CardanoGetNativeScriptHash: exports.CardanoGetNativeScriptHash,
    CardanoNativeScriptHash: exports.CardanoNativeScriptHash,
    CardanoAddressParametersType: exports.CardanoAddressParametersType,
    CardanoGetAddress: exports.CardanoGetAddress,
    CardanoAddress: exports.CardanoAddress,
    CardanoGetPublicKey: exports.CardanoGetPublicKey,
    CardanoPublicKey: exports.CardanoPublicKey,
    CardanoSignTxInit: exports.CardanoSignTxInit,
    CardanoTxInput: exports.CardanoTxInput,
    CardanoTxOutput: exports.CardanoTxOutput,
    CardanoAssetGroup: exports.CardanoAssetGroup,
    CardanoToken: exports.CardanoToken,
    CardanoTxInlineDatumChunk: exports.CardanoTxInlineDatumChunk,
    CardanoTxReferenceScriptChunk: exports.CardanoTxReferenceScriptChunk,
    CardanoPoolOwner: exports.CardanoPoolOwner,
    CardanoPoolRelayParameters: exports.CardanoPoolRelayParameters,
    CardanoPoolMetadataType: exports.CardanoPoolMetadataType,
    CardanoPoolParametersType: exports.CardanoPoolParametersType,
    CardanoDRep: exports.CardanoDRep,
    CardanoTxCertificate: exports.CardanoTxCertificate,
    CardanoTxWithdrawal: exports.CardanoTxWithdrawal,
    CardanoCVoteRegistrationDelegation: exports.CardanoCVoteRegistrationDelegation,
    CardanoCVoteRegistrationParametersType: exports.CardanoCVoteRegistrationParametersType,
    CardanoTxAuxiliaryData: exports.CardanoTxAuxiliaryData,
    CardanoTxMint: exports.CardanoTxMint,
    CardanoTxCollateralInput: exports.CardanoTxCollateralInput,
    CardanoTxRequiredSigner: exports.CardanoTxRequiredSigner,
    CardanoTxReferenceInput: exports.CardanoTxReferenceInput,
    CardanoTxItemAck: exports.CardanoTxItemAck,
    CardanoTxAuxiliaryDataSupplement: exports.CardanoTxAuxiliaryDataSupplement,
    CardanoTxWitnessRequest: exports.CardanoTxWitnessRequest,
    CardanoTxWitnessResponse: exports.CardanoTxWitnessResponse,
    CardanoTxHostAck: exports.CardanoTxHostAck,
    CardanoTxBodyHash: exports.CardanoTxBodyHash,
    CardanoSignTxFinished: exports.CardanoSignTxFinished,
    Success: exports.Success,
    Failure: exports.Failure,
    ButtonRequest: exports.ButtonRequest,
    ButtonAck: exports.ButtonAck,
    PinMatrixRequest: exports.PinMatrixRequest,
    PinMatrixAck: exports.PinMatrixAck,
    PassphraseRequest: exports.PassphraseRequest,
    PassphraseAck: exports.PassphraseAck,
    Deprecated_PassphraseStateRequest: exports.Deprecated_PassphraseStateRequest,
    Deprecated_PassphraseStateAck: exports.Deprecated_PassphraseStateAck,
    CipherKeyValue: exports.CipherKeyValue,
    CipheredKeyValue: exports.CipheredKeyValue,
    IdentityType: exports.IdentityType,
    SignIdentity: exports.SignIdentity,
    SignedIdentity: exports.SignedIdentity,
    GetECDHSessionKey: exports.GetECDHSessionKey,
    ECDHSessionKey: exports.ECDHSessionKey,
    DebugLinkResetDebugEvents: exports.DebugLinkResetDebugEvents,
    DebugLinkOptigaSetSecMax: exports.DebugLinkOptigaSetSecMax,
    EosGetPublicKey: exports.EosGetPublicKey,
    EosPublicKey: exports.EosPublicKey,
    EosTxHeader: exports.EosTxHeader,
    EosSignTx: exports.EosSignTx,
    EosTxActionRequest: exports.EosTxActionRequest,
    EosAsset: exports.EosAsset,
    EosPermissionLevel: exports.EosPermissionLevel,
    EosAuthorizationKey: exports.EosAuthorizationKey,
    EosAuthorizationAccount: exports.EosAuthorizationAccount,
    EosAuthorizationWait: exports.EosAuthorizationWait,
    EosAuthorization: exports.EosAuthorization,
    EosActionCommon: exports.EosActionCommon,
    EosActionTransfer: exports.EosActionTransfer,
    EosActionDelegate: exports.EosActionDelegate,
    EosActionUndelegate: exports.EosActionUndelegate,
    EosActionRefund: exports.EosActionRefund,
    EosActionBuyRam: exports.EosActionBuyRam,
    EosActionBuyRamBytes: exports.EosActionBuyRamBytes,
    EosActionSellRam: exports.EosActionSellRam,
    EosActionVoteProducer: exports.EosActionVoteProducer,
    EosActionUpdateAuth: exports.EosActionUpdateAuth,
    EosActionDeleteAuth: exports.EosActionDeleteAuth,
    EosActionLinkAuth: exports.EosActionLinkAuth,
    EosActionUnlinkAuth: exports.EosActionUnlinkAuth,
    EosActionNewAccount: exports.EosActionNewAccount,
    EosActionUnknown: exports.EosActionUnknown,
    EosTxActionAck: exports.EosTxActionAck,
    EosSignedTx: exports.EosSignedTx,
    EthereumNetworkInfo: exports.EthereumNetworkInfo,
    EthereumTokenInfo: exports.EthereumTokenInfo,
    EthereumDefinitions: exports.EthereumDefinitions,
    EthereumSignTypedData: exports.EthereumSignTypedData,
    EthereumTypedDataStructRequest: exports.EthereumTypedDataStructRequest,
    EthereumFieldType: exports.EthereumFieldType,
    EthereumStructMember: exports.EthereumStructMember,
    EthereumTypedDataStructAck: exports.EthereumTypedDataStructAck,
    EthereumTypedDataValueRequest: exports.EthereumTypedDataValueRequest,
    EthereumTypedDataValueAck: exports.EthereumTypedDataValueAck,
    EthereumGetPublicKey: exports.EthereumGetPublicKey,
    EthereumPublicKey: exports.EthereumPublicKey,
    EthereumGetAddress: exports.EthereumGetAddress,
    EthereumAddress: exports.EthereumAddress,
    EthereumSignTx: exports.EthereumSignTx,
    EthereumAccessList: exports.EthereumAccessList,
    EthereumSignTxEIP1559: exports.EthereumSignTxEIP1559,
    EthereumTxRequest: exports.EthereumTxRequest,
    EthereumTxAck: exports.EthereumTxAck,
    EthereumSignMessage: exports.EthereumSignMessage,
    EthereumMessageSignature: exports.EthereumMessageSignature,
    EthereumVerifyMessage: exports.EthereumVerifyMessage,
    EthereumSignTypedHash: exports.EthereumSignTypedHash,
    EthereumTypedDataSignature: exports.EthereumTypedDataSignature,
    Initialize: exports.Initialize,
    GetFeatures: exports.GetFeatures,
    RecoveryDevice: exports.RecoveryDevice,
    Features: exports.Features,
    LockDevice: exports.LockDevice,
    SetBusy: exports.SetBusy,
    EndSession: exports.EndSession,
    ApplySettings: exports.ApplySettings,
    ChangeLanguage: exports.ChangeLanguage,
    TranslationDataRequest: exports.TranslationDataRequest,
    TranslationDataAck: exports.TranslationDataAck,
    ApplyFlags: exports.ApplyFlags,
    ChangePin: exports.ChangePin,
    ChangeWipeCode: exports.ChangeWipeCode,
    SdProtect: exports.SdProtect,
    Ping: exports.Ping,
    Cancel: exports.Cancel,
    GetEntropy: exports.GetEntropy,
    Entropy: exports.Entropy,
    GetFirmwareHash: exports.GetFirmwareHash,
    FirmwareHash: exports.FirmwareHash,
    AuthenticateDevice: exports.AuthenticateDevice,
    AuthenticityProof: exports.AuthenticityProof,
    WipeDevice: exports.WipeDevice,
    LoadDevice: exports.LoadDevice,
    ResetDevice: exports.ResetDevice,
    Slip39Group: exports.Slip39Group,
    BackupDevice: exports.BackupDevice,
    EntropyRequest: exports.EntropyRequest,
    EntropyAck: exports.EntropyAck,
    WordRequest: exports.WordRequest,
    WordAck: exports.WordAck,
    SetU2FCounter: exports.SetU2FCounter,
    GetNextU2FCounter: exports.GetNextU2FCounter,
    NextU2FCounter: exports.NextU2FCounter,
    DoPreauthorized: exports.DoPreauthorized,
    PreauthorizedRequest: exports.PreauthorizedRequest,
    CancelAuthorization: exports.CancelAuthorization,
    RebootToBootloader: exports.RebootToBootloader,
    GetNonce: exports.GetNonce,
    Nonce: exports.Nonce,
    UnlockPath: exports.UnlockPath,
    UnlockedPathRequest: exports.UnlockedPathRequest,
    ShowDeviceTutorial: exports.ShowDeviceTutorial,
    UnlockBootloader: exports.UnlockBootloader,
    SetBrightness: exports.SetBrightness,
    NEMGetAddress: exports.NEMGetAddress,
    NEMAddress: exports.NEMAddress,
    NEMTransactionCommon: exports.NEMTransactionCommon,
    NEMMosaic: exports.NEMMosaic,
    NEMTransfer: exports.NEMTransfer,
    NEMProvisionNamespace: exports.NEMProvisionNamespace,
    NEMMosaicDefinition: exports.NEMMosaicDefinition,
    NEMMosaicCreation: exports.NEMMosaicCreation,
    NEMMosaicSupplyChange: exports.NEMMosaicSupplyChange,
    NEMCosignatoryModification: exports.NEMCosignatoryModification,
    NEMAggregateModification: exports.NEMAggregateModification,
    NEMImportanceTransfer: exports.NEMImportanceTransfer,
    NEMSignTx: exports.NEMSignTx,
    NEMSignedTx: exports.NEMSignedTx,
    NEMDecryptMessage: exports.NEMDecryptMessage,
    NEMDecryptedMessage: exports.NEMDecryptedMessage,
    RippleGetAddress: exports.RippleGetAddress,
    RippleAddress: exports.RippleAddress,
    RipplePayment: exports.RipplePayment,
    RippleSignTx: exports.RippleSignTx,
    RippleSignedTx: exports.RippleSignedTx,
    SolanaGetPublicKey: exports.SolanaGetPublicKey,
    SolanaPublicKey: exports.SolanaPublicKey,
    SolanaGetAddress: exports.SolanaGetAddress,
    SolanaAddress: exports.SolanaAddress,
    SolanaTxTokenAccountInfo: exports.SolanaTxTokenAccountInfo,
    SolanaTxAdditionalInfo: exports.SolanaTxAdditionalInfo,
    SolanaSignTx: exports.SolanaSignTx,
    SolanaTxSignature: exports.SolanaTxSignature,
    StellarAsset: exports.StellarAsset,
    StellarGetAddress: exports.StellarGetAddress,
    StellarAddress: exports.StellarAddress,
    StellarSignTx: exports.StellarSignTx,
    StellarTxOpRequest: exports.StellarTxOpRequest,
    StellarPaymentOp: exports.StellarPaymentOp,
    StellarCreateAccountOp: exports.StellarCreateAccountOp,
    StellarPathPaymentStrictReceiveOp: exports.StellarPathPaymentStrictReceiveOp,
    StellarPathPaymentStrictSendOp: exports.StellarPathPaymentStrictSendOp,
    StellarManageSellOfferOp: exports.StellarManageSellOfferOp,
    StellarManageBuyOfferOp: exports.StellarManageBuyOfferOp,
    StellarCreatePassiveSellOfferOp: exports.StellarCreatePassiveSellOfferOp,
    StellarSetOptionsOp: exports.StellarSetOptionsOp,
    StellarChangeTrustOp: exports.StellarChangeTrustOp,
    StellarAllowTrustOp: exports.StellarAllowTrustOp,
    StellarAccountMergeOp: exports.StellarAccountMergeOp,
    StellarManageDataOp: exports.StellarManageDataOp,
    StellarBumpSequenceOp: exports.StellarBumpSequenceOp,
    StellarClaimClaimableBalanceOp: exports.StellarClaimClaimableBalanceOp,
    StellarSignedTx: exports.StellarSignedTx,
    TezosGetAddress: exports.TezosGetAddress,
    TezosAddress: exports.TezosAddress,
    TezosGetPublicKey: exports.TezosGetPublicKey,
    TezosPublicKey: exports.TezosPublicKey,
    TezosContractID: exports.TezosContractID,
    TezosRevealOp: exports.TezosRevealOp,
    TezosManagerTransfer: exports.TezosManagerTransfer,
    TezosParametersManager: exports.TezosParametersManager,
    TezosTransactionOp: exports.TezosTransactionOp,
    TezosOriginationOp: exports.TezosOriginationOp,
    TezosDelegationOp: exports.TezosDelegationOp,
    TezosProposalOp: exports.TezosProposalOp,
    TezosBallotOp: exports.TezosBallotOp,
    TezosSignTx: exports.TezosSignTx,
    TezosSignedTx: exports.TezosSignedTx,
}, { $id: 'MessageType' });
//# sourceMappingURL=messages-schema.js.map