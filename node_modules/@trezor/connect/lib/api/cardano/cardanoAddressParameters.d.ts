import { PROTO } from '../../constants';
import { CardanoAddressParameters } from '../../types/api/cardano';
export declare const validateAddressParameters: (addressParameters: CardanoAddressParameters) => void;
export declare const modifyAddressParametersForBackwardsCompatibility: (address_parameters: PROTO.CardanoAddressParametersType) => PROTO.CardanoAddressParametersType;
export declare const addressParametersToProto: (addressParameters: CardanoAddressParameters) => PROTO.CardanoAddressParametersType;
export declare const addressParametersFromProto: (addressParameters: PROTO.CardanoAddressParametersType) => CardanoAddressParameters;
//# sourceMappingURL=cardanoAddressParameters.d.ts.map