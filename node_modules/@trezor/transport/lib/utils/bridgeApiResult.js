"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = info;
exports.version = version;
exports.devices = devices;
exports.acquire = acquire;
exports.call = call;
exports.post = post;
exports.empty = empty;
const tslib_1 = require("tslib");
const result_1 = require("./result");
const bridgeProtocolMessage_1 = require("./bridgeProtocolMessage");
const ERRORS = tslib_1.__importStar(require("../errors"));
function isString(payload) {
    return typeof payload === 'string';
}
function info(res) {
    if (isString(res)) {
        return (0, result_1.error)({ error: ERRORS.WRONG_RESULT_TYPE });
    }
    const { version } = res;
    if (typeof version !== 'string') {
        return (0, result_1.error)({ error: ERRORS.WRONG_RESULT_TYPE });
    }
    const configured = !!res.configured;
    const protocolMessages = !!res.protocolMessages;
    return (0, result_1.success)({ version, configured, protocolMessages });
}
function version(res) {
    if (!isString(res)) {
        return (0, result_1.error)({ error: ERRORS.WRONG_RESULT_TYPE });
    }
    return (0, result_1.success)(res.trim());
}
function devices(res) {
    if (isString(res)) {
        return (0, result_1.error)({ error: ERRORS.WRONG_RESULT_TYPE });
    }
    if (!(res instanceof Array)) {
        return (0, result_1.error)({ error: ERRORS.WRONG_RESULT_TYPE });
    }
    if (res.some(o => typeof o !== 'object' ||
        !o ||
        typeof o.path !== 'string' ||
        (typeof o.session !== 'string' && o.session !== null))) {
        return (0, result_1.error)({ error: ERRORS.WRONG_RESULT_TYPE });
    }
    return (0, result_1.success)(res.map((o) => ({
        path: o.path,
        session: o.session,
        sessionOwner: o.sessionOwner,
        product: o.product,
        type: o.type,
        vendor: o.vendor,
        debug: o.debug,
        debugSession: o.debugSession,
    })));
}
function acquire(res) {
    if (isString(res)) {
        return (0, result_1.error)({ error: ERRORS.WRONG_RESULT_TYPE });
    }
    const { session } = res;
    if (typeof session !== 'string') {
        return (0, result_1.error)({ error: ERRORS.WRONG_RESULT_TYPE });
    }
    return (0, result_1.success)(session);
}
function call(res) {
    try {
        return (0, result_1.success)((0, bridgeProtocolMessage_1.validateProtocolMessage)(res, true));
    }
    catch (_a) {
        return (0, result_1.error)({ error: ERRORS.WRONG_RESULT_TYPE });
    }
}
function post(res) {
    try {
        return (0, result_1.success)((0, bridgeProtocolMessage_1.validateProtocolMessage)(res, false));
    }
    catch (_a) {
        return (0, result_1.error)({ error: ERRORS.WRONG_RESULT_TYPE });
    }
}
function empty(res) {
    return res != null && JSON.stringify(res) === '{}'
        ? (0, result_1.error)({ error: ERRORS.WRONG_RESULT_TYPE })
        : (0, result_1.success)(undefined);
}
//# sourceMappingURL=bridgeApiResult.js.map