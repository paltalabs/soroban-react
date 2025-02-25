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
const _ = __importStar(require("lodash"));
const assert = __importStar(require("assert"));
function mergeIntervals(intervals) {
    const stack = [[-Infinity, -Infinity]];
    _.sortBy(intervals, (x) => x[0]).forEach((interval) => {
        const lastInterval = stack.pop();
        if (interval[0] <= lastInterval[1] + 1) {
            stack.push([lastInterval[0], Math.max(interval[1], lastInterval[1])]);
        }
        else {
            stack.push(lastInterval);
            stack.push(interval);
        }
    });
    return stack.slice(1);
}
class RangeSet {
    constructor() {
        this.reset();
    }
    reset() {
        this.ranges = [];
    }
    serialize() {
        return this.ranges
            .map((range) => range[0].toString() + '-' + range[1].toString())
            .join(',');
    }
    addRange(start, end) {
        assert.ok(start <= end, `invalid range ${start} <= ${end}`);
        this.ranges = mergeIntervals(this.ranges.concat([[start, end]]));
    }
    addValue(value) {
        this.addRange(value, value);
    }
    parseAndAddRanges(rangesString) {
        const rangeStrings = rangesString.split(',');
        rangeStrings.forEach((rangeString) => {
            const range = rangeString.split('-').map(Number);
            this.addRange(range[0], range.length === 1 ? range[0] : range[1]);
        });
    }
    containsRange(start, end) {
        return this.ranges.some((range) => range[0] <= start && range[1] >= end);
    }
    containsValue(value) {
        return this.containsRange(value, value);
    }
}
exports.default = RangeSet;
//# sourceMappingURL=rangeset.js.map