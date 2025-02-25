"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTokenSymbol = exports.sortTxsFromLatest = exports.transformTarget = exports.sumVinVout = exports.enhanceVinVout = exports.filterTargets = exports.isAccountOwned = void 0;
const bigNumber_1 = require("@trezor/utils/lib/bigNumber");
const utils_1 = require("@trezor/utils");
const isAccountOwned = (addresses) => (vinVout) => Array.isArray(vinVout === null || vinVout === void 0 ? void 0 : vinVout.addresses) && vinVout.addresses.some(a => addresses.includes(a));
exports.isAccountOwned = isAccountOwned;
const filterTargets = (addresses, targets) => {
    if (typeof addresses === 'string') {
        addresses = [addresses];
    }
    if (!addresses || !Array.isArray(addresses) || !targets || !Array.isArray(targets))
        return [];
    const all = addresses
        .map(a => {
        if (typeof a === 'string')
            return a;
        if (typeof a === 'object' && typeof a.address === 'string')
            return a.address;
        return undefined;
    })
        .filter(utils_1.isNotUndefined);
    return targets.filter((0, exports.isAccountOwned)(all));
};
exports.filterTargets = filterTargets;
const enhanceVinVout = (addresses) => (vinVout) => (Object.assign(Object.assign({}, vinVout), { isAccountOwned: (0, exports.isAccountOwned)(addresses)(vinVout) || undefined }));
exports.enhanceVinVout = enhanceVinVout;
const sumVinVout = (sum, { value }) => typeof value === 'string' ? new bigNumber_1.BigNumber(value || '0').plus(sum) : sum;
exports.sumVinVout = sumVinVout;
const transformTarget = (target, incoming) => ({
    n: target.n || 0,
    addresses: target.addresses,
    isAddress: target.isAddress,
    amount: target.value,
    coinbase: target.coinbase,
    isAccountTarget: incoming.includes(target) ? true : undefined,
});
exports.transformTarget = transformTarget;
const adjustHeight = ({ blockHeight }) => blockHeight === undefined || blockHeight <= 0 ? Number.MAX_SAFE_INTEGER : blockHeight;
const sortTxsFromLatest = (transactions) => {
    const txs = transactions.slice().sort((a, b) => adjustHeight(b) - adjustHeight(a));
    let from = 0;
    while (from < txs.length - 1) {
        const fromHeight = adjustHeight(txs[from]);
        let to = from + 1;
        if (fromHeight === adjustHeight(txs[to])) {
            do {
                to++;
            } while (to < txs.length && fromHeight === adjustHeight(txs[to]));
            const toposorted = (0, utils_1.topologicalSort)(txs.slice(from, to), (a, b) => a.details.vin.some(({ txid }) => txid === b.txid));
            txs.splice(from, toposorted.length, ...toposorted);
        }
        from = to;
    }
    return txs;
};
exports.sortTxsFromLatest = sortTxsFromLatest;
const formatTokenSymbol = (symbol) => {
    const upperCasedSymbol = symbol.toUpperCase();
    const isTokenSymbolLong = upperCasedSymbol.length > 7;
    return isTokenSymbolLong ? `${upperCasedSymbol.slice(0, 7)}...` : upperCasedSymbol;
};
exports.formatTokenSymbol = formatTokenSymbol;
//# sourceMappingURL=utils.js.map