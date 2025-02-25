"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendChunks = exports.buildMessage = exports.createChunks = void 0;
const tslib_1 = require("tslib");
const protobuf_1 = require("@trezor/protobuf");
const createChunks = (data, chunkHeader, chunkSize) => {
    if (!chunkSize || data.byteLength <= chunkSize) {
        const buffer = Buffer.alloc(Math.max(chunkSize, data.byteLength));
        data.copy(buffer);
        return [buffer];
    }
    const chunks = [data.subarray(0, chunkSize)];
    let position = chunkSize;
    while (position < data.byteLength) {
        const sliceEnd = Math.min(position + chunkSize - chunkHeader.byteLength, data.byteLength);
        const slice = data.subarray(position, sliceEnd);
        const chunk = Buffer.concat([chunkHeader, slice]);
        chunks.push(Buffer.alloc(chunkSize).fill(chunk, 0, chunk.byteLength));
        position = sliceEnd;
    }
    return chunks;
};
exports.createChunks = createChunks;
const buildMessage = ({ messages, name, data, encode }) => {
    const { Message, messageType } = (0, protobuf_1.createMessageFromName)(messages, name);
    const buffer = (0, protobuf_1.encode)(Message, data);
    return encode(buffer, {
        messageType,
    });
};
exports.buildMessage = buildMessage;
const sendChunks = (chunks, apiWrite) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < chunks.length; i++) {
        const result = yield apiWrite(chunks[i]);
        if (!result.success) {
            return result;
        }
    }
    return { success: true, payload: undefined };
});
exports.sendChunks = sendChunks;
//# sourceMappingURL=send.js.map