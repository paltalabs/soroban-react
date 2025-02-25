"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTx = exports.validate = void 0;
const tslib_1 = require("tslib");
const bs58_1 = tslib_1.__importDefault(require("bs58"));
const constants_1 = require("../../constants");
const binaryToDecimal = (bignum, minDigits = 1) => {
    const result = Array(minDigits).fill('0'.charCodeAt(0));
    for (let i = bignum.length - 1; i >= 0; --i) {
        let carry = bignum[i];
        for (let j = 0; j < result.length; ++j) {
            const x = ((result[j] - '0'.charCodeAt(0)) << 8) + carry;
            result[j] = '0'.charCodeAt(0) + (x % 10);
            carry = (x / 10) | 0;
        }
        while (carry) {
            result.push('0'.charCodeAt(0) + (carry % 10));
            carry = (carry / 10) | 0;
        }
    }
    result.reverse();
    return String.fromCharCode(...result);
};
const serialize = (s) => {
    if (typeof s !== 'string') {
        throw constants_1.ERRORS.TypedError('Method_InvalidParameter', `Eos serialization error, "${typeof s}" should be a string`);
    }
    const charToSymbol = (c) => {
        if (c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0)) {
            return c - 'a'.charCodeAt(0) + 6;
        }
        if (c >= '1'.charCodeAt(0) && c <= '5'.charCodeAt(0)) {
            return c - '1'.charCodeAt(0) + 1;
        }
        return 0;
    };
    const a = new Uint8Array(8);
    let bit = 63;
    for (let i = 0; i < s.length; ++i) {
        let c = charToSymbol(s.charCodeAt(i));
        if (bit < 5) {
            c <<= 1;
        }
        for (let j = 4; j >= 0; --j) {
            if (bit >= 0) {
                a[Math.floor(bit / 8)] |= ((c >> j) & 1) << bit % 8;
                --bit;
            }
        }
    }
    return binaryToDecimal(a);
};
const parseQuantity = (s) => {
    if (typeof s !== 'string') {
        throw constants_1.ERRORS.TypedError('Method_InvalidParameter', `Eos serialization error. Expected string containing asset, got: ${typeof s}`);
    }
    s = s.trim();
    let pos = 0;
    let amount = '';
    let precision = 0;
    if (s[pos] === '-') {
        amount += '-';
        ++pos;
    }
    let foundDigit = false;
    while (pos < s.length &&
        s.charCodeAt(pos) >= '0'.charCodeAt(0) &&
        s.charCodeAt(pos) <= '9'.charCodeAt(0)) {
        foundDigit = true;
        amount += s[pos];
        ++pos;
    }
    if (!foundDigit) {
        throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'Eos serialization error. Asset must begin with a number');
    }
    if (s[pos] === '.') {
        ++pos;
        while (pos < s.length &&
            s.charCodeAt(pos) >= '0'.charCodeAt(0) &&
            s.charCodeAt(pos) <= '9'.charCodeAt(0)) {
            amount += s[pos];
            ++precision;
            ++pos;
        }
    }
    const symbol = s.substring(pos).trim();
    const a = [precision & 0xff];
    for (let i = 0; i < symbol.length; ++i) {
        a.push(symbol.charCodeAt(i));
    }
    while (a.length < 8) {
        a.push(0);
    }
    return {
        amount,
        symbol: binaryToDecimal(a.slice(0, 8)),
    };
};
const parseAuth = (a) => {
    const keyToBuffer = (pk) => {
        const len = pk.indexOf('EOS') === 0 ? 3 : 7;
        const key = Buffer.from(bs58_1.default.decode(pk.substring(len)));
        return {
            type: 0,
            key: key.subarray(0, key.length - 4).toString('hex'),
        };
    };
    return {
        threshold: a.threshold,
        keys: a.keys.map(k => ({
            weight: k.weight,
            ...keyToBuffer(k.key),
        })),
        accounts: a.accounts.map(acc => ({
            weight: acc.weight,
            account: {
                actor: serialize(acc.permission.actor),
                permission: serialize(acc.permission.permission),
            },
        })),
        waits: a.waits,
    };
};
const parseDate = (d) => {
    if (typeof d !== 'string') {
        throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'Eos serialization error. Header.expiration should be string or number');
    }
    if (d.substring(d.length - 1, d.length) !== 'Z') {
        d += 'Z';
    }
    return Date.parse(d) / 1000;
};
const parseAck = (action) => {
    switch (action.name) {
        case 'transfer':
            return {
                transfer: {
                    sender: serialize(action.data.from),
                    receiver: serialize(action.data.to),
                    quantity: parseQuantity(action.data.quantity),
                    memo: action.data.memo,
                },
            };
        case 'delegatebw':
            return {
                delegate: {
                    sender: serialize(action.data.from),
                    receiver: serialize(action.data.receiver),
                    net_quantity: parseQuantity(action.data.stake_net_quantity),
                    cpu_quantity: parseQuantity(action.data.stake_cpu_quantity),
                    transfer: action.data.transfer,
                },
            };
        case 'undelegatebw':
            return {
                undelegate: {
                    sender: serialize(action.data.from),
                    receiver: serialize(action.data.receiver),
                    net_quantity: parseQuantity(action.data.unstake_net_quantity),
                    cpu_quantity: parseQuantity(action.data.unstake_cpu_quantity),
                },
            };
        case 'buyram':
            return {
                buy_ram: {
                    payer: serialize(action.data.payer),
                    receiver: serialize(action.data.receiver),
                    quantity: parseQuantity(action.data.quant),
                },
            };
        case 'buyrambytes':
            return {
                buy_ram_bytes: {
                    payer: serialize(action.data.payer),
                    receiver: serialize(action.data.receiver),
                    bytes: action.data.bytes,
                },
            };
        case 'sellram':
            return {
                sell_ram: {
                    account: serialize(action.data.account),
                    bytes: action.data.bytes,
                },
            };
        case 'voteproducer':
            return {
                vote_producer: {
                    voter: serialize(action.data.voter),
                    proxy: serialize(action.data.proxy),
                    producers: action.data.producers.map(p => serialize(p)),
                },
            };
        case 'refund':
            return {
                refund: {
                    owner: serialize(action.data.owner),
                },
            };
        case 'updateauth':
            return {
                update_auth: {
                    account: serialize(action.data.account),
                    permission: serialize(action.data.permission),
                    parent: serialize(action.data.parent),
                    auth: parseAuth(action.data.auth),
                },
            };
        case 'deleteauth':
            return {
                delete_auth: {
                    account: serialize(action.data.account),
                    permission: serialize(action.data.permission),
                },
            };
        case 'linkauth':
            return {
                link_auth: {
                    account: serialize(action.data.account),
                    code: serialize(action.data.code),
                    type: serialize(action.data.type),
                    requirement: serialize(action.data.requirement),
                },
            };
        case 'unlinkauth':
            return {
                unlink_auth: {
                    account: serialize(action.data.account),
                    code: serialize(action.data.code),
                    type: serialize(action.data.type),
                },
            };
        case 'newaccount':
            return {
                new_account: {
                    creator: serialize(action.data.creator),
                    name: serialize(action.data.name),
                    owner: parseAuth(action.data.owner),
                    active: parseAuth(action.data.active),
                },
            };
        default:
            return null;
    }
};
const parseUnknown = (action) => {
    if (typeof action.data !== 'string')
        return null;
    return {
        unknown: {
            data_size: action.data.length / 2,
            data_chunk: action.data,
        },
    };
};
const parseCommon = (action) => ({
    account: serialize(action.account),
    name: serialize(action.name),
    authorization: action.authorization.map(a => ({
        actor: serialize(a.actor),
        permission: serialize(a.permission),
    })),
});
const parseAction = (action) => {
    const ack = parseAck(action) || parseUnknown(action);
    return {
        common: parseCommon(action),
        ...ack,
    };
};
const validate = (tx) => {
    const header = {
        expiration: typeof tx.header.expiration === 'number'
            ? tx.header.expiration
            : parseDate(tx.header.expiration),
        ref_block_num: tx.header.refBlockNum,
        ref_block_prefix: tx.header.refBlockPrefix,
        max_net_usage_words: tx.header.maxNetUsageWords,
        max_cpu_usage_ms: tx.header.maxCpuUsageMs,
        delay_sec: tx.header.delaySec,
    };
    const ack = [];
    tx.actions.forEach(action => {
        ack.push(parseAction(action));
    });
    return {
        chain_id: tx.chainId,
        header,
        ack,
    };
};
exports.validate = validate;
const CHUNK_SIZE = 2048;
const getDataChunk = (data, offset) => {
    if (!data || offset < 0 || data.length < offset)
        return '';
    const o = offset > 0 ? data.length - offset * 2 : 0;
    return data.substring(o, o + CHUNK_SIZE * 2);
};
const processTxRequest = async (typedCall, message, actions, index) => {
    const action = actions[index];
    const lastOp = index + 1 >= actions.length;
    let ack;
    const requestedDataSize = message.data_size;
    if (action.unknown) {
        const { unknown } = action;
        const offset = typeof requestedDataSize === 'number' ? requestedDataSize : 0;
        const data_chunk = getDataChunk(unknown.data_chunk, offset);
        const params = {
            common: action.common,
            unknown: {
                data_size: unknown.data_size,
                data_chunk,
            },
        };
        const sent = offset > 0 ? unknown.data_size - offset + CHUNK_SIZE : CHUNK_SIZE;
        const lastChunk = sent >= unknown.data_size;
        if (lastOp && lastChunk) {
            const response = await typedCall('EosTxActionAck', 'EosSignedTx', params);
            return response.message;
        }
        ack = await typedCall('EosTxActionAck', 'EosTxActionRequest', params);
        if (lastChunk) {
            index++;
        }
    }
    else {
        if (lastOp) {
            const response = await typedCall('EosTxActionAck', 'EosSignedTx', action);
            return response.message;
        }
        ack = await typedCall('EosTxActionAck', 'EosTxActionRequest', action);
        index++;
    }
    return processTxRequest(typedCall, ack.message, actions, index);
};
const signTx = async (typedCall, address_n, chain_id, header, actions, chunkify) => {
    const response = await typedCall('EosSignTx', 'EosTxActionRequest', {
        address_n,
        chain_id,
        header,
        num_actions: actions.length,
        chunkify,
    });
    return processTxRequest(typedCall, response.message, actions, 0);
};
exports.signTx = signTx;
//# sourceMappingURL=eosSignTx.js.map