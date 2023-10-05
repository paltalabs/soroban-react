import { SorobanContextType } from '@soroban-react/core';
import * as SorobanClient from 'soroban-client';
import { SorobanRpc } from "soroban-client";
import { contractTransaction } from './contractTransaction';
import { signAndSendTransaction } from './transaction';
let xdr = SorobanClient.xdr 


export type InvokeArgs = {
  contractAddress: string
  method: string;
  args?: SorobanClient.xdr.ScVal[] | undefined
  signAndSend?: boolean; 
  fee?: number;
  skipAddingFootprint?: boolean;
  secretKey?: string;
  sorobanContext: SorobanContextType
  };

// Dummy source account for simulation. The public key for this is all 0-bytes.
const defaultAddress =
  'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF'

export async function contractInvoke({
    contractAddress,
    method,
    args = [],
    signAndSend = false,
    fee = 100,
    skipAddingFootprint,
    secretKey,
    sorobanContext,
  }: InvokeArgs) {
    const { server, address, activeChain } = sorobanContext;
    
    if(!activeChain){throw new Error('No active Chain')}
    if(!server){throw new Error('No connected to a Server')}
    if(signAndSend && !secretKey && !sorobanContext.activeConnector){
      throw new Error("contractInvoke: You are trying to sign a txn without providing a source, secretKey or active connector")
    }
    
    const networkPassphrase = activeChain?.networkPassphrase
    const source = secretKey
    ? await server.getAccount(SorobanClient.Keypair.fromSecret(secretKey).publicKey())
    : address
      ? await server?.getAccount(address)
      : new SorobanClient.Account(defaultAddress, "0");   

    //Builds the transaction
    let txn = contractTransaction({
      source,
      networkPassphrase,
      contractAddress,
      method,
      args,
    });
    

  
    const simulated: SorobanRpc.SimulateTransactionResponse = await server?.simulateTransaction(txn);

    if (SorobanRpc.isSimulationError(simulated)) {
      throw new Error(simulated.error);
    } else if (!simulated.result) {
      throw new Error(`invalid simulation: no result in ${simulated}`);
    }

    if (!signAndSend && simulated) {

      return simulated.result.retval;
    }
    else {
      // If signAndSend
      return await signAndSendTransaction({txn,skipAddingFootprint, secretKey,sorobanContext});
    }
  }