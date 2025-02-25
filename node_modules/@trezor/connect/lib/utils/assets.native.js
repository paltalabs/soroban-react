"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpRequest = httpRequest;
const assetUtils_1 = require("./assetUtils");
function httpRequest(url, type, options) {
    const asset = (options === null || options === void 0 ? void 0 : options.skipLocalForceDownload) ? null : (0, assetUtils_1.tryLocalAssetRequire)(url);
    if (!asset) {
        return fetch(url, {
            ...options,
        })
            .then(response => {
            if (!response.ok) {
                console.error('HTTP request failed', response);
                throw new Error(`HTTP request failed with status ${response.status} ${response.statusText}`);
            }
            if (type === 'binary') {
                return response.arrayBuffer();
            }
            if (type === 'json') {
                return response.json();
            }
            return response.text();
        })
            .catch(error => {
            console.error('HTTP request failed', error);
            throw error;
        });
    }
    return asset;
}
//# sourceMappingURL=assets.native.js.map