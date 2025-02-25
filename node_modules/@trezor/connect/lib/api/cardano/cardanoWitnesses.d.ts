import type { CertificateWithPoolOwnersAndRelays } from './cardanoCertificate';
import type { CollateralInputWithPath, InputWithPath, Path } from './cardanoInputs';
import { PROTO } from '../../constants';
export declare const gatherWitnessPaths: (inputsWithPath: InputWithPath[], certificatesWithPoolOwnersAndRelays: CertificateWithPoolOwnersAndRelays[], withdrawals: PROTO.CardanoTxWithdrawal[], collateralInputsWithPath: CollateralInputWithPath[], requiredSigners: PROTO.CardanoTxRequiredSigner[], additionalWitnessRequests: Path[], signingMode: PROTO.CardanoTxSigningMode) => Path[];
//# sourceMappingURL=cardanoWitnesses.d.ts.map