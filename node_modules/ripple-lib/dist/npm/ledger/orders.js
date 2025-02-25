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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const common_1 = require("../common");
const account_order_1 = require("./parse/account-order");
function formatResponse(address, responses) {
    let orders = [];
    for (const response of responses) {
        const offers = response.offers.map((offer) => {
            return account_order_1.parseAccountOrder(address, offer);
        });
        orders = orders.concat(offers);
    }
    return _.sortBy(orders, (order) => order.properties.sequence);
}
function getOrders(address, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        common_1.validate.getOrders({ address, options });
        const responses = yield this._requestAll('account_offers', {
            account: address,
            ledger_index: options.ledgerVersion || (yield this.getLedgerVersion()),
            limit: options.limit
        });
        return formatResponse(address, responses);
    });
}
exports.default = getOrders;
//# sourceMappingURL=orders.js.map