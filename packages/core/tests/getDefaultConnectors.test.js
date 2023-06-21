const { getDefaultConnectors } = require("../dist/getDefaultConnectors.js");
const { freighter } = require('@soroban-react/freighter');

describe('getDefaultConnectors', () => {
  it('should return an array of connectors', () => {
    const connectors = getDefaultConnecto
    expect(Array.isArray(connectors)).toBe(true);
    expect(connectors.length).toBeGreaterThan(0);
  });

  it('should contain the freighter connector', () => {
    const connectors = getDefaultConnectors();
    const foundFreighter = connectors.find(connector => connector.id === freighter().id);
    expect(foundFreighter).toBeDefined();
    expect(foundFreighter.name).toBe(freighter().name);
  });

  it('should return a new array on each function call', () => {
    const connectors1 = getDefaultConnectors();
    const connectors2 = getDefaultConnectors();
    expect(connectors1).not.toBe(connectors2);
  });
});
