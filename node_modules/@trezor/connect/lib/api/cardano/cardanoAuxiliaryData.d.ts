import { PROTO } from '../../constants';
import { CardanoAuxiliaryData } from '../../types/api/cardano';
export declare const transformAuxiliaryData: (auxiliaryData: CardanoAuxiliaryData) => PROTO.CardanoTxAuxiliaryData;
export declare const modifyAuxiliaryDataForBackwardsCompatibility: (auxiliary_data: PROTO.CardanoTxAuxiliaryData) => PROTO.CardanoTxAuxiliaryData;
//# sourceMappingURL=cardanoAuxiliaryData.d.ts.map