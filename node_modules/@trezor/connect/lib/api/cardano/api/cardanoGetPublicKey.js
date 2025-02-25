"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_utils_1 = require("@trezor/schema-utils");
const constants_1 = require("../../../constants");
const AbstractMethod_1 = require("../../../core/AbstractMethod");
const paramsValidator_1 = require("../../common/paramsValidator");
const coinInfo_1 = require("../../../data/coinInfo");
const pathUtils_1 = require("../../../utils/pathUtils");
const events_1 = require("../../../events");
const types_1 = require("../../../types");
const cardano_1 = require("../../../types/api/cardano");
class CardanoGetPublicKey extends AbstractMethod_1.AbstractMethod {
    init() {
        this.requiredPermissions = ['read'];
        this.requiredDeviceCapabilities = ['Capability_Cardano'];
        this.firmwareRange = (0, paramsValidator_1.getFirmwareRange)(this.name, (0, coinInfo_1.getMiscNetwork)('Cardano'), this.firmwareRange);
        this.hasBundle = !!this.payload.bundle;
        const payload = !this.payload.bundle
            ? { ...this.payload, bundle: [this.payload] }
            : this.payload;
        (0, schema_utils_1.Assert)((0, types_1.Bundle)(cardano_1.CardanoGetPublicKey), payload);
        this.params = payload.bundle.map(batch => {
            const path = (0, pathUtils_1.validatePath)(batch.path, 3);
            return {
                address_n: path,
                derivation_type: typeof batch.derivationType !== 'undefined'
                    ? batch.derivationType
                    : constants_1.PROTO.CardanoDerivationType.ICARUS_TREZOR,
                show_display: typeof batch.showOnTrezor === 'boolean' ? batch.showOnTrezor : false,
                suppress_backup_warning: batch.suppressBackupWarning,
            };
        });
        this.noBackupConfirmationMode = this.params.every(batch => batch.suppressBackupWarning || !batch.show_display)
            ? 'popup-only'
            : 'always';
    }
    get info() {
        return 'Export Cardano public key';
    }
    get confirmation() {
        return {
            view: 'export-xpub',
            label: this.params.length > 1
                ? 'Export multiple Cardano public keys'
                : `Export Cardano public key for account #${(0, pathUtils_1.fromHardened)(this.params[0].address_n[2]) + 1}`,
        };
    }
    async run() {
        const responses = [];
        const cmd = this.device.getCommands();
        for (let i = 0; i < this.params.length; i++) {
            const batch = this.params[i];
            const { message } = await cmd.typedCall('CardanoGetPublicKey', 'CardanoPublicKey', batch);
            responses.push({
                path: batch.address_n,
                serializedPath: (0, pathUtils_1.getSerializedPath)(batch.address_n),
                publicKey: message.xpub,
                node: message.node,
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
exports.default = CardanoGetPublicKey;
//# sourceMappingURL=cardanoGetPublicKey.js.map