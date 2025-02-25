import * as CardanoWasm from '@emurgo/cardano-serialization-lib-nodejs';
import { CARDANO_PARAMS } from '../constants';
import { Certificate, Output, Utxo, Withdrawal, OutputCost, UserOutput, Asset } from '../types/types';
export declare const bigNumFromStr: (num: string) => CardanoWasm.BigNum;
export declare const getProtocolMagic: (tesnet?: boolean) => (typeof CARDANO_PARAMS.PROTOCOL_MAGICS)['mainnet'] | (typeof CARDANO_PARAMS.PROTOCOL_MAGICS)['testnet'];
export declare const getNetworkId: (testnet?: boolean) => (typeof CARDANO_PARAMS.NETWORK_IDS)['mainnet'] | (typeof CARDANO_PARAMS.NETWORK_IDS)['testnet'];
export declare const parseAsset: (hex: string) => {
    policyId: string;
    assetNameInHex: string;
};
export declare const buildMultiAsset: (assets: Asset[]) => CardanoWasm.MultiAsset;
export declare const multiAssetToArray: (multiAsset: CardanoWasm.MultiAsset | undefined) => Asset[];
export declare const getAssetAmount: (obj: Pick<Utxo, 'amount'>, asset?: string) => string;
export declare const getUtxoQuantity: (utxos: Utxo[], asset?: string) => CardanoWasm.BigNum;
export declare const getOutputQuantity: (outputs: Output[], asset?: string) => CardanoWasm.BigNum;
export declare const sortUtxos: (utxos: Utxo[], asset?: string) => Utxo[];
export declare const buildTxInput: (utxo: Utxo) => {
    input: CardanoWasm.TransactionInput;
    address: CardanoWasm.Address;
    amount: CardanoWasm.Value;
};
export declare const buildTxOutput: (output: Output, dummyAddress: string) => CardanoWasm.TransactionOutput;
export declare const getOutputCost: (txBuilder: CardanoWasm.TransactionBuilder, output: Output, dummyAddress: string) => OutputCost;
export declare const prepareWithdrawals: (withdrawals: Withdrawal[]) => CardanoWasm.Withdrawals;
export declare const prepareCertificates: (certificates: Certificate[], accountKey: CardanoWasm.Bip32PublicKey) => CardanoWasm.Certificates;
export declare const calculateRequiredDeposit: (certificates: Certificate[]) => number;
export declare const setMinUtxoValueForOutputs: (txBuilder: CardanoWasm.TransactionBuilder, outputs: UserOutput[], dummyAddress: string) => UserOutput[];
export declare const splitChangeOutput: (txBuilder: CardanoWasm.TransactionBuilder, singleChangeOutput: OutputCost, changeAddress: string, maxTokensPerOutput?: number) => OutputCost[];
export declare const prepareChangeOutput: (txBuilder: CardanoWasm.TransactionBuilder, usedUtxos: Utxo[], preparedOutputs: Output[], changeAddress: string, utxosTotalAmount: CardanoWasm.BigNum, totalOutputAmount: CardanoWasm.BigNum, totalFeesAmount: CardanoWasm.BigNum, pickAdditionalUtxo?: () => ReturnType<typeof getRandomUtxo>) => OutputCost | null;
export declare const getTxBuilder: (a?: string) => CardanoWasm.TransactionBuilder;
export declare const getUnsatisfiedAssets: (selectedUtxos: Utxo[], outputs: Output[]) => string[];
export declare const getInitialUtxoSet: (utxos: Utxo[], maxOutput: UserOutput | undefined) => {
    used: Utxo[];
    remaining: Utxo[];
};
export declare const setMaxOutput: (txBuilder: CardanoWasm.TransactionBuilder, maxOutput: UserOutput, changeOutput: OutputCost | null) => {
    maxOutput: UserOutput;
};
export declare const getUserOutputQuantityWithDeposit: (outputs: UserOutput[], deposit: number, asset?: string) => CardanoWasm.BigNum;
export declare const filterUtxos: (utxos: Utxo[], asset: string) => Utxo[];
export declare const getRandomUtxo: (txBuilder: CardanoWasm.TransactionBuilder, utxoRemaining: Utxo[], utxoSelected: Utxo[]) => {
    utxo: Utxo;
    addUtxo: () => void;
} | null;
export declare const calculateUserOutputsFee: (txBuilder: CardanoWasm.TransactionBuilder, userOutputs: UserOutput[], changeAddress: string) => CardanoWasm.BigNum;
export declare const orderInputs: (inputsToOrder: Utxo[], txBody: CardanoWasm.TransactionBody) => Utxo[];
