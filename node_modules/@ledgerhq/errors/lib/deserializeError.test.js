"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
describe("resiliency of deserializeError", () => {
    [
        0,
        1,
        "",
        "foo",
        null,
        undefined,
        false,
        true,
        Symbol("bro"),
        {},
        { name: "foo" },
        { name: "foo", stack: "" },
    ].forEach(value => {
        it("should never crashes whatever the value is " + JSON.stringify(value), () => {
            expect(() => (0, helpers_1.deserializeError)(value)).not.toThrow();
        });
    });
});
describe("resiliency of serializeError", () => {
    [
        0,
        1,
        "",
        "foo",
        null,
        undefined,
        false,
        true,
        Symbol("bro"),
        {},
        { name: "foo" },
        { name: "foo", stack: "" },
    ].forEach(value => {
        it("should never crashes whatever the value is " + JSON.stringify(value), () => {
            expect(() => (0, helpers_1.serializeError)(value)).not.toThrow();
        });
    });
});
//# sourceMappingURL=deserializeError.test.js.map