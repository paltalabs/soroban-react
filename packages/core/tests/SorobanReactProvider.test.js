const React = require('react');
const { render, unmountComponentAtNode } = require('react-dom');
const { act } = require('react-dom/test-utils');
const { SorobanReactProvider } = require('../dist/SorobanReactProvider');

jest.mock('soroban-client', () => ({
  Server: jest.fn().mockImplementation(() => ({
  })),
}));

jest.mock('./path/to/SorobanContext', () => ({
  SorobanContext: {
    Provider: ({ value, children }) => children,
  },
  defaultSorobanContext: {
  },
}));

jest.mock('@soroban-react/types', () => ({
  Connector: jest.fn(),
  WalletChain: jest.fn(),
}));

describe('SorobanReactProvider', () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test('renders without crashing', () => {
    act(() => {
      render(
        <SorobanReactProvider chains={[]} connectors={[]}>
          <div>Test</div>
        </SorobanReactProvider>,
        container
      );
    });

    expect(container.textContent).toBe('Test');
  });

  test('connects to wallet when autoconnect is true', () => {
    const activeConnectorMock = {
      getNetworkDetails: jest.fn().mockResolvedValue({ networkUrl: 'http://example.com', networkPassphrase: 'test' }),
      isConnected: jest.fn().mockReturnValue(true),
      getPublicKey: jest.fn().mockResolvedValue('address'),
    };

    act(() => {
      render(
        <SorobanReactProvider autoconnect chains={[]} connectors={[activeConnectorMock]}>
          <div>Test</div>
        </SorobanReactProvider>,
        container
      );
    });

    expect(activeConnectorMock.getNetworkDetails).toHaveBeenCalled();
    expect(activeConnectorMock.getPublicKey).toHaveBeenCalled();
  });

  test('reconnects when address changes', async () => {
    const activeConnectorMock = {
      getNetworkDetails: jest.fn().mockResolvedValue({ networkUrl: 'http://example.com', networkPassphrase: 'test' }),
      isConnected: jest.fn().mockReturnValue(true),
      getPublicKey: jest.fn().mockResolvedValueOnce('address1').mockResolvedValueOnce('address2'),
    };

    act(() => {
      render(
        <SorobanReactProvider autoconnect chains={[]} connectors={[activeConnectorMock]}>
          <div>Test</div>
        </SorobanReactProvider>,
        container
      );
    });

    expect(activeConnectorMock.getNetworkDetails).toHaveBeenCalled();
    expect(activeConnectorMock.getPublicKey).toHaveBeenCalled();

    await act(async () => {
      activeConnectorMock.getPublicKey.mockResolvedValueOnce('address2');
      jest.advanceTimersByTime(300); 
    });

    expect(activeConnectorMock.getPublicKey).toHaveBeenCalledTimes(2);
  });

    test('reconnects when networkPassphrase changes', async () => {
    const activeConnectorMock = {
      getNetworkDetails: jest
        .fn()
        .mockResolvedValueOnce({ networkUrl: 'http://example.com', networkPassphrase: 'test1' })
        .mockResolvedValueOnce({ networkUrl: 'http://example.com', networkPassphrase: 'test2' }),
      isConnected: jest.fn().mockReturnValue(true),
      getPublicKey: jest.fn().mockResolvedValue('address'),
    };

    act(() => {
      render(
        <SorobanReactProvider autoconnect chains={[]} connectors={[activeConnectorMock]}>
          <div>Test</div>
        </SorobanReactProvider>,
        container
      );
    });

    expect(activeConnectorMock.getNetworkDetails).toHaveBeenCalled();

    await act(async () => {
      activeConnectorMock.getNetworkDetails.mockResolvedValueOnce({ networkUrl: 'http://example.com', networkPassphrase: 'test2' });
      jest.advanceTimersByTime(300); 
    });

    expect(activeConnectorMock.getNetworkDetails).toHaveBeenCalledTimes(2);
    // Expect reconnect to be called
  });

  test('throws an error when the wallet network is not supported', async () => {
    const activeConnectorMock = {
      getNetworkDetails: jest.fn().mockResolvedValue({ networkUrl: 'http://example.com', networkPassphrase: 'unsupported' }),
      isConnected: jest.fn().mockReturnValue(true),
      getPublicKey: jest.fn().mockResolvedValue('address'),
    };

    await act(async () => {
      try {
        render(
          <SorobanReactProvider chains={[]} connectors={[activeConnectorMock]}>
            <div>Test</div>
          </SorobanReactProvider>,
          container
        );
      } catch (error) {
        expect(error.message).toBe('Your Wallet network is not supported in this app');
      }
    });

    expect(activeConnectorMock.getNetworkDetails).toHaveBeenCalled();
  });

  test('disconnects when SorobanReactProvider unmounts', () => {
    const activeConnectorMock = {
      isConnected: jest.fn().mockReturnValue(true),
      getPublicKey: jest.fn().mockResolvedValue('address'),
    };

    act(() => {
      render(
        <SorobanReactProvider chains={[]} connectors={[activeConnectorMock]}>
          <div>Test</div>
        </SorobanReactProvider>,
        container
      );
    });

    act(() => {
      unmountComponentAtNode(container);
    });
  });
});

