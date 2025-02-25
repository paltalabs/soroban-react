import { SorobanContextType } from '@soroban-react/core'

import * as StellarSdk from '@stellar/stellar-sdk'

import { signAndSendTransaction } from './transaction'

/**
 * Creates a Stellar asset contract by wrapping a Stellar asset.
 * @param code The code of the asset.
 * @param issuer The issuer of the asset.
 * @param sorobanContext The Soroban context containing information about the active chain, address, and sorobanServer.
 * @returns A promise that resolves to the result of the transaction.
 * @throws An error if there is no active chain, not connected to a sorobanServer, or no network passphrase.
 */
export async function wrapStellarAsset({
  code,
  issuer,
  sorobanContext,
}: {
  code: string
  issuer: string
  sorobanContext: SorobanContextType
}) {
  const { activeNetwork, address, sorobanServer } = sorobanContext
  const networkPassphrase = sorobanContext.activeNetwork ?? ''

  if (!activeNetwork) {
    throw new Error('No active Chain')
  }
  if (!sorobanServer) {
    throw new Error('No connected to a Server')
  }

  if (!networkPassphrase) throw new Error('No networkPassphrase')

  let source = await sorobanServer.getAccount(address!)

  const operation = StellarSdk.Operation.createStellarAssetContract({
    asset: new StellarSdk.Asset(code, issuer),
  })

  const txn = new StellarSdk.TransactionBuilder(source, {
    fee: '100',
    networkPassphrase,
  })
    .addOperation(operation)
    .setTimeout(StellarSdk.TimeoutInfinite)
    .build()

  try {
    const result = await signAndSendTransaction({ txn, sorobanContext })
    return result
  } catch (error) {
    console.log(error)
  }
}
