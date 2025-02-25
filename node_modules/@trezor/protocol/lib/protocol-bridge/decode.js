"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = void 0;
const constants_1 = require("./constants");
const readHeader = (buffer) => {
    const messageType = buffer.readUInt16BE();
    const length = buffer.readUInt32BE(2);
    return { messageType, length };
};
const decode = bytes => {
    const { messageType, length } = readHeader(bytes);
    return {
        messageType,
        length,
        payload: bytes.subarray(constants_1.HEADER_SIZE),
    };
};
exports.decode = decode;
//# sourceMappingURL=decode.js.map