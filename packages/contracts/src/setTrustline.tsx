import { SorobanContextType } from '@soroban-react/core'

import * as StellarSdk from '@stellar/stellar-sdk'


/**
 * Sets a trustline for a token on the Stellar network.
 * @param {Object} options - The options object.
 * @param {string} options.tokenSymbol - The symbol of the token.
 * @param {string} options.tokenAdmin - The public key of the token's administrator.
 * @param {SorobanContextType} options.sorobanContext - The Soroban context.
 * @returns {Promise<StellarSdk.TransactionResponse>} A promise that resolves with the transaction response.
 * @throws {Error} Throws an error if there is no active chain, no sorobanServer connected, or if network passphrase is missing.
 */
export async function setTrustline({
  tokenSymbol,
  tokenAdmin,
  sorobanContext,
}: {
  tokenSymbol: string
  tokenAdmin: string
  sorobanContext: SorobanContextType
}) {
  const { activeNetwork, address, horizonServer } = sorobanContext
  const networkPassphrase = sorobanContext.activeNetwork ?? ''

  if (!activeNetwork) {
    throw new Error('No active Chain')
  }
  if (!horizonServer) {
    throw new Error('No connected to a Server')
  }
  // if (signAndSend && !secretKey && !sorobanContext.activeConnector) {
  //   throw new Error(
  //     'contractInvoke: You are trying to sign a txn without providing a source, secretKey or active connector'
  //   )
  // }
  if (!networkPassphrase) throw new Error('No networkPassphrase')

  let source = await horizonServer.loadAccount(address!)

  const operation = StellarSdk.Operation.changeTrust({
    source: source.accountId(),
    asset: new StellarSdk.Asset(tokenSymbol, tokenAdmin),
  })

  const txn = new StellarSdk.TransactionBuilder(source, {
    fee: '100',
    timebounds: { minTime: 0, maxTime: 0 },
    networkPassphrase,
  })
    .addOperation(operation)
    .setTimeout(StellarSdk.TimeoutInfinite)
    .build()

    const signResult = await sorobanContext.kit?.signTransaction(
    txn.toXDR(),
    {
      networkPassphrase,
    }
  )

  if (!signResult || !signResult.signedTxXdr) {
    throw new Error('Failed to sign transaction')
  }

  const { signedTxXdr } = signResult

  const transactionToSubmit = StellarSdk.TransactionBuilder.fromXDR(
    signedTxXdr!,
    networkPassphrase
  )

  try {
    let response = await horizonServer.submitTransaction(transactionToSubmit)
    return response
  } catch (error) {
    console.log(error)
  }
}
