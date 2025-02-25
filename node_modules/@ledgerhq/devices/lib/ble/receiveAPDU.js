"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveAPDU = void 0;
const errors_1 = require("@ledgerhq/errors");
const rxjs_1 = require("rxjs");
const logs_1 = require("@ledgerhq/logs");
const TagId = 0x05;
/**
 * Parses a raw stream coming from a BLE communication into an APDU response
 *
 * @param rawStream An observable containing the raw stream as emitted buffers
 * @param options Optional options containing:
 *   - context An optional context object for log/tracing strategy
 * @returns An observable containing the APDU response as one emitted buffer
 */
const receiveAPDU = (rawStream, { context } = {}) => new rxjs_1.Observable(o => {
    let notifiedIndex = 0;
    let notifiedDataLength = 0;
    let notifiedData = Buffer.alloc(0);
    const subscriptionCleaner = new rxjs_1.ReplaySubject();
    // The raw stream is listened/subscribed to until a full message (that can be made of several frames) is received
    rawStream.pipe((0, rxjs_1.takeUntil)(subscriptionCleaner)).subscribe({
        complete: () => {
            o.error(new errors_1.DisconnectedDevice());
        },
        error: error => {
            (0, logs_1.trace)({
                type: "ble-error",
                message: `Error in receiveAPDU: ${error}`,
                data: { error },
                context,
            });
            o.error(error);
        },
        next: value => {
            // Silences emitted errors in next
            if (value instanceof Error) {
                (0, logs_1.trace)({
                    type: "ble-error",
                    message: `Error emitted to receiveAPDU next: ${value}`,
                    data: { error: value },
                    context,
                });
                return;
            }
            const tag = value.readUInt8(0);
            const chunkIndex = value.readUInt16BE(1);
            // `slice` and not `subarray`: this is not a Node Buffer, but probably only a Uint8Array.
            let chunkData = value.slice(3);
            if (tag !== TagId) {
                o.error(new errors_1.TransportError("Invalid tag " + tag.toString(16), "InvalidTag"));
                return;
            }
            // A chunk was probably missed
            if (notifiedIndex !== chunkIndex) {
                o.error(new errors_1.TransportError(`BLE: Invalid sequence number. discontinued chunk. Received ${chunkIndex} but expected ${notifiedIndex}`, "InvalidSequence"));
                return;
            }
            // The total length of the response is located on the next 2 bytes on the 1st chunk
            if (chunkIndex === 0) {
                notifiedDataLength = chunkData.readUInt16BE(0);
                // `slice` and not `subarray`: this is not a Node Buffer, but probably only a Uint8Array.
                chunkData = chunkData.slice(2);
            }
            notifiedIndex++;
            // The cost of creating a new buffer for each received chunk is low because the response is often contained in 1 chunk.
            // Allocating `notifiedData` buffer with the received total length and mutating it will probably not improve any performance.
            notifiedData = Buffer.concat([notifiedData, chunkData]);
            if (notifiedData.length > notifiedDataLength) {
                o.error(new errors_1.TransportError(`BLE: received too much data. discontinued chunk. Received ${notifiedData.length} but expected ${notifiedDataLength}`, "BLETooMuchData"));
                return;
            }
            if (notifiedData.length === notifiedDataLength) {
                o.next(notifiedData);
                o.complete();
                // Tries to unsubscribe from the raw stream as soon as we complete the parent observer
                subscriptionCleaner.next();
            }
        },
    });
    return () => {
        subscriptionCleaner.next();
    };
});
exports.receiveAPDU = receiveAPDU;
//# sourceMappingURL=receiveAPDU.js.map