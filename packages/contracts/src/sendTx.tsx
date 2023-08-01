import * as SorobanClient from 'soroban-client'
import type {Tx, TxResponse} from './types'

export async function sendTx(
                              {tx, secondsToWait, server}:
                              {tx: Tx,
                              secondsToWait: number, 
                              server: SorobanClient.Server}): Promise<TxResponse> {
  const sendTransactionResponse = await server.sendTransaction(tx);
  let getTransactionResponse = await server.getTransaction(sendTransactionResponse.hash);

  const waitUntil = new Date((Date.now() + secondsToWait * 1000)).valueOf()

  let waitTime = 1000;
  let exponentialFactor = 1.5

  while ((Date.now() < waitUntil) && getTransactionResponse.status === "NOT_FOUND") {
    // Wait a beat
    await new Promise(resolve => setTimeout(resolve, waitTime))
    /// Exponential backoff
    waitTime = waitTime * exponentialFactor;
    // See if the transaction is complete
    getTransactionResponse = await server.getTransaction(sendTransactionResponse.hash)
  }

  if (getTransactionResponse.status === "NOT_FOUND") {
    console.log(
      `Waited ${secondsToWait} seconds for transaction to complete, but it did not. Returning anyway. Check the transaction status manually. Info: ${JSON.stringify(sendTransactionResponse, null, 2)}`
    )
  }

  return getTransactionResponse
}
