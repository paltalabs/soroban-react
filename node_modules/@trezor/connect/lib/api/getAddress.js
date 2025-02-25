"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_utils_1 = require("@trezor/schema-utils");
const AbstractMethod_1 = require("../core/AbstractMethod");
const paramsValidator_1 = require("./common/paramsValidator");
const pathUtils_1 = require("../utils/pathUtils");
const coinInfo_1 = require("../data/coinInfo");
const constants_1 = require("../constants");
const events_1 = require("../events");
const types_1 = require("../types");
const getAddress_1 = require("../types/api/getAddress");
class GetAddress extends AbstractMethod_1.AbstractMethod {
    constructor() {
        super(...arguments);
        this.progress = 0;
    }
    init() {
        this.noBackupConfirmationMode = 'always';
        this.requiredPermissions = ['read'];
        this.hasBundle = !!this.payload.bundle;
        const payload = !this.payload.bundle
            ? { ...this.payload, bundle: [this.payload] }
            : this.payload;
        payload === null || payload === void 0 ? void 0 : payload.bundle.forEach(bundleElement => {
            var _a, _b;
            if (bundleElement.multisig && ((_a = bundleElement.multisig) === null || _a === void 0 ? void 0 : _a.signatures) === undefined) {
                bundleElement.multisig.signatures = Array((_b = bundleElement.multisig) === null || _b === void 0 ? void 0 : _b.pubkeys.length).fill('');
            }
        });
        (0, schema_utils_1.Assert)((0, types_1.Bundle)(getAddress_1.GetAddress), payload);
        this.params = payload.bundle.map(batch => {
            const path = (0, pathUtils_1.validatePath)(batch.path, 1);
            let coinInfo;
            if (batch.coin) {
                coinInfo = (0, coinInfo_1.getBitcoinNetwork)(batch.coin);
            }
            if (coinInfo && !batch.crossChain) {
                (0, paramsValidator_1.validateCoinPath)(path, coinInfo);
            }
            else if (!coinInfo) {
                coinInfo = (0, coinInfo_1.getBitcoinNetwork)(path);
            }
            if (!coinInfo) {
                throw constants_1.ERRORS.TypedError('Method_UnknownCoin');
            }
            else if (coinInfo) {
                this.firmwareRange = (0, paramsValidator_1.getFirmwareRange)(this.name, coinInfo, this.firmwareRange);
            }
            coinInfo = (0, coinInfo_1.fixCoinInfoNetwork)(coinInfo, path);
            return {
                address_n: path,
                address: batch.address,
                show_display: typeof batch.showOnTrezor === 'boolean' ? batch.showOnTrezor : true,
                multisig: batch.multisig,
                script_type: batch.scriptType,
                coinInfo,
                unlockPath: batch.unlockPath,
                chunkify: typeof batch.chunkify === 'boolean' ? batch.chunkify : false,
            };
        });
        const useEventListener = payload.useEventListener &&
            this.params.length === 1 &&
            typeof this.params[0].address === 'string' &&
            this.params[0].show_display;
        this.useUi = !useEventListener;
    }
    get info() {
        if (this.params.length === 1) {
            return (0, pathUtils_1.getLabel)('Export #NETWORK address', this.params[0].coinInfo);
        }
        const requestedNetworks = this.params.map(b => b.coinInfo);
        const uniqNetworks = (0, coinInfo_1.getUniqueNetworks)(requestedNetworks);
        if (uniqNetworks.length === 1 && uniqNetworks[0]) {
            return (0, pathUtils_1.getLabel)('Export multiple #NETWORK addresses', uniqNetworks[0]);
        }
        return 'Export multiple addresses';
    }
    getButtonRequestData(code) {
        if (code === 'ButtonRequest_Address') {
            return {
                type: 'address',
                serializedPath: (0, pathUtils_1.getSerializedPath)(this.params[this.progress].address_n),
                address: this.params[this.progress].address || 'not-set',
            };
        }
    }
    get confirmation() {
        return !this.useUi
            ? undefined
            : {
                view: 'export-address',
                label: this.info,
            };
    }
    async _call({ address_n, show_display, multisig, script_type, coinInfo, unlockPath, chunkify, }) {
        const cmd = this.device.getCommands();
        if (unlockPath) {
            await cmd.unlockPath(unlockPath);
        }
        return cmd.getAddress({
            address_n,
            show_display,
            multisig,
            script_type,
            chunkify,
        }, coinInfo);
    }
    async run() {
        const responses = [];
        for (let i = 0; i < this.params.length; i++) {
            const batch = this.params[i];
            if (batch.show_display) {
                const silent = await this._call({
                    ...batch,
                    show_display: false,
                });
                if (typeof batch.address === 'string') {
                    if (batch.address !== silent.address) {
                        throw constants_1.ERRORS.TypedError('Method_AddressNotMatch');
                    }
                }
                else {
                    batch.address = silent.address;
                }
            }
            const response = await this._call(batch);
            responses.push(response);
            if (this.hasBundle) {
                this.postMessage((0, events_1.createUiMessage)(events_1.UI.BUNDLE_PROGRESS, {
                    total: this.params.length,
                    progress: i,
                    response,
                }));
            }
            this.progress++;
        }
        return this.hasBundle ? responses : responses[0];
    }
}
exports.default = GetAddress;
//# sourceMappingURL=getAddress.js.map