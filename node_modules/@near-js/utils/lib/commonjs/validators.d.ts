import { CurrentEpochValidatorInfo, NextEpochValidatorInfo } from '@near-js/types';
/** Finds seat price given validators stakes and number of seats.
 *  Calculation follow the spec: https://nomicon.io/Economics/README.html#validator-selection
 * @param validators: current or next epoch validators.
 * @param maxNumberOfSeats: maximum number of seats in the network.
 * @param minimumStakeRatio: minimum stake ratio
 * @param protocolVersion: version of the protocol from genesis config
 */
export declare function findSeatPrice(validators: (CurrentEpochValidatorInfo | NextEpochValidatorInfo)[], maxNumberOfSeats: number, minimumStakeRatio: number[], protocolVersion?: number): bigint;
export interface ChangedValidatorInfo {
    current: CurrentEpochValidatorInfo;
    next: NextEpochValidatorInfo;
}
export interface EpochValidatorsDiff {
    newValidators: NextEpochValidatorInfo[];
    removedValidators: CurrentEpochValidatorInfo[];
    changedValidators: ChangedValidatorInfo[];
}
/** Diff validators between current and next epoch.
 * Returns additions, subtractions and changes to validator set.
 * @param currentValidators: list of current validators.
 * @param nextValidators: list of next validators.
 */
export declare function diffEpochValidators(currentValidators: CurrentEpochValidatorInfo[], nextValidators: NextEpochValidatorInfo[]): EpochValidatorsDiff;
//# sourceMappingURL=validators.d.ts.map