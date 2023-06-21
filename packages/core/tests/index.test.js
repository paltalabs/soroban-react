const yourFileExports = require("../dist/index.js");

describe('Module exports', () => {
  it('should export SorobanContext', () => {
    expect(yourFileExports.SorobanContext).toBeDefined();
  });

  it('should export SorobanReactProvider', () => {
    expect(yourFileExports.SorobanReactProvider).toBeDefined();
  });

  it('should export useSorobanReact', () => {
    expect(yourFileExports.useSorobanReact).toBeDefined();
  });

  it('should export getDefaultConnectors', () => {
    expect(yourFileExports.getDefaultConnectors).toBeDefined();
  });
});