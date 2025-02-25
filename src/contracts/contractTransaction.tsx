import * as StellarSdk from '@stellar/stellar-sdk'

/**
 * Properties for building a transaction to invoke a smart contract method call.
 */
export interface contractTransactionProps {
  networkPassphrase: string
  source: StellarSdk.Account
  contractAddress: string
  method: string
  args?: StellarSdk.xdr.ScVal[]
}

/**
 * Constructs a transaction to invoke a smart contract method call.
 * @param {ContractTransactionProps} props - Properties for building the transaction.
 * @returns {StellarSdk.Transaction} - The constructed transaction.
 */
export function contractTransaction({
  networkPassphrase,
  source,
  contractAddress,
  method,
  args,
}: contractTransactionProps): StellarSdk.Transaction {
  let myParams: StellarSdk.xdr.ScVal[] = args || []
  const contract = new StellarSdk.Contract(contractAddress)
  return new StellarSdk.TransactionBuilder(source, {
    // TODO: Figure out the fee
    fee: '100',
    networkPassphrase,
  })
    .addOperation(contract.call(method, ...myParams))
    .setTimeout(StellarSdk.TimeoutInfinite)
    .build()
}
