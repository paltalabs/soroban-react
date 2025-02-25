"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ethereumNetworkInfoFromDefinition = exports.decodeEthereumDefinition = exports.EthereumDefinitionDecoded = exports.EthereumTokenDefinitionDecoded = exports.EthereumNetworkDefinitionDecoded = exports.getEthereumDefinitions = void 0;
const tslib_1 = require("tslib");
const cross_fetch_1 = tslib_1.__importDefault(require("cross-fetch"));
const protobuf_1 = require("@trezor/protobuf");
const protocol_1 = require("@trezor/protocol");
const schema_utils_1 = require("@trezor/schema-utils");
const DataManager_1 = require("../../data/DataManager");
const coinInfo_1 = require("../../data/coinInfo");
const getEthereumDefinitions = async ({ chainId, slip44, contractAddress, }) => {
    const definitions = {};
    if (!chainId && !slip44) {
        throw new Error('argument chainId or slip44 is required');
    }
    try {
        const networkDefinitionUrl = `https://data.trezor.io/firmware/eth-definitions/${chainId ? 'chain-id' : 'slip44'}/${chainId !== null && chainId !== void 0 ? chainId : slip44}/network.dat`;
        const networkDefinition = await (0, cross_fetch_1.default)(networkDefinitionUrl);
        if (networkDefinition.status === 200) {
            definitions.encoded_network = await networkDefinition.arrayBuffer();
        }
        else if (networkDefinition.status !== 404) {
            throw new Error(`unexpected status: $${networkDefinition.status}`);
        }
    }
    catch (err) {
        console.warn(`unable to download or parse ${chainId} definition. detail: ${err.message}`);
    }
    try {
        if (contractAddress) {
            const lowerCaseContractAddress = contractAddress.toLowerCase();
            const tokenDefinitionUrl = `https://data.trezor.io/firmware/eth-definitions/${chainId ? 'chain-id' : 'slip44'}/${chainId !== null && chainId !== void 0 ? chainId : slip44}/token-${lowerCaseContractAddress}.dat`;
            const tokenDefinition = await (0, cross_fetch_1.default)(tokenDefinitionUrl);
            if (tokenDefinition.status === 200) {
                definitions.encoded_token = await tokenDefinition.arrayBuffer();
            }
            else if (tokenDefinition.status !== 404) {
                throw new Error(`unexpected status: $${tokenDefinition.status}`);
            }
        }
    }
    catch (err) {
        console.warn(`unable to download or parse ${chainId}/${contractAddress} definition. detail: ${err.message}`);
    }
    return definitions;
};
exports.getEthereumDefinitions = getEthereumDefinitions;
exports.EthereumNetworkDefinitionDecoded = schema_utils_1.Type.Object({
    chain_id: schema_utils_1.Type.Number(),
    name: schema_utils_1.Type.String(),
    slip44: schema_utils_1.Type.Number(),
    symbol: schema_utils_1.Type.String(),
});
exports.EthereumTokenDefinitionDecoded = schema_utils_1.Type.Object({
    address: schema_utils_1.Type.String(),
    chain_id: schema_utils_1.Type.Number(),
    decimals: schema_utils_1.Type.Number(),
    name: schema_utils_1.Type.String(),
    symbol: schema_utils_1.Type.String(),
});
exports.EthereumDefinitionDecoded = schema_utils_1.Type.Object({
    network: schema_utils_1.Type.Optional(exports.EthereumNetworkDefinitionDecoded),
    token: schema_utils_1.Type.Optional(exports.EthereumTokenDefinitionDecoded),
});
const decodeEthereumDefinition = (encodedDefinition) => {
    const decoded = {
        network: undefined,
        token: undefined,
    };
    ['encoded_token', 'encoded_network'].forEach(key => {
        const encodedPayload = encodedDefinition[key];
        if (!encodedPayload) {
            return;
        }
        const { definitionType, protobufPayload } = protocol_1.trzd.decode(encodedPayload);
        const messages = DataManager_1.DataManager.getProtobufMessages();
        const proto = (0, protobuf_1.parseConfigure)(messages);
        const type = definitionType === 0 ? 'EthereumNetworkInfo' : 'EthereumTokenInfo';
        const Message = proto.lookupType(type);
        const decodedDefinition = (0, protobuf_1.decode)(Message, protobufPayload);
        if (key === 'encoded_network') {
            (0, schema_utils_1.Assert)(exports.EthereumNetworkDefinitionDecoded, decodedDefinition);
            decoded.network = decodedDefinition;
        }
        else if (key === 'encoded_token') {
            (0, schema_utils_1.Assert)(exports.EthereumTokenDefinitionDecoded, decodedDefinition);
            decoded.token = decodedDefinition;
        }
    });
    return decoded;
};
exports.decodeEthereumDefinition = decodeEthereumDefinition;
const ethereumNetworkInfoFromDefinition = (definition) => ({
    ...coinInfo_1.ethereumNetworkInfoBase,
    chainId: definition.chain_id,
    label: definition.name,
    name: definition.name,
    slip44: definition.slip44,
    shortcut: definition.symbol,
    support: {
        connect: true,
        T1B1: '1.6.2',
        T2T1: '2.0.7',
        T2B1: '2.0.0',
        T3B1: '2.0.0',
        T3T1: '2.0.0',
        T3W1: '2.0.0',
    },
    blockchainLink: undefined,
});
exports.ethereumNetworkInfoFromDefinition = ethereumNetworkInfoFromDefinition;
//# sourceMappingURL=ethereumDefinitions.js.map