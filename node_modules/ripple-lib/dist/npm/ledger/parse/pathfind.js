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
const _ = __importStar(require("lodash"));
const amount_1 = __importDefault(require("./amount"));
function parsePaths(paths) {
    return paths.map((steps) => steps.map((step) => _.omit(step, ['type', 'type_hex'])));
}
function removeAnyCounterpartyEncoding(address, amount) {
    return amount.counterparty === address
        ? _.omit(amount, 'counterparty')
        : amount;
}
function createAdjustment(address, adjustmentWithoutAddress) {
    const amountKey = Object.keys(adjustmentWithoutAddress)[0];
    const amount = adjustmentWithoutAddress[amountKey];
    return _.set({ address: address }, amountKey, removeAnyCounterpartyEncoding(address, amount));
}
function parseAlternative(sourceAddress, destinationAddress, destinationAmount, alternative) {
    const amounts = alternative.destination_amount != null
        ? {
            source: { amount: amount_1.default(alternative.source_amount) },
            destination: { minAmount: amount_1.default(alternative.destination_amount) }
        }
        : {
            source: { maxAmount: amount_1.default(alternative.source_amount) },
            destination: { amount: amount_1.default(destinationAmount) }
        };
    return {
        source: createAdjustment(sourceAddress, amounts.source),
        destination: createAdjustment(destinationAddress, amounts.destination),
        paths: JSON.stringify(parsePaths(alternative.paths_computed))
    };
}
function parsePathfind(pathfindResult) {
    const sourceAddress = pathfindResult.source_account;
    const destinationAddress = pathfindResult.destination_account;
    const destinationAmount = pathfindResult.destination_amount;
    return pathfindResult.alternatives.map((alt) => parseAlternative(sourceAddress, destinationAddress, destinationAmount, alt));
}
exports.default = parsePathfind;
//# sourceMappingURL=pathfind.js.map