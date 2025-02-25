import { PROTO } from '../../constants';
import { CardanoCertificate } from '../../types/api/cardano';
export type CertificateWithPoolOwnersAndRelays = {
    certificate: PROTO.CardanoTxCertificate;
    poolOwners: PROTO.CardanoPoolOwner[];
    poolRelays: PROTO.CardanoPoolRelayParameters[];
};
export type PoolParametersWithOwnersAndRelays = {
    poolParameters?: PROTO.CardanoPoolParametersType;
    poolOwners: PROTO.CardanoPoolOwner[];
    poolRelays: PROTO.CardanoPoolRelayParameters[];
};
export declare const transformCertificate: (certificate: CardanoCertificate) => CertificateWithPoolOwnersAndRelays;
//# sourceMappingURL=cardanoCertificate.d.ts.map