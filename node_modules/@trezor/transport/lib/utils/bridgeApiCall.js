"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bridgeApiCall = bridgeApiCall;
const tslib_1 = require("tslib");
const cross_fetch_1 = tslib_1.__importDefault(require("cross-fetch"));
const errors_1 = require("@trezor/protocol/lib/errors");
const result_1 = require("./result");
const ERRORS = tslib_1.__importStar(require("../errors"));
const applyBridgeApiCallHeaders_1 = require("./applyBridgeApiCallHeaders");
function contentType(body) {
    if (typeof body === 'string') {
        if (body === '') {
            return 'text/plain';
        }
        return 'application/octet-stream';
    }
    return 'application/json';
}
function wrapBody(body) {
    if (typeof body === 'string') {
        return body;
    }
    return JSON.stringify(body);
}
function parseResult(text) {
    try {
        return JSON.parse(text);
    }
    catch (_a) {
        return text;
    }
}
function bridgeApiCall(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const fetchOptions = {
            method: options.method,
            body: wrapBody(options.body),
            credentials: 'same-origin',
            headers: {},
            signal: options.signal,
            timeout: options.timeout,
        };
        fetchOptions.headers = (0, applyBridgeApiCallHeaders_1.applyBridgeApiCallHeaders)({
            headers: fetchOptions.headers,
            contentType: contentType(options.body == null ? '' : options.body),
            skipContentTypeHeader: options.skipContentTypeHeader,
        });
        let res;
        try {
            res = yield (0, cross_fetch_1.default)(options.url, fetchOptions);
        }
        catch (err) {
            return (0, result_1.error)({ error: ERRORS.HTTP_ERROR, message: err.message });
        }
        let resParsed;
        try {
            resParsed = yield res.text();
            resParsed = parseResult(resParsed);
        }
        catch (err) {
            return (0, result_1.error)({ error: ERRORS.HTTP_ERROR, message: err.message });
        }
        const BRIDGE_ERROR_DEVICE_CLOSED = 'closed device';
        const BRIDGE_MALFORMED_PROTOBUF = 'malformed protobuf';
        const BRIDGE_MALFORMED_WIRE_FORMAT = 'malformed wire format';
        if (!res.ok) {
            const errStr = typeof resParsed !== 'string' && 'error' in resParsed
                ? resParsed.error
                : resParsed;
            if (errStr === BRIDGE_ERROR_DEVICE_CLOSED) {
                return (0, result_1.error)({ error: ERRORS.INTERFACE_UNABLE_TO_OPEN_DEVICE });
            }
            if (errStr === BRIDGE_MALFORMED_PROTOBUF) {
                return (0, result_1.error)({ error: errors_1.PROTOCOL_MALFORMED });
            }
            if (errStr === BRIDGE_MALFORMED_WIRE_FORMAT) {
                return (0, result_1.error)({ error: errors_1.PROTOCOL_MALFORMED });
            }
            if (typeof resParsed !== 'string' &&
                'error' in resParsed &&
                typeof resParsed.error === 'string') {
                return (0, result_1.error)({
                    error: resParsed.error,
                    message: 'message' in resParsed && typeof resParsed.message === 'string'
                        ? resParsed.message
                        : undefined,
                });
            }
            return (0, result_1.unknownError)(new Error(errStr), Object.values(ERRORS));
        }
        return (0, result_1.success)(resParsed);
    });
}
//# sourceMappingURL=bridgeApiCall.js.map