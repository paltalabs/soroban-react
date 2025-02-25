"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOrderbookOrder = void 0;
const _ = __importStar(require("lodash"));
const utils_1 = require("./utils");
const common_1 = require("../../common");
const flags_1 = require("./flags");
const amount_1 = __importDefault(require("./amount"));
function parseOrderbookOrder(data) {
    const direction = (data.Flags & flags_1.orderFlags.Sell) === 0 ? 'buy' : 'sell';
    const takerGetsAmount = amount_1.default(data.TakerGets);
    const takerPaysAmount = amount_1.default(data.TakerPays);
    const quantity = direction === 'buy' ? takerPaysAmount : takerGetsAmount;
    const totalPrice = direction === 'buy' ? takerGetsAmount : takerPaysAmount;
    const specification = common_1.removeUndefined({
        direction: direction,
        quantity: quantity,
        totalPrice: totalPrice,
        passive: (data.Flags & flags_1.orderFlags.Passive) !== 0 || undefined,
        expirationTime: utils_1.parseTimestamp(data.Expiration)
    });
    const properties = {
        maker: data.Account,
        sequence: data.Sequence,
        makerExchangeRate: utils_1.adjustQualityForXRP(data.quality, takerGetsAmount.currency, takerPaysAmount.currency)
    };
    const takerGetsFunded = data.taker_gets_funded
        ? amount_1.default(data.taker_gets_funded)
        : undefined;
    const takerPaysFunded = data.taker_pays_funded
        ? amount_1.default(data.taker_pays_funded)
        : undefined;
    const available = common_1.removeUndefined({
        fundedAmount: takerGetsFunded,
        priceOfFundedAmount: takerPaysFunded
    });
    const state = _.isEmpty(available) ? undefined : available;
    return common_1.removeUndefined({ specification, properties, state, data });
}
exports.parseOrderbookOrder = parseOrderbookOrder;
//# sourceMappingURL=orderbook-order.js.map