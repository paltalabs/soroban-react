import { SorobanContextType } from '..'

import * as StellarSdk from '@stellar/stellar-sdk'
import { rpc } from '@stellar/stellar-sdk'
import { retryWithBackoff } from './utils'


import type { Tx, Transaction, TxResponse } from './types'

export type SignAndSendArgs = {
  txn: Transaction
  secretKey?: string
  skipAddingFootprint?: boolean
  sorobanContext: SorobanContextType
  timeoutSeconds?: number
}

/**
 * Signs and sends a transaction to the Stellar network.
 * @param {Object} options - The options object.
 * @param {Transaction} options.txn - The transaction to sign and send.
 * @param {string} [options.secretKey] - The secret key for signing the transaction. Required if no active connector is provided in the Soroban context.
 * @param {boolean} [options.skipAddingFootprint=false] - Flag indicating whether to skip adding footprint to the transaction. Defaults to false.
 * @param {SorobanContextType} options.sorobanContext - The Soroban context containing sorobanServer and active connector information.
 * @returns {Promise<TxResponse>} A promise that resolves with the transaction response.
 * @throws {Error} Throws an error if no secret key or active connector is provided, or if there is no sorobanServer or network passphrase.
 */
export async function signAndSendTransaction({ 
  txn,
  secretKey,
  skipAddingFootprint = false,
  sorobanContext,
  timeoutSeconds = 20,
}: SignAndSendArgs): Promise<TxResponse> {
  let networkPassphrase = sorobanContext.activeNetwork
  let sorobanServer = sorobanContext.sorobanServer

  if (!secretKey && !sorobanContext.kit)
    throw Error('signAndSend: no secretKey neither address')
  if (!sorobanServer) throw Error('signAndSend: no sorobanServer')
  if (!networkPassphrase) throw Error('signAndSend: no networkPassphrase')

  // preflight and add the footprint !
  if (!skipAddingFootprint) {
    txn = await sorobanServer.prepareTransaction(txn)
    if (!txn) {
      throw new Error('No transaction after adding footprint')
    }
  }

  // // is it possible for `auths` to be present but empty? Probably not, but let's be safe.
  // const auths = simulated.results?.[0]?.auth;
  // let auth_len = auths?.length ?? 0;

  // if (auth_len > 1) {
  //   throw new NotImplementedError("Multiple auths not yet supported");
  // } else if (auth_len == 1) {
  //   // TODO: figure out how to fix with new StellarSdk
  //   // const auth = StellarSdk.xdr.SorobanAuthorizationEntry.fromXDR(auths![0]!, 'base64')
  //   // if (auth.addressWithNonce() !== undefined) {
  //   //   throw new NotImplementedError(
  //   //     `This transaction needs to be signed by ${auth.addressWithNonce()
  //   //     }; Not yet supported`
  //   //   )
  //   // }
  // }

  let signedTxXdr = ''
  if (secretKey) {
    // User as set a secretKey, txn will be signed using the secretKey
    const keypair = StellarSdk.Keypair.fromSecret(secretKey)
    txn.sign(keypair)
    signedTxXdr = txn.toXDR()
  } else if (sorobanContext.address) {
    // User has not set a secretKey, txn will be signed using the Connector (wallet) provided in the sorobanContext
    console.log('TRANSACTION SIGN AND SEND OPTS', {
      networkPassphrase,
      accountToSign: sorobanContext.address,
    })
    const signResult = await sorobanContext.kit?.signTransaction(txn.toXDR(), {
      networkPassphrase,
      address: sorobanContext.address,
    })
    if (!signResult || !signResult.signedTxXdr) {
      throw new Error('Failed to sign transaction')
    }
  
    signedTxXdr = signResult.signedTxXdr

    console.log('Wallet has signed: ', signedTxXdr)
  } else {
    throw new Error(
      'signAndSendTransaction: no secretKey, neither active kit'
    )
  }

  const transactionToSubmit = StellarSdk.TransactionBuilder.fromXDR(
    signedTxXdr,
    networkPassphrase
  )

  let tx = transactionToSubmit as Tx
  let secondsToWait = timeoutSeconds

  const raw = await sendTx({ tx, secondsToWait, sorobanServer })

  return raw
}

export async function sendTx({
  tx,
  secondsToWait,
  sorobanServer,
}: {
  tx: Tx
  secondsToWait: number
  sorobanServer: rpc.Server
}): Promise<TxResponse> {
  let sendTransactionResponse = await retryWithBackoff(() => sorobanServer.sendTransaction(tx));
  let startTime = Date.now();

  // Poll for transaction status, retrying for up to `secondsToWait`
  while (sendTransactionResponse.status !== 'PENDING' && Date.now() - startTime < secondsToWait * 1000) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    sendTransactionResponse = await await retryWithBackoff(() => sorobanServer.sendTransaction(tx));
  }

  if (sendTransactionResponse.status !== 'PENDING') {
    console.error('Failed to send transaction: ', sendTransactionResponse.hash);
    throw Error (`Failed to send transaction: ${sendTransactionResponse.hash}`);
  }

  let getTransactionResponse = await retryWithBackoff(() => sorobanServer.getTransaction(sendTransactionResponse.hash));

  // Poll for transaction confirmation
  while (getTransactionResponse.status === 'NOT_FOUND') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    getTransactionResponse = await retryWithBackoff(() => sorobanServer.getTransaction(sendTransactionResponse.hash));
  }

  if (getTransactionResponse.status === 'SUCCESS') {
    console.log('✅ Successfully submitted transaction:', sendTransactionResponse.hash);
    await new Promise(resolve => setTimeout(resolve, 500)); // Ensure data propagation
  } else {
    console.error(`❌ Transaction failed: `, sendTransactionResponse.hash);
  }

  return { ...getTransactionResponse, txHash: sendTransactionResponse.hash };
}
