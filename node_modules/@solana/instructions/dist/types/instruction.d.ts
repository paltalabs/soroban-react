import { Address } from '@solana/addresses';
import { IAccountLookupMeta, IAccountMeta } from './accounts';
export interface IInstruction<TProgramAddress extends string = string, TAccounts extends readonly (IAccountLookupMeta | IAccountMeta)[] = readonly (IAccountLookupMeta | IAccountMeta)[]> {
    readonly accounts?: TAccounts;
    readonly data?: Uint8Array;
    readonly programAddress: Address<TProgramAddress>;
}
export interface IInstructionWithAccounts<TAccounts extends readonly (IAccountLookupMeta | IAccountMeta)[]> extends IInstruction {
    readonly accounts: TAccounts;
}
export declare function isInstructionForProgram<TProgramAddress extends string, TInstruction extends IInstruction>(instruction: TInstruction, programAddress: Address<TProgramAddress>): instruction is TInstruction & {
    programAddress: Address<TProgramAddress>;
};
export declare function assertIsInstructionForProgram<TProgramAddress extends string, TInstruction extends IInstruction>(instruction: TInstruction, programAddress: Address<TProgramAddress>): asserts instruction is TInstruction & {
    programAddress: Address<TProgramAddress>;
};
export declare function isInstructionWithAccounts<TAccounts extends readonly (IAccountLookupMeta | IAccountMeta)[] = readonly (IAccountLookupMeta | IAccountMeta)[], TInstruction extends IInstruction = IInstruction>(instruction: TInstruction): instruction is IInstructionWithAccounts<TAccounts> & TInstruction;
export declare function assertIsInstructionWithAccounts<TAccounts extends readonly (IAccountLookupMeta | IAccountMeta)[] = readonly (IAccountLookupMeta | IAccountMeta)[], TInstruction extends IInstruction = IInstruction>(instruction: TInstruction): asserts instruction is IInstructionWithAccounts<TAccounts> & TInstruction;
export interface IInstructionWithData<TData extends Uint8Array> extends IInstruction {
    readonly data: TData;
}
export declare function isInstructionWithData<TData extends Uint8Array = Uint8Array, TInstruction extends IInstruction = IInstruction>(instruction: TInstruction): instruction is IInstructionWithData<TData> & TInstruction;
export declare function assertIsInstructionWithData<TData extends Uint8Array = Uint8Array, TInstruction extends IInstruction = IInstruction>(instruction: TInstruction): asserts instruction is IInstructionWithData<TData> & TInstruction;
//# sourceMappingURL=instruction.d.ts.map