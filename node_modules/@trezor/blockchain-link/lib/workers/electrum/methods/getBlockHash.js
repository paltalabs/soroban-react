"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../utils");
const getBlockHash = (client, payload) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const blockheader = yield client.request('blockchain.block.header', payload);
    return (0, utils_1.blockheaderToBlockhash)(blockheader);
});
exports.default = getBlockHash;
//# sourceMappingURL=getBlockHash.js.map