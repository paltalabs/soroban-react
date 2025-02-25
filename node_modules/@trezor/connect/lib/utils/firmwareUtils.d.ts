import type { Features, StrictFeatures, FirmwareRelease, VersionArray } from '../types';
export declare const isStrictFeatures: (extFeatures: Features) => extFeatures is StrictFeatures;
export declare const isValidReleases: (extReleases: any) => extReleases is FirmwareRelease[];
export declare const filterSafeListByBootloader: (releasesList: FirmwareRelease[], bootloaderVersion: VersionArray) => FirmwareRelease[];
export declare const filterSafeListByFirmware: (releasesList: FirmwareRelease[], firmwareVersion: VersionArray) => FirmwareRelease[];
//# sourceMappingURL=firmwareUtils.d.ts.map