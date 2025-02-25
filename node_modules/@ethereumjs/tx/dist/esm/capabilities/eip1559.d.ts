import type { EIP1559CompatibleTx } from '../types.js';
export declare function getUpfrontCost(tx: EIP1559CompatibleTx, baseFee: bigint): bigint;
export declare function getEffectivePriorityFee(tx: EIP1559CompatibleTx, baseFee: bigint | undefined): bigint;
//# sourceMappingURL=eip1559.d.ts.map