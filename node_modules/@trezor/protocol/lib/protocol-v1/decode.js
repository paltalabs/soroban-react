"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = void 0;
const tslib_1 = require("tslib");
const ERRORS = tslib_1.__importStar(require("../errors"));
const constants_1 = require("./constants");
const readHeaderChunked = (buffer) => {
    const magic = buffer.readUInt8();
    const sharp1 = buffer.readUInt8(1);
    const sharp2 = buffer.readUInt8(2);
    const messageType = buffer.readUInt16BE(3);
    const length = buffer.readUInt32BE(5);
    return { magic, sharp1, sharp2, messageType, length };
};
const decode = bytes => {
    if (bytes.byteLength === 0) {
        console.error('protocol-v1: decode: received empty buffer');
    }
    const { magic, sharp1, sharp2, messageType, length } = readHeaderChunked(bytes);
    if (magic !== constants_1.MESSAGE_MAGIC_HEADER_BYTE ||
        sharp1 !== constants_1.MESSAGE_HEADER_BYTE ||
        sharp2 !== constants_1.MESSAGE_HEADER_BYTE) {
        throw new Error(ERRORS.PROTOCOL_MALFORMED);
    }
    return {
        length,
        messageType,
        payload: bytes.subarray(constants_1.HEADER_SIZE),
    };
};
exports.decode = decode;
//# sourceMappingURL=decode.js.map