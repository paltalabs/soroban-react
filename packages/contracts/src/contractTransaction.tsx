import * as SorobanClient from 'soroban-client'



export interface contractTransactionProps {
    networkPassphrase: string
    source: SorobanClient.Account
    contractAddress: string
    method: string
    args?: SorobanClient.xdr.ScVal[]
  }
  
  export function contractTransaction({
    networkPassphrase,
    source,
    contractAddress,
    method,
    args,
  }: contractTransactionProps): SorobanClient.Transaction {
    let myParams: SorobanClient.xdr.ScVal[] = args || []
    const contract = new SorobanClient.Contract(contractAddress)
    return new SorobanClient.TransactionBuilder(source, {
      // TODO: Figure out the fee
      fee: '100',
      networkPassphrase,
    })
      .addOperation(contract.call(method, ...myParams))
      .setTimeout(SorobanClient.TimeoutInfinite)
      .build()
  }
  