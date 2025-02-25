"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransportMessage = exports.TRANSPORT_EVENT = exports.TRANSPORT = void 0;
const errors_1 = require("../constants/errors");
var constants_1 = require("@trezor/transport/lib/constants");
Object.defineProperty(exports, "TRANSPORT", { enumerable: true, get: function () { return constants_1.TRANSPORT; } });
exports.TRANSPORT_EVENT = 'TRANSPORT_EVENT';
const createTransportMessage = (type, payload) => ({
    event: exports.TRANSPORT_EVENT,
    type,
    payload: 'error' in payload ? (0, errors_1.serializeError)(payload) : payload,
});
exports.createTransportMessage = createTransportMessage;
//# sourceMappingURL=transport.js.map