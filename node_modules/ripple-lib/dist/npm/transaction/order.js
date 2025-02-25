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
Object.defineProperty(exports, "__esModule", { value: true });
const utils = __importStar(require("./utils"));
const offerFlags = utils.common.txFlags.OfferCreate;
const common_1 = require("../common");
function createOrderTransaction(account, order) {
    const takerPays = common_1.toRippledAmount(order.direction === 'buy' ? order.quantity : order.totalPrice);
    const takerGets = common_1.toRippledAmount(order.direction === 'buy' ? order.totalPrice : order.quantity);
    const txJSON = {
        TransactionType: 'OfferCreate',
        Account: account,
        TakerGets: takerGets,
        TakerPays: takerPays,
        Flags: 0
    };
    if (order.direction === 'sell') {
        txJSON.Flags |= offerFlags.Sell;
    }
    if (order.passive === true) {
        txJSON.Flags |= offerFlags.Passive;
    }
    if (order.immediateOrCancel === true) {
        txJSON.Flags |= offerFlags.ImmediateOrCancel;
    }
    if (order.fillOrKill === true) {
        txJSON.Flags |= offerFlags.FillOrKill;
    }
    if (order.expirationTime != null) {
        txJSON.Expiration = common_1.iso8601ToRippleTime(order.expirationTime);
    }
    if (order.orderToReplace != null) {
        txJSON.OfferSequence = order.orderToReplace;
    }
    if (order.memos != null) {
        txJSON.Memos = order.memos.map(utils.convertMemo);
    }
    return txJSON;
}
function prepareOrder(address, order, instructions = {}) {
    try {
        common_1.validate.prepareOrder({ address, order, instructions });
        const txJSON = createOrderTransaction(address, order);
        return utils.prepareTransaction(txJSON, this, instructions);
    }
    catch (e) {
        return Promise.reject(e);
    }
}
exports.default = prepareOrder;
//# sourceMappingURL=order.js.map