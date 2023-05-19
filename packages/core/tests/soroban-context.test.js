SorobanContextPackage = require("../dist/SorobanContext.js");

describe('soroban context', () => {
  const { SorobanContext, defaultSorobanContext } = SorobanContextPackage;
  test('initializes default context', () => {
    expect(defaultSorobanContext.server.serverURL.hostname()).toBe("soroban-rpc.stellar.org");
  });
});