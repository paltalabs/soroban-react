"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const helpers_1 = require("./helpers");
const validDeviceModelsIds = ["nanoS", "nanoX", "blue", "nanoSP", "stax", "europa"];
const invalidDeviceModelsIds = ["does-not-exist", "", null, undefined];
describe("isDeviceModelId", () => {
    validDeviceModelsIds.forEach(potentialModelId => {
        test(`Input: ${potentialModelId} -> Expected output: true`, () => {
            const result = (0, helpers_1.isDeviceModelId)(potentialModelId);
            expect(result).toEqual(true);
        });
    });
    invalidDeviceModelsIds.forEach(potentialModelId => {
        test(`Input: ${potentialModelId} -> Expected output: false`, () => {
            const result = (0, helpers_1.isDeviceModelId)(potentialModelId);
            expect(result).toEqual(false);
        });
    });
});
describe("stringToDeviceModelId", () => {
    const tests = [
        {
            input: ["stax", _1.DeviceModelId.nanoSP],
            expectedOutput: _1.DeviceModelId.stax,
        },
        {
            input: ["does-not-exist", _1.DeviceModelId.nanoSP],
            expectedOutput: _1.DeviceModelId.nanoSP,
        },
    ];
    tests.forEach(({ input, expectedOutput }) => {
        test(`Input: ${JSON.stringify(input)} -> Expected output: ${expectedOutput}`, () => {
            const result = (0, helpers_1.stringToDeviceModelId)(...input);
            expect(result).toEqual(expectedOutput);
        });
    });
});
//# sourceMappingURL=helpers.test.js.map