"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpRequest = httpRequest;
const tslib_1 = require("tslib");
const cross_fetch_1 = tslib_1.__importDefault(require("cross-fetch"));
const fs_1 = require("fs");
const assets_browser_1 = require("./assets-browser");
const assetUtils_1 = require("./assetUtils");
if (global && typeof global.fetch !== 'function') {
    global.fetch = cross_fetch_1.default;
}
function httpRequest(url, type, options) {
    const asset = (options === null || options === void 0 ? void 0 : options.skipLocalForceDownload) ? null : (0, assetUtils_1.tryLocalAssetRequire)(url);
    if (!asset) {
        return /^https?/.test(url)
            ? (0, assets_browser_1.httpRequest)(url, type, options)
            : fs_1.promises.readFile(url);
    }
    return asset;
}
//# sourceMappingURL=assets.js.map