import { IInstruction } from '@solana/instructions';
import { OrderedAccounts } from './accounts';
type CompiledInstruction = Readonly<{
    accountIndices?: number[];
    data?: Uint8Array;
    programAddressIndex: number;
}>;
export declare function getCompiledInstructions(instructions: readonly IInstruction[], orderedAccounts: OrderedAccounts): CompiledInstruction[];
export {};
//# sourceMappingURL=instructions.d.ts.map