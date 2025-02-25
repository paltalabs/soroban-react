import { ComposeOutput as ComposeOutputBase } from '@trezor/utxo-lib';
import { PROTO } from '../../constants';
import type { BitcoinNetworkInfo, ProtoWithDerivationPath } from '../../types';
import type { ComposeOutput, ComposeResultFinal } from '../../types/api/composeTransaction';
export declare const validateTrezorOutputs: (outputs: ProtoWithDerivationPath<PROTO.TxOutputType>[], coinInfo: BitcoinNetworkInfo) => PROTO.TxOutputType[];
export declare const validateHDOutput: (output: ComposeOutput, coinInfo: BitcoinNetworkInfo) => ComposeOutputBase;
export declare const outputToTrezor: (output: ComposeResultFinal["outputs"][number]) => PROTO.TxOutputType;
//# sourceMappingURL=outputs.d.ts.map