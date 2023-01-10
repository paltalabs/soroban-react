import React from "react";
import * as SorobanClient from "soroban-client";
import { SorobanContextType } from "@soroban-react/core";
export type TransactionStatus = 'idle' | 'error' | 'loading' | 'success';



export interface contractTransactionProps {
    networkPassphrase: string,
    source: SorobanClient.Account,
    contractId: string,
    method: string,
    params?: SorobanClient.xdr.ScVal[]
  }

export function contractTransaction({
    networkPassphrase,
    source,
    contractId,
    method,
    params}: contractTransactionProps): SorobanClient.Transaction {
    
    let myParams: SorobanClient.xdr.ScVal[] = params || [];
    const contract = new SorobanClient.Contract(contractId)
    return new SorobanClient.TransactionBuilder(source, {
      // TODO: Figure out the fee
      fee: '100',
      networkPassphrase,
    })
      .addOperation(contract.call(method, ...myParams))
      .setTimeout(SorobanClient.TimeoutInfinite)
      .build()
  }


export interface SendTransactionResult<E = Error> {
  data?: SorobanClient.xdr.ScVal;
  error?: E;
  isError: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  sendTransaction: (txn?: Transaction, opts?: SendTransactionOptions) => Promise<SorobanClient.xdr.ScVal>;
  reset: () => void;
  status: TransactionStatus;
}

type Transaction = SorobanClient.Transaction | SorobanClient.FeeBumpTransaction;

export interface SendTransactionOptions {
  timeout?: number;
  skipAddingFootprint?: boolean
  secretKey?: string;
  sorobanContext?: SorobanContextType
}

// useSendTransaction is a hook that returns a function that can be used to
// send a transaction. Upon sending, it will poll server.getTransactionStatus,
// until the transaction succeeds/fails, and return the result.
export function useSendTransaction<E = Error>(defaultTxn?: Transaction, defaultOptions?: SendTransactionOptions): SendTransactionResult<E> {
  

  const [status, setState] = React.useState<TransactionStatus>('idle');
  
  // TODO: as the sorobanContext is passed each time sendTransaction is called
  // we don't need anymore a useCallback hook. Convert useSendTransaction to a 
  const sendTransaction = React.useCallback(async function(passedTxn?: Transaction, passedOptions?: SendTransactionOptions): Promise<SorobanClient.xdr.ScVal> {
    
    // console.log("passedTxn: ", passedTxn)
    // console.log("passedOptions: ", passedOptions)

    let sorobanContext : SorobanContextType | undefined 
    
    if(passedOptions?.sorobanContext){
      sorobanContext =  passedOptions?.sorobanContext
    }
    let txn = passedTxn ?? defaultTxn;
    // console.log("sorobanContext.activeWallet: ", sorobanContext?.activeWallet)
    // console.log("sorobanContext.activeChain: ", sorobanContext?.activeChain)
    
    if (!(passedOptions?.secretKey|| sorobanContext?.activeWallet)){
      throw new Error("No secret key or active wallet. Provide at least one of those");
    }
    
    if (!txn || !sorobanContext?.activeWallet || !sorobanContext?.activeChain) {
      throw new Error("No transaction or wallet or chain");
    }
    
    if (!sorobanContext.server) throw new Error("Not connected to server")
    
    let activeChain = sorobanContext?.activeChain
    let activeWallet = sorobanContext?.activeWallet
    let server = sorobanContext?.server

    const {
      timeout,
      skipAddingFootprint,
    } = {
      timeout: 60000,
      skipAddingFootprint: false,
      ...defaultOptions,
      ...passedOptions,
    };
    const networkPassphrase = activeChain.networkPassphrase;
    setState('loading');

    // preflight and add the footprint
    if (!skipAddingFootprint) {
      let {footprint} = await server.simulateTransaction(txn);
      txn = addFootprint(txn, networkPassphrase, footprint);
    }

    let signed = "";
    if (passedOptions?.secretKey) {
      // User as set a secretKey, txn will be signed using the secretKey
      const keypair = SorobanClient.Keypair.fromSecret(passedOptions.secretKey);
      txn.sign(keypair);
      signed = txn.toXDR();
    } else {
      // User has not set a secretKey, txn will be signed using the Connector (wallet) provided in the sorobanContext
      signed = await activeWallet.signTransaction(txn.toXDR(), { networkPassphrase });
    }

    const transactionToSubmit = SorobanClient.TransactionBuilder.fromXDR(signed, networkPassphrase);
    const { id } = await server.sendTransaction(transactionToSubmit);
    const sleepTime = Math.min(1000, timeout);
    for (let i = 0; i <= timeout; i+= sleepTime) {
      await sleep(sleepTime);
      try {
        console.debug("tx id:", id)
        const response = await server.getTransactionStatus(id);
        console.debug(response)

        switch (response.status) {
        case "pending": {
            continue;
          }
        case "success": {
            setState('success');
            let results = response.results
            if (!results) {
              // FIXME: Return a more sensible value for classic transactions.
              return SorobanClient.xdr.ScVal.scvI32(-1)
            }
            if (results.length > 1) {
              throw new Error(`Expected exactly one result, got ${response.results}.`);
            }

            return SorobanClient.xdr.ScVal.fromXDR(Buffer.from(results[0].xdr, 'base64'));
          }
        case "error": {
            setState('error');
            throw response.error;
          }
        default: {
            throw new Error("Unexpected transaction status: " + response.status);
          }
        }
      } catch (err: any) {
        setState('error');
        if ('code' in err && err.code === 404) {
          // No-op
        } else {
          throw err;
        }
      }
    }
    throw new Error("Timed out");
  }, [defaultTxn]);

  return {
    isIdle: status == 'idle',
    isError: status == 'error',
    isLoading: status == 'loading',
    isSuccess: status == 'success',
    sendTransaction,
    reset: () => {},
    status,
  };
}

// TODO: Transaction is immutable, so we need to re-build it here. :(
function addFootprint(raw: Transaction, networkPassphrase: string, footprint: SorobanClient.SorobanRpc.SimulateTransactionResponse['footprint']): Transaction {
  if ('innerTransaction' in raw) {
    // TODO: Handle feebump transactions
    return addFootprint(raw.innerTransaction, networkPassphrase, footprint);
  }
  // TODO: Figure out a cleaner way to clone this transaction.
  const source = new SorobanClient.Account(raw.source, `${parseInt(raw.sequence)-1}`);
  const txn = new SorobanClient.TransactionBuilder(source, {
    fee: raw.fee,
    memo: raw.memo,
    networkPassphrase,
    timebounds: raw.timeBounds,
    ledgerbounds: raw.ledgerBounds,
    minAccountSequence: raw.minAccountSequence,
    minAccountSequenceAge: raw.minAccountSequenceAge,
    minAccountSequenceLedgerGap: raw.minAccountSequenceLedgerGap,
    extraSigners: raw.extraSigners,
  });
  for (let rawOp of raw.operations) {
    if ('function' in rawOp) {
      // TODO: Figure out a cleaner way to clone these operations
      txn.addOperation(SorobanClient.Operation.invokeHostFunction({
        function: rawOp.function,
        parameters: rawOp.parameters,
        footprint: SorobanClient.xdr.LedgerFootprint.fromXDR(footprint, 'base64'),
      }));
    } else {
      // TODO: Handle this.
      throw new Error("Unsupported operation type");
    }
  }
  return txn.build();
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
