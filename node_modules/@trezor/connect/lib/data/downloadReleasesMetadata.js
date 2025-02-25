"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadReleasesMetadata = void 0;
const assets_1 = require("../utils/assets");
const firmwareUtils_1 = require("../utils/firmwareUtils");
const downloadReleasesMetadata = async ({ internal_model, }) => {
    const url = `https://data.trezor.io/firmware/${internal_model.toLowerCase()}/releases.json`;
    const response = await (0, assets_1.httpRequest)(url, 'json', {
        signal: AbortSignal.timeout(10000),
        skipLocalForceDownload: true,
    });
    if ((0, firmwareUtils_1.isValidReleases)(response)) {
        return response;
    }
    return [];
};
exports.downloadReleasesMetadata = downloadReleasesMetadata;
//# sourceMappingURL=downloadReleasesMetadata.js.map