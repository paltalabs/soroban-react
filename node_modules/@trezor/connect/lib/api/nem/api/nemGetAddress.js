"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_utils_1 = require("@trezor/schema-utils");
const AbstractMethod_1 = require("../../../core/AbstractMethod");
const paramsValidator_1 = require("../../common/paramsValidator");
const coinInfo_1 = require("../../../data/coinInfo");
const pathUtils_1 = require("../../../utils/pathUtils");
const constants_1 = require("../../../constants");
const events_1 = require("../../../events");
const types_1 = require("../../../types");
const getAddress_1 = require("../../../types/api/getAddress");
const MAINNET = 0x68;
const TESTNET = 0x98;
const MIJIN = 0x60;
class NEMGetAddress extends AbstractMethod_1.AbstractMethod {
    constructor() {
        super(...arguments);
        this.progress = 0;
    }
    init() {
        this.noBackupConfirmationMode = 'always';
        this.requiredPermissions = ['read'];
        this.requiredDeviceCapabilities = ['Capability_NEM'];
        this.firmwareRange = (0, paramsValidator_1.getFirmwareRange)(this.name, (0, coinInfo_1.getMiscNetwork)('NEM'), this.firmwareRange);
        this.hasBundle = !!this.payload.bundle;
        const payload = !this.payload.bundle
            ? { ...this.payload, bundle: [this.payload] }
            : this.payload;
        (0, schema_utils_1.Assert)((0, types_1.Bundle)(getAddress_1.GetAddress), payload);
        this.params = payload.bundle.map(batch => {
            const path = (0, pathUtils_1.validatePath)(batch.path, 3);
            return {
                address_n: path,
                network: batch.network || MAINNET,
                show_display: typeof batch.showOnTrezor === 'boolean' ? batch.showOnTrezor : true,
                address: batch.address,
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
            let network = 'Unknown';
            switch (this.params[0].network) {
                case MAINNET:
                    network = 'Mainnet';
                    break;
                case TESTNET:
                    network = 'Testnet';
                    break;
                case MIJIN:
                    network = 'Mijin';
                    break;
            }
            return `Export NEM address for account #${(0, pathUtils_1.fromHardened)(this.params[0].address_n[2]) + 1} on ${network} network`;
        }
        return 'Export multiple NEM addresses';
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
        return {
            view: 'export-address',
            label: this.info,
        };
    }
    async _call({ address_n, network, show_display, chunkify }) {
        const cmd = this.device.getCommands();
        const response = await cmd.typedCall('NEMGetAddress', 'NEMAddress', {
            address_n,
            network,
            show_display,
            chunkify,
        });
        return response.message;
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
            responses.push({
                path: batch.address_n,
                serializedPath: (0, pathUtils_1.getSerializedPath)(batch.address_n),
                address: response.address,
            });
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
exports.default = NEMGetAddress;
//# sourceMappingURL=nemGetAddress.js.map