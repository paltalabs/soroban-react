"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bigNumber_1 = require("@trezor/utils/lib/bigNumber");
const utxo_lib_1 = require("@trezor/utxo-lib");
const blockchain_link_utils_1 = require("@trezor/blockchain-link-utils");
const blockbook_1 = require("@trezor/blockchain-link-utils/lib/blockbook");
const utils_1 = require("../utils");
const transformAddress = (addr) => ({
    address: addr.address,
    path: addr.path,
    transfers: addr.history.length,
});
const aggregateTransactions = (txs, groupBy = 3600) => {
    const result = [];
    let i = 0;
    while (i < txs.length) {
        const time = Math.floor(txs[i].blockTime / groupBy) * groupBy;
        let j = i;
        let received = 0;
        let sent = 0;
        let sentToSelf = 0;
        while (j < txs.length && txs[j].blockTime < time + groupBy) {
            const { type, amount, fee, details: { vin, vout, totalInput, totalOutput }, } = txs[j];
            if (type === 'recv')
                received += Number.parseInt(amount, 10);
            else if (type === 'sent')
                sent += Number.parseInt(amount, 10) + Number.parseInt(fee, 10);
            else if (type === 'self') {
                sentToSelf += Number.parseInt(totalOutput, 10);
                sent += Number.parseInt(totalInput, 10);
                received += Number.parseInt(totalOutput, 10);
            }
            else if (type === 'joint') {
                const myTotalInput = new bigNumber_1.BigNumber(vin.filter(vin => vin.isAccountOwned).reduce(blockchain_link_utils_1.sumVinVout, 0)).toNumber();
                const myTotalOutput = new bigNumber_1.BigNumber(vout.filter(vout => vout.isAccountOwned).reduce(blockchain_link_utils_1.sumVinVout, 0)).toNumber();
                sent += myTotalInput;
                received += myTotalOutput;
                sentToSelf += Math.min(myTotalInput, myTotalOutput);
            }
            j++;
        }
        result.push({
            time,
            txs: j - i,
            received: received.toString(),
            sent: sent.toString(),
            sentToSelf: sentToSelf.toString(),
            rates: {},
        });
        i = j;
    }
    return result;
};
const getAccountBalanceHistory = (client_1, _a) => tslib_1.__awaiter(void 0, [client_1, _a], void 0, function* (client, { descriptor, from, to, groupBy }) {
    var _b;
    let history;
    let addresses;
    const network = (_b = client.getInfo()) === null || _b === void 0 ? void 0 : _b.network;
    const parsed = (0, utils_1.tryGetScripthash)(descriptor, network);
    if (parsed.valid) {
        history = yield client.request('blockchain.scripthash.get_history', parsed.scripthash);
        addresses = undefined;
    }
    else {
        const discover = (0, utils_1.discoverAddress)(client);
        const receive = yield (0, utxo_lib_1.discovery)(discover, descriptor, 'receive', network);
        const change = yield (0, utxo_lib_1.discovery)(discover, descriptor, 'change', network);
        addresses = {
            change: change.map(transformAddress),
            used: receive.filter(({ history }) => history.length).map(transformAddress),
            unused: receive.filter(({ history }) => !history.length).map(transformAddress),
        };
        history = receive
            .map(({ history }) => history)
            .concat(change.map(({ history }) => history))
            .flat();
    }
    const txs = yield (0, utils_1.getTransactions)(client, history).then(txs => txs
        .filter(({ blockTime }) => (from || 0) <= blockTime && blockTime <= (to || Number.MAX_SAFE_INTEGER))
        .sort((a, b) => a.blockTime - b.blockTime)
        .map(tx => (Object.assign({ blockTime: -1 }, (0, blockbook_1.transformTransaction)(tx, addresses !== null && addresses !== void 0 ? addresses : descriptor)))));
    return aggregateTransactions(txs, groupBy);
});
exports.default = getAccountBalanceHistory;
//# sourceMappingURL=getAccountBalanceHistory.js.map