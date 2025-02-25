"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAccountUtxo = exports.transformAccountInfo = exports.transformAddresses = exports.transformTokenInfo = exports.transformTransaction = exports.isTxFailed = exports.filterEthereumInternalTransfers = exports.isEthereumStakingInternalTransfer = exports.filterTokenTransfers = exports.transformServerInfo = void 0;
const bigNumber_1 = require("@trezor/utils/lib/bigNumber");
const utils_1 = require("./utils");
const transformServerInfo = (payload) => {
    var _a;
    return ({
        name: payload.name,
        shortcut: payload.shortcut,
        testnet: payload.testnet,
        version: payload.version,
        decimals: payload.decimals,
        blockHeight: payload.bestHeight,
        blockHash: payload.bestHash,
        consensusBranchId: ((_a = payload.backend) === null || _a === void 0 ? void 0 : _a.consensus)
            ? parseInt(payload.backend.consensus.chaintip, 16)
            : undefined,
    });
};
exports.transformServerInfo = transformServerInfo;
const filterTokenTransfers = (addresses, transfers) => {
    if (typeof addresses === 'string') {
        addresses = [addresses];
    }
    if (!addresses || !Array.isArray(addresses) || !transfers || !Array.isArray(transfers))
        return [];
    const all = addresses.map(a => {
        if (typeof a === 'string')
            return a;
        if (typeof a === 'object' && typeof a.address === 'string')
            return a.address;
        return null;
    });
    return transfers
        .filter(transfer => {
        if (transfer && typeof transfer === 'object') {
            return ((transfer.from && all.indexOf(transfer.from) >= 0) ||
                (transfer.to && all.indexOf(transfer.to) >= 0));
        }
        return false;
    })
        .map(transfer => {
        const isIncoming = transfer.from && all.indexOf(transfer.from) >= 0;
        const isOutgoing = transfer.to && all.indexOf(transfer.to) >= 0;
        let type;
        if (isIncoming && isOutgoing) {
            type = 'self';
        }
        else if (isIncoming) {
            type = 'sent';
        }
        else {
            type = 'recv';
        }
        const tokenTransfer = Object.assign(Object.assign({}, transfer), { type, decimals: transfer.decimals || 0, amount: transfer.value || '', standard: transfer.type });
        delete tokenTransfer.value;
        return tokenTransfer;
    });
};
exports.filterTokenTransfers = filterTokenTransfers;
const ethereumStakingAddresses = {
    poolInstance: [
        '0xD523794C879D9eC028960a231F866758e405bE34',
        '0xAFA848357154a6a624686b348303EF9a13F63264',
    ],
    withdrawTreasury: [
        '0x19449f0f696703Aa3b1485DfA2d855F33659397a',
        '0x66cb3AeD024740164EBcF04e292dB09b5B63A2e1',
    ],
};
const isEthereumStakingInternalTransfer = (from, to) => {
    const { poolInstance, withdrawTreasury } = ethereumStakingAddresses;
    return poolInstance.includes(from) && withdrawTreasury.includes(to);
};
exports.isEthereumStakingInternalTransfer = isEthereumStakingInternalTransfer;
const filterEthereumInternalTransfers = (address, ethereumSpecific) => {
    const internalTransfers = ethereumSpecific === null || ethereumSpecific === void 0 ? void 0 : ethereumSpecific.internalTransfers;
    if (!address || !(internalTransfers === null || internalTransfers === void 0 ? void 0 : internalTransfers.length)) {
        return [];
    }
    return (internalTransfers
        .filter(({ type, from, to }) => type === 0 &&
        ([from, to].includes(address) || (0, exports.isEthereumStakingInternalTransfer)(from, to)))
        .map(({ from, to, value }) => {
        const isIncoming = from === address;
        const isOutgoing = to === address;
        let type;
        if (isIncoming && isOutgoing) {
            type = 'self';
        }
        else if (isIncoming) {
            type = 'sent';
        }
        else if (isOutgoing) {
            type = 'recv';
        }
        else {
            type = 'external';
        }
        return {
            type,
            amount: value,
            from,
            to,
        };
    }));
};
exports.filterEthereumInternalTransfers = filterEthereumInternalTransfers;
const isTxFailed = (tx) => { var _a; return !(!tx.blockHeight || tx.blockHeight < 0) && ((_a = tx.ethereumSpecific) === null || _a === void 0 ? void 0 : _a.status) === 0; };
exports.isTxFailed = isTxFailed;
const transformTransaction = (tx, addressesOrDescriptor) => {
    var _a, _b, _c, _d, _e;
    const [addresses, descriptor] = typeof addressesOrDescriptor === 'object'
        ? [addressesOrDescriptor, undefined]
        : [undefined, addressesOrDescriptor];
    const myAddresses = addresses
        ? addresses.change.concat(addresses.used, addresses.unused).map(a => a.address)
        : (descriptor && [descriptor]) || [];
    const inputs = Array.isArray(tx.vin) ? tx.vin : [];
    const totalInput = inputs.reduce(utils_1.sumVinVout, 0);
    const myInputs = (0, utils_1.filterTargets)(myAddresses, tx.vin);
    const myTotalInput = myInputs.reduce(utils_1.sumVinVout, 0);
    const outputs = Array.isArray(tx.vout) ? tx.vout : [];
    const totalOutput = outputs.reduce(utils_1.sumVinVout, 0);
    const myOutputs = (0, utils_1.filterTargets)(myAddresses, tx.vout);
    const myTotalOutput = myOutputs.reduce(utils_1.sumVinVout, 0);
    const myTokens = (0, exports.filterTokenTransfers)(myAddresses, tx.tokenTransfers);
    const myInternalTransfers = (0, exports.filterEthereumInternalTransfers)(descriptor, tx.ethereumSpecific);
    const isNonChangeOutput = (o) => addresses ? (0, utils_1.filterTargets)(addresses.change, tx.vout).indexOf(o) < 0 : true;
    const isNonZero = (o) => o.value && o.value !== '0';
    let type;
    let amount;
    let targets;
    if ((_a = tx.ethereumSpecific) === null || _a === void 0 ? void 0 : _a.createdContract) {
        type = 'contract';
        amount = tx.value;
        targets = [];
    }
    else if (myInputs.length) {
        if (myInputs.length < inputs.length) {
            type = 'joint';
            targets = [];
            amount = new bigNumber_1.BigNumber(myTotalOutput).minus(myTotalInput).toString();
        }
        else if (myOutputs.length < outputs.length || !outputs.length) {
            type = 'sent';
            targets = myTokens.length
                ? outputs.filter(isNonZero)
                : outputs.filter(isNonChangeOutput);
            amount =
                !outputs.length || tx.ethereumSpecific
                    ? tx.value
                    : new bigNumber_1.BigNumber(myTotalInput)
                        .minus(myTotalOutput)
                        .minus((_b = tx.fees) !== null && _b !== void 0 ? _b : '0')
                        .toString();
        }
        else {
            type = 'self';
            amount = tx.fees;
            const intentionalOutputs = outputs.filter(isNonChangeOutput);
            targets = intentionalOutputs.length ? intentionalOutputs : outputs;
        }
    }
    else if (myOutputs.length || myTokens.length || myInternalTransfers.length) {
        type = 'recv';
        amount = myTotalOutput.toString();
        targets = myOutputs;
        const transfers = [...myTokens, ...myInternalTransfers];
        const isSentTransferAvailable = transfers.find(t => t.type === 'sent');
        const isNoRecvTransferAvailable = transfers.find(t => t.type !== 'recv');
        if (isSentTransferAvailable) {
            type = 'sent';
        }
        else if (!myOutputs.length && isNoRecvTransferAvailable) {
            type = 'self';
        }
    }
    else {
        type = 'unknown';
        amount = tx.value;
        targets = [];
    }
    type = (0, exports.isTxFailed)(tx) ? 'failed' : type;
    const rbf = tx.rbf || inputs.find(i => typeof i.sequence === 'number' && i.sequence < 0xffffffff - 1)
        ? true
        : undefined;
    const fee = tx.ethereumSpecific && !tx.ethereumSpecific.gasUsed
        ? new bigNumber_1.BigNumber((_d = (_c = tx.ethereumSpecific) === null || _c === void 0 ? void 0 : _c.gasPrice) !== null && _d !== void 0 ? _d : '0')
            .times(tx.ethereumSpecific.gasLimit)
            .toString()
        : tx.fees;
    const feeRate = tx.vsize
        ? new bigNumber_1.BigNumber(fee).div(tx.vsize).decimalPlaces(2).toString()
        : undefined;
    const size = tx.size || (typeof tx.hex === 'string' ? tx.hex.length / 2 : 0);
    return {
        type,
        txid: tx.txid,
        hex: tx.hex,
        blockTime: tx.blockTime,
        blockHeight: tx.blockHeight,
        blockHash: tx.blockHash,
        lockTime: tx.lockTime,
        amount,
        fee,
        vsize: tx.vsize,
        feeRate,
        targets: targets
            .filter(target => typeof target === 'object')
            .map(target => (0, utils_1.transformTarget)(target, myOutputs)),
        tokens: myTokens,
        internalTransfers: myInternalTransfers,
        rbf,
        ethereumSpecific: tx.ethereumSpecific && Object.assign(Object.assign({}, tx.ethereumSpecific), { gasPrice: (_e = tx.ethereumSpecific.gasPrice) !== null && _e !== void 0 ? _e : '0' }),
        details: {
            vin: inputs.map((0, utils_1.enhanceVinVout)(myAddresses)),
            vout: outputs.map((0, utils_1.enhanceVinVout)(myAddresses)),
            size,
            totalInput: totalInput.toString(),
            totalOutput: totalOutput.toString(),
        },
    };
};
exports.transformTransaction = transformTransaction;
const transformTokenInfo = (tokens) => {
    if (!tokens || !Array.isArray(tokens))
        return undefined;
    const info = tokens.reduce((arr, token) => {
        if (token.type === 'XPUBAddress')
            return arr;
        return arr.concat([
            Object.assign(Object.assign({}, token), { decimals: token.decimals || 0 }),
        ]);
    }, []);
    return info.length > 0 ? info : undefined;
};
exports.transformTokenInfo = transformTokenInfo;
const transformAddresses = (tokens) => {
    if (!tokens || !Array.isArray(tokens))
        return undefined;
    const addresses = tokens.reduce((arr, t) => {
        if (t.type !== 'XPUBAddress')
            return arr;
        return arr.concat([
            {
                address: t.name,
                path: t.path,
                transfers: t.transfers,
                balance: t.balance,
                sent: t.totalSent,
                received: t.totalReceived,
            },
        ]);
    }, []);
    if (addresses.length < 1)
        return undefined;
    const internal = addresses.filter(a => a.path.split('/')[4] === '1');
    const external = addresses.filter(a => internal.indexOf(a) < 0);
    return {
        change: internal,
        used: external.filter(a => a.transfers > 0),
        unused: external.filter(a => a.transfers === 0),
    };
};
exports.transformAddresses = transformAddresses;
const transformAccountInfo = (payload) => {
    let page;
    if (typeof payload.page === 'number') {
        page = {
            index: payload.page,
            size: payload.itemsOnPage,
            total: payload.totalPages,
        };
    }
    const isEVM = typeof payload.nonce === 'string';
    let misc;
    if (isEVM) {
        misc = {
            nonce: payload.nonce,
            contractInfo: payload.contractInfo,
            stakingPools: payload.stakingPools,
            addressAliases: payload.addressAliases,
        };
    }
    const descriptor = payload.address;
    const addresses = (0, exports.transformAddresses)(payload.tokens);
    const tokens = (0, exports.transformTokenInfo)(payload.tokens);
    const unconfirmedBalance = new bigNumber_1.BigNumber(payload.unconfirmedBalance);
    let availableBalance = payload.balance;
    if (!unconfirmedBalance.isNaN()) {
        if (!isEVM) {
            availableBalance = unconfirmedBalance.plus(payload.balance).toString();
        }
        else if (isEVM && unconfirmedBalance.lt(0)) {
            availableBalance = unconfirmedBalance.plus(payload.balance).toString();
        }
    }
    const empty = payload.txs === 0 &&
        payload.unconfirmedTxs === 0 &&
        new bigNumber_1.BigNumber(availableBalance).isZero();
    return {
        descriptor,
        balance: payload.balance,
        availableBalance,
        empty,
        tokens,
        addresses,
        history: {
            addrTxCount: payload.addrTxCount,
            total: payload.txs,
            tokens: typeof payload.nonTokenTxs === 'number'
                ? payload.txs - payload.nonTokenTxs
                : undefined,
            unconfirmed: payload.unconfirmedTxs,
            transactions: payload.transactions
                ? payload.transactions.map(t => (0, exports.transformTransaction)(t, addresses !== null && addresses !== void 0 ? addresses : descriptor))
                : undefined,
        },
        misc,
        page,
    };
};
exports.transformAccountInfo = transformAccountInfo;
const transformAccountUtxo = (payload) => payload.map(utxo => ({
    txid: utxo.txid,
    vout: utxo.vout,
    amount: utxo.value,
    blockHeight: utxo.height,
    address: utxo.address,
    path: utxo.path,
    confirmations: utxo.confirmations,
    coinbase: utxo.coinbase,
}));
exports.transformAccountUtxo = transformAccountUtxo;
//# sourceMappingURL=blockbook.js.map