import { SorobanContextType } from '@soroban-react/core'

import * as SorobanClient from 'soroban-client'

export async function setTrustline({
  tokenSymbol,
  tokenAdmin,
  account,
  sorobanContext,
  sendTransaction,
}: {
  tokenSymbol: string
  tokenAdmin: string
  account: string
  sorobanContext: SorobanContextType
  sendTransaction: any
}) {
  const server = sorobanContext.server
  const networkPassphrase = sorobanContext.activeChain?.networkPassphrase ?? ''
  if (!server) throw new Error('Not connected to server')
  if (!networkPassphrase) throw new Error('No networkPassphrase')
  let walletSource = await server.getAccount(account)

  const trustlineResult = await sendTransaction(
    new SorobanClient.TransactionBuilder(walletSource, {
      networkPassphrase,
      fee: '1000', // arbitrary
    })
      .setTimeout(60)
      .addOperation(
        SorobanClient.Operation.changeTrust({
          asset: new SorobanClient.Asset(tokenSymbol, tokenAdmin),
        })
      )
      .build(),
    {
      timeout: 60 * 1000, // should be enough time to approve the tx
      skipAddingFootprint: true, // classic = no footprint
      // omit `secretKey` to have Freighter prompt for signing
      // hence, we need to explicit the sorobanContext
      sorobanContext,
    }
  )
  console.debug(trustlineResult)
  return trustlineResult
}
