"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discoverAddress = void 0;
const tslib_1 = require("tslib");
const transform_1 = require("./transform");
const discoverAddress = (client) => (_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ address, path }) {
    var _b;
    const scripthash = (0, transform_1.addressToScripthash)(address, (_b = client.getInfo()) === null || _b === void 0 ? void 0 : _b.network);
    const history = yield client.request('blockchain.scripthash.get_history', scripthash);
    return {
        address,
        scripthash,
        path,
        history,
        empty: !history.length,
    };
});
exports.discoverAddress = discoverAddress;
//# sourceMappingURL=discovery.js.map