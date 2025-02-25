import ExtensionAPI from "../index";

describe("extension API", () => {
  it("has keys", () => {
    expect(typeof ExtensionAPI.isConnected).toBe("function");
    expect(typeof ExtensionAPI.getPublicKey).toBe("function");
    expect(typeof ExtensionAPI.signTransaction).toBe("function");
  });
});
