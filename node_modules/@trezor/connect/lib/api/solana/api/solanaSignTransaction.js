"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_utils_1 = require("@trezor/schema-utils");
const AbstractMethod_1 = require("../../../core/AbstractMethod");
const paramsValidator_1 = require("../../common/paramsValidator");
const coinInfo_1 = require("../../../data/coinInfo");
const pathUtils_1 = require("../../../utils/pathUtils");
const additionalInfo_1 = require("../additionalInfo");
const solana_1 = require("../../../types/api/solana");
class SolanaSignTransaction extends AbstractMethod_1.AbstractMethod {
    init() {
        this.requiredPermissions = ['read', 'write'];
        this.requiredDeviceCapabilities = ['Capability_Solana'];
        this.firmwareRange = (0, paramsValidator_1.getFirmwareRange)(this.name, (0, coinInfo_1.getMiscNetwork)('Solana'), this.firmwareRange);
        const { payload } = this;
        (0, schema_utils_1.AssertWeak)(solana_1.SolanaSignTransaction, payload);
        const path = (0, pathUtils_1.validatePath)(payload.path, 2);
        this.params = {
            address_n: path,
            serialized_tx: payload.serializedTx,
            additional_info: (0, additionalInfo_1.transformAdditionalInfo)(payload.additionalInfo),
        };
    }
    get info() {
        return 'Sign Solana transaction';
    }
    async run() {
        const cmd = this.device.getCommands();
        const { message } = await cmd.typedCall('SolanaSignTx', 'SolanaTxSignature', this.params);
        return { signature: message.signature };
    }
}
exports.default = SolanaSignTransaction;
//# sourceMappingURL=solanaSignTransaction.js.map