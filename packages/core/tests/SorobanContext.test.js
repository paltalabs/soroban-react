SorobanContextPackage = require("../dist/SorobanContext.js");

describe('Soroban context', () => {
  const { SorobanContext, defaultSorobanContext } = SorobanContextPackage;
  test('Initializes default context', () => {
    expect(defaultSorobanContext.server.serverURL.hostname()).toBe("soroban-rpc.stellar.org");
  });
});