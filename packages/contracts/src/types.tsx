import * as SorobanClient from 'soroban-client'
import { SorobanRpc } from "soroban-client";
import type {Memo, MemoType, Operation, Transaction as SorobanClientTransaction} from 'soroban-client';

export type Transaction = SorobanClient.Transaction | SorobanClient.FeeBumpTransaction
export type Tx = SorobanClientTransaction<Memo<MemoType>, Operation[]>
export type TxResponse = SorobanClient.SorobanRpc.GetTransactionResponse;
export type Simulation = SorobanRpc.SimulateTransactionResponse;
