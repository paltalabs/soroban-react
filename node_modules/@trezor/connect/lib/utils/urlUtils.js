"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnionDomain = exports.getHost = exports.getOrigin = void 0;
const utils_1 = require("@trezor/utils");
const getOrigin = (url) => {
    var _a;
    if (typeof url !== 'string')
        return 'unknown';
    if (url.indexOf('file://') === 0)
        return 'file://';
    const [origin] = (_a = url.match(/^https?:\/\/[^/]+/)) !== null && _a !== void 0 ? _a : [];
    return origin !== null && origin !== void 0 ? origin : 'unknown';
};
exports.getOrigin = getOrigin;
const getHost = (url) => {
    var _a;
    if (typeof url !== 'string')
        return;
    const [, , uri] = (_a = url.match(/^(https?):\/\/([^:/]+)?/i)) !== null && _a !== void 0 ? _a : [];
    if (uri) {
        const parts = uri.split('.');
        return parts.length > 2
            ?
                parts.slice(parts.length - 2, parts.length).join('.')
            : uri;
    }
};
exports.getHost = getHost;
const getOnionDomain = (url, dict) => {
    var _a;
    if (Array.isArray(url))
        return url.map(u => { var _a; return (_a = (0, utils_1.urlToOnion)(u, dict)) !== null && _a !== void 0 ? _a : u; });
    if (typeof url === 'string')
        return (_a = (0, utils_1.urlToOnion)(url, dict)) !== null && _a !== void 0 ? _a : url;
    return url;
};
exports.getOnionDomain = getOnionDomain;
//# sourceMappingURL=urlUtils.js.map