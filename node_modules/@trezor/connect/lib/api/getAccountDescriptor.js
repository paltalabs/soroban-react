"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_utils_1 = require("@trezor/schema-utils");
const AbstractMethod_1 = require("../core/AbstractMethod");
const paramsValidator_1 = require("./common/paramsValidator");
const pathUtils_1 = require("../utils/pathUtils");
const accountUtils_1 = require("../utils/accountUtils");
const coinInfo_1 = require("../data/coinInfo");
const constants_1 = require("../constants");
const events_1 = require("../events");
const types_1 = require("../types");
const getAccountDescriptor_1 = require("../types/api/getAccountDescriptor");
class GetAccountDescriptor extends AbstractMethod_1.AbstractMethod {
    constructor() {
        super(...arguments);
        this.disposed = false;
    }
    init() {
        this.requiredPermissions = ['read'];
        this.useDevice = true;
        this.useUi = true;
        this.hasBundle = !!this.payload.bundle;
        const payload = !this.payload.bundle
            ? { ...this.payload, bundle: [this.payload] }
            : this.payload;
        (0, schema_utils_1.Assert)((0, types_1.Bundle)(getAccountDescriptor_1.GetAccountDescriptorParams), payload);
        this.params = payload.bundle.map(batch => {
            const coinInfo = (0, coinInfo_1.getCoinInfo)(batch.coin);
            if (!coinInfo) {
                throw constants_1.ERRORS.TypedError('Method_UnknownCoin');
            }
            const address_n = (0, pathUtils_1.validatePath)(batch.path, 3);
            this.firmwareRange = (0, paramsValidator_1.getFirmwareRange)(this.name, coinInfo, this.firmwareRange);
            return {
                ...batch,
                address_n,
                coinInfo,
            };
        });
        this.noBackupConfirmationMode = this.params.every(batch => batch.suppressBackupWarning)
            ? 'popup-only'
            : 'always';
    }
    get info() {
        return 'Export account descriptor';
    }
    get confirmation() {
        const keys = {};
        this.params.forEach(b => {
            if (!keys[b.coinInfo.label]) {
                keys[b.coinInfo.label] = {
                    coinInfo: b.coinInfo,
                    values: [],
                };
            }
            keys[b.coinInfo.label].values.push(b.address_n);
        });
        const str = [];
        Object.keys(keys).forEach((k, _i, _a) => {
            const details = keys[k];
            details.values.forEach(acc => {
                str.push('<span>');
                str.push(k);
                str.push(' ');
                if (typeof acc === 'string') {
                    str.push(acc);
                }
                else {
                    str.push((0, accountUtils_1.getAccountLabel)(acc, details.coinInfo));
                }
                str.push('</span>');
            });
        });
        return {
            view: 'export-account-info',
            label: `Export descriptor for: ${str.join('')}`,
        };
    }
    checkFirmwareRange() {
        const invalid = [];
        for (let i = 0; i < this.params.length; i++) {
            this.firmwareRange = (0, paramsValidator_1.getFirmwareRange)(this.name, this.params[i].coinInfo, AbstractMethod_1.DEFAULT_FIRMWARE_RANGE);
            const exception = super.checkFirmwareRange();
            if (exception) {
                invalid.push({
                    index: i,
                    exception,
                    coin: this.params[i].coin,
                });
            }
        }
        if (invalid.length > 0) {
            throw constants_1.ERRORS.TypedError('Method_Discovery_BundleException', JSON.stringify(invalid));
        }
        return undefined;
    }
    async run() {
        const responses = [];
        const sendProgress = (progress, response, error) => {
            if (!this.hasBundle || this.disposed)
                return;
            this.postMessage((0, events_1.createUiMessage)(events_1.UI.BUNDLE_PROGRESS, {
                total: this.params.length,
                progress,
                response,
                error,
            }));
        };
        for (let i = 0; i < this.params.length; i++) {
            const request = this.params[i];
            if (this.disposed)
                break;
            try {
                const { descriptor, address_n, legacyXpub } = await this.device
                    .getCommands()
                    .getAccountDescriptor(request.coinInfo, request.address_n, typeof request.derivationType !== 'undefined'
                    ? request.derivationType
                    : constants_1.PROTO.CardanoDerivationType.ICARUS_TREZOR);
                const response = {
                    descriptor,
                    path: (0, pathUtils_1.getSerializedPath)(address_n),
                    legacyXpub,
                };
                sendProgress(i, response);
                responses.push(response);
            }
            catch (error) {
                if (this.hasBundle) {
                    responses.push(null);
                    sendProgress(i, null, error.message);
                    continue;
                }
                else {
                    throw error;
                }
            }
        }
        if (this.disposed)
            return new Promise(() => []);
        return this.hasBundle ? responses : responses[0];
    }
    dispose() {
        this.disposed = true;
    }
}
exports.default = GetAccountDescriptor;
//# sourceMappingURL=getAccountDescriptor.js.map