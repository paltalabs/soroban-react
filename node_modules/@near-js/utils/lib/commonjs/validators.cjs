"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffEpochValidators = exports.findSeatPrice = void 0;
const depd_1 = __importDefault(require("depd"));
const utils_1 = require("./utils.cjs");
/** Finds seat price given validators stakes and number of seats.
 *  Calculation follow the spec: https://nomicon.io/Economics/README.html#validator-selection
 * @param validators: current or next epoch validators.
 * @param maxNumberOfSeats: maximum number of seats in the network.
 * @param minimumStakeRatio: minimum stake ratio
 * @param protocolVersion: version of the protocol from genesis config
 */
function findSeatPrice(validators, maxNumberOfSeats, minimumStakeRatio, protocolVersion) {
    if (protocolVersion && protocolVersion < 49) {
        return findSeatPriceForProtocolBefore49(validators, maxNumberOfSeats);
    }
    if (!minimumStakeRatio) {
        const deprecate = (0, depd_1.default)('findSeatPrice(validators, maxNumberOfSeats)');
        deprecate('`use `findSeatPrice(validators, maxNumberOfSeats, minimumStakeRatio)` instead');
        minimumStakeRatio = [1, 6250]; // hardcoded minimumStakeRation from 12/7/21
    }
    return findSeatPriceForProtocolAfter49(validators, maxNumberOfSeats, minimumStakeRatio);
}
exports.findSeatPrice = findSeatPrice;
function findSeatPriceForProtocolBefore49(validators, numSeats) {
    const stakes = validators.map(v => BigInt(v.stake)).sort(utils_1.sortBigIntAsc);
    const num = BigInt(numSeats);
    const stakesSum = stakes.reduce((a, b) => a + b);
    if (stakesSum < num) {
        throw new Error('Stakes are below seats');
    }
    // assert stakesSum >= numSeats
    let left = 1n, right = stakesSum + 1n;
    while (left !== right - 1n) {
        const mid = (left + right) / 2n;
        let found = false;
        let currentSum = 0n;
        for (let i = 0; i < stakes.length; ++i) {
            currentSum = currentSum + (stakes[i] / mid);
            if (currentSum >= num) {
                left = mid;
                found = true;
                break;
            }
        }
        if (!found) {
            right = mid;
        }
    }
    return left;
}
// nearcore reference: https://github.com/near/nearcore/blob/5a8ae263ec07930cd34d0dcf5bcee250c67c02aa/chain/epoch_manager/src/validator_selection.rs#L308;L315
function findSeatPriceForProtocolAfter49(validators, maxNumberOfSeats, minimumStakeRatio) {
    if (minimumStakeRatio.length != 2) {
        throw Error('minimumStakeRatio should have 2 elements');
    }
    const stakes = validators.map(v => BigInt(v.stake)).sort(utils_1.sortBigIntAsc);
    const stakesSum = stakes.reduce((a, b) => a + b);
    if (validators.length < maxNumberOfSeats) {
        return stakesSum * BigInt(minimumStakeRatio[0]) / BigInt(minimumStakeRatio[1]);
    }
    else {
        return stakes[0] + 1n;
    }
}
/** Diff validators between current and next epoch.
 * Returns additions, subtractions and changes to validator set.
 * @param currentValidators: list of current validators.
 * @param nextValidators: list of next validators.
 */
function diffEpochValidators(currentValidators, nextValidators) {
    const validatorsMap = new Map();
    currentValidators.forEach(v => validatorsMap.set(v.account_id, v));
    const nextValidatorsSet = new Set(nextValidators.map(v => v.account_id));
    return {
        newValidators: nextValidators.filter(v => !validatorsMap.has(v.account_id)),
        removedValidators: currentValidators.filter(v => !nextValidatorsSet.has(v.account_id)),
        changedValidators: nextValidators.filter(v => (validatorsMap.has(v.account_id) && validatorsMap.get(v.account_id).stake != v.stake))
            .map(v => ({ current: validatorsMap.get(v.account_id), next: v }))
    };
}
exports.diffEpochValidators = diffEpochValidators;
