import { SorobanContextType } from '@soroban-react/core'
import * as StellarSdk from '@stellar/stellar-sdk'
import * as SorobanClient from 'soroban-client'

export async function setTrustline({
  tokenSymbol,
  tokenAdmin,
  sorobanContext,
}: {
  tokenSymbol: string
  tokenAdmin: string
  sorobanContext: SorobanContextType
  }) {
  
  const {activeChain, address} = sorobanContext
  const server = new StellarSdk.Horizon.Server(activeChain.networkUrl, {
    allowHttp: activeChain.networkUrl.startsWith('http://'),
  })
  const networkPassphrase = sorobanContext.activeChain?.networkPassphrase ?? ''
  
  if (!activeChain) {
    throw new Error('No active Chain')
  }
  if (!server) {
    throw new Error('No connected to a Server')
  }
  // if (signAndSend && !secretKey && !sorobanContext.activeConnector) {
  //   throw new Error(
  //     'contractInvoke: You are trying to sign a txn without providing a source, secretKey or active connector'
  //   )
  // }
  if (!networkPassphrase) throw new Error('No networkPassphrase')


  let source = await server.loadAccount(address)

  const operation = StellarSdk.Operation.changeTrust({
    source: source.accountId(),
    asset: new StellarSdk.Asset(tokenSymbol, tokenAdmin),
  });

  const txn = new StellarSdk.TransactionBuilder(source, {
    fee: '100',
    timebounds: { minTime: 0, maxTime: 0 },
    networkPassphrase
  })
    .addOperation(operation)
    .setTimeout(SorobanClient.TimeoutInfinite)
    .build()

  const signed = await sorobanContext.activeConnector?.signTransaction(txn.toXDR(), {
    networkPassphrase
  })

  const transactionToSubmit =  StellarSdk.TransactionBuilder.fromXDR(
    signed!,
    networkPassphrase
  )

  try {
    let response = await server.submitTransaction(transactionToSubmit);
    return response
  } catch (error) {
    console.log(error)
  }

}
