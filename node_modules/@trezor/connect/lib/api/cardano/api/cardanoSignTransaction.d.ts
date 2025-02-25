import { AbstractMethod } from '../../../core/AbstractMethod';
import type { CertificateWithPoolOwnersAndRelays } from '../cardanoCertificate';
import { Path, InputWithPath, CollateralInputWithPath } from '../cardanoInputs';
import type { OutputWithData } from '../cardanoOutputs';
import { PROTO } from '../../../constants';
import { type CardanoSignedTxData } from '../../../types/api/cardano';
import type { AssetGroupWithTokens } from '../cardanoTokenBundle';
declare const CardanoSignTransactionFeatures: Readonly<{
    Conway: string[];
}>;
export type CardanoSignTransactionParams = {
    signingMode: PROTO.CardanoTxSigningMode;
    inputsWithPath: InputWithPath[];
    outputsWithData: OutputWithData[];
    fee: PROTO.UintType;
    ttl?: PROTO.UintType;
    certificatesWithPoolOwnersAndRelays: CertificateWithPoolOwnersAndRelays[];
    withdrawals: PROTO.CardanoTxWithdrawal[];
    mint: AssetGroupWithTokens[];
    auxiliaryData?: PROTO.CardanoTxAuxiliaryData;
    validityIntervalStart?: PROTO.UintType;
    scriptDataHash?: string;
    collateralInputsWithPath: CollateralInputWithPath[];
    requiredSigners: PROTO.CardanoTxRequiredSigner[];
    collateralReturnWithData?: OutputWithData;
    totalCollateral?: PROTO.UintType;
    referenceInputs: PROTO.CardanoTxReferenceInput[];
    protocolMagic: number;
    networkId: number;
    witnessPaths: Path[];
    additionalWitnessRequests: Path[];
    derivationType: PROTO.CardanoDerivationType;
    includeNetworkId?: boolean;
    tagCborSets?: boolean;
    unsignedTx?: {
        body: string;
        hash: string;
    };
    testnet?: boolean;
    chunkify?: boolean;
};
export default class CardanoSignTransaction extends AbstractMethod<'cardanoSignTransaction', CardanoSignTransactionParams> {
    init(): void;
    get info(): string;
    _isFeatureSupported(feature: keyof typeof CardanoSignTransactionFeatures): boolean;
    _ensureFeatureIsSupported(feature: keyof typeof CardanoSignTransactionFeatures): void;
    _ensureFirmwareSupportsParams(): void;
    _sign_tx(): Promise<CardanoSignedTxData>;
    run(): Promise<{
        auxiliaryDataSupplement?: {
            cVoteRegistrationSignature?: string | undefined;
            type: PROTO.CardanoTxAuxiliaryDataSupplementType;
            auxiliaryDataHash: string;
        } | undefined;
        hash: string;
        witnesses: {
            chainCode?: string | undefined;
            type: PROTO.CardanoTxWitnessType;
            signature: string;
            pubKey: string;
        }[];
    } | {
        serializedTx: string;
        auxiliaryDataSupplement?: {
            cVoteRegistrationSignature?: string | undefined;
            type: PROTO.CardanoTxAuxiliaryDataSupplementType;
            auxiliaryDataHash: string;
        } | undefined;
        hash: string;
        witnesses: {
            chainCode?: string | undefined;
            type: PROTO.CardanoTxWitnessType;
            signature: string;
            pubKey: string;
        }[];
    }>;
}
export {};
//# sourceMappingURL=cardanoSignTransaction.d.ts.map