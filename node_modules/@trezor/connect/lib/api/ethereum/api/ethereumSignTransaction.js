"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const schema_utils_1 = require("@trezor/schema-utils");
const AbstractMethod_1 = require("../../../core/AbstractMethod");
const paramsValidator_1 = require("../../common/paramsValidator");
const pathUtils_1 = require("../../../utils/pathUtils");
const coinInfo_1 = require("../../../data/coinInfo");
const ethereumUtils_1 = require("../../../utils/ethereumUtils");
const formatUtils_1 = require("../../../utils/formatUtils");
const helper = tslib_1.__importStar(require("../ethereumSignTx"));
const ethereumDefinitions_1 = require("../ethereumDefinitions");
const types_1 = require("../../../types");
const strip = (0, formatUtils_1.deepTransform)(value => {
    let stripped = (0, formatUtils_1.stripHexPrefix)(value);
    if (stripped.length % 2 !== 0) {
        stripped = `0${stripped}`;
    }
    return stripped;
});
class EthereumSignTransaction extends AbstractMethod_1.AbstractMethod {
    init() {
        this.requiredPermissions = ['read', 'write'];
        this.requiredDeviceCapabilities = ['Capability_Ethereum'];
        const { payload } = this;
        (0, schema_utils_1.Assert)(types_1.EthereumSignTransaction, payload);
        const path = (0, pathUtils_1.validatePath)(payload.path, 3);
        const network = (0, coinInfo_1.getEthereumNetwork)(path);
        const chunkify = typeof payload.chunkify === 'boolean' ? payload.chunkify : false;
        const tx = payload.transaction;
        const isEIP1559 = typeof tx.maxFeePerGas === 'string' && typeof tx.maxPriorityFeePerGas === 'string';
        this.firmwareRange = (0, paramsValidator_1.getFirmwareRange)(isEIP1559 ? 'eip1559' : this.name, network, this.firmwareRange);
        if (isEIP1559) {
            this.params = { path, network, type: 'eip1559', tx: strip(tx), chunkify };
        }
        else {
            this.params = { path, network, type: 'legacy', tx: strip(tx), chunkify };
        }
        if (typeof tx.chainId !== 'number') {
            console.warn('TrezorConnect.ethereumSignTransaction: Missing chainId parameter!');
        }
    }
    async initAsync() {
        if (this.params.tx.chainId === 1 && !this.params.tx.data) {
            return;
        }
        const slip44 = (0, pathUtils_1.getSlip44ByPath)(this.params.path);
        const definitions = await (0, ethereumDefinitions_1.getEthereumDefinitions)({
            chainId: this.params.tx.chainId,
            slip44,
            contractAddress: this.params.tx.data ? this.params.tx.to : undefined,
        });
        this.params.definitions = definitions;
        const decoded = (0, ethereumDefinitions_1.decodeEthereumDefinition)(definitions);
        if (decoded.network) {
            this.params.network = (0, ethereumDefinitions_1.ethereumNetworkInfoFromDefinition)(decoded.network);
        }
    }
    get info() {
        return (0, ethereumUtils_1.getNetworkLabel)('Sign #NETWORK transaction', this.params.network);
    }
    async run() {
        const { type, tx, definitions, chunkify } = this.params;
        const isLegacy = type === 'legacy';
        const signature = isLegacy
            ? await helper.ethereumSignTx(this.device.getCommands().typedCall.bind(this.device.getCommands()), this.params.path, tx.to, tx.value, tx.gasLimit, tx.gasPrice, tx.nonce, tx.chainId, chunkify, tx.data, tx.txType, definitions)
            : await helper.ethereumSignTxEIP1559(this.device.getCommands().typedCall.bind(this.device.getCommands()), this.params.path, tx.to, tx.value, tx.gasLimit, tx.maxFeePerGas, tx.maxPriorityFeePerGas, tx.nonce, tx.chainId, chunkify, tx.data, tx.accessList, definitions);
        const serializedTx = helper.serializeEthereumTx(tx, signature, isLegacy);
        return { ...signature, serializedTx };
    }
}
exports.default = EthereumSignTransaction;
//# sourceMappingURL=ethereumSignTransaction.js.map