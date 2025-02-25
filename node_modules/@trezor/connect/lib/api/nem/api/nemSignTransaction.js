"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const schema_utils_1 = require("@trezor/schema-utils");
const AbstractMethod_1 = require("../../../core/AbstractMethod");
const paramsValidator_1 = require("../../common/paramsValidator");
const coinInfo_1 = require("../../../data/coinInfo");
const pathUtils_1 = require("../../../utils/pathUtils");
const helper = tslib_1.__importStar(require("../nemSignTx"));
const nem_1 = require("../../../types/api/nem");
class NEMSignTransaction extends AbstractMethod_1.AbstractMethod {
    init() {
        var _a;
        this.requiredPermissions = ['read', 'write'];
        this.requiredDeviceCapabilities = ['Capability_NEM'];
        this.firmwareRange = (0, paramsValidator_1.getFirmwareRange)(this.name, (0, coinInfo_1.getMiscNetwork)('NEM'), this.firmwareRange);
        const { payload } = this;
        if ((_a = payload === null || payload === void 0 ? void 0 : payload.transaction) === null || _a === void 0 ? void 0 : _a.timestamp) {
            payload.transaction.timeStamp = payload.transaction.timestamp;
        }
        (0, schema_utils_1.AssertWeak)(nem_1.NEMSignTransaction, payload);
        const path = (0, pathUtils_1.validatePath)(payload.path, 3);
        this.params = helper.createTx(payload.transaction, path, payload.chunkify);
    }
    get info() {
        return 'Sign NEM transaction';
    }
    async run() {
        const cmd = this.device.getCommands();
        const response = await cmd.typedCall('NEMSignTx', 'NEMSignedTx', this.params);
        return response.message;
    }
}
exports.default = NEMSignTransaction;
//# sourceMappingURL=nemSignTransaction.js.map