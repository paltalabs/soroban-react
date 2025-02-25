import { CardanoSignedTxWitness } from '../../types/trezor';
export declare const signTransaction: (txBodyHex: string, signedWitnesses: CardanoSignedTxWitness[], options?: {
    testnet?: boolean;
}) => string;
