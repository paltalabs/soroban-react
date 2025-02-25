"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
function functionA() {
    throw new index_1.AmountRequired();
}
describe("custom errors", () => {
    test("error name", () => {
        try {
            functionA();
        }
        catch (e) {
            expect(e.name).toEqual("AmountRequired");
        }
    });
    test("error is correctly located at the functionA", () => {
        try {
            functionA();
        }
        catch (e) {
            const i = e.stack.indexOf("functionA");
            expect(e.stack.slice(0, i + 9)).toEqual(`AmountRequired: AmountRequired
    at functionA`);
        }
    });
    test("error with custom message", () => {
        try {
            throw new index_1.AmountRequired("YO");
        }
        catch (e) {
            expect(e.message).toEqual("YO");
        }
    });
    test("error with custom fields", () => {
        try {
            throw new index_1.CurrencyNotSupported("YO", { currencyName: "foo" });
        }
        catch (e) {
            expect(
            // FIXME it's not yet the good type here
            e instanceof index_1.CurrencyNotSupported && e.currencyName).toEqual("foo");
        }
    });
    test("error.cause", () => {
        try {
            functionA();
        }
        catch (cause) {
            try {
                throw new index_1.AmountRequired("YO", { foo: 42 }, { cause });
            }
            catch (e) {
                expect(e.cause).toMatchObject(new index_1.AmountRequired());
            }
        }
    });
    test("error instanceof", () => {
        try {
            functionA();
        }
        catch (e) {
            expect(e).toBeInstanceOf(index_1.AmountRequired);
        }
    });
    test("promise error instanceof", () => {
        expect(Promise.reject(new index_1.AmountRequired())).rejects.toBeInstanceOf(index_1.AmountRequired);
    });
    test("error is instance of Error", () => {
        const error = new index_1.AmountRequired();
        expect(error instanceof Error).toBeTruthy();
    });
    describe("TransportStatusError", () => {
        test("TransportStatusError contains the expected name, message, stack, status code and status message (non-regression)", () => {
            const error = new index_1.TransportStatusError(index_1.StatusCodes.UNKNOWN_APDU);
            console.log(`${JSON.stringify(error)}`);
            expect(error.name).toEqual("TransportStatusError");
            expect(error.message).toEqual("Ledger device: UNKNOWN_APDU (0x6d02)");
            expect(error.stack).toContain("Ledger device: UNKNOWN_APDU (0x6d02)");
            expect(error.statusText).toEqual("UNKNOWN_APDU");
            expect(error.statusCode).toEqual(0x6d02);
        });
        test("TransportStatusError should be mapped to a LockedDeviceError on status code 0x5515", () => {
            const error = new index_1.TransportStatusError(index_1.StatusCodes.LOCKED_DEVICE);
            expect(error.name).toEqual("LockedDeviceError");
            expect(error.message).toEqual("Ledger device: Locked device (0x5515)");
            expect(error.stack).toContain("Ledger device: Locked device (0x5515)");
            expect(error.statusText).toEqual("LOCKED_DEVICE");
            expect(error.statusCode).toEqual(0x5515);
        });
    });
});
//# sourceMappingURL=index.test.js.map