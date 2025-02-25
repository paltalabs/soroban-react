"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = void 0;
const decode = (bytes) => {
    const byteBuffer = Buffer.from(bytes);
    const magic = byteBuffer.subarray(0, 5).toString('utf8');
    const definitionType = byteBuffer.readUInt8(5);
    const dataVersion = byteBuffer.readUInt32LE(6);
    const protobufLength = byteBuffer.readUInt16LE(10);
    const protobufPayload = byteBuffer.subarray(12, 12 + protobufLength);
    return {
        magic,
        definitionType,
        dataVersion,
        protobufLength,
        protobufPayload,
    };
};
exports.decode = decode;
//# sourceMappingURL=decode.js.map