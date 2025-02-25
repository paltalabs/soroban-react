"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_utils_1 = require("@trezor/schema-utils");
const AbstractMethod_1 = require("../core/AbstractMethod");
const paramsValidator_1 = require("./common/paramsValidator");
const pathUtils_1 = require("../utils/pathUtils");
const events_1 = require("../events");
const coinInfo_1 = require("../data/coinInfo");
const accountUtils_1 = require("../utils/accountUtils");
const types_1 = require("../types");
const getPublicKey_1 = require("../types/api/getPublicKey");
class GetPublicKey extends AbstractMethod_1.AbstractMethod {
    init() {
        this.requiredPermissions = ['read'];
        this.hasBundle = !!this.payload.bundle;
        const payload = !this.payload.bundle
            ? { ...this.payload, bundle: [this.payload] }
            : this.payload;
        (0, schema_utils_1.Assert)((0, types_1.Bundle)(getPublicKey_1.GetPublicKey), payload);
        this.params = payload.bundle.map(batch => {
            let coinInfo;
            if (batch.coin) {
                coinInfo = (0, coinInfo_1.getBitcoinNetwork)(batch.coin);
            }
            const address_n = (0, pathUtils_1.validatePath)(batch.path, coinInfo ? 3 : 0);
            if (coinInfo && !batch.crossChain) {
                (0, paramsValidator_1.validateCoinPath)(address_n, coinInfo);
            }
            else if (!coinInfo) {
                coinInfo = (0, coinInfo_1.getBitcoinNetwork)(address_n);
            }
            this.firmwareRange = (0, paramsValidator_1.getFirmwareRange)(this.name, coinInfo, this.firmwareRange);
            return {
                address_n,
                coin_name: coinInfo === null || coinInfo === void 0 ? void 0 : coinInfo.name,
                show_display: batch.showOnTrezor,
                script_type: batch.scriptType,
                ignore_xpub_magic: batch.ignoreXpubMagic,
                ecdsa_curve_name: batch.ecdsaCurveName,
                coinInfo,
                unlockPath: batch.unlockPath,
                suppress_backup_warning: batch.suppressBackupWarning,
            };
        });
        this.noBackupConfirmationMode = this.params.every(batch => batch.suppressBackupWarning || !batch.show_display)
            ? 'popup-only'
            : 'always';
    }
    get info() {
        return 'Export public key';
    }
    get confirmation() {
        return {
            view: 'export-xpub',
            label: this.params.length > 1
                ? 'Export multiple public keys'
                : (0, accountUtils_1.getPublicKeyLabel)(this.params[0].address_n, this.params[0].coinInfo),
        };
    }
    async run() {
        const responses = [];
        const cmd = this.device.getCommands();
        for (let i = 0; i < this.params.length; i++) {
            const { coinInfo, unlockPath, ...batch } = this.params[i];
            const coinInfoFallback = coinInfo !== null && coinInfo !== void 0 ? coinInfo : (0, coinInfo_1.getBitcoinNetwork)('btc');
            const response = await cmd.getHDNode(batch, { coinInfo: coinInfoFallback, unlockPath });
            responses.push(response);
            if (this.hasBundle) {
                this.postMessage((0, events_1.createUiMessage)(events_1.UI.BUNDLE_PROGRESS, {
                    total: this.params.length,
                    progress: i,
                    response,
                }));
            }
        }
        return this.hasBundle ? responses : responses[0];
    }
}
exports.default = GetPublicKey;
//# sourceMappingURL=getPublicKey.js.map