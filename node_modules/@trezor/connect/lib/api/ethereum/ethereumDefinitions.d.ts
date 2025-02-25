import { MessagesSchema } from '@trezor/protobuf';
import { Static } from '@trezor/schema-utils';
import { EthereumNetworkInfo } from '../../types';
interface GetEthereumDefinitions {
    chainId?: number;
    slip44?: number;
    contractAddress?: string;
}
export declare const getEthereumDefinitions: ({ chainId, slip44, contractAddress, }: GetEthereumDefinitions) => Promise<{
    encoded_network?: ArrayBuffer | undefined;
    encoded_token?: ArrayBuffer | undefined;
}>;
export type EthereumNetworkDefinitionDecoded = Static<typeof EthereumNetworkDefinitionDecoded>;
export declare const EthereumNetworkDefinitionDecoded: import("@trezor/schema-utils").TObject<{
    chain_id: import("@trezor/schema-utils").TNumber;
    name: import("@trezor/schema-utils").TString;
    slip44: import("@trezor/schema-utils").TNumber;
    symbol: import("@trezor/schema-utils").TString;
}>;
export type EthereumTokenDefinitionDecoded = Static<typeof EthereumTokenDefinitionDecoded>;
export declare const EthereumTokenDefinitionDecoded: import("@trezor/schema-utils").TObject<{
    address: import("@trezor/schema-utils").TString;
    chain_id: import("@trezor/schema-utils").TNumber;
    decimals: import("@trezor/schema-utils").TNumber;
    name: import("@trezor/schema-utils").TString;
    symbol: import("@trezor/schema-utils").TString;
}>;
export type EthereumDefinitionDecoded = Static<typeof EthereumDefinitionDecoded>;
export declare const EthereumDefinitionDecoded: import("@trezor/schema-utils").TObject<{
    network: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        chain_id: import("@trezor/schema-utils").TNumber;
        name: import("@trezor/schema-utils").TString;
        slip44: import("@trezor/schema-utils").TNumber;
        symbol: import("@trezor/schema-utils").TString;
    }>>;
    token: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        address: import("@trezor/schema-utils").TString;
        chain_id: import("@trezor/schema-utils").TNumber;
        decimals: import("@trezor/schema-utils").TNumber;
        name: import("@trezor/schema-utils").TString;
        symbol: import("@trezor/schema-utils").TString;
    }>>;
}>;
export declare const decodeEthereumDefinition: (encodedDefinition: MessagesSchema.EthereumDefinitions) => EthereumDefinitionDecoded;
export declare const ethereumNetworkInfoFromDefinition: (definition: EthereumNetworkDefinitionDecoded) => EthereumNetworkInfo;
export {};
//# sourceMappingURL=ethereumDefinitions.d.ts.map