"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardanoSignedTxData = exports.CardanoAuxiliaryDataSupplement = exports.CardanoSignedTxWitness = exports.CardanoSignTransactionExtended = exports.CardanoSignTransaction = exports.CardanoAuxiliaryData = exports.CardanoCVoteRegistrationParameters = exports.CardanoCVoteRegistrationDelegation = exports.CardanoReferenceInput = exports.CardanoRequiredSigner = exports.CardanoCollateralInput = exports.CardanoMint = exports.CardanoWithdrawal = exports.CardanoCertificate = exports.CardanoDRep = exports.CardanoPoolParameters = exports.CardanoPoolMargin = exports.CardanoPoolMetadata = exports.CardanoPoolRelay = exports.CardanoPoolOwner = exports.CardanoOutput = exports.CardanoAssetGroup = exports.CardanoToken = exports.CardanoInput = exports.CardanoGetPublicKey = exports.CardanoNativeScriptHash = exports.CardanoGetNativeScriptHash = exports.CardanoNativeScript = exports.CardanoGetAddress = exports.CardanoAddressParameters = exports.CardanoCertificatePointer = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const constants_1 = require("../../../constants");
const params_1 = require("../../params");
exports.CardanoCertificatePointer = schema_utils_1.Type.Object({
    blockIndex: schema_utils_1.Type.Number(),
    txIndex: schema_utils_1.Type.Number(),
    certificateIndex: schema_utils_1.Type.Number(),
});
exports.CardanoAddressParameters = schema_utils_1.Type.Object({
    addressType: constants_1.PROTO.EnumCardanoAddressType,
    path: schema_utils_1.Type.Optional(params_1.DerivationPath),
    stakingPath: schema_utils_1.Type.Optional(params_1.DerivationPath),
    stakingKeyHash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    certificatePointer: schema_utils_1.Type.Optional(exports.CardanoCertificatePointer),
    paymentScriptHash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    stakingScriptHash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
});
exports.CardanoGetAddress = schema_utils_1.Type.Object({
    addressParameters: exports.CardanoAddressParameters,
    protocolMagic: schema_utils_1.Type.Number(),
    networkId: schema_utils_1.Type.Number(),
    address: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    showOnTrezor: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    derivationType: schema_utils_1.Type.Optional(constants_1.PROTO.EnumCardanoDerivationType),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
});
exports.CardanoNativeScript = schema_utils_1.Type.Recursive(This => schema_utils_1.Type.Object({
    type: constants_1.PROTO.EnumCardanoNativeScriptType,
    scripts: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(This)),
    keyHash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    keyPath: schema_utils_1.Type.Optional(params_1.DerivationPath),
    requiredSignaturesCount: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    invalidBefore: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    invalidHereafter: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
}));
exports.CardanoGetNativeScriptHash = schema_utils_1.Type.Object({
    script: exports.CardanoNativeScript,
    displayFormat: constants_1.PROTO.EnumCardanoNativeScriptHashDisplayFormat,
    derivationType: schema_utils_1.Type.Optional(constants_1.PROTO.EnumCardanoDerivationType),
});
exports.CardanoNativeScriptHash = schema_utils_1.Type.Object({
    scriptHash: schema_utils_1.Type.String(),
});
exports.CardanoGetPublicKey = schema_utils_1.Type.Intersect([
    params_1.GetPublicKey,
    schema_utils_1.Type.Object({
        derivationType: schema_utils_1.Type.Optional(constants_1.PROTO.EnumCardanoDerivationType),
    }),
]);
exports.CardanoInput = schema_utils_1.Type.Object({
    path: schema_utils_1.Type.Optional(params_1.DerivationPath),
    prev_hash: schema_utils_1.Type.String(),
    prev_index: schema_utils_1.Type.Number(),
});
exports.CardanoToken = schema_utils_1.Type.Object({
    assetNameBytes: schema_utils_1.Type.String(),
    amount: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    mintAmount: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
});
exports.CardanoAssetGroup = schema_utils_1.Type.Object({
    policyId: schema_utils_1.Type.String(),
    tokenAmounts: schema_utils_1.Type.Array(exports.CardanoToken),
});
exports.CardanoOutput = schema_utils_1.Type.Intersect([
    schema_utils_1.Type.Union([
        schema_utils_1.Type.Object({
            addressParameters: exports.CardanoAddressParameters,
        }),
        schema_utils_1.Type.Object({
            address: schema_utils_1.Type.String(),
        }),
    ]),
    schema_utils_1.Type.Object({
        amount: schema_utils_1.Type.String(),
        tokenBundle: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.CardanoAssetGroup)),
        datumHash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
        format: schema_utils_1.Type.Optional(constants_1.PROTO.EnumCardanoTxOutputSerializationFormat),
        inlineDatum: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
        referenceScript: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    }),
]);
exports.CardanoPoolOwner = schema_utils_1.Type.Object({
    stakingKeyPath: schema_utils_1.Type.Optional(params_1.DerivationPath),
    stakingKeyHash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
});
exports.CardanoPoolRelay = schema_utils_1.Type.Object({
    type: constants_1.PROTO.EnumCardanoPoolRelayType,
    ipv4Address: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    ipv6Address: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    port: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    hostName: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
});
exports.CardanoPoolMetadata = schema_utils_1.Type.Object({
    url: schema_utils_1.Type.String(),
    hash: schema_utils_1.Type.String(),
});
exports.CardanoPoolMargin = schema_utils_1.Type.Object({
    numerator: schema_utils_1.Type.String(),
    denominator: schema_utils_1.Type.String(),
});
exports.CardanoPoolParameters = schema_utils_1.Type.Object({
    poolId: schema_utils_1.Type.String(),
    vrfKeyHash: schema_utils_1.Type.String(),
    pledge: schema_utils_1.Type.String(),
    cost: schema_utils_1.Type.String(),
    margin: exports.CardanoPoolMargin,
    rewardAccount: schema_utils_1.Type.String(),
    owners: schema_utils_1.Type.Array(exports.CardanoPoolOwner, { minItems: 1 }),
    relays: schema_utils_1.Type.Array(exports.CardanoPoolRelay),
    metadata: schema_utils_1.Type.Optional(exports.CardanoPoolMetadata),
});
exports.CardanoDRep = schema_utils_1.Type.Object({
    type: constants_1.PROTO.EnumCardanoDRepType,
    keyHash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    scriptHash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
});
exports.CardanoCertificate = schema_utils_1.Type.Object({
    type: constants_1.PROTO.EnumCardanoCertificateType,
    path: schema_utils_1.Type.Optional(params_1.DerivationPath),
    pool: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    poolParameters: schema_utils_1.Type.Optional(exports.CardanoPoolParameters),
    scriptHash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    keyHash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    deposit: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    dRep: schema_utils_1.Type.Optional(exports.CardanoDRep),
});
exports.CardanoWithdrawal = schema_utils_1.Type.Object({
    path: schema_utils_1.Type.Optional(params_1.DerivationPath),
    amount: schema_utils_1.Type.String(),
    scriptHash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    keyHash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
});
exports.CardanoMint = schema_utils_1.Type.Array(exports.CardanoAssetGroup);
exports.CardanoCollateralInput = schema_utils_1.Type.Object({
    path: schema_utils_1.Type.Optional(params_1.DerivationPath),
    prev_hash: schema_utils_1.Type.String(),
    prev_index: schema_utils_1.Type.Number(),
});
exports.CardanoRequiredSigner = schema_utils_1.Type.Object({
    keyPath: schema_utils_1.Type.Optional(params_1.DerivationPath),
    keyHash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
});
exports.CardanoReferenceInput = schema_utils_1.Type.Object({
    prev_hash: schema_utils_1.Type.String(),
    prev_index: schema_utils_1.Type.Number(),
});
exports.CardanoCVoteRegistrationDelegation = schema_utils_1.Type.Object({
    votePublicKey: schema_utils_1.Type.String(),
    weight: schema_utils_1.Type.Number(),
});
exports.CardanoCVoteRegistrationParameters = schema_utils_1.Type.Object({
    votePublicKey: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    stakingPath: params_1.DerivationPath,
    paymentAddressParameters: schema_utils_1.Type.Optional(exports.CardanoAddressParameters),
    nonce: schema_utils_1.Type.String(),
    format: schema_utils_1.Type.Optional(constants_1.PROTO.EnumCardanoCVoteRegistrationFormat),
    delegations: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.CardanoCVoteRegistrationDelegation)),
    votingPurpose: schema_utils_1.Type.Optional(schema_utils_1.Type.Number()),
    paymentAddress: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
});
exports.CardanoAuxiliaryData = schema_utils_1.Type.Object({
    hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    cVoteRegistrationParameters: schema_utils_1.Type.Optional(exports.CardanoCVoteRegistrationParameters),
});
exports.CardanoSignTransaction = schema_utils_1.Type.Object({
    inputs: schema_utils_1.Type.Array(exports.CardanoInput),
    outputs: schema_utils_1.Type.Array(exports.CardanoOutput),
    fee: schema_utils_1.Type.Uint(),
    ttl: schema_utils_1.Type.Optional(schema_utils_1.Type.Uint()),
    certificates: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.CardanoCertificate)),
    withdrawals: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.CardanoWithdrawal)),
    validityIntervalStart: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    auxiliaryData: schema_utils_1.Type.Optional(exports.CardanoAuxiliaryData),
    mint: schema_utils_1.Type.Optional(exports.CardanoMint),
    scriptDataHash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    collateralInputs: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.CardanoCollateralInput)),
    requiredSigners: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.CardanoRequiredSigner)),
    collateralReturn: schema_utils_1.Type.Optional(exports.CardanoOutput),
    totalCollateral: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
    referenceInputs: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(exports.CardanoReferenceInput)),
    additionalWitnessRequests: schema_utils_1.Type.Optional(schema_utils_1.Type.Array(params_1.DerivationPath)),
    protocolMagic: schema_utils_1.Type.Number(),
    networkId: schema_utils_1.Type.Number(),
    signingMode: constants_1.PROTO.EnumCardanoTxSigningMode,
    derivationType: schema_utils_1.Type.Optional(constants_1.PROTO.EnumCardanoDerivationType),
    includeNetworkId: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    chunkify: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
    tagCborSets: schema_utils_1.Type.Optional(schema_utils_1.Type.Boolean()),
});
exports.CardanoSignTransactionExtended = schema_utils_1.Type.Intersect([
    exports.CardanoSignTransaction,
    schema_utils_1.Type.Object({
        unsignedTx: schema_utils_1.Type.Object({
            body: schema_utils_1.Type.String(),
            hash: schema_utils_1.Type.String(),
        }),
        testnet: schema_utils_1.Type.Boolean(),
    }),
]);
exports.CardanoSignedTxWitness = schema_utils_1.Type.Object({
    type: constants_1.PROTO.EnumCardanoTxWitnessType,
    pubKey: schema_utils_1.Type.String(),
    signature: schema_utils_1.Type.String(),
    chainCode: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
});
exports.CardanoAuxiliaryDataSupplement = schema_utils_1.Type.Object({
    type: constants_1.PROTO.EnumCardanoTxAuxiliaryDataSupplementType,
    auxiliaryDataHash: schema_utils_1.Type.String(),
    cVoteRegistrationSignature: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
});
exports.CardanoSignedTxData = schema_utils_1.Type.Object({
    hash: schema_utils_1.Type.String(),
    witnesses: schema_utils_1.Type.Array(exports.CardanoSignedTxWitness),
    auxiliaryDataSupplement: schema_utils_1.Type.Optional(exports.CardanoAuxiliaryDataSupplement),
});
//# sourceMappingURL=index.js.map