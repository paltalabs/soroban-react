const { renderHook } = require('@testing-library/react-hooks');
const { useContext } = require('react');
const { SorobanContext } = require('../dist/SorobanContext.js');
const { useSorobanReact } = require('../dist/useSorobanReact.js');

describe.skip('useSorobanReact', () => {
  it('should throw an error when used outside of SorobanContextProvider', () => {
    const { result } = renderHook(() => useSorobanReact());

    expect(result.error).toEqual(Error('useSorobanReact can only be used within the useSorobanReact component'));
  });

  it('should return the context value when used within SorobanContextProvider', () => {
    const sorobanContextValue = {
      appName: 'Test App',
      chains: [],
      connectors: [],
      connect: jest.fn(),
      disconnect: jest.fn(),
    };

    const { result } = renderHook(() =>
      useContext(SorobanContext),
      {
        wrapper: ({ children }) => (
          <SorobanContext.Provider value={sorobanContextValue}>
            {children}
          </SorobanContext.Provider>
        ),
      }
    );

    expect(result.current).toEqual(sorobanContextValue);
  });

  it('should throw an error if SorobanContext is undefined', () => {
    const { result } = renderHook(() => useSorobanReact());

    expect(result.error).toEqual(Error('useSorobanReact can only be used within the useSorobanReact component'));
  });

  it('should throw an error if SorobanContext value is undefined', () => {
    const { result } = renderHook(() => useSorobanReact(), {
      wrapper: ({ children }) => (
        <SorobanContext.Provider value={undefined}>
          {children}
        </SorobanContext.Provider>
      ),
    });

    expect(result.error).toEqual(Error('useSorobanReact can only be used within the useSorobanReact component'));
  });
});
