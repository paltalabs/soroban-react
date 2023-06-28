const { setTrustline } = require('../dist/setTrustline')

describe('setTrustline', () => {
  const tokenSymbol = 'TST'
  const tokenAdmin = 'GJYN5MDN3RV7WQXBGJHNAGB4XSZMH6ODOV62SMKJOHOQCSPFMCYD2PTI'
  const account = 'GBRIRLB2XNFKPNRUHBJDTSJI5KVLZRLZAOU7TCGKITA3SZU3IBJKKXBV'
  const sorobanContext = {
    server: 'https://soroban-rpc.stellar.org',
    activeChain: {
      networkPassphrase: 'Test SoroNet',
    },
  }
  const sendTransaction = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should throw error if not connected to server', async () => {
    sorobanContext.server = ''
    await expect(
      setTrustline({
        tokenSymbol,
        tokenAdmin,
        account,
        sorobanContext,
        sendTransaction,
      })
    ).rejects.toThrowError('Not connected to server')
  })

  test('should throw error if no networkPassphrase', async () => {
    sorobanContext.server = 'https://soroban-rpc.stellar.org'
    sorobanContext.activeChain.networkPassphrase = ''
    await expect(
      setTrustline({
        tokenSymbol,
        tokenAdmin,
        account,
        sorobanContext,
        sendTransaction,
      })
    ).rejects.toThrowError('No networkPassphrase')
  })

  test('should call sendTransaction with trustline transaction', async () => {
    const mockAccount = {
      sequence: '1234567890', // Must be a string to mimic Soroban Server response
    }
    const transactionBuilderSpy = jest
      .spyOn(SorobanClient, 'TransactionBuilder')
      .mockImplementation(() => ({
        setTimeout: jest.fn().mockReturnThis(),
        addOperation: jest.fn().mockReturnThis(),
        build: jest.fn().mockReturnValue({
          toEnvelope: jest.fn().mockReturnValue('transaction envelope'),
          hash: jest.fn().mockReturnValue('transaction hash'),
        }),
      }))
    const serverGetAccountSpy = jest
      .spyOn(sorobanContext.server, 'getAccount')
      .mockResolvedValue(mockAccount)

    await setTrustline({
      tokenSymbol,
      tokenAdmin,
      account,
      sorobanContext,
      sendTransaction,
    })

    expect(serverGetAccountSpy).toHaveBeenCalledWith(account)
    expect(transactionBuilderSpy).toHaveBeenCalledWith(mockAccount, {
      networkPassphrase: sorobanContext.activeChain.networkPassphrase,
      fee: '1000',
    })
    expect(sendTransaction).toHaveBeenCalledWith(
      { toEnvelope: expect.any(Function), hash: expect.any(Function) },
      { timeout: 60000, skipAddingFootprint: true, sorobanContext }
    )
  })
})
