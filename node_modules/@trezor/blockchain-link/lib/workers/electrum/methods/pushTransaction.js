"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pushTransaction = (client, payload) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const res = yield client.request('blockchain.transaction.broadcast', payload);
    return res;
});
exports.default = pushTransaction;
//# sourceMappingURL=pushTransaction.js.map