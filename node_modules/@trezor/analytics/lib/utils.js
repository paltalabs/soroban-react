"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportEvent = exports.getUrl = exports.encodeDataToQueryString = exports.getRandomId = exports.getTrackingRandomId = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("@trezor/utils");
const getTrackingRandomId = () => (0, utils_1.getWeakRandomId)(10);
exports.getTrackingRandomId = getTrackingRandomId;
const getRandomId = () => (0, utils_1.getWeakRandomId)(10);
exports.getRandomId = getRandomId;
const encodeDataToQueryString = (instanceId, sessionId, commitId, version, event) => {
    const { type, timestamp } = event;
    const params = new URLSearchParams({
        c_v: version,
        c_type: type || '',
        c_commit: commitId,
        c_instance_id: instanceId,
        c_session_id: sessionId,
        c_timestamp: timestamp || Date.now().toString(),
        c_message_id: (0, exports.getRandomId)(),
    });
    if (event.payload) {
        Object.entries(event.payload).forEach(([key, value]) => { var _a; return params.append(key, (_a = value === null || value === void 0 ? void 0 : value.toString()) !== null && _a !== void 0 ? _a : ''); });
    }
    return params.toString();
};
exports.encodeDataToQueryString = encodeDataToQueryString;
const getUrl = (app, isDev, environment) => {
    let base = `https://data.trezor.io/${app}/log`;
    if (environment) {
        base = `${base}/${environment}`;
    }
    if (isDev) {
        return `${base}/develop.log`;
    }
    return `${base}/stable.log`;
};
exports.getUrl = getUrl;
const reportEventError = (type, retry, err) => {
    var _a;
    let errorMessage = ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) || (err === null || err === void 0 ? void 0 : err.message);
    if (typeof errorMessage !== 'string') {
        errorMessage = 'Unknown error.';
    }
    if (errorMessage.includes('Failed to fetch')) {
        errorMessage = 'Failed to analytics fetch.';
    }
    const reportedMessage = `Analytics report failed. Reporting '${type}' ${retry ? 'again' : 'was unsuccessful'}. ${errorMessage}`;
    console.error(reportedMessage);
};
const reportEvent = (_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ type, url, options, retry }) {
    try {
        const response = yield fetch(url, options);
        if (!response.ok) {
            console.error(`Analytics response not ok. Response status: ${response.status}.`);
        }
    }
    catch (err) {
        reportEventError(type, retry, err);
        if (retry) {
            setTimeout(() => (0, exports.reportEvent)({ type, url, options, retry: false }), 1000);
        }
    }
});
exports.reportEvent = reportEvent;
//# sourceMappingURL=utils.js.map