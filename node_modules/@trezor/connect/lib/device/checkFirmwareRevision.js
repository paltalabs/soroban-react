"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFirmwareRevision = void 0;
const versionUtils_1 = require("@trezor/utils/lib/versionUtils");
const downloadReleasesMetadata_1 = require("../data/downloadReleasesMetadata");
const calculateRevisionForDevice_1 = require("./calculateRevisionForDevice");
const NODE_FETCH_OFFLINE_ERROR_NAMES = ['FetchError', 'AbortError'];
const getOnlineReleaseMetadata = async ({ firmwareVersion, internalModel, }) => {
    const onlineReleases = await (0, downloadReleasesMetadata_1.downloadReleasesMetadata)({ internal_model: internalModel });
    return onlineReleases.find(onlineRelease => (0, versionUtils_1.isEqual)(onlineRelease.version, firmwareVersion));
};
const failFirmwareRevisionCheck = (error) => ({ success: false, error });
const doRevisionsMatch = ({ deviceRevision, expectedCommitRevision, firmwareVersion, }) => {
    if (deviceRevision === null) {
        return false;
    }
    const adjustedExpected = (0, calculateRevisionForDevice_1.calculateRevisionForDevice)({
        commitRevision: expectedCommitRevision,
        version: firmwareVersion,
    });
    return adjustedExpected === deviceRevision;
};
const checkFirmwareRevision = async ({ firmwareVersion, internalModel, deviceRevision, expectedRevision, }) => {
    if (expectedRevision === undefined) {
        if (firmwareVersion.length !== 3) {
            return failFirmwareRevisionCheck('firmware-version-unknown');
        }
        try {
            const onlineRelease = await getOnlineReleaseMetadata({
                firmwareVersion,
                internalModel,
            });
            if ((onlineRelease === null || onlineRelease === void 0 ? void 0 : onlineRelease.firmware_revision) === undefined) {
                return failFirmwareRevisionCheck('firmware-version-unknown');
            }
            if (!doRevisionsMatch({
                deviceRevision,
                expectedCommitRevision: onlineRelease.firmware_revision,
                firmwareVersion,
            })) {
                return failFirmwareRevisionCheck('revision-mismatch');
            }
            return { success: true };
        }
        catch (e) {
            if (NODE_FETCH_OFFLINE_ERROR_NAMES.includes(e.name)) {
                return failFirmwareRevisionCheck('cannot-perform-check-offline');
            }
            return failFirmwareRevisionCheck('other-error');
        }
    }
    if (!doRevisionsMatch({
        deviceRevision,
        expectedCommitRevision: expectedRevision,
        firmwareVersion,
    })) {
        return failFirmwareRevisionCheck('revision-mismatch');
    }
    return { success: true };
};
exports.checkFirmwareRevision = checkFirmwareRevision;
//# sourceMappingURL=checkFirmwareRevision.js.map