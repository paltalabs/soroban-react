"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protobuf_1 = require("@trezor/protobuf");
const schema_utils_1 = require("@trezor/schema-utils");
const AbstractMethod_1 = require("../../../core/AbstractMethod");
const paramsValidator_1 = require("../../common/paramsValidator");
const pathUtils_1 = require("../../../utils/pathUtils");
const coinInfo_1 = require("../../../data/coinInfo");
const ethereumUtils_1 = require("../../../utils/ethereumUtils");
const constants_1 = require("../../../constants");
const ethereum_1 = require("../../../types/api/ethereum");
const ethereumSignTypedData_1 = require("../ethereumSignTypedData");
const formatUtils_1 = require("../../../utils/formatUtils");
const ethereumDefinitions_1 = require("../ethereumDefinitions");
const types_1 = require("../../../types");
const Params = schema_utils_1.Type.Intersect([
    schema_utils_1.Type.Union([
        schema_utils_1.Type.Omit(ethereum_1.EthereumSignTypedData, schema_utils_1.Type.Literal('path')),
        schema_utils_1.Type.Omit(ethereum_1.EthereumSignTypedHash, schema_utils_1.Type.Literal('path')),
    ]),
    schema_utils_1.Type.Object({
        address_n: schema_utils_1.Type.Array(schema_utils_1.Type.Number()),
        network: schema_utils_1.Type.Optional(types_1.EthereumNetworkInfo),
        definitions: schema_utils_1.Type.Optional(protobuf_1.MessagesSchema.EthereumDefinitions),
    }),
]);
class EthereumSignTypedData extends AbstractMethod_1.AbstractMethod {
    init() {
        this.requiredPermissions = ['read', 'write'];
        this.requiredDeviceCapabilities = ['Capability_Ethereum'];
        const { payload } = this;
        (0, schema_utils_1.Assert)(schema_utils_1.Type.Union([ethereum_1.EthereumSignTypedData, ethereum_1.EthereumSignTypedHash]), payload);
        const path = (0, pathUtils_1.validatePath)(payload.path, 3);
        const network = (0, coinInfo_1.getEthereumNetwork)(path);
        this.firmwareRange = (0, paramsValidator_1.getFirmwareRange)(this.name, network, this.firmwareRange);
        this.params = {
            address_n: path,
            metamask_v4_compat: payload.metamask_v4_compat,
            data: payload.data,
            network,
        };
        if (payload.domain_separator_hash) {
            this.params = {
                ...this.params,
                domain_separator_hash: (0, formatUtils_1.messageToHex)(payload.domain_separator_hash),
            };
            if (payload.message_hash) {
                this.params = {
                    ...this.params,
                    message_hash: (0, formatUtils_1.messageToHex)(payload.message_hash),
                };
            }
            else if (this.params.data.primaryType !== 'EIP712Domain') {
                throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'message_hash should only be empty when data.primaryType=EIP712Domain');
            }
        }
        if (this.params.data.primaryType === 'EIP712Domain') {
            this.firmwareRange = (0, paramsValidator_1.getFirmwareRange)('eip712-domain-only', network, this.firmwareRange);
            if ('message_hash' in this.params) {
                throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'message_hash should be empty when data.primaryType=EIP712Domain');
            }
        }
    }
    async initAsync() {
        if (this.params.network)
            return;
        const { address_n } = this.params;
        const slip44 = (0, pathUtils_1.getSlip44ByPath)(address_n);
        this.params.definitions = await (0, ethereumDefinitions_1.getEthereumDefinitions)({
            slip44,
        });
    }
    get info() {
        return (0, ethereumUtils_1.getNetworkLabel)('Sign #NETWORK typed data', (0, coinInfo_1.getEthereumNetwork)(this.params.address_n));
    }
    async run() {
        const cmd = this.device.getCommands();
        const { address_n, definitions } = this.params;
        if (this.device.features.internal_model === types_1.DeviceModelInternal.T1B1) {
            (0, schema_utils_1.Assert)(schema_utils_1.Type.Object({
                domain_separator_hash: schema_utils_1.Type.String(),
                message_hash: schema_utils_1.Type.Optional(schema_utils_1.Type.String()),
            }), this.params);
            const { domain_separator_hash, message_hash } = this.params;
            const response = await cmd.typedCall('EthereumSignTypedHash', 'EthereumTypedDataSignature', {
                address_n,
                domain_separator_hash,
                message_hash,
                encoded_network: definitions === null || definitions === void 0 ? void 0 : definitions.encoded_network,
            });
            const { address, signature } = response.message;
            return {
                address,
                signature: `0x${signature}`,
            };
        }
        const { data, metamask_v4_compat } = this.params;
        const { types, primaryType, domain, message } = data;
        let response = await cmd.typedCall('EthereumSignTypedData', [
            'EthereumTypedDataStructRequest',
            'EthereumTypedDataValueRequest',
            'EthereumTypedDataSignature',
        ], {
            address_n,
            primary_type: primaryType,
            metamask_v4_compat,
            definitions,
        });
        while (response.type === 'EthereumTypedDataStructRequest') {
            const { name: typeDefinitionName } = response.message;
            const typeDefinition = types[typeDefinitionName];
            if (typeDefinition === undefined) {
                throw constants_1.ERRORS.TypedError('Runtime', `Type ${typeDefinitionName} was not defined in types object`);
            }
            const dataStruckAck = {
                members: typeDefinition.map(({ name, type: typeName }) => ({
                    name,
                    type: (0, ethereumSignTypedData_1.getFieldType)(typeName, types),
                })),
            };
            response = await cmd.typedCall('EthereumTypedDataStructAck', [
                'EthereumTypedDataStructRequest',
                'EthereumTypedDataValueRequest',
                'EthereumTypedDataSignature',
            ], dataStruckAck);
        }
        while (response.type === 'EthereumTypedDataValueRequest') {
            const { member_path } = response.message;
            let memberData;
            let memberTypeName;
            const [rootIndex, ...nestedMemberPath] = member_path;
            switch (rootIndex) {
                case 0:
                    memberData = domain;
                    memberTypeName = 'EIP712Domain';
                    break;
                case 1:
                    memberData = message;
                    memberTypeName = primaryType;
                    break;
                default:
                    throw constants_1.ERRORS.TypedError('Runtime', 'Root index can only be 0 or 1');
            }
            for (const index of nestedMemberPath) {
                if (Array.isArray(memberData)) {
                    memberTypeName = (0, ethereumSignTypedData_1.parseArrayType)(memberTypeName).entryTypeName;
                    memberData = memberData[index];
                }
                else if (typeof memberData === 'object' && memberData !== null) {
                    const memberTypeDefinition = types[memberTypeName][index];
                    memberTypeName = memberTypeDefinition.type;
                    memberData = memberData[memberTypeDefinition.name];
                }
                if (memberData === null || memberData === undefined) {
                    cmd.typedCall('Cancel', 'Success');
                    throw constants_1.ERRORS.TypedError('Runtime', `Value from member path ${member_path} is missing in the data object`);
                }
            }
            let encodedData;
            if (Array.isArray(memberData)) {
                encodedData = (0, ethereumSignTypedData_1.encodeData)('uint16', memberData.length);
            }
            else {
                encodedData = (0, ethereumSignTypedData_1.encodeData)(memberTypeName, memberData);
            }
            response = await cmd.typedCall('EthereumTypedDataValueAck', ['EthereumTypedDataValueRequest', 'EthereumTypedDataSignature'], {
                value: encodedData,
            });
        }
        const { address, signature } = response.message;
        return {
            address,
            signature: `0x${signature}`,
        };
    }
}
exports.default = EthereumSignTypedData;
//# sourceMappingURL=ethereumSignTypedData.js.map