"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_utils_1 = require("@trezor/schema-utils");
const AbstractMethod_1 = require("../core/AbstractMethod");
const paramsValidator_1 = require("./common/paramsValidator");
const pathUtils_1 = require("../utils/pathUtils");
const coinInfo_1 = require("../data/coinInfo");
const events_1 = require("../events");
const exports_1 = require("../exports");
const getOwnershipProof_1 = require("../types/api/getOwnershipProof");
class GetOwnershipProof extends AbstractMethod_1.AbstractMethod {
    init() {
        this.requiredPermissions = ['read'];
        this.hasBundle = !!this.payload.bundle;
        const payload = !this.payload.bundle
            ? { ...this.payload, bundle: [this.payload] }
            : this.payload;
        (0, schema_utils_1.Assert)((0, exports_1.Bundle)(getOwnershipProof_1.GetOwnershipProof), payload);
        this.params = payload.bundle.map(batch => {
            const address_n = (0, pathUtils_1.validatePath)(batch.path, 1);
            const coinInfo = (0, coinInfo_1.getBitcoinNetwork)(batch.coin || address_n);
            const script_type = batch.scriptType || (0, pathUtils_1.getScriptType)(address_n);
            this.firmwareRange = (0, paramsValidator_1.getFirmwareRange)(this.name, coinInfo, this.firmwareRange);
            if (batch.preauthorized) {
                this.preauthorized = batch.preauthorized;
            }
            return {
                address_n,
                coin_name: coinInfo ? coinInfo.name : undefined,
                multisig: batch.multisig,
                script_type,
                user_confirmation: batch.userConfirmation,
                ownership_ids: batch.ownershipIds,
                commitment_data: batch.commitmentData,
            };
        });
    }
    get info() {
        return 'Export ownership proof';
    }
    get confirmation() {
        return {
            view: 'export-address',
            label: this.params.length > 1 ? 'Export multiple ownership proofs' : this.info,
        };
    }
    async run() {
        const responses = [];
        const cmd = this.device.getCommands();
        for (let i = 0; i < this.params.length; i++) {
            const batch = this.params[i];
            if (this.preauthorized) {
                await cmd.preauthorize(true);
            }
            const { message } = await cmd.typedCall('GetOwnershipProof', 'OwnershipProof', batch);
            responses.push({
                ...message,
                path: batch.address_n,
                serializedPath: (0, pathUtils_1.getSerializedPath)(batch.address_n),
            });
            if (this.hasBundle) {
                this.postMessage((0, events_1.createUiMessage)(events_1.UI.BUNDLE_PROGRESS, {
                    total: this.params.length,
                    progress: i,
                    response: message,
                }));
            }
        }
        return this.hasBundle ? responses : responses[0];
    }
}
exports.default = GetOwnershipProof;
//# sourceMappingURL=getOwnershipProof.js.map